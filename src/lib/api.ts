import { projectId, publicAnonKey } from "../../utils/supabase/info"

// Base URL of the Figma Make / Supabase edge function that powers this site's
// admin backend (auth + generic CRUD for umkm, wisata, artikel, galeri).
const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-b527bb3a`

export type CollectionName = "umkm" | "wisata" | "artikel" | "galeri"

const ADMIN_TOKEN_KEY = "argaloka_admin_token"

export function getAdminToken(): string | null {
  try {
    return localStorage.getItem(ADMIN_TOKEN_KEY)
  } catch {
    return null
  }
}

export function setAdminToken(token: string | null) {
  try {
    if (token) localStorage.setItem(ADMIN_TOKEN_KEY, token)
    else localStorage.removeItem(ADMIN_TOKEN_KEY)
  } catch {
    // ignore (e.g. private browsing without storage access)
  }
}

class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function request(path: string, options: RequestInit = {}) {
  const token = getAdminToken()
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    // Supabase's gateway requires a valid JWT in Authorization for every
    // request that reaches an edge function — the publicAnonKey satisfies
    // that. This is the header that's most often missing when people say
    // the app "won't connect" to Supabase.
    Authorization: `Bearer ${publicAnonKey}`,
    ...(options.headers as Record<string, string>),
  }
  // Our own admin session token (issued by /auth/login) travels separately
  // so it never collides with the Supabase-level Authorization header above.
  if (token) headers["X-Admin-Token"] = token

  let res: Response
  try {
    res = await fetch(`${BASE_URL}${path}`, { ...options, headers })
  } catch (err) {
    throw new ApiError(
      "Tidak bisa menghubungi server (periksa koneksi internet atau apakah edge function sudah di-deploy).",
      0,
    )
  }

  if (!res.ok) {
    let message = `Permintaan gagal (${res.status})`
    try {
      const body = await res.json()
      if (body?.error) message = body.error
    } catch {
      // response wasn't JSON — keep the generic message
    }
    throw new ApiError(message, res.status)
  }

  if (res.status === 204) return null
  return res.json()
}

export const api = {
  health: () => request("/health"),

  list: <T = any>(collection: CollectionName): Promise<T[]> =>
    request(`/${collection}`),

  create: <T = any>(collection: CollectionName, data: any): Promise<T> =>
    request(`/${collection}`, { method: "POST", body: JSON.stringify(data) }),

  update: <T = any>(
    collection: CollectionName,
    id: string,
    data: any,
  ): Promise<T> =>
    request(`/${collection}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  remove: (collection: CollectionName, id: string) =>
    request(`/${collection}/${id}`, { method: "DELETE" }),

  seed: (collection: CollectionName, data: any[]) =>
    request(`/seed`, {
      method: "POST",
      body: JSON.stringify({ collection, data }),
    }),

  login: async (password: string): Promise<string> => {
    const { token } = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    })
    setAdminToken(token)
    return token
  },

  logout: async () => {
    try {
      await request("/auth/logout", { method: "POST" })
    } finally {
      setAdminToken(null)
    }
  },

  changePassword: (newPassword: string) =>
    request("/settings/password", {
      method: "PUT",
      body: JSON.stringify({ newPassword }),
    }),
}

export { ApiError }
