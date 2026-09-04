import { useState, useEffect, useRef } from "react"

// ─── Data ──────────────────────────────────────────────────────────────────

interface UMKMProduct {
  name: string
  desc: string
  imgs: string[]
  tag: string
  varian?: string[]
  ukuran?: string[]
  harga?: string[]
  keunggulan: string[]
  simpan: string
  stok: string
  kontak?: { label: string; wa: string }[]
}

const UMKM_PRODUCTS: UMKMProduct[] = [
  {
    name: "Peyek Sedaya",
    desc: "Camilan tradisional khas Indonesia dari adonan peyek yang renyah dan gurih. Cocok sebagai camilan sehari-hari maupun pelengkap makanan.",
    imgs: [
      "/src/imports/ukuran_besar.png",
      "/src/imports/ukuran_kecil.png",
      "/src/imports/varian_bayam.png",
      "/src/imports/varian_kacang___rebon.png",
      "/src/imports/varian_kacang.png",
    ],
    tag: "Camilan",
    varian: ["Peyek Kacang", "Peyek Rebon", "Peyek Bayam"],
    ukuran: ["100 gram", "250 gram"],
    keunggulan: ["Renyah & gurih", "Bahan pilihan", "Kemasan higienis"],
    simpan: "1–2 bulan",
    stok: "Tersedia",
    kontak: [{ label: "Peyek Sedaya", wa: "6285842120414" }],
  },
  {
    name: "Legondo Bu Tarti",
    desc: "Jajanan tradisional dengan cita rasa manis dan tekstur lembut. Dibuat langsung setelah pesanan diterima agar selalu fresh.",
    imgs: ["/src/imports/legondo.png"],
    tag: "Jajanan",
    ukuran: ["10 pcs / kemasan"],
    keunggulan: [
      "Fresh — made by order",
      "Rasa tradisional autentik",
      "Kemasan besek ramah lingkungan",
    ],
    simpan: "Maks. 3 hari",
    stok: "Pre-order",
    kontak: [{ label: "Bu Tarti", wa: "6281931648517" }],
  },
  {
    name: "Fayyaz Food (Tape)",
    desc: "Fayyaz Food menjual Tape, olahan singkong fermentasi tradisional dengan rasa manis, legit, sedikit asam, tekstur lembut, dan aroma khas fermentasi. Cocok dimakan langsung atau diolah jadi tape goreng, kolak, dessert, dan jajanan tradisional.",
    imgs: [
      "/src/imports/ukuran_besar-1.png",
      "/src/imports/ukuran_kecil-1.png",
      "/src/imports/detail_ukuran_besar.png",
      "/src/imports/detail_ukuran_kecil.png",
    ],
    tag: "Makanan",
    harga: ["Rp 12.000 (± 500–600 gr)", "Rp 18.000 (± 1,2–1,3 kg)"],
    keunggulan: [
      "Rasa manis & legit",
      "Tekstur lembut",
      "Aroma khas fermentasi",
      "Bahan pilihan",
    ],
    simpan: "1–2 hari di kulkas, segera dikonsumsi",
    stok: "Pre-order",
    kontak: [
      { label: "Fayyaz Food", wa: "6285601698596" },
      { label: "Tape Tino Tejo", wa: "6281578715817" },
    ],
  },
  {
    name: "Bolu Tiwul Digtaz",
    desc: "Bolu berbahan dasar tiwul dengan tekstur lembut dan cita rasa khas, cocok sebagai camilan maupun oleh-oleh khas Desa Sanggang.",
    imgs: [
      "/src/imports/pandan_besar.png",
      "/src/imports/pandan_kecil.png",
      "/src/imports/coklat_lumer.png",
      "/src/imports/keju_rainbow.png",
    ],
    tag: "Bakeri",
    varian: ["Original", "Pandan", "Cokelat"],
    harga: [
      "Kecil Ø8 cm — Rp 10.000",
      "18 cm — Rp 20.000",
      "Besar 22×11 cm — Rp 25.000",
      "Bolu Lumer 200 ml — Rp 7.000",
    ],
    keunggulan: [
      "Bahan dasar tiwul asli",
      "Tekstur lembut & khas",
      "Pilihan rasa beragam",
    ],
    simpan: "±2 hari suhu ruang / ±1 minggu di kulkas",
    stok: "Made by order",
    kontak: [{ label: "Bolu Tiwul Digtaz", wa: "62882003774857" }],
  },
  {
    name: "Kacang Sangrai & Getuk Bu Fitri",
    desc: "Dua camilan tradisional khas Bu Fitri: Kacang Sangrai yang renyah gurih dan Getuk Talas dengan cita rasa manis lembut khas pedesaan.",
    imgs: ["/src/imports/kacang.png", "/src/imports/getuk_talas.png"],
    tag: "Jajanan",
    varian: ["Kacang Sangrai", "Getuk Talas"],
    keunggulan: [
      "Camilan tradisional autentik",
      "Bahan lokal pilihan",
      "Rasa gurih & manis",
    ],
    simpan: "2–3 hari",
    stok: "Tersedia",
    kontak: [{ label: "Bu Fitri", wa: "6281617215938" }],
  },
  {
    name: "Sagon",
    desc: "Camilan tradisional khas Desa Sanggang berbahan dasar ketan dan kelapa, dipanggang hingga menghasilkan tekstur renyah dan cita rasa gurih yang khas.",
    imgs: ["/src/imports/sagon.jpg"],
    tag: "Jajanan",
    keunggulan: [
      "Bahan ketan & kelapa pilihan",
      "Dipanggang tradisional",
      "Gurih & renyah",
    ],
    simpan: "1–2 minggu",
    stok: "Tersedia",
    kontak: [
      { label: "Awaliyah", wa: "6285290410475" },
      { label: "Lasiyem", wa: "6281390156834" },
    ],
  },
  {
    name: "Pentol Kuah",
    desc: "Diolah dari bahan-bahan pilihan, disajikan dengan kuah berbumbu gurih. Tekstur pentol kenyal dengan kuah nikmat, cocok sebagai makanan ringan maupun hidangan sehari-hari terutama saat hangat.",
    imgs: ["/src/imports/pentol-kuah.png"],
    tag: "Kuliner",
    keunggulan: ["Pentol kenyal", "Kuah gurih berbumbu", "Nikmat saat hangat"],
    simpan: "Segera dikonsumsi",
    stok: "Tersedia",
    kontak: [{ label: "Hariyadi", wa: "6208157754673" }],
  },
  {
    name: "Getuk Cenil",
    desc: "Jajanan khas Desa Sanggang berbahan dasar singkong, diolah menjadi camilan kenyal dengan rasa singkong yang unik dan autentik.",
    imgs: ["/src/imports/getuk_cenil.jpg"],
    tag: "Jajanan",
    keunggulan: [
      "Bahan singkong lokal",
      "Tekstur kenyal khas",
      "Rasa autentik",
    ],
    simpan: "1–2 hari",
    stok: "Tersedia",
    kontak: [{ label: "Nanik", wa: "6281229241898" }],
  },
  {
    name: "Telur Asin",
    desc: "Berbahan dasar telur bebek pilihan, diolah hingga menghasilkan cita rasa gurih dan asin yang pas. Berkualitas dan higienis.",
    imgs: ["/src/imports/telor_asin.jpg"],
    tag: "Makanan",
    keunggulan: [
      "Telur bebek pilihan",
      "Gurih & asin pas",
      "Higienis & berkualitas",
    ],
    simpan: "1–2 minggu",
    stok: "Tersedia",
    kontak: [
      { label: "Agus", wa: "6287836274403" },
      { label: "Liya", wa: "6282138817563" },
      { label: "Wahyono", wa: "6287824405399" },
    ],
  },
  {
    name: "Jamu Tradisional",
    desc: "Minuman tradisional dari bahan herbal dan rempah pilihan, diolah secara tradisional memanfaatkan tanaman herbal lokal Desa Sanggang untuk kesehatan.",
    imgs: ["/src/imports/jamu.png"],
    tag: "Minuman",
    keunggulan: ["Bahan herbal lokal", "Diolah tradisional", "Menyehatkan"],
    simpan: "1–2 hari",
    stok: "Tersedia",
    kontak: [
      { label: "Sumadi (Bibit)", wa: "6285868125539" },
      { label: "Prihatin", wa: "6282234559054" },
    ],
  },
  {
    name: "Keripik Singkong",
    desc: "Makanan ringan berbahan dasar singkong lokal Desa Sanggang, diolah menjadi keripik renyah dan gurih yang cocok sebagai camilan kapan saja.",
    imgs: ["/src/imports/keripik-singkong.jpeg"],
    tag: "Camilan",
    keunggulan: ["Singkong lokal pilihan", "Renyah & gurih", "Camilan praktis"],
    simpan: "2–4 minggu",
    stok: "Tersedia",
    kontak: [{ label: "Ngatino", wa: "6281931656448" }],
  },
  {
    name: "Bakso",
    desc: "Kuliner favorit khas Sukoharjo, dikenal dengan cita rasa berdaging, gurih, dan kenyal. Selalu disajikan hangat dengan kuah kaldu segar.",
    imgs: ["/src/imports/bakso.jpg"],
    tag: "Kuliner",
    keunggulan: ["Daging sapi pilihan", "Kenyal & gurih", "Disajikan hangat"],
    simpan: "Segera dikonsumsi",
    stok: "Tersedia",
    kontak: [{ label: "Pak Min", wa: "6281226610895" }],
  },
  {
    name: "Soto Sapi",
    desc: "Soto Sapi khas Sukoharjo dengan cita rasa gurih dan segar dari kuah rempah pilihan. Sajian hangat yang mengenyangkan dan menggugah selera.",
    imgs: ["/src/imports/soto.jpg"],
    tag: "Kuliner",
    keunggulan: ["Kuah rempah pilihan", "Gurih & segar", "Daging sapi empuk"],
    simpan: "Segera dikonsumsi",
    stok: "Tersedia",
    kontak: [
      { label: "Parman", wa: "6285643265739" },
      { label: "Sri Peniati", wa: "6281915229810" },
    ],
  },
  {
    name: "Gethuk Crispy",
    desc: "Inovasi olahan pangan lokal Desa Sanggang yang mengolah singkong menjadi camilan renyah dan lezat. Perpaduan tradisi dan kreasi modern.",
    imgs: ["/src/imports/gethuk_crispy.png"],
    tag: "Camilan",
    keunggulan: [
      "Inovasi olahan singkong",
      "Renyah & lezat",
      "Produk lokal kreatif",
    ],
    simpan: "1–2 minggu",
    stok: "Tersedia",
    kontak: [{ label: "Anggit Prasetya", wa: "6285601698596" }],
  },
  {
    name: "Jajanan Pasar",
    desc: "Aneka kudapan tradisional khas Nusantara, mulai dari kue basah seperti risol dan sosis solo. Cocok untuk berbagai acara dan kebutuhan sehari-hari.",
    imgs: ["/src/imports/jajanan-pasar.png"],
    tag: "Jajanan",
    varian: ["Risol", "Sosis Solo"],
    keunggulan: [
      "Aneka pilihan kue basah",
      "Resep tradisional",
      "Cocok untuk berbagai acara",
    ],
    simpan: "1–2 hari",
    stok: "Pre-order",
    kontak: [{ label: "Prisma Rani", wa: "6208192208702" }],
  },
  {
    name: "Arang",
    desc: "Dihasilkan dari kayu keras (mahoni, sonokeling, kasia) dan limbah kayu glondongan, diolah menjadi arang berkualitas dengan daya bakar baik dan tahan lama. Untuk kebutuhan bahan bakar rumah tangga maupun industri kecil.",
    imgs: ["/src/imports/arang.jpg"],
    tag: "Komoditas",
    keunggulan: ["Kayu keras pilihan", "Daya bakar tinggi", "Tahan lama"],
    simpan: "Tahan lama (simpan kering)",
    stok: "Tersedia",
    kontak: [
      { label: "Wagiyo", wa: "6288233262342" },
      { label: "Laseno", wa: "6285701785994" },
      { label: "Cipto Wiyono", wa: "6281390156834" },
      { label: "Sutino", wa: "6281578715817" },
      { label: "Wahyono", wa: "620895329443239" },
    ],
  },
  {
    name: "Mebel",
    desc: "Kerajinan furnitur rumah dengan kualitas terjamin dan desain fungsional. Produk kayu kokoh dan elegan untuk interior rumah, dikerjakan oleh pengrajin lokal berpengalaman.",
    imgs: ["/src/imports/mebel.jpg"],
    tag: "Kerajinan",
    keunggulan: [
      "Kayu berkualitas",
      "Desain fungsional & elegan",
      "Pengrajin lokal berpengalaman",
    ],
    simpan: "Tahan lama",
    stok: "Pre-order",
    kontak: [{ label: "Hubungi Pengrajin", wa: "6283146541621" }],
  },
]

const WISATA: { name: string; desc: string; img: string; maps?: string }[] = [
  {
    name: "Embung Cerme",
    desc: "Waduk mini nan indah di tengah persawahan, spot favorit memancing dan bersantai menikmati senja.",
    img: "/src/imports/embung_cerme.jpeg",
  },
  {
    name: "Greenhouse Melon",
    desc: "Wisata agro modern, petik melon langsung dari lahan greenhouse yang asri dan bersih.",
    img: "/src/imports/melon_bumdes.jpeg",
  },
  {
    name: "Sawah Dukuh Tawing",
    desc: "Kawasan persawahan terasering indah yang menawarkan panorama alam hijau nan asri layaknya suasana pedesaan di Ubud, Bali. Terhampar subur di lereng perbukitan, destinasi ini menyajikan pemandangan sawah bertingkat yang menyejukkan mata sekaligus udara pedesaan yang bersih dan tenang. Pemerintah Kabupaten Sukoharjo kini tengah mengembangkannya menjadi kawasan agrowisata edukatif — pengunjung bisa menikmati keindahan alam, berswafoto, wisata kuliner, serta belajar langsung tentang dunia pertanian.",
    img: "/src/imports/sawah_tawing.jpe",
    maps: "https://maps.app.goo.gl/kAPp5UtNxH9Nm1Xe9",
  },
]

const ARTIKEL = [
  {
    title: "Panen Raya Melon Greenhouse Argaloka Berhasil Capai Target",
    date: "15 Agustus 2026",
    excerpt:
      "Greenhouse melon milik BUMDes Argaloka berhasil mencapai target panen sebesar 2 ton pada musim tanam kedua 2026, melebihi ekspektasi awal tim pertanian.",
    img: "https://images.unsplash.com/photo-1607575981023-661521507e92?w=400&h=250&fit=crop&auto=format",
  },
  {
    title:
      "Pelatihan Digital Marketing UMKM Desa Sanggang Bersama Pemerintah Sukoharjo",
    date: "3 Agustus 2026",
    excerpt:
      "Puluhan pelaku UMKM Desa Sanggang mengikuti pelatihan digital marketing yang diselenggarakan bersama Dinas Koperasi dan UMKM Kabupaten Sukoharjo.",
    img: "https://images.unsplash.com/photo-1616140799124-8d582de4bbb2?w=400&h=250&fit=crop&auto=format",
  },
  {
    title: "Argaloka Tourism Resmi Diluncurkan, Wisatawan Mulai Berdatangan",
    date: "20 Juli 2026",
    excerpt:
      "Unit usaha wisata terbaru BUMDes Argaloka resmi diluncurkan, menawarkan paket wisata alam dan agrowisata yang menarik bagi keluarga.",
    img: "https://images.unsplash.com/photo-1786882546676-835df9107c1d?w=400&h=250&fit=crop&auto=format",
  },
]

const GALERI = [
  "/src/imports/WhatsApp_Image_2026-09-03_at_6.11.50_PM.jpeg",
  "/src/imports/WhatsApp_Image_2026-09-03_at_6.11.50_PM__1_.jpeg",
  "/src/imports/WhatsApp_Image_2026-09-03_at_6.11.50_PM__2_.jpeg",
  "/src/imports/WhatsApp_Image_2026-09-03_at_6.11.50_PM__3_.jpeg",
  "/src/imports/WhatsApp_Image_2026-09-03_at_6.12.58_PM.jpeg",
  "/src/imports/WhatsApp_Image_2026-09-03_at_6.12.58_PM__1_.jpeg",
  "/src/imports/WhatsApp_Image_2026-09-03_at_6.12.59_PM.jpeg",
  "/src/imports/WhatsApp_Image_2026-09-03_at_6.12.59_PM__1_.jpeg",
  "/src/imports/WhatsApp_Image_2026-09-03_at_6.12.59_PM__2_.jpeg",
]

const PRODUK_HUKUM: { no: string; title: string; tahun: string; file: string }[] =
  [
    {
      no: "01",
      title:
        "Peraturan Desa Sanggang Nomor 8 Tahun 2021 tentang Pendirian Badan Usaha Milik Desa Argaloka Sanggang",
      tahun: "2021",
      file: "/src/imports/perdes_bumdesa_2021.pdf",
    },
    {
      no: "02",
      title:
        "Keputusan Kepala Desa Sanggang Nomor 412.3/14 Tahun 2025 tentang Pengangkatan Direktur dan Dewan Pengawas BUMDes Argaloka Masa Bakti 2025–2030",
      tahun: "2025",
      file: "/src/imports/sk_kades_pengurus___panwas_bumdes_2025.pdf",
    },
    {
      no: "03",
      title:
        "Keputusan Kepala Desa Sanggang Nomor 412.3/21 Tahun 2025 tentang Pembentukan Pengurus Harian dan Dewan Pengawas Badan Usaha Milik Desa Argaloka Sanggang",
      tahun: "2025",
      file: "/src/imports/sk_bumdes.pdf",
    },
    {
      no: "04",
      title:
        "Standar Operasional Prosedur (SOP) Pengelolaan dan Perawatan Molen BUMDes Argaloka",
      tahun: "2026",
      file: "/src/imports/buku_sop_pengelolaan_dan_perawatan_molen.pdf",
    },
  ]

// ─── Components ────────────────────────────────────────────────────────────

function Logo() {
  return (
    <img
      src="/src/imports/logo_bumdes.jpeg"
      alt="BUMDes Argaloka Desa Sanggang"
      style={{ height: "44px", width: "auto", objectFit: "contain" }}
    />
  )
}

function Navbar({ activeSection }: { activeSection: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileOpen(false)
    setDropdownOpen(false)
  }

  const navLinkClass = (section: string) =>
    `text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
      activeSection === section
        ? "text-[#2d5a1b]"
        : "text-[#1e3d10] hover:text-[#2d5a1b]"
    }`

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(247,243,235,0.85)"
          : "rgba(247,243,235,0.6)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled
          ? "1px solid rgba(107,158,94,0.2)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 24px rgba(45,90,27,0.08)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <button onClick={() => scrollTo("hero")} className="flex-shrink-0">
            <Logo />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <button
              onClick={() => scrollTo("hero")}
              className={navLinkClass("hero")}
            >
              Beranda
            </button>

            {/* Tentang Kami Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-1 ${navLinkClass("tentang")}`}
              >
                Tentang Kami
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className={`transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {dropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-48 rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(247,243,235,0.97)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(107,158,94,0.25)",
                    boxShadow: "0 12px 40px rgba(45,90,27,0.12)",
                  }}
                >
                  <button
                    onClick={() => scrollTo("ketahanan")}
                    className="w-full text-left px-4 py-3 text-sm font-semibold text-[#1e3d10] hover:bg-[#6b9e5e]/10 hover:text-[#2d5a1b] transition-colors border-b border-[#6b9e5e]/10"
                  >
                    Ketahanan Pangan
                  </button>
                  <button
                    onClick={() => scrollTo("produk-hukum")}
                    className="w-full text-left px-4 py-3 text-sm font-semibold text-[#1e3d10] hover:bg-[#6b9e5e]/10 hover:text-[#2d5a1b] transition-colors"
                  >
                    Produk Hukum
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollTo("umkm")}
              className={navLinkClass("umkm")}
            >
              UMKM
            </button>
            <button
              onClick={() => scrollTo("wisata")}
              className={navLinkClass("wisata")}
            >
              Wisata
            </button>
            <button
              onClick={() => scrollTo("artikel")}
              className={navLinkClass("artikel")}
            >
              Artikel
            </button>
            <button
              onClick={() => scrollTo("galeri")}
              className={navLinkClass("galeri")}
            >
              Galeri
            </button>
            <button
              onClick={() => scrollTo("kontak")}
              className={navLinkClass("kontak")}
            >
              Kontak
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-[#2d5a1b]/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1e3d10"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="8" x2="21" y2="8" />
                  <line x1="3" y1="16" x2="21" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t border-[#6b9e5e]/20"
          style={{
            background: "rgba(247,243,235,0.97)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="px-4 py-3 flex flex-col gap-1">
            {[
              { label: "Beranda", id: "hero" },
              { label: "Tentang Kami", id: "tentang" },
              { label: "Ketahanan Pangan", id: "ketahanan", indent: true },
              { label: "Produk Hukum", id: "produk-hukum", indent: true },
              { label: "UMKM", id: "umkm" },
              { label: "Wisata", id: "wisata" },
              { label: "Artikel", id: "artikel" },
              { label: "Galeri", id: "galeri" },
              { label: "Kontak", id: "kontak" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left py-2.5 px-3 rounded-xl text-sm font-semibold transition-colors ${
                  (item as { indent?: boolean }).indent
                    ? "ml-4 text-[#7a5c3e]"
                    : "text-[#1e3d10]"
                } hover:bg-[#2d5a1b]/10 hover:text-[#2d5a1b]`}
              >
                {(item as { indent?: boolean }).indent && "↳ "}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Full-bleed background image */}
      <div
        className="absolute inset-0 bg-[#1a3a0e]"
        style={{
          backgroundImage: `url(/src/imports/duren.jpeg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(30,61,16,0.78) 0%, rgba(30,61,16,0.55) 50%, rgba(122,92,62,0.45) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-8 max-w-4xl mx-auto animate-fadeInUp">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
          style={{
            background: "rgba(107,158,94,0.35)",
            border: "1px solid rgba(168,201,156,0.5)",
            color: "#a8c99c",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#a8c99c] inline-block" />
          Kecamatan Bulu · Kabupaten Sukoharjo
        </div>

        <h1
          className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          style={{
            fontFamily: "Lora, serif",
            color: "#faf8f3",
            textShadow: "0 2px 20px rgba(0,0,0,0.3)",
          }}
        >
          Selamat Datang,{" "}
          <span style={{ color: "#a8c99c" }}>BUMDes Argaloka</span>
        </h1>
        <p
          className="text-lg sm:text-xl font-medium mb-3"
          style={{
            color: "#f7f3eb",
            fontFamily: "Lora, serif",
            fontStyle: "italic",
            textShadow: "0 1px 8px rgba(0,0,0,0.2)",
          }}
        >
          Membangun Desa Sanggang Mandiri &amp; Sejahtera
        </p>
        <p
          className="text-sm sm:text-base mb-10 max-w-2xl mx-auto"
          style={{ color: "rgba(247,243,235,0.8)" }}
        >
          Badan Usaha Milik Desa yang mengelola potensi lokal — dari agrowisata
          durian, melon greenhouse, UMKM unggulan, hingga wisata alam Sendang
          yang autentik.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() =>
              document
                .getElementById("umkm")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "#2d5a1b",
              color: "#f7f3eb",
              boxShadow: "0 4px 20px rgba(45,90,27,0.4)",
            }}
          >
            Lihat Produk UMKM
          </button>
          <button
            onClick={() =>
              document
                .getElementById("kontak")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3.5 rounded-full text-sm font-bold border-2 transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              borderColor: "rgba(247,243,235,0.6)",
              color: "#f7f3eb",
              background: "rgba(247,243,235,0.1)",
              backdropFilter: "blur(8px)",
            }}
          >
            Lihat Lokasi
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span
          className="text-[10px] tracking-widest uppercase"
          style={{ color: "#a8c99c" }}
        >
          Gulir ke bawah
        </span>
        <div className="w-5 h-8 rounded-full border border-[#a8c99c] flex items-start justify-center pt-1.5">
          <div
            className="w-1 h-2 rounded-full bg-[#a8c99c]"
            style={{ animation: "fadeInUp 1.5s ease infinite" }}
          />
        </div>
      </div>
    </section>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="h-px w-8 block" style={{ background: "#6b9e5e" }} />
      <span
        className="text-xs font-bold uppercase tracking-widest"
        style={{ color: "#6b9e5e" }}
      >
        {children}
      </span>
    </div>
  )
}

// ─── Org Chart (SVG-based for precise connector lines) ──────────────────────

function OrgChart() {
  const W = 880
  const H = 460

  // Node dimensions
  const NW = 130 // normal box width
  const NH = 56 // normal box height
  const MW = 155 // manager box width
  const MH = 72 // manager box height (taller for longer text)
  const LC = "#3a6e28" // line color

  // Node center-x and top-y
  const n = {
    penasehat: { cx: 440, y: 4, w: NW, h: NH },
    dewan: { cx: 200, y: 104, w: NW, h: NH },
    direktur: { cx: 640, y: 104, w: NW, h: NH },
    anggota1: { cx: 130, y: 240, w: NW, h: NH },
    anggota2: { cx: 270, y: 240, w: NW, h: NH },
    sekretaris: { cx: 570, y: 240, w: NW, h: NH },
    bendahara: { cx: 710, y: 240, w: NW, h: NH },
    mgr1: { cx: 88, y: 376, w: MW, h: MH },
    mgr2: { cx: 310, y: 376, w: MW, h: MH },
    mgr3: { cx: 532, y: 376, w: MW, h: MH },
    mgr4: { cx: 754, y: 376, w: MW, h: MH },
  }

  // helpers
  const bot = (k: keyof typeof n) => n[k].y + n[k].h
  const cx = (k: keyof typeof n) => n[k].cx

  return (
    <div style={{ overflowX: "auto", paddingBottom: "4px" }}>
      <div style={{ position: "relative", width: `${W}px`, height: `${H}px` }}>
        {/* ── SVG connector lines ── */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{
            position: "absolute",
            inset: 0,
            width: W,
            height: H,
            overflow: "visible",
          }}
        >
          <g stroke={LC} strokeWidth="1.8" fill="none">
            {/* Penasehat → Dewan & Direktur */}
            <line
              x1={cx("penasehat")}
              y1={bot("penasehat")}
              x2={cx("penasehat")}
              y2={92}
            />
            <line x1={cx("dewan")} y1={92} x2={cx("direktur")} y2={92} />
            <line x1={cx("dewan")} y1={92} x2={cx("dewan")} y2={n.dewan.y} />
            <line
              x1={cx("direktur")}
              y1={92}
              x2={cx("direktur")}
              y2={n.direktur.y}
            />

            {/* Dewan → Anggota 1 & 2 */}
            <line
              x1={cx("dewan")}
              y1={bot("dewan")}
              x2={cx("dewan")}
              y2={228}
            />
            <line x1={cx("anggota1")} y1={228} x2={cx("anggota2")} y2={228} />
            <line
              x1={cx("anggota1")}
              y1={228}
              x2={cx("anggota1")}
              y2={n.anggota1.y}
            />
            <line
              x1={cx("anggota2")}
              y1={228}
              x2={cx("anggota2")}
              y2={n.anggota2.y}
            />

            {/* Direktur → Sekretaris & Bendahara */}
            <line
              x1={cx("direktur")}
              y1={bot("direktur")}
              x2={cx("direktur")}
              y2={228}
            />
            <line
              x1={cx("sekretaris")}
              y1={228}
              x2={cx("bendahara")}
              y2={228}
            />
            <line
              x1={cx("sekretaris")}
              y1={228}
              x2={cx("sekretaris")}
              y2={n.sekretaris.y}
            />
            <line
              x1={cx("bendahara")}
              y1={228}
              x2={cx("bendahara")}
              y2={n.bendahara.y}
            />

            {/* Center of Sek/Ben → 4 Managers */}
            <line x1={640} y1={bot("sekretaris")} x2={640} y2={364} />
            <line x1={cx("mgr1")} y1={364} x2={cx("mgr4")} y2={364} />
            <line x1={cx("mgr1")} y1={364} x2={cx("mgr1")} y2={n.mgr1.y} />
            <line x1={cx("mgr2")} y1={364} x2={cx("mgr2")} y2={n.mgr2.y} />
            <line x1={cx("mgr3")} y1={364} x2={cx("mgr3")} y2={n.mgr3.y} />
            <line x1={cx("mgr4")} y1={364} x2={cx("mgr4")} y2={n.mgr4.y} />
          </g>
        </svg>

        {/* ── Node boxes (absolutely positioned) ── */}
        {([
          {
            key: "penasehat",
            role: "PENASEHAT",
            name: "Ex Officio Kepala Desa Sanggang",
          },
          { key: "dewan", role: "DEWAN PENGAWAS", name: "Janu Hari Setiawan" },
          { key: "direktur", role: "DIREKTUR", name: "Arif Tri Yulianto" },
          { key: "anggota1", role: "ANGGOTA", name: "Kanthi Rahayu" },
          { key: "anggota2", role: "ANGGOTA", name: "Indah Nuranti" },
          { key: "sekretaris", role: "SEKRETARIS", name: "Afifah Umi Fatimah" },
          { key: "bendahara", role: "BENDAHARA", name: "Lailatul Muthoharoh" },
          {
            key: "mgr1",
            role: "MANAGER ARGALOKA NIAGA",
            name: "Didik Rahmadhani",
          },
          { key: "mgr2", role: "MANAGER ARGALOKA FARM", name: "Nardi" },
          {
            key: "mgr3",
            role: "MANAGER UNIT ARGALOKA WISATA",
            name: "Putri Listianingsih",
          },
          {
            key: "mgr4",
            role: "MANAGER UNIT ARGALOKA CAFE & RESTO",
            name: "Dwi Agustina",
          },
        ] as { key: keyof typeof n; role: string; name: string }[]).map(
          ({ key, role, name }) => {
            const { cx: ncx, y, w, h } = n[key]
            return (
              <div
                key={key}
                style={{
                  position: "absolute",
                  left: ncx - w / 2,
                  top: y,
                  width: w,
                  height: h,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1.5px solid #2d5a1b",
                }}
              >
                {/* Role header */}
                <div
                  style={{
                    background: "#2d5a1b",
                    color: "#f7f3eb",
                    fontSize: "8.5px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    textAlign: "center",
                    padding: "4px 6px",
                    lineHeight: 1.3,
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Nunito, sans-serif",
                  }}
                >
                  {role}
                </div>
                {/* Name row */}
                <div
                  style={{
                    background: "#fff",
                    color: "#1e3d10",
                    fontSize: "8.5px",
                    fontWeight: 600,
                    textAlign: "center",
                    padding: "4px 6px",
                    lineHeight: 1.3,
                    fontFamily: "Nunito, sans-serif",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {name}
                </div>
              </div>
            )
          },
        )}
      </div>
    </div>
  )
}

function TentangSection() {
  const units = [
    {
      icon: "🛒",
      name: "Argaloka Niaga",
      desc: "Unit perdagangan produk desa dan kebutuhan warga.",
    },
    {
      icon: "🌿",
      name: "Argaloka Farm",
      desc: "Pertanian modern: greenhouse melon, kebun durian, dan omah semai.",
    },
    {
      icon: "☕",
      name: "Argaloka Cafe & Resto",
      desc: "Kuliner khas desa dengan suasana pedesaan yang hangat.",
    },
    {
      icon: "🏞️",
      name: "Argaloka Tourism",
      desc: "Wisata alam dan agrowisata: embung, sendang, dan kebun.",
    },
  ]

  return (
    <section
      id="tentang"
      className="py-20 lg:py-28"
      style={{ background: "#f7f3eb" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <SectionLabel>Tentang Kami</SectionLabel>
            <h2
              className="text-3xl lg:text-4xl font-bold mb-6"
              style={{ color: "#1e3d10", fontFamily: "Lora, serif" }}
            >
              Mengelola Potensi Desa
              <br />
              untuk Kesejahteraan Bersama
            </h2>
            <p
              className="text-base leading-relaxed mb-4"
              style={{ color: "#5a4535" }}
            >
              BUMDes Argaloka adalah Badan Usaha Milik Desa Sanggang, Kecamatan
              Bulu, Kabupaten Sukoharjo, yang didirikan untuk memaksimalkan
              potensi lokal demi meningkatkan kesejahteraan masyarakat desa.
            </p>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "#5a4535" }}
            >
              Dengan semangat gotong royong dan inovasi, Argaloka mengelola
              berbagai unit usaha — dari pertanian modern, perdagangan produk
              desa, kuliner autentik, hingga destinasi wisata alam yang menawan.
            </p>

            <div
              className="rounded-2xl p-6 mb-8"
              style={{
                background: "#ede7d9",
                border: "1px solid rgba(107,158,94,0.2)",
              }}
            >
              <h3
                className="font-bold text-base mb-3"
                style={{ color: "#1e3d10", fontFamily: "Lora, serif" }}
              >
                Visi
              </h3>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "#5a4535" }}
              >
                "Menjadi lembaga ekonomi desa yang profesional, mandiri, dan
                inovatif dalam mengelola potensi lokal untuk meningkatkan
                kesejahteraan masyarakat Desa Sanggang."
              </p>
              <h3
                className="font-bold text-base mb-2"
                style={{ color: "#1e3d10", fontFamily: "Lora, serif" }}
              >
                Misi
              </h3>
              <ul className="text-sm space-y-1.5" style={{ color: "#5a4535" }}>
                {[
                  "Mengelola dan mengembangkan unit-unit usaha desa yang potensial dan berkelanjutan, seperti layanan fotokopi, BRI Link, serta sektor ekonomi lainnya yang mendukung kebutuhan masyarakat",
                  "Mendorong pemberdayaan ekonomi masyarakat melalui kemitraan dan pelatihan usaha mikro, kecil, dan menengah (UMKM) yang berbasis pada potensi lokal Desa Sanggang",
                  "Meningkatkan Pendapatan Asli Desa (PADes) melalui pengelolaan usaha secara transparan, profesional, dan akuntabel",
                  "Mendukung digitalisasi dan inovasi layanan desa, khususnya dalam bidang jasa keuangan dan informasi, untuk mempercepat pelayanan kepada masyarakat",
                  "Menjadi motor penggerak pengembangan potensi wisata dan sumber daya alam desa secara berkelanjutan dan ramah lingkungan",
                ].map((m) => (
                  <li key={m} className="flex items-start gap-2">
                    <span
                      className="mt-1 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
                      style={{ background: "#6b9e5e", color: "#fff" }}
                    >
                      ✓
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right */}
          <div>
            <h3
              className="font-bold text-xl mb-5"
              style={{ color: "#1e3d10", fontFamily: "Lora, serif" }}
            >
              Unit Usaha
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {units.map((u) => (
                <div
                  key={u.name}
                  className="rounded-2xl p-5 transition-shadow hover:shadow-md"
                  style={{
                    background: "#fff",
                    border: "1px solid rgba(107,158,94,0.15)",
                  }}
                >
                  <div className="text-2xl mb-2">{u.icon}</div>
                  <div
                    className="font-bold text-sm mb-1"
                    style={{ color: "#1e3d10", fontFamily: "Lora, serif" }}
                  >
                    {u.name}
                  </div>
                  <div
                    className="text-xs leading-relaxed"
                    style={{ color: "#7a5c3e" }}
                  >
                    {u.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Struktur Organisasi — full width below the grid */}
        <div className="mt-16">
          <h3
            className="font-bold text-xl mb-6 text-center"
            style={{ color: "#1e3d10", fontFamily: "Lora, serif" }}
          >
            Struktur Organisasi
          </h3>
          <div
            className="rounded-3xl p-6 sm:p-8"
            style={{
              background: "#ede7d9",
              border: "1px solid rgba(107,158,94,0.2)",
            }}
          >
            <OrgChart />
          </div>
        </div>
      </div>
    </section>
  )
}

function UMKMCard({ p }: { p: UMKMProduct }) {
  const [imgIdx, setImgIdx] = useState(0)

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-1"
      style={{
        background: "rgba(247,243,235,0.06)",
        border: "1px solid rgba(107,158,94,0.2)",
      }}
    >
      {/* Image gallery */}
      <div
        className="relative overflow-hidden bg-[#2d5a1b]"
        style={{ height: "200px" }}
      >
        <img
          src={p.imgs[imgIdx]}
          alt={p.name}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(30,61,16,0.55) 0%, transparent 55%)",
          }}
        />
        {/* Tag */}
        <span
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide"
          style={{ background: "rgba(107,158,94,0.9)", color: "#fff" }}
        >
          {p.tag}
        </span>
        {/* Stok badge */}
        <span
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold"
          style={{
            background:
              p.stok === "Tersedia"
                ? "rgba(45,90,27,0.9)"
                : "rgba(122,92,62,0.9)",
            color: "#f7f3eb",
          }}
        >
          {p.stok}
        </span>
        {/* Thumbnail dots / nav */}
        {p.imgs.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {p.imgs.map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === imgIdx ? "18px" : "6px",
                  height: "6px",
                  background:
                    i === imgIdx ? "#a8c99c" : "rgba(247,243,235,0.5)",
                }}
              />
            ))}
          </div>
        )}
        {/* Prev/Next arrows for multi-image */}
        {p.imgs.length > 1 && (
          <>
            <button
              onClick={() =>
                setImgIdx((imgIdx - 1 + p.imgs.length) % p.imgs.length)
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center transition-opacity"
              style={{
                background: "rgba(30,61,16,0.6)",
                color: "#f7f3eb",
                opacity: imgIdx === 0 ? 0.35 : 1,
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => setImgIdx((imgIdx + 1) % p.imgs.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center transition-opacity"
              style={{
                background: "rgba(30,61,16,0.6)",
                color: "#f7f3eb",
                opacity: imgIdx === p.imgs.length - 1 ? 0.35 : 1,
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <h3
            className="font-bold text-sm mb-1"
            style={{ color: "#f7f3eb", fontFamily: "Lora, serif" }}
          >
            {p.name}
          </h3>
          <p
            className="text-xs leading-relaxed"
            style={{ color: "rgba(247,243,235,0.6)" }}
          >
            {p.desc}
          </p>
        </div>

        {/* Varian */}
        {p.varian && p.varian.length > 0 && (
          <div>
            <div
              className="text-[10px] font-bold uppercase tracking-wide mb-1.5"
              style={{ color: "#6b9e5e" }}
            >
              Varian
            </div>
            <div className="flex flex-wrap gap-1.5">
              {p.varian.map((v) => (
                <span
                  key={v}
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{
                    background: "rgba(107,158,94,0.2)",
                    color: "#a8c99c",
                    border: "1px solid rgba(107,158,94,0.3)",
                  }}
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Ukuran */}
        {p.ukuran && p.ukuran.length > 0 && (
          <div>
            <div
              className="text-[10px] font-bold uppercase tracking-wide mb-1.5"
              style={{ color: "#6b9e5e" }}
            >
              Ukuran
            </div>
            <div className="flex flex-wrap gap-1.5">
              {p.ukuran.map((u) => (
                <span
                  key={u}
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{
                    background: "rgba(107,158,94,0.15)",
                    color: "#a8c99c",
                    border: "1px solid rgba(107,158,94,0.25)",
                  }}
                >
                  {u}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Harga */}
        {p.harga && p.harga.length > 0 && (
          <div>
            <div
              className="text-[10px] font-bold uppercase tracking-wide mb-1.5"
              style={{ color: "#6b9e5e" }}
            >
              Harga
            </div>
            <ul className="space-y-0.5">
              {p.harga.map((h) => (
                <li
                  key={h}
                  className="text-[10px]"
                  style={{ color: "rgba(247,243,235,0.7)" }}
                >
                  • {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Keunggulan */}
        <div className="flex flex-wrap gap-1.5">
          {p.keunggulan.map((k) => (
            <span
              key={k}
              className="flex items-center gap-1 text-[10px]"
              style={{ color: "rgba(247,243,235,0.55)" }}
            >
              <span style={{ color: "#6b9e5e" }}>✓</span> {k}
            </span>
          ))}
        </div>

        {/* Masa simpan */}
        <div
          className="flex items-center gap-1.5 text-[10px]"
          style={{ color: "rgba(247,243,235,0.45)" }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Masa simpan: {p.simpan}
        </div>

        {/* Kontak & CTA */}
        <div className="mt-auto pt-1 flex flex-col gap-2">
          {p.kontak && p.kontak.length > 0 ? (
            p.kontak.map((k) => (
              <a
                key={k.wa}
                href={`https://wa.me/${k.wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold transition-opacity hover:opacity-75"
                style={{ color: "#6b9e5e" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Hubungi {k.label}
              </a>
            ))
          ) : (
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold transition-opacity hover:opacity-75"
              style={{ color: "#6b9e5e" }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Pesan via WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function UMKMSection() {
  const [filter, setFilter] = useState("Semua")
  const tags = [
    "Semua",
    "Camilan",
    "Jajanan",
    "Bakeri",
    "Makanan",
    "Kuliner",
    "Minuman",
    "Komoditas",
    "Kerajinan",
  ]
  const filtered =
    filter === "Semua"
      ? UMKM_PRODUCTS
      : UMKM_PRODUCTS.filter((p) => p.tag === filter)

  return (
    <section
      id="umkm"
      className="py-20 lg:py-28"
      style={{ background: "#1e3d10" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span
              className="h-px w-8 block"
              style={{ background: "#6b9e5e" }}
            />
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#6b9e5e" }}
            >
              UMKM Desa
            </span>
            <span
              className="h-px w-8 block"
              style={{ background: "#6b9e5e" }}
            />
          </div>
          <h2
            className="text-3xl lg:text-4xl font-bold mb-4"
            style={{ color: "#f7f3eb", fontFamily: "Lora, serif" }}
          >
            Produk Unggulan Warga Sanggang
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "rgba(247,243,235,0.7)" }}
          >
            Berbagai produk UMKM berkualitas dari tangan-tangan terampil warga
            Desa Sanggang. Pesan langsung via WhatsApp!
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className="px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200"
              style={{
                background: filter === t ? "#6b9e5e" : "rgba(107,158,94,0.15)",
                color: filter === t ? "#fff" : "rgba(247,243,235,0.7)",
                border: `1px solid ${
                  filter === t ? "#6b9e5e" : "rgba(107,158,94,0.3)"
                }`,
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <UMKMCard key={p.name} p={p} />
          ))}
        </div>

        {/* Alur Pemesanan */}
        <div
          className="mt-14 rounded-2xl p-6 sm:p-8"
          style={{
            background: "rgba(107,158,94,0.1)",
            border: "1px solid rgba(107,158,94,0.25)",
          }}
        >
          <div className="text-center mb-6">
            <div
              className="text-xs font-bold uppercase tracking-widest mb-1"
              style={{ color: "#6b9e5e" }}
            >
              Cara Memesan
            </div>
            <h3
              className="font-bold text-lg"
              style={{ color: "#f7f3eb", fontFamily: "Lora, serif" }}
            >
              Alur Pemesanan UMKM
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                step: "1",
                label: "Pilih Produk",
                desc: "Tentukan varian & jumlah yang diinginkan",
              },
              {
                step: "2",
                label: "Hubungi Penjual",
                desc: "Pesan lewat website atau kontak langsung",
              },
              {
                step: "3",
                label: "Konfirmasi Bayar",
                desc: "Konfirmasi pembayaran sesuai kesepakatan",
              },
              {
                step: "4",
                label: "Produk Dikirim",
                desc: "Produk diproses & dikirimkan ke Anda",
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div
                  className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-sm"
                  style={{
                    background: "#6b9e5e",
                    color: "#fff",
                    fontFamily: "Lora, serif",
                  }}
                >
                  {s.step}
                </div>
                <div
                  className="font-bold text-xs mb-1"
                  style={{ color: "#f7f3eb" }}
                >
                  {s.label}
                </div>
                <div
                  className="text-[10px] leading-relaxed"
                  style={{ color: "rgba(247,243,235,0.55)" }}
                >
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function WisataSection() {
  return (
    <section
      id="wisata"
      className="py-20 lg:py-28"
      style={{ background: "#f7f3eb" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <SectionLabel>Wisata Alam</SectionLabel>
          <h2
            className="text-3xl lg:text-4xl font-bold mb-4"
            style={{ color: "#1e3d10", fontFamily: "Lora, serif" }}
          >
            Destinasi Indah di Desa Sanggang
          </h2>
          <p className="text-base max-w-xl" style={{ color: "#7a5c3e" }}>
            Jelajahi keindahan alam dan ketenangan Desa Sanggang — dari embung,
            sendang bersejarah, hingga agrowisata modern.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WISATA.map((w, i) => (
            <div
              key={w.name}
              className={`rounded-3xl overflow-hidden group cursor-pointer transition-shadow hover:shadow-xl ${
                i === 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
              style={{ border: "1px solid rgba(107,158,94,0.15)" }}
            >
              <div className="relative h-56 lg:h-64 bg-[#2d5a1b] overflow-hidden">
                <img
                  src={w.img}
                  alt={w.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(30,61,16,0.75) 0%, transparent 55%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3
                    className="font-bold text-lg text-white"
                    style={{ fontFamily: "Lora, serif" }}
                  >
                    {w.name}
                  </h3>
                </div>
              </div>
              <div className="p-5" style={{ background: "#fff" }}>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#7a5c3e" }}
                >
                  {w.desc}
                </p>
                <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
                  <div
                    className="flex items-center gap-1.5 text-xs font-bold"
                    style={{ color: "#2d5a1b" }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    Desa Sanggang, Sukoharjo
                  </div>
                  {w.maps && (
                    <a
                      href={w.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-bold rounded-full px-3 py-1.5 transition-colors hover:opacity-80"
                      style={{
                        background: "#e8f5e2",
                        color: "#2d5a1b",
                        textDecoration: "none",
                      }}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      Lihat di Maps
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function KetahananSection() {
  return (
    <section
      id="ketahanan"
      className="py-20 lg:py-28"
      style={{ background: "#ede7d9" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionLabel>Tentang Kami · Ketahanan Pangan</SectionLabel>
          <h2
            className="text-3xl lg:text-4xl font-bold mb-4"
            style={{ color: "#1e3d10", fontFamily: "Lora, serif" }}
          >
            Program Ketahanan Pangan
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "#7a5c3e" }}
          >
            BUMDes Argaloka berkomitmen membangun ketahanan pangan desa melalui
            program pembibitan dan budidaya yang berkelanjutan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              name: "Omah Semai",
              icon: "🌱",
              desc: "Rumah pembibitan tanaman pangan dan hortikultura. Menyediakan bibit berkualitas untuk petani Desa Sanggang dan sekitarnya, mendukung kemandirian pangan lokal.",
              img: "https://images.unsplash.com/photo-1607575981023-661521507e92?w=600&h=350&fit=crop&auto=format",
              features: [
                "Pembibitan sayuran organik",
                "Distribusi bibit gratis ke warga",
                "Pelatihan teknik semai modern",
              ],
            },
            {
              name: "Omah Jamur",
              icon: "🍄",
              desc: "Pusat budidaya jamur tiram dan jamur merang secara intensif. Produksi jamur segar berkualitas tinggi untuk kebutuhan pasar lokal dan regional.",
              img: "/src/imports/omah-jamur-landscape.png",
              features: [
                "Budidaya jamur tiram & merang",
                "Produksi baglog mandiri",
                "Pelatihan warga & kelompok tani",
              ],
            },
          ].map((p) => (
            <div
              key={p.name}
              className="rounded-3xl overflow-hidden"
              style={{
                background: "#fff",
                border: "1px solid rgba(107,158,94,0.2)",
                boxShadow: "0 4px 24px rgba(45,90,27,0.06)",
              }}
            >
              <div className="relative h-48 bg-[#2d5a1b] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(30,61,16,0.6) 0%, transparent 60%)",
                  }}
                />
                <div className="absolute top-4 left-4 text-3xl">{p.icon}</div>
              </div>
              <div className="p-6">
                <h3
                  className="font-bold text-xl mb-3"
                  style={{ color: "#1e3d10", fontFamily: "Lora, serif" }}
                >
                  {p.name}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "#7a5c3e" }}
                >
                  {p.desc}
                </p>
                <ul className="space-y-2">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "#5a4535" }}
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0"
                        style={{ background: "#6b9e5e", color: "#fff" }}
                      >
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ArtikelSection() {
  return (
    <section
      id="artikel"
      className="py-20 lg:py-28"
      style={{ background: "#1e3d10" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span
                className="h-px w-8 block"
                style={{ background: "#6b9e5e" }}
              />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#6b9e5e" }}
              >
                Artikel & Berita
              </span>
            </div>
            <h2
              className="text-3xl lg:text-4xl font-bold"
              style={{ color: "#f7f3eb", fontFamily: "Lora, serif" }}
            >
              Berita & Kegiatan Terbaru
            </h2>
          </div>
          <button
            className="hidden sm:flex items-center gap-2 text-sm font-bold hover:opacity-70 transition-opacity"
            style={{ color: "#6b9e5e" }}
          >
            Semua Artikel
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTIKEL.map((a) => (
            <article
              key={a.title}
              className="rounded-2xl overflow-hidden group cursor-pointer"
              style={{
                background: "rgba(247,243,235,0.07)",
                border: "1px solid rgba(107,158,94,0.2)",
              }}
            >
              <div className="h-48 bg-[#2d5a1b] overflow-hidden relative">
                <img
                  src={a.img}
                  alt={a.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(30,61,16,0.5) 0%, transparent 60%)",
                  }}
                />
              </div>
              <div className="p-5">
                <div
                  className="text-xs mb-3 font-medium"
                  style={{ color: "#6b9e5e" }}
                >
                  {a.date}
                </div>
                <h3
                  className="font-bold text-sm leading-snug mb-3 line-clamp-2"
                  style={{ color: "#f7f3eb", fontFamily: "Lora, serif" }}
                >
                  {a.title}
                </h3>
                <p
                  className="text-xs leading-relaxed mb-4 line-clamp-3"
                  style={{ color: "rgba(247,243,235,0.6)" }}
                >
                  {a.excerpt}
                </p>
                <button
                  className="flex items-center gap-1.5 text-xs font-bold hover:opacity-70 transition-opacity"
                  style={{ color: "#6b9e5e" }}
                >
                  Baca Selengkapnya
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function GaleriSection() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <section
      id="galeri"
      className="py-20 lg:py-28"
      style={{ background: "#f7f3eb" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionLabel>Galeri Foto</SectionLabel>
          <h2
            className="text-3xl lg:text-4xl font-bold"
            style={{ color: "#1e3d10", fontFamily: "Lora, serif" }}
          >
            Momen & Kegiatan Desa
          </h2>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {GALERI.map((img, i) => (
            <div
              key={i}
              className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setSelected(img)}
              style={{ border: "1px solid rgba(107,158,94,0.15)" }}
            >
              <img
                src={img}
                alt={`Galeri ${i + 1}`}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ height: i % 3 === 0 ? "220px" : "160px" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(30,61,16,0.92)",
            backdropFilter: "blur(12px)",
          }}
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(247,243,235,0.2)" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <img
            src={selected.replace("w=500&h=400", "w=1200&h=800")}
            alt=""
            className="max-w-full max-h-[85vh] rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}

function ProdukHukumSection() {
  return (
    <section
      id="produk-hukum"
      className="py-20 lg:py-28"
      style={{ background: "#ede7d9" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <SectionLabel>Tentang Kami · Produk Hukum</SectionLabel>
          <h2
            className="text-3xl lg:text-4xl font-bold mb-4"
            style={{ color: "#1e3d10", fontFamily: "Lora, serif" }}
          >
            Produk Hukum BUMDes Argaloka
          </h2>
          <p className="text-base" style={{ color: "#7a5c3e" }}>
            Dokumen legal dan peraturan yang mendasari operasional BUMDes
            Argaloka secara resmi dan transparan.
          </p>
        </div>

        <div className="space-y-3">
          {PRODUK_HUKUM.map((doc) => (
            <a
              key={doc.no}
              href={doc.file}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl p-5 flex items-center gap-5 group transition-shadow hover:shadow-md"
              style={{
                background: "#fff",
                border: "1px solid rgba(107,158,94,0.2)",
                display: "flex",
                textDecoration: "none",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm"
                style={{
                  background: "#2d5a1b",
                  color: "#f7f3eb",
                  fontFamily: "Lora, serif",
                }}
              >
                {doc.no}
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="font-semibold text-sm"
                  style={{ color: "#1e3d10" }}
                >
                  {doc.title}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "#7a5c3e" }}>
                  Tahun {doc.tahun} · Klik untuk buka dokumen
                </div>
              </div>
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors group-hover:bg-[#2d5a1b]/10"
                style={{ color: "#6b9e5e" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function KontakSection() {
  const [form, setForm] = useState({ nama: "", email: "", pesan: "" })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ nama: "", email: "", pesan: "" })
  }

  return (
    <section
      id="kontak"
      className="py-20 lg:py-28"
      style={{ background: "#1e3d10" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Info */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span
                className="h-px w-8 block"
                style={{ background: "#6b9e5e" }}
              />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#6b9e5e" }}
              >
                Kontak
              </span>
            </div>
            <h2
              className="text-3xl lg:text-4xl font-bold mb-6"
              style={{ color: "#f7f3eb", fontFamily: "Lora, serif" }}
            >
              Hubungi Kami
            </h2>
            <p
              className="text-base mb-10"
              style={{ color: "rgba(247,243,235,0.7)" }}
            >
              Kami siap membantu Anda. Kunjungi kantor kami, atau sampaikan
              pesan melalui form di bawah ini.
            </p>

            <div className="space-y-5 mb-8">
              {[
                {
                  icon: "📍",
                  label: "Alamat",
                  val: "Desa Sanggang, Kecamatan Bulu, Kabupaten Sukoharjo, Jawa Tengah 57561",
                },
                { icon: "📞", label: "Telepon", val: "+62 812-3456-7890" },
                {
                  icon: "📧",
                  label: "Email",
                  val: "bumdesargalokasanggang@gmail.com",
                },
                {
                  icon: "🕐",
                  label: "Jam Operasional",
                  val: "Senin–Jumat: 08.00–16.00 WIB",
                },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: "rgba(107,158,94,0.2)" }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <div
                      className="text-xs font-bold mb-0.5 uppercase tracking-wide"
                      style={{ color: "#6b9e5e" }}
                    >
                      {c.label}
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: "rgba(247,243,235,0.85)" }}
                    >
                      {c.val}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                {
                  name: "Instagram",
                  href: "#",
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  ),
                },
                {
                  name: "TikTok",
                  href: "#",
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.2 8.2 0 004.79 1.53V6.77a4.85 4.85 0 01-1.02-.08z" />
                    </svg>
                  ),
                },
                {
                  name: "WhatsApp",
                  href: "https://wa.me/6281234567890",
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  style={{
                    background: "rgba(107,158,94,0.2)",
                    color: "#6b9e5e",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Embedded map placeholder */}
            <div
              className="mt-8 rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(107,158,94,0.3)",
                height: "200px",
                background: "rgba(107,158,94,0.1)",
              }}
            >
              <iframe
                src="https://maps.google.com/maps?q=-7.790273,110.8057267&z=17&output=embed"
                width="100%"
                height="200"
                style={{
                  border: 0,
                  filter:
                    "grayscale(30%) invert(5%) sepia(10%) saturate(120%) hue-rotate(80deg)",
                }}
                allowFullScreen={false}
                loading="lazy"
                title="Peta Lokasi Desa Sanggang"
              />
            </div>
          </div>

          {/* Right Form */}
          <div
            className="rounded-3xl p-8"
            style={{
              background: "rgba(247,243,235,0.07)",
              border: "1px solid rgba(107,158,94,0.25)",
            }}
          >
            <h3
              className="font-bold text-xl mb-6"
              style={{ color: "#f7f3eb", fontFamily: "Lora, serif" }}
            >
              Kirim Pesan
            </h3>
            {sent ? (
              <div
                className="rounded-2xl p-6 text-center"
                style={{
                  background: "rgba(107,158,94,0.2)",
                  border: "1px solid rgba(107,158,94,0.4)",
                }}
              >
                <div className="text-3xl mb-3">✅</div>
                <div
                  className="font-bold text-base"
                  style={{ color: "#f7f3eb" }}
                >
                  Pesan Terkirim!
                </div>
                <div
                  className="text-sm mt-1"
                  style={{ color: "rgba(247,243,235,0.7)" }}
                >
                  Kami akan menghubungi Anda segera.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  {
                    key: "nama",
                    label: "Nama Lengkap",
                    type: "text",
                    placeholder: "Masukkan nama Anda",
                  },
                  {
                    key: "email",
                    label: "Email",
                    type: "email",
                    placeholder: "nama@email.com",
                  },
                ].map((f) => (
                  <div key={f.key}>
                    <label
                      className="block text-xs font-bold mb-1.5 uppercase tracking-wide"
                      style={{ color: "#6b9e5e" }}
                    >
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      value={form[(f.key as keyof typeof form)]}
                      onChange={(e) =>
                        setForm({ ...form, [f.key]: e.target.value })
                      }
                      placeholder={f.placeholder}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: "rgba(247,243,235,0.08)",
                        border: "1px solid rgba(107,158,94,0.3)",
                        color: "#f7f3eb",
                        caretColor: "#6b9e5e",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#6b9e5e"
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(107,158,94,0.2)"
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(107,158,94,0.3)"
                        e.target.style.boxShadow = "none"
                      }}
                    />
                  </div>
                ))}
                <div>
                  <label
                    className="block text-xs font-bold mb-1.5 uppercase tracking-wide"
                    style={{ color: "#6b9e5e" }}
                  >
                    Pesan
                  </label>
                  <textarea
                    value={form.pesan}
                    onChange={(e) =>
                      setForm({ ...form, pesan: e.target.value })
                    }
                    placeholder="Tuliskan pesan, pertanyaan, atau keperluan Anda..."
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                    style={{
                      background: "rgba(247,243,235,0.08)",
                      border: "1px solid rgba(107,158,94,0.3)",
                      color: "#f7f3eb",
                      caretColor: "#6b9e5e",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#6b9e5e"
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(107,158,94,0.2)"
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(107,158,94,0.3)"
                      e.target.style.boxShadow = "none"
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                  style={{ background: "#2d5a1b", color: "#f7f3eb" }}
                >
                  Kirim Pesan
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer
      className="py-10"
      style={{
        background: "#141f0d",
        borderTop: "1px solid rgba(107,158,94,0.15)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo />
          <div className="text-center md:text-right">
            <p className="text-xs" style={{ color: "rgba(247,243,235,0.5)" }}>
              © 2026 BUMDes Argaloka, Desa Sanggang. Hak cipta dilindungi.
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "rgba(247,243,235,0.35)" }}
            >
              Kecamatan Bulu, Kabupaten Sukoharjo, Jawa Tengah
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/6281234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95"
      style={{
        background: "#25d366",
        boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
      }}
      title="Chat WhatsApp Desa Sanggang"
    >
      {/* Pulse ring */}
      <span
        className="absolute inset-0 rounded-full"
        style={{
          animation: "pulse-ring 2s ease-out infinite",
          background: "#25d366",
          opacity: 0.5,
          transform: "scale(1)",
        }}
      />
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  )
}

// ─── Main App ──────────────────────────────────────────────────────────────

function MainSite() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const sections = [
      "hero",
      "tentang",
      "umkm",
      "wisata",
      "artikel",
      "galeri",
      "kontak",
      "ketahanan",
      "produk-hukum",
    ]
    const observers = sections.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.3 },
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  return (
    <div className="min-h-screen" style={{ background: "#faf8f3" }}>
      <Navbar activeSection={activeSection} />
      <HeroSection />
      <TentangSection />
      <UMKMSection />

      {/* Eduwisata banner */}
      <section className="py-12 lg:py-16" style={{ background: "#ede7d9" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <img
            src="/src/imports/Salinan_Tambahkan_subjudul.png"
            alt="Paket Wisata Eduwisata Desa Sanggang"
            className="w-full rounded-3xl shadow-xl"
            style={{ border: "1px solid rgba(107,158,94,0.2)" }}
          />
        </div>
      </section>

      <WisataSection />
      <KetahananSection />
      <ArtikelSection />
      <GaleriSection />
      <ProdukHukumSection />
      <KontakSection />
      <Footer />
      <WhatsAppFAB />
    </div>
  )
}

export default function App() {
  return <MainSite />
}
