/**
 * Process the uploaded Muamala MFB logo JPG into web assets (v2):
 *  - public/logo-full.png   : full lockup (text + RC + heart mark), transparent bg
 *  - public/logo-mark.png   : chevron + heart mark, transparent bg
 *  - src/app/icon.png       : 64x64 favicon from the mark
 *  - public/logo-white.png  : white silhouette of full logo (for dark surfaces)
 *
 * v2: border flood-fill background removal (no halo), despeckle, better mark crop.
 */
const sharp = require("sharp");
const path = require("path");

const SRC = "/home/z/my-project/upload/photo_2026-11-13_07-45-40.jpg";
const PUB = "/home/z/my-project/public";
const APP = "/home/z/my-project/src/app";

async function main() {
  const { data, info } = await sharp(SRC)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const W = info.width;
  const H = info.height;
  const isNearWhite = (i) => {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    return min > 228 && max - min < 24;
  };

  // 1) Flood fill background from all border pixels
  const bg = new Uint8Array(W * H);
  const stack = [];
  const push = (x, y) => {
    const p = y * W + x;
    if (!bg[p] && isNearWhite(p * 4)) {
      bg[p] = 1;
      stack.push(x, y);
    }
  };
  for (let x = 0; x < W; x++) { push(x, 0); push(x, H - 1); }
  for (let y = 0; y < H; y++) { push(0, y); push(W - 1, y); }
  while (stack.length) {
    const y = stack.pop();
    const x = stack.pop();
    if (x > 0) push(x - 1, y);
    if (x < W - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y < H - 1) push(x, y + 1);
  }
  let bgCount = 0;
  for (let p = 0; p < W * H; p++) {
    if (bg[p]) { data[p * 4 + 3] = 0; bgCount++; }
  }
  console.log("background pixels:", bgCount, "of", W * H);

  // 2) De-halo: semi-transparent light pixels adjacent to background get ramped alpha
  const alphaSnapshot = new Uint8Array(W * H);
  for (let p = 0; p < W * H; p++) alphaSnapshot[p] = data[p * 4 + 3];
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const p = y * W + x;
      if (alphaSnapshot[p] === 0) continue;
      const nearBg =
        (x > 0 && bg[p - 1]) || (x < W - 1 && bg[p + 1]) ||
        (y > 0 && bg[p - W]) || (y < H - 1 && bg[p + W]);
      if (!nearBg) continue;
      const i = p * 4;
      const min = Math.min(data[i], data[i + 1], data[i + 2]);
      if (min > 150) {
        const t = Math.min(1, (min - 150) / 105); // 0..1 whiteness
        data[i + 3] = Math.round(alphaSnapshot[p] * (1 - t * 0.92));
      }
    }
  }

  // 3) Despeckle: remove connected alpha components smaller than 60 px
  const label = new Int32Array(W * H).fill(-1);
  const sizes = [];
  for (let p = 0; p < W * H; p++) {
    if (data[p * 4 + 3] > 40 && label[p] === -1) {
      const id = sizes.length;
      let size = 0;
      const comp = [p];
      label[p] = id;
      while (comp.length) {
        const q = comp.pop();
        size++;
        const qx = q % W, qy = (q / W) | 0;
        const neighbors = [];
        if (qx > 0) neighbors.push(q - 1);
        if (qx < W - 1) neighbors.push(q + 1);
        if (qy > 0) neighbors.push(q - W);
        if (qy < H - 1) neighbors.push(q + W);
        for (const n of neighbors) {
          if (data[n * 4 + 3] > 40 && label[n] === -1) {
            label[n] = id;
            comp.push(n);
          }
        }
      }
      sizes.push(size);
    }
  }
  let removed = 0;
  for (let p = 0; p < W * H; p++) {
    if (label[p] !== -1 && sizes[label[p]] < 60) {
      data[p * 4 + 3] = 0;
      removed++;
    }
  }
  console.log("components:", sizes.length, "speck pixels removed:", removed);

  const transparent = sharp(data, {
    raw: { width: W, height: H, channels: 4 },
  });

  // 4) Trim + save full lockup
  const fullBuf = await transparent.clone().trim({ threshold: 10 }).png().toBuffer();
  const fullMeta = await sharp(fullBuf).metadata();
  console.log("full:", fullMeta.width, "x", fullMeta.height);
  await sharp(fullBuf)
    .resize({ width: 720, withoutEnlargement: true })
    .png()
    .toFile(path.join(PUB, "logo-full.png"));

  // 5) Mark crop: detect vertical text bands, keep everything from the chevron band down
  const { data: fullData, info: fullInfo } = await sharp(fullBuf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const FW = fullInfo.width;
  const FH = fullInfo.height;
  const rowFill = [];
  for (let y = 0; y < FH; y++) {
    let c = 0;
    for (let x = 0; x < FW; x++) {
      if (fullData[(y * FW + x) * 4 + 3] > 40) c++;
    }
    rowFill.push(c);
  }
  // group into bands separated by >= 4 empty rows
  const bands = [];
  let start = -1;
  for (let y = 0; y < FH; y++) {
    if (rowFill[y] > 4) {
      if (start === -1) start = y;
    } else if (start !== -1 && y - start >= 1) {
      // look ahead: only close the band after 4 consecutive empty rows
      let empty = 0;
      for (let k = y; k < Math.min(FH, y + 4); k++) if (rowFill[k] <= 4) empty++;
      if (empty === 4 || y === FH - 1) {
        bands.push([start, y]);
        start = -1;
      }
    }
  }
  if (start !== -1) bands.push([start, FH]);
  console.log("bands:", JSON.stringify(bands));
  if (bands.length < 3) throw new Error("unexpected band structure");
  const markTop = bands[2][0];
  const markBuf = await sharp(fullBuf)
    .extract({
      left: 0,
      top: markTop,
      width: FW,
      height: FH - markTop,
    })
    .trim({ threshold: 10 })
    .png()
    .toBuffer();
  const markMeta = await sharp(markBuf).metadata();
  console.log("mark:", markMeta.width, "x", markMeta.height);
  await sharp(markBuf).png().toFile(path.join(PUB, "logo-mark.png"));

  // 6) Favicon 64x64
  const inner = 56;
  const resized = await sharp(markBuf)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  await sharp({
    create: { width: 64, height: 64, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: resized, left: 4, top: 4 }])
    .png()
    .toFile(path.join(APP, "icon.png"));

  // 7) White silhouette for dark surfaces
  const whiteData = Buffer.from(data);
  for (let i = 0; i < whiteData.length; i += 4) {
    if (whiteData[i + 3] > 0) {
      whiteData[i] = 255;
      whiteData[i + 1] = 255;
      whiteData[i + 2] = 255;
    }
  }
  await sharp(whiteData, { raw: { width: W, height: H, channels: 4 } })
    .trim({ threshold: 10 })
    .resize({ width: 640, withoutEnlargement: true })
    .png()
    .toFile(path.join(PUB, "logo-white.png"));

  console.log("done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
