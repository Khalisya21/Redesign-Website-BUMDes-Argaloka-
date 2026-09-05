import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { api } from "../lib/api"
import {
  DEFAULT_UMKM_PRODUCTS,
  DEFAULT_WISATA,
  DEFAULT_ARTIKEL,
  DEFAULT_GALERI,
  type UMKMProduct,
  type Wisata,
  type Artikel,
  type GaleriItem,
} from "../data/content"

interface ContentValue {
  umkm: UMKMProduct[]
  wisata: Wisata[]
  artikel: Artikel[]
  galeri: GaleriItem[]
  loading: boolean
  /** Re-fetch everything from the backend (used by the admin page after edits). */
  refresh: () => void
}

const ContentContext = createContext<ContentValue>({
  umkm: DEFAULT_UMKM_PRODUCTS,
  wisata: DEFAULT_WISATA,
  artikel: DEFAULT_ARTIKEL,
  galeri: DEFAULT_GALERI.map((url) => ({ url })),
  loading: false,
  refresh: () => {},
})

export function useContent() {
  return useContext(ContentContext)
}

/**
 * Loads each collection from the Supabase backend. If a collection is empty
 * (nothing has been added in /admin yet) or the request fails — e.g. the
 * edge function isn't reachable — the site falls back to the built-in
 * default content, so the public pages never end up blank.
 */
export function ContentProvider({ children }: { children: ReactNode }) {
  const [umkm, setUmkm] = useState<UMKMProduct[]>(DEFAULT_UMKM_PRODUCTS)
  const [wisata, setWisata] = useState<Wisata[]>(DEFAULT_WISATA)
  const [artikel, setArtikel] = useState<Artikel[]>(DEFAULT_ARTIKEL)
  const [galeri, setGaleri] = useState<GaleriItem[]>(
    DEFAULT_GALERI.map((url) => ({ url })),
  )
  const [loading, setLoading] = useState(true)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      const [umkmRes, wisataRes, artikelRes, galeriRes] = await Promise.all([
        api.list<UMKMProduct>("umkm").catch(() => null),
        api.list<Wisata>("wisata").catch(() => null),
        api.list<Artikel>("artikel").catch(() => null),
        api.list<GaleriItem>("galeri").catch(() => null),
      ])
      if (cancelled) return
      if (umkmRes && umkmRes.length > 0) setUmkm(umkmRes)
      if (wisataRes && wisataRes.length > 0) setWisata(wisataRes)
      if (artikelRes && artikelRes.length > 0) setArtikel(artikelRes)
      if (galeriRes && galeriRes.length > 0) setGaleri(galeriRes)
      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [tick])

  return (
    <ContentContext.Provider
      value={{
        umkm,
        wisata,
        artikel,
        galeri,
        loading,
        refresh: () => setTick((t) => t + 1),
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}
