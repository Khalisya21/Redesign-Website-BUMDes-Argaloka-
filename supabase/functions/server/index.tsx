import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();
const P = "/make-server-b527bb3a";
const DEFAULT_PW = "argaloka2024";

app.use("*", logger(console.log));
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

app.get(`${P}/health`, (c) => c.json({ status: "ok" }));

// ── Auth ──────────────────────────────────────────────────────────────────────

const auth = async (_c: any, next: any) => { await next(); };

app.post(`${P}/auth/login`, async (c) => {
  const { password } = await c.req.json();
  const storedPw = (await kv.get("admin:pw")) ?? DEFAULT_PW;
  if (password !== storedPw) return c.json({ error: "Password salah" }, 401);
  const token = crypto.randomUUID();
  await kv.set(`sess:${token}`, { at: Date.now() });
  return c.json({ token });
});

app.post(`${P}/auth/logout`, auth, async (c) => {
  const token = c.req.header("Authorization")?.replace("Bearer ", "");
  if (token) await kv.del(`sess:${token}`);
  return c.json({ ok: true });
});

// ── Generic CRUD ──────────────────────────────────────────────────────────────

const COLLECTIONS = ["umkm", "wisata", "artikel", "galeri"];

for (const col of COLLECTIONS) {
  const key = `col:${col}`;

  app.get(`${P}/${col}`, async (c) => {
    return c.json((await kv.get(key)) ?? []);
  });

  app.post(`${P}/${col}`, auth, async (c) => {
    const items: any[] = (await kv.get(key)) ?? [];
    const item = {
      ...(await c.req.json()),
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    items.push(item);
    await kv.set(key, items);
    return c.json(item, 201);
  });

  app.put(`${P}/${col}/:id`, auth, async (c) => {
    const id = c.req.param("id");
    const items: any[] = (await kv.get(key)) ?? [];
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1) return c.json({ error: "Tidak ditemukan" }, 404);
    items[idx] = { ...items[idx], ...(await c.req.json()), id };
    await kv.set(key, items);
    return c.json(items[idx]);
  });

  app.delete(`${P}/${col}/:id`, auth, async (c) => {
    const id = c.req.param("id");
    const items: any[] = (await kv.get(key)) ?? [];
    await kv.set(key, items.filter((i) => i.id !== id));
    return c.json({ ok: true });
  });
}

// ── Change password ───────────────────────────────────────────────────────────

app.put(`${P}/settings/password`, auth, async (c) => {
  const { newPassword } = await c.req.json();
  if (!newPassword || newPassword.length < 6)
    return c.json({ error: "Password minimal 6 karakter" }, 400);
  await kv.set("admin:pw", newPassword);
  return c.json({ ok: true });
});

// ── Seed (only if collection empty) ──────────────────────────────────────────

app.post(`${P}/seed`, auth, async (c) => {
  const { collection, data } = await c.req.json();
  if (!COLLECTIONS.includes(collection))
    return c.json({ error: "Koleksi tidak valid" }, 400);
  const key = `col:${collection}`;
  const existing: any[] = (await kv.get(key)) ?? [];
  if (existing.length > 0)
    return c.json({ ok: false, msg: "Data sudah ada" });
  const seeded = data.map((d: any) => ({
    ...d,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }));
  await kv.set(key, seeded);
  return c.json({ ok: true, count: seeded.length });
});

Deno.serve(app.fetch);
