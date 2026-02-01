const DEFAULT_DATABASE = [
  {
    id: 1,
    nama: "Gecko",
    stok: 5,
    harga: 200_000,
    foto: "/rumah-reptile/images/gecko.jpg",
    deskripsi:
      "Reptil kecil yang aktif di malam hari dan mampu memanjat dinding berkat bantalan lengket di kakinya.",
  },
  {
    id: 2,
    nama: "Iguana",
    stok: 2,
    harga: 6_000_000,
    foto: "/rumah-reptile/images/iguana.jpg",
    deskripsi:
      "Reptil herbivora berukuran besar yang dikenal tenang dan sering berjemur untuk mengatur suhu tubuhnya.",
  },
  {
    id: 3,
    nama: "Ular Python",
    stok: 1,
    harga: 200_000,
    foto: "/rumah-reptile/images/ularPython.jpg",
    deskripsi:
      "Ular besar yang tidak berbisa dan membunuh mangsanya dengan cara melilit sebelum menelan secara utuh.",
  },
  {
    id: 4,
    nama: "Dinosaurus",
    stok: 5,
    harga: 450_000_000_000,
    foto: "/rumah-reptile/images/dinosaurus.jpg",
    deskripsi:
      "Reptil purba yang hidup jutaan tahun lalu dan kini hanya dapat dipelajari melalui fosil dan penelitian ilmiah.",
  },
  {
    id: 5,
    nama: "Kura-kura",
    stok: 2,
    harga: 6_500_000,
    foto: "/rumah-reptile/images/kura-kura.jpeg",
    deskripsi:
      "Reptil bercangkang keras yang bergerak lambat dan memiliki umur hidup yang sangat panjang.",
  },
  {
    id: 6,
    nama: "Kadal Gurun",
    harga: 4_500_000,
    stok: 1,
    foto: "/rumah-reptile/images/kadalGurun.jpg",
    deskripsi:
      "Kadal yang hidup di daerah panas dan kering dengan kemampuan beradaptasi terhadap suhu ekstrem.",
  },
  {
    id: 7,
    nama: "Komodo",
    stok: 5,
    harga: 256_000,
    foto: "/rumah-reptile/images/komodo.jpg",
    deskripsi:
      "Kadal terbesar di dunia yang berasal dari Indonesia dan dikenal sebagai predator kuat dengan gigitan berbahaya.",
  },
  {
    id: 8,
    nama: "Bunglon",
    stok: 2,
    harga: 20_000,
    foto: "/rumah-reptile/images/bunglon.jpg",
    deskripsi:
      "Reptil unik yang dapat mengubah warna kulitnya untuk kamuflase dan komunikasi.",
  },
  {
    id: 9,
    nama: "Tokek",
    stok: 1,
    harga: 6_000,
    foto: "/rumah-reptile/images/tokek.jpg",
    deskripsi:
      "Reptil nokturnal yang dikenal dengan suara khasnya dan kemampuan menempel kuat di permukaan licin.",
  },
];

// Load from localStorage or use default
let database = JSON.parse(localStorage.getItem("database")) || DEFAULT_DATABASE;

let users = [
  {
    id: 1,
    email: "admin123@gmail.com",
    password: "12345678",
  },
];
