// ─── Konten Default Situs ───────────────────────────────────────────────────
// Data ini dipakai sebagai isi awal/cadangan. Setelah admin login dan mengedit
// konten lewat halaman /admin, data yang tersimpan di Supabase (lewat backend
// edge function) akan menggantikan data di bawah ini secara otomatis.
// Lihat src/context/ContentContext.tsx untuk logika penggabungannya.


// ─── Data ──────────────────────────────────────────────────────────────────

export interface UMKMProduct {
  id?: string
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

export const DEFAULT_UMKM_PRODUCTS: UMKMProduct[] = [
  {
    name: "Peyek Sedaya",
    desc: "Camilan tradisional khas Indonesia dari adonan peyek yang renyah dan gurih. Cocok sebagai camilan sehari-hari maupun pelengkap makanan.",
    imgs: [
      "/images/ukuran_besar.png",
      "/images/ukuran_kecil.png",
      "/images/varian_bayam.png",
      "/images/varian_kacang___rebon.png",
      "/images/varian_kacang.png",
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
    imgs: ["/images/legondo.png"],
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
      "/images/ukuran_besar-1.png",
      "/images/ukuran_kecil-1.png",
      "/images/detail_ukuran_besar.png",
      "/images/detail_ukuran_kecil.png",
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
      "/images/pandan_besar.png",
      "/images/pandan_kecil.png",
      "/images/coklat_lumer.png",
      "/images/keju_rainbow.png",
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
    imgs: ["/images/kacang.png", "/images/getuk_talas.png"],
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
    imgs: ["/images/sagon.jpg"],
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
    imgs: ["/images/pentol-kuah.png"],
    tag: "Kuliner",
    keunggulan: ["Pentol kenyal", "Kuah gurih berbumbu", "Nikmat saat hangat"],
    simpan: "Segera dikonsumsi",
    stok: "Tersedia",
    kontak: [{ label: "Hariyadi", wa: "6208157754673" }],
  },
  {
    name: "Getuk Cenil",
    desc: "Jajanan khas Desa Sanggang berbahan dasar singkong, diolah menjadi camilan kenyal dengan rasa singkong yang unik dan autentik.",
    imgs: ["/images/getuk_cenil.jpg"],
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
    imgs: ["/images/telor_asin.jpg"],
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
    imgs: ["/images/jamu.png"],
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
    imgs: ["/images/keripik-singkong.jpeg"],
    tag: "Camilan",
    keunggulan: ["Singkong lokal pilihan", "Renyah & gurih", "Camilan praktis"],
    simpan: "2–4 minggu",
    stok: "Tersedia",
    kontak: [{ label: "Ngatino", wa: "6281931656448" }],
  },
  {
    name: "Bakso",
    desc: "Kuliner favorit khas Sukoharjo, dikenal dengan cita rasa berdaging, gurih, dan kenyal. Selalu disajikan hangat dengan kuah kaldu segar.",
    imgs: ["/images/bakso.jpg"],
    tag: "Kuliner",
    keunggulan: ["Daging sapi pilihan", "Kenyal & gurih", "Disajikan hangat"],
    simpan: "Segera dikonsumsi",
    stok: "Tersedia",
    kontak: [{ label: "Pak Min", wa: "6281226610895" }],
  },
  {
    name: "Soto Sapi",
    desc: "Soto Sapi khas Sukoharjo dengan cita rasa gurih dan segar dari kuah rempah pilihan. Sajian hangat yang mengenyangkan dan menggugah selera.",
    imgs: ["/images/soto.jpg"],
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
    imgs: ["/images/gethuk_crispy.png"],
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
    imgs: ["/images/jajanan-pasar.png"],
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
    imgs: ["/images/arang.jpg"],
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
    imgs: ["/images/mebel.jpg"],
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

export interface Wisata {
  id?: string
  name: string
  desc: string
  img: string
  maps?: string
}

export const DEFAULT_WISATA: Wisata[] = [
  {
    name: "Embung Cerme",
    desc: "Waduk mini nan indah di tengah persawahan, spot favorit memancing dan bersantai menikmati senja.",
    img: "/images/embung_cerme.jpeg",
  },
  {
    name: "Greenhouse Melon",
    desc: "Wisata agro modern, petik melon langsung dari lahan greenhouse yang asri dan bersih.",
    img: "/images/melon_bumdes.jpeg",
  },
  {
    name: "Sawah Dukuh Tawing",
    desc: "Kawasan persawahan terasering indah yang menawarkan panorama alam hijau nan asri layaknya suasana pedesaan di Ubud, Bali. Terhampar subur di lereng perbukitan, destinasi ini menyajikan pemandangan sawah bertingkat yang menyejukkan mata sekaligus udara pedesaan yang bersih dan tenang. Pemerintah Kabupaten Sukoharjo kini tengah mengembangkannya menjadi kawasan agrowisata edukatif — pengunjung bisa menikmati keindahan alam, berswafoto, wisata kuliner, serta belajar langsung tentang dunia pertanian.",
    img: "/images/sawah_tawing.jpeg",
    maps: "https://maps.app.goo.gl/kAPp5UtNxH9Nm1Xe9",
  },
]

export interface Artikel {
  id?: string
  title: string
  date: string
  excerpt: string
  img: string
}

export const DEFAULT_ARTIKEL: Artikel[] = [
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

export const DEFAULT_GALERI: string[] = [
  "/images/WhatsApp_Image_2026-09-03_at_6.11.50_PM.jpeg",
  "/images/WhatsApp_Image_2026-09-03_at_6.11.50_PM__1_.jpeg",
  "/images/WhatsApp_Image_2026-09-03_at_6.11.50_PM__2_.jpeg",
  "/images/WhatsApp_Image_2026-09-03_at_6.11.50_PM__3_.jpeg",
  "/images/WhatsApp_Image_2026-09-03_at_6.12.58_PM.jpeg",
  "/images/WhatsApp_Image_2026-09-03_at_6.12.58_PM__1_.jpeg",
  "/images/WhatsApp_Image_2026-09-03_at_6.12.59_PM.jpeg",
  "/images/WhatsApp_Image_2026-09-03_at_6.12.59_PM__1_.jpeg",
  "/images/WhatsApp_Image_2026-09-03_at_6.12.59_PM__2_.jpeg",
]

export interface GaleriItem {
  id?: string
  url: string
  caption?: string
}
