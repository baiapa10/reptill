// 0. Set itemId dan Currrent Image menjadi var global dengan nilai null
let currentItemId = null;
let currentImage = null;

// 1. Load database dari localStorage saat halaman dibuka
window.addEventListener("DOMContentLoaded", function () {
  //1.1 Ambil parameter id dari URL
  const params = new URLSearchParams(window.location.search);
  const idParam = params.get("id");

  //1.2 Validasi id, jika tidak ada, redirect ke home.html
  if (!idParam) {
    window.location.href = "/reptill/pages/home.html";
    return;
  }

  //1.3 Jika id ada, simpan ke var global yang sudah dikonversi ke Number
  currentItemId = Number(idParam);

  //1.4 Load database dari localStorage
  const savedDatabase = localStorage.getItem("database");
  if (savedDatabase) {
    database = JSON.parse(savedDatabase);
  }

  //1.5 Cari item berdasarkan id, jika tidak ada, redirect ke home.html
  const item = database.find((obj) => obj.id === currentItemId);
  if (!item) {
    window.location.href = "/reptill/pages/home.html";
    return;
  }

  // 1.5 Jika item ditemukan, isi form dengan data item tersebut
  document.getElementById("nama").value = item.nama;
  document.getElementById("stok").value = item.stok;
  document.getElementById("harga").value = item.harga;
  document.getElementById("deskripsi").value = item.deskripsi;

  const preview = document.getElementById("imagePreview");
  const container = document.getElementById("preview-container");
  if (preview && item.foto) {
    preview.src = item.foto;
    currentImage = item.foto;
    if (container) {
      container.classList.add("has-image");
      container.style.display = "flex"; // was "block"
    }
  }
});

// 2. function untuk menampilkan preview gambar saat memilih file
function previewImage() {
  //2.1 Memgambil elemen yang dibutuhkan untuk preview gambar
  const fileInput = document.getElementById("foto");
  const preview = document.getElementById("imagePreview");
  const container = document.getElementById("preview-container");

  //2.2 Validasi jika tidak ada file, hilangkan preview gambar
  const file = fileInput.files[0];
  if (!file) {
    if (container) {
      container.classList.remove("has-image");
      // container.style.display = "flex";
    }
    if (preview) {
      preview.src = "";
    }
    return;
  }

  //2.3 Membaca file dan menampilkan preview gambar
  const reader = new FileReader();
  reader.onload = function (e) {
    if (preview) {
      preview.src = e.target.result;
    }
    currentImage = e.target.result;
    if (container) {
      container.classList.add("has-image");
      // container.style.display = "flex";
    }
  };
  reader.readAsDataURL(file);
}

// 3. function untuk meng-update perubahan item
function updateItem() {
  if (currentItemId == null) return;

  //3.1 Mengambil nilai dari form (Untuk nama, apabila nama kosong, maka akan muncul alert)
  const nama = document.getElementById("nama").value.trim();
  if (nama === "") {
    alert("Silahkan mengisi nama terlebih dahulu!");
    return;
  }

  const stok = Number(document.getElementById("stok").value) || 0;
  const harga = Number(document.getElementById("harga").value) || 0;
  const deskripsi = document.getElementById("deskripsi").value.trim();

  //3.2 Mencari index item berdasarkan id
  const index = database.findIndex((obj) => obj.id === currentItemId);
  if (index === -1) return;

  //3.2 Meng-update data item di database
  database[index] = {
    //3.2.1 Spread operator untuk mempertahankan properti lain yang tidak diubah
    ...database[index],
    nama,
    stok,
    harga,
    deskripsi,
    //3.2.2 Gunakan currentImage jika ada, jika tidak gunakan foto lama dari database
    foto: currentImage || database[index].foto,
  };

  //3.3 Simpan perubahan ke localStorage
  localStorage.setItem("database", JSON.stringify(database));
  window.location.href = "/reptill/pages/home.html";
}
