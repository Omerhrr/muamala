import { getSettingsGroup } from "@/lib/content";
import { imageResponse } from "@/lib/image-response";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const brand = await getSettingsGroup("brand");
  return imageResponse(brand.ogImage || brand.logoMark, req, "/logo-full.png");
}
