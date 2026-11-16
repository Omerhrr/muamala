"use client";

import { useRef, useState } from "react";
import { ImagePlus, RotateCcw, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MAX_BYTES = 1_800_000; // stored value cap (~1.8 MB of text)

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read the file"));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("That file is not a readable image"));
    img.src = src;
  });
}

/** Scale an uploaded image down so it stays light; keeps transparency for PNG/WebP/SVG. */
export async function prepareImage(file: File, maxSize: number): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Please choose an image file (PNG, JPG, WebP or SVG).");
  const original = await readAsDataUrl(file);
  if (file.type === "image/svg+xml") {
    if (original.length > 400_000) throw new Error("That SVG is too large (max about 300 KB).");
    return original;
  }
  const img = await loadImage(original);
  const scale = Math.min(1, maxSize / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.max(1, Math.round(img.naturalWidth * scale));
  const h = Math.max(1, Math.round(img.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Your browser could not process this image.");
  const keepsAlpha = file.type === "image/png" || file.type === "image/webp" || file.type === "image/gif";
  if (!keepsAlpha) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
  }
  ctx.drawImage(img, 0, 0, w, h);
  let out = keepsAlpha ? canvas.toDataURL("image/webp", 0.9) : canvas.toDataURL("image/jpeg", 0.86);
  if (keepsAlpha && !out.startsWith("data:image/webp")) out = canvas.toDataURL("image/png");
  if (out.length > MAX_BYTES) {
    out = keepsAlpha ? canvas.toDataURL("image/webp", 0.7) : canvas.toDataURL("image/jpeg", 0.7);
  }
  if (out.length > MAX_BYTES) throw new Error("That image is still too large after resizing. Try a smaller one.");
  return out;
}

export function ImageField({
  value,
  onChange,
  maxSize = 1200,
  defaultValue = "",
  id,
}: {
  value: string;
  onChange: (next: string) => void;
  maxSize?: number;
  defaultValue?: string;
  id?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isData = value.startsWith("data:");

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      onChange(await prepareImage(file, maxSize));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div
          className="flex h-28 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border sm:w-44"
          style={{
            backgroundImage:
              "linear-gradient(45deg,#e8e4d6 25%,transparent 25%),linear-gradient(-45deg,#e8e4d6 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#e8e4d6 75%),linear-gradient(-45deg,transparent 75%,#e8e4d6 75%)",
            backgroundSize: "16px 16px",
            backgroundPosition: "0 0,0 8px,8px -8px,-8px 0",
            backgroundColor: "#fff",
          }}
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="Preview" className="max-h-full max-w-full object-contain" />
          ) : (
            <span className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
              <ImagePlus className="size-5" aria-hidden="true" />
              No image
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-2.5">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={busy}
              onClick={() => inputRef.current?.click()}
              className="h-10 gap-1.5"
            >
              <Upload className="size-4" />
              {busy ? "Processing…" : value ? "Replace image" : "Upload image"}
            </Button>
            {defaultValue && value !== defaultValue && (
              <Button type="button" variant="ghost" size="sm" className="h-10 gap-1.5" onClick={() => onChange(defaultValue)}>
                <RotateCcw className="size-4" />
                Use original
              </Button>
            )}
            {value && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-10 gap-1.5 text-destructive"
                onClick={() => onChange("")}
              >
                <Trash2 className="size-4" />
                Remove
              </Button>
            )}
          </div>
          <input
            ref={inputRef}
            id={id}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
            className="sr-only"
            onChange={(e) => void handleFile(e.target.files?.[0])}
          />
          <Input
            value={isData ? "" : value}
            onChange={(e) => onChange(e.target.value.trim())}
            placeholder={isData ? "Uploaded image (paste a web address to replace)" : "…or paste an image address, e.g. /images/photo.jpg"}
            className="bg-white"
            aria-label="Image address"
          />
          {error && <p className="text-xs font-semibold text-destructive">{error}</p>}
        </div>
      </div>
    </div>
  );
}
