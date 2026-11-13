/**
 * End-to-end CMS verification against the running dev server.
 * Run: bun run scripts/cms-e2e.ts
 */
const BASE = "http://localhost:3000";
let cookie = "";
let failures = 0;

function check(name: string, ok: boolean, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` (${detail})` : ""}`);
  if (!ok) failures++;
}

async function api(path: string, init?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(cookie ? { cookie } : {}), ...init?.headers },
  });
  const setCookie = res.headers.get("set-cookie");
  if (setCookie) cookie = setCookie.split(";")[0];
  let body: unknown = null;
  try {
    body = await res.json();
  } catch {}
  return { status: res.status, body: body as Record<string, unknown> };
}

async function main() {
  /* ---------- unauthenticated guard ---------- */
  let r = await api("/api/admin/settings");
  check("settings GET blocked when logged out", r.status === 401, `status=${r.status}`);

  r = await api("/api/admin/resource/faqs");
  check("resource GET blocked when logged out", r.status === 401, `status=${r.status}`);

  /* ---------- login ---------- */
  r = await api("/api/admin/auth/login", {
    method: "POST",
    body: JSON.stringify({ username: "admin", password: "wrong-password" }),
  });
  check("login rejects wrong password", r.status === 401, `status=${r.status}`);

  r = await api("/api/admin/auth/login", {
    method: "POST",
    body: JSON.stringify({ username: "admin", password: "muamala2026" }),
  });
  check("login succeeds", r.status === 200 && (r.body as { success?: boolean }).success === true);

  /* ---------- settings ---------- */
  r = await api("/api/admin/settings");
  const values = (r.body as { values?: Record<string, Record<string, unknown>> }).values ?? {};
  check("settings GET returns groups", r.status === 200 && "general" in values);

  const home = values.home as { heroBadge?: string } | undefined;
  const originalBadge = home?.heroBadge ?? "";
  r = await api("/api/admin/settings", {
    method: "PUT",
    body: JSON.stringify({
      group: "home",
      data: { ...home, heroBadge: "E2E badge test" },
    }),
  });
  check("settings PUT saves group", r.status === 200 && (r.body as { success?: boolean }).success === true);

  const html = await (await fetch(`${BASE}/`)).text();
  check("frontend reflects settings edit", html.includes("E2E badge test"));

  r = await api("/api/admin/settings", {
    method: "PUT",
    body: JSON.stringify({ group: "home", data: { ...home, heroBadge: originalBadge } }),
  });
  check("settings restored", r.status === 200);

  /* ---------- FAQ CRUD ---------- */
  r = await api("/api/admin/resource/faqs", {
    method: "POST",
    body: JSON.stringify({
      question: "E2E test question?",
      answer: "E2E test answer.",
      order: 99,
      visible: true,
    }),
  });
  const created = (r.body as { row?: { id?: string } }).row;
  check("faq create works", r.status === 200 && Boolean(created?.id), `id=${created?.id}`);
  const faqId = created?.id ?? "";

  let siteHtml = await (await fetch(`${BASE}/`)).text();
  check("new faq visible on site", siteHtml.includes("E2E test question?"));

  r = await api(`/api/admin/resource/faqs/${faqId}`, {
    method: "PATCH",
    body: JSON.stringify({ question: "E2E edited question?" }),
  });
  check("faq patch works", r.status === 200);

  siteHtml = await (await fetch(`${BASE}/`)).text();
  check("faq edit visible on site", siteHtml.includes("E2E edited question?"));

  r = await api(`/api/admin/resource/faqs/${faqId}`, { method: "DELETE" });
  check("faq delete works", r.status === 200);
  siteHtml = await (await fetch(`${BASE}/`)).text();
  check("faq removed from site", !siteHtml.includes("E2E edited question?"));

  /* ---------- theme switching ---------- */
  r = await api("/api/admin/theme");
  const themes = (r.body as { themes?: { id: string; name: string; brand: string; isActive: boolean }[] }).themes ?? [];
  check("themes list loads", r.status === 200 && themes.length >= 5, `count=${themes.length}`);
  const originalTheme = themes.find((t) => t.isActive);

  r = await api("/api/admin/theme", {
    method: "POST",
    body: JSON.stringify({
      name: "E2E Crimson",
      brand: "#8e1f2f",
      gold: "#c9a227",
      bg: "#faf6f2",
      activate: true,
    }),
  });
  const newTheme = (r.body as { theme?: { id: string } }).theme;
  check("theme create + activate works", r.status === 200 && Boolean(newTheme?.id));

  const html2 = await (await fetch(`${BASE}/`)).text();
  check(
    "site css switches to crimson",
    html2.includes("--color-brand-800:#8e1f2f") || html2.includes("--color-brand-800: #8e1f2f") || /--color-brand-800:\s*#8e1f2f/.test(html2)
  );

  // restore original theme
  if (originalTheme) {
    r = await api("/api/admin/theme", {
      method: "POST",
      body: JSON.stringify({ id: originalTheme.id, name: originalTheme.name, brand: originalTheme.brand, gold: "#c9a227", bg: "#faf7f0", activate: true }),
    });
    check("theme restored to default", r.status === 200);
  }

  // delete the E2E theme (now inactive)
  if (newTheme?.id) {
    r = await api(`/api/admin/theme?id=${newTheme.id}`, { method: "DELETE" });
    check("inactive theme delete works", r.status === 200);
  }

  /* ---------- password change guard ---------- */
  r = await api("/api/admin/auth/password", {
    method: "POST",
    body: JSON.stringify({ username: "admin", currentPassword: "wrong", newPassword: "short" }),
  });
  check("password change rejects wrong current", r.status === 400);

  /* ---------- public forms still write to DB ---------- */
  r = await api("/api/contact", {
    method: "POST",
    body: JSON.stringify({ name: "E2E Tester", phone: "+234 803 000 0000", email: "", subject: "General enquiry", message: "Automated E2E check, please ignore." }),
  });
  check("contact form submits", r.status === 200 && (r.body as { success?: boolean }).success === true);

  r = await api("/api/apply/account", {
    method: "POST",
    body: JSON.stringify({ name: "E2E Tester", phone: "08030000000", type: "individual" }),
  });
  check("account request submits", r.status === 200 && (r.body as { success?: boolean }).success === true);

  r = await api("/api/apply/loan", {
    method: "POST",
    body: JSON.stringify({ name: "E2E Tester", phone: "08030000000", product: "Micro Business Loan", amount: 150000, term: 6 }),
  });
  check("loan application submits", r.status === 200 && (r.body as { success?: boolean }).success === true);

  /* ---------- logout ---------- */
  r = await api("/api/admin/auth/logout", { method: "POST" });
  check("logout works", r.status === 200);
  r = await api("/api/admin/settings");
  check("session invalidated after logout", r.status === 401);

  console.log(failures === 0 ? "\nALL E2E CHECKS PASSED" : `\n${failures} CHECKS FAILED`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
