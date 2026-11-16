import "server-only";

/** Turn a stored image value (data-URL, site path or absolute URL) into an HTTP response. */
export function imageResponse(value: string, req: Request, fallback: string): Response {
  const v = (value || "").trim();
  const m = /^data:([a-z0-9.+/-]+);base64,([A-Za-z0-9+/=]+)$/i.exec(v);
  if (m) {
    return new Response(Buffer.from(m[2], "base64"), {
      headers: {
        "Content-Type": m[1],
        "Cache-Control": "public, max-age=300, stale-while-revalidate=86400",
      },
    });
  }
  const target = v.startsWith("/") || /^https?:\/\//i.test(v) ? v : fallback;
  return Response.redirect(new URL(target, req.url), 307);
}
