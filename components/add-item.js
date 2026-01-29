// 1. Function untuk menambahkan item baru ke database
function createData() {
  // 1.1 Ambil value dari form input
  let inputNama = document.getElementById("nama");
  let inputStok = document.getElementById("stok");
  let inputHarga = document.getElementById("harga");
  let inputFoto = document.getElementById("foto");
  let inputDeskripsi = document.getElementById("deskripsi");

  // 1.2 Validasi input nama tidak boleh kosong
  if (inputNama.value === "") {
    alert("Silahkan mengisi nama terlebih dahulu!");
    return;
  }

  // 1.3 Buat id secara dinamis dengan id default adalah 1
  let id = 1;
  if (database.length !== 0) {
    id = database[database.length - 1].id + 1;
  }

  // 1.4 Cek apakah ada file yang diupload (Jika YA, lakukan proses Baca file)
  if (inputFoto.files.length > 0) {
    let reader = new FileReader();

    reader.onload = function (e) {
      saveToDatabase(
        id,
        inputNama.value,
        inputStok.value,
        inputHarga.value,
        e.target.result,
        inputDeskripsi.value,
      );
      clearForm();

      // 1.4.1 Saat berhasil save, menambahkan re-direct ke index.html kembali
      window.location.href = "../index.html";
    };

    reader.readAsDataURL(inputFoto.files[0]);
  }

  // 1.5 Jika TIDAK ada file yang diupload, gunakan gambar default
  else {
    saveToDatabase(
      id,
      inputNama.value,
      inputStok.value,
      inputHarga.value,
      "../images/no-image.png",
      inputDeskripsi.value,
    );
    clearForm();

    // 1.5.1 Saat berhasil save, menambahkan re-direct ke index.html kembali
    window.location.href = "../index.html";
  }
}

// 2. function untuk menyimpan data ke database dan localStorage
function saveToDatabase(id, nama, stok, harga, foto, deskripsi) {
  let newObject = {
    id: id,
    nama: nama,
    stok: Number(stok),
    harga: Number(harga),
    foto: foto, // Base64 string stored here
    deskripsi: deskripsi,
  };
  database.push(newObject);

  // 2.1 Simpan database ke localStorage
  localStorage.setItem("database", JSON.stringify(database));
}

// 3. function untuk membersihkan form setelah submit
function clearForm() {
  //3.1 Bersihkan data dari createData function
  document.getElementById("nama").value = "";
  document.getElementById("stok").value = "0";
  document.getElementById("harga").value = "0";
  document.getElementById("foto").value = "";
  document.getElementById("deskripsi").value = "";

  //3.2 Bersihkan data dari previewImage function
  document.getElementById("imagePreview").src = "";
  document.getElementById("preview-container").style.display = "none";
}

// 4. function untuk menunjukan gambar setelah memiliki file
function previewImage() {
  let inputFoto = document.getElementById("foto");
  let preview = document.getElementById("imagePreview");
  let container = document.getElementById("preview-container");

  if (inputFoto.files && inputFoto.files[0]) {
    let file = inputFoto.files[0];

    // 4.1 membuat URL sementara untuk gambar
    preview.src = URL.createObjectURL(file);
    container.classList.add("has-image");
  } else {
    container.classList.remove("has-image");
  }
}

// 5. function to reset Database in localstorage
function resetDatabase() {
  if (confirm("⚠️ Delete all data and reset to default?")) {
    localStorage.removeItem("database");
    location.reload(); // Refresh page
  }
}
