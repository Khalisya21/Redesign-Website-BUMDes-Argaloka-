import { useEffect, useMemo, useState } from "react"
import { api, ApiError, getAdminToken, setAdminToken } from "../lib/api"
import {
  DEFAULT_UMKM_PRODUCTS,
  DEFAULT_WISATA,
  DEFAULT_ARTIKEL,
  DEFAULT_GALERI,
} from "../data/content"
import type { CollectionName } from "../lib/api"

// ─── Field schema per collection ────────────────────────────────────────────
// "lines"  -> textarea, one array item per non-empty line
// "kontak" -> textarea, one "Label|62812xxxx" per line -> [{label, wa}]

type FieldType = "text" | "textarea" | "lines" | "kontak"

interface FieldConfig {
  key: string
  label: string
  type: FieldType
  placeholder?: string
  help?: string
}

const SCHEMAS: Record<CollectionName, FieldConfig[]> = {
  umkm: [
    { key: "name", label: "Nama produk", type: "text" },
    { key: "tag", label: "Kategori", type: "text", placeholder: "Camilan, Makanan, Kerajinan, ..." },
    { key: "desc", label: "Deskripsi", type: "textarea" },
    {
      key: "imgs",
      label: "Gambar (URL, satu per baris)",
      type: "lines",
      help: "Bisa pakai link gambar dari internet, misalnya https://...",
    },
    { key: "varian", label: "Varian (satu per baris, opsional)", type: "lines" },
    { key: "ukuran", label: "Ukuran (satu per baris, opsional)", type: "lines" },
    { key: "harga", label: "Harga (satu per baris, opsional)", type: "lines" },
    { key: "keunggulan", label: "Keunggulan (satu per baris)", type: "lines" },
    { key: "simpan", label: "Daya simpan", type: "text" },
    { key: "stok", label: "Status stok", type: "text", placeholder: "Tersedia / Pre-order" },
    {
      key: "kontak",
      label: "Kontak WhatsApp (Label|nomor, satu per baris)",
      type: "kontak",
      placeholder: "Bu Tarti|6281931648517",
    },
  ],
  wisata: [
    { key: "name", label: "Nama tempat", type: "text" },
    { key: "desc", label: "Deskripsi", type: "textarea" },
    { key: "img", label: "URL gambar", type: "text" },
    { key: "maps", label: "Link Google Maps (opsional)", type: "text" },
  ],
  artikel: [
    { key: "title", label: "Judul", type: "text" },
    { key: "date", label: "Tanggal", type: "text", placeholder: "15 Agustus 2026" },
    { key: "excerpt", label: "Ringkasan", type: "textarea" },
    { key: "img", label: "URL gambar", type: "text" },
  ],
  galeri: [
    { key: "url", label: "URL gambar", type: "text" },
    { key: "caption", label: "Keterangan (opsional)", type: "text" },
  ],
}

const TABS: { key: CollectionName; label: string }[] = [
  { key: "umkm", label: "UMKM" },
  { key: "wisata", label: "Wisata" },
  { key: "artikel", label: "Artikel" },
  { key: "galeri", label: "Galeri" },
]

const DEFAULTS: Record<CollectionName, any[]> = {
  umkm: DEFAULT_UMKM_PRODUCTS,
  wisata: DEFAULT_WISATA,
  artikel: DEFAULT_ARTIKEL,
  galeri: DEFAULT_GALERI.map((url) => ({ url })),
}

function titleOf(collection: CollectionName, item: any): string {
  return item.name || item.title || item.caption || item.url || "(tanpa judul)"
}

// ─── Form helpers ────────────────────────────────────────────────────────────

function itemToFormState(fields: FieldConfig[], item: any | null): Record<string, string> {
  const out: Record<string, string> = {}
  for (const f of fields) {
    const val = item?.[f.key]
    if (f.type === "lines") {
      out[f.key] = Array.isArray(val) ? val.join("\n") : ""
    } else if (f.type === "kontak") {
      out[f.key] = Array.isArray(val)
        ? val.map((k: any) => `${k.label}|${k.wa}`).join("\n")
        : ""
    } else {
      out[f.key] = val ?? ""
    }
  }
  return out
}

function formStateToPayload(fields: FieldConfig[], form: Record<string, string>) {
  const payload: Record<string, any> = {}
  for (const f of fields) {
    const raw = form[f.key] ?? ""
    if (f.type === "lines") {
      payload[f.key] = raw
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
    } else if (f.type === "kontak") {
      payload[f.key] = raw
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((line) => {
          const [label, wa] = line.split("|").map((s) => s.trim())
          return { label: label || "Kontak", wa: wa || "" }
        })
    } else {
      payload[f.key] = raw.trim()
    }
  }
  return payload
}

// ─── Login screen ────────────────────────────────────────────────────────────

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError("")
    try {
      await api.login(password)
      onSuccess()
    } catch (err) {
      const msg =
        err instanceof ApiError
          ? err.status === 0
            ? "Tidak bisa menghubungi server. Backend Supabase mungkin belum ter-deploy — lihat catatan di bawah."
            : err.message
          : "Terjadi kesalahan tak terduga."
      setError(msg)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#1e3d10" }}
    >
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl p-8"
        style={{ background: "#f7f3eb" }}
      >
        <h1
          className="text-2xl font-bold mb-1"
          style={{ color: "#1e3d10", fontFamily: "Lora, serif" }}
        >
          Admin BUMDes Argaloka
        </h1>
        <p className="text-sm mb-6" style={{ color: "#7a5c3e" }}>
          Masuk untuk mengelola isi website.
        </p>

        <label className="block text-xs font-bold mb-2" style={{ color: "#1e3d10" }}>
          Kata sandi
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg px-3 py-2 mb-4 border outline-none"
          style={{ borderColor: "rgba(107,158,94,0.4)" }}
          autoFocus
        />

        {error && (
          <p className="text-xs mb-4" style={{ color: "#b3432b" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg py-2.5 font-bold text-sm disabled:opacity-60"
          style={{ background: "#1e3d10", color: "#f7f3eb" }}
        >
          {busy ? "Memeriksa..." : "Masuk"}
        </button>

        <p className="text-[11px] mt-5 leading-relaxed" style={{ color: "#9a8a70" }}>
          Kata sandi bawaan: <code>argaloka2024</code>. Ganti lewat menu
          "Ganti Kata Sandi" setelah masuk. Jika muncul pesan "tidak bisa
          menghubungi server", edge function Supabase (
          <code>make-server-b527bb3a</code>) belum ter-deploy atau env
          <code> SUPABASE_URL</code>/<code>SUPABASE_SERVICE_ROLE_KEY</code>{" "}
          belum diisi di project Supabase-nya.
        </p>
      </form>
    </div>
  )
}

// ─── Item form modal ─────────────────────────────────────────────────────────

function ItemFormModal({
  collection,
  item,
  onClose,
  onSaved,
}: {
  collection: CollectionName
  item: any | null
  onClose: () => void
  onSaved: () => void
}) {
  const fields = SCHEMAS[collection]
  const [form, setForm] = useState(() => itemToFormState(fields, item))
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError("")
    try {
      const payload = formStateToPayload(fields, form)
      if (item?.id) {
        await api.update(collection, item.id, payload)
      } else {
        await api.create(collection, payload)
      }
      onSaved()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Gagal menyimpan data.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ background: "rgba(30,61,16,0.6)" }}
      onClick={onClose}
    >
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl p-6 my-8"
        style={{ background: "#f7f3eb" }}
      >
        <h2
          className="text-lg font-bold mb-4"
          style={{ color: "#1e3d10", fontFamily: "Lora, serif" }}
        >
          {item ? "Edit" : "Tambah"} {TABS.find((t) => t.key === collection)?.label}
        </h2>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-bold mb-1" style={{ color: "#1e3d10" }}>
                {f.label}
              </label>
              {f.type === "textarea" || f.type === "lines" || f.type === "kontak" ? (
                <textarea
                  rows={f.type === "textarea" ? 3 : 4}
                  value={form[f.key] ?? ""}
                  placeholder={f.placeholder}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full rounded-lg px-3 py-2 border outline-none text-sm"
                  style={{ borderColor: "rgba(107,158,94,0.4)" }}
                />
              ) : (
                <input
                  type="text"
                  value={form[f.key] ?? ""}
                  placeholder={f.placeholder}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full rounded-lg px-3 py-2 border outline-none text-sm"
                  style={{ borderColor: "rgba(107,158,94,0.4)" }}
                />
              )}
              {f.help && (
                <p className="text-[11px] mt-1" style={{ color: "#9a8a70" }}>
                  {f.help}
                </p>
              )}
            </div>
          ))}
        </div>

        {error && (
          <p className="text-xs mt-4" style={{ color: "#b3432b" }}>
            {error}
          </p>
        )}

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg py-2.5 font-bold text-sm border"
            style={{ borderColor: "#1e3d10", color: "#1e3d10" }}
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={busy}
            className="flex-1 rounded-lg py-2.5 font-bold text-sm disabled:opacity-60"
            style={{ background: "#1e3d10", color: "#f7f3eb" }}
          >
            {busy ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  )
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<CollectionName>("umkm")
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [editing, setEditing] = useState<any | null | "new">(null)
  const [pwOpen, setPwOpen] = useState(false)

  const load = useMemo(
    () => async (collection: CollectionName) => {
      setLoading(true)
      setError("")
      try {
        const data = await api.list(collection)
        setItems(data)
      } catch (err) {
        setError(err instanceof ApiError ? err.message : "Gagal memuat data.")
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  useEffect(() => {
    load(tab)
  }, [tab, load])

  async function handleDelete(item: any) {
    if (!confirm(`Hapus "${titleOf(tab, item)}"?`)) return
    try {
      await api.remove(tab, item.id)
      load(tab)
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Gagal menghapus.")
    }
  }

  async function handleSeed() {
    try {
      const res = await api.seed(tab, DEFAULTS[tab])
      if (res.ok === false) alert(res.msg || "Data sudah ada, tidak diisi ulang.")
      load(tab)
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Gagal mengisi data awal.")
    }
  }

  return (
    <div className="min-h-screen" style={{ background: "#faf8f3" }}>
      <header
        className="sticky top-0 z-30 px-4 sm:px-6 py-4 flex items-center justify-between"
        style={{ background: "#1e3d10" }}
      >
        <div>
          <h1 className="font-bold" style={{ color: "#f7f3eb", fontFamily: "Lora, serif" }}>
            Admin BUMDes Argaloka
          </h1>
          <a href="/" className="text-xs hover:underline" style={{ color: "#6b9e5e" }}>
            ← Lihat situs
          </a>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPwOpen(true)}
            className="text-xs font-bold hover:underline"
            style={{ color: "#6b9e5e" }}
          >
            Ganti Kata Sandi
          </button>
          <button
            onClick={onLogout}
            className="text-xs font-bold px-3 py-1.5 rounded-lg"
            style={{ background: "rgba(247,243,235,0.15)", color: "#f7f3eb" }}
          >
            Keluar
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-2 mb-6 flex-wrap">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="px-4 py-2 rounded-full text-sm font-bold transition-colors"
              style={
                tab === t.key
                  ? { background: "#1e3d10", color: "#f7f3eb" }
                  : { background: "#ede7d9", color: "#1e3d10" }
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm" style={{ color: "#7a5c3e" }}>
            {loading ? "Memuat..." : `${items.length} item`}
          </p>
          <div className="flex gap-2">
            {!loading && items.length === 0 && (
              <button
                onClick={handleSeed}
                className="text-xs font-bold px-3 py-2 rounded-lg border"
                style={{ borderColor: "#1e3d10", color: "#1e3d10" }}
              >
                Isi data awal (dari situs saat ini)
              </button>
            )}
            <button
              onClick={() => setEditing("new")}
              className="text-xs font-bold px-3 py-2 rounded-lg"
              style={{ background: "#1e3d10", color: "#f7f3eb" }}
            >
              + Tambah
            </button>
          </div>
        </div>

        {error && (
          <p className="text-sm mb-4" style={{ color: "#b3432b" }}>
            {error}
          </p>
        )}

        <div className="grid gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 rounded-xl p-4"
              style={{ background: "#fff", border: "1px solid rgba(107,158,94,0.2)" }}
            >
              <div className="min-w-0">
                <p className="font-bold text-sm truncate" style={{ color: "#1e3d10" }}>
                  {titleOf(tab, item)}
                </p>
                {item.tag && (
                  <p className="text-xs" style={{ color: "#7a5c3e" }}>
                    {item.tag}
                  </p>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setEditing(item)}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg border"
                  style={{ borderColor: "#1e3d10", color: "#1e3d10" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg"
                  style={{ background: "#b3432b", color: "#fff" }}
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editing && (
        <ItemFormModal
          collection={tab}
          item={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null)
            load(tab)
          }}
        />
      )}

      {pwOpen && <ChangePasswordModal onClose={() => setPwOpen(false)} />}
    </div>
  )
}

function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const [value, setValue] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError("")
    try {
      await api.changePassword(value)
      setDone(true)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Gagal mengganti kata sandi.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(30,61,16,0.6)" }}
      onClick={onClose}
    >
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl p-6"
        style={{ background: "#f7f3eb" }}
      >
        <h2 className="text-lg font-bold mb-4" style={{ color: "#1e3d10", fontFamily: "Lora, serif" }}>
          Ganti Kata Sandi
        </h2>
        {done ? (
          <p className="text-sm" style={{ color: "#1e3d10" }}>
            Kata sandi berhasil diganti.
          </p>
        ) : (
          <>
            <input
              type="password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Kata sandi baru (min. 6 karakter)"
              className="w-full rounded-lg px-3 py-2 mb-3 border outline-none text-sm"
              style={{ borderColor: "rgba(107,158,94,0.4)" }}
              autoFocus
            />
            {error && (
              <p className="text-xs mb-3" style={{ color: "#b3432b" }}>
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-lg py-2.5 font-bold text-sm disabled:opacity-60"
              style={{ background: "#1e3d10", color: "#f7f3eb" }}
            >
              {busy ? "Menyimpan..." : "Simpan"}
            </button>
          </>
        )}
        <button
          type="button"
          onClick={onClose}
          className="w-full text-xs mt-3 hover:underline"
          style={{ color: "#7a5c3e" }}
        >
          Tutup
        </button>
      </form>
    </div>
  )
}

// ─── Root ────────────────────────────────────────────────────────────────────

export default function AdminApp() {
  const [authed, setAuthed] = useState<boolean>(() => !!getAdminToken())

  function logout() {
    api.logout().finally(() => setAuthed(false))
  }

  if (!authed) return <LoginScreen onSuccess={() => setAuthed(true)} />
  return <Dashboard onLogout={logout} />
}
