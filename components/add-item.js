// Database: Sudah ada di database.js

//0. Load database dari localStorage ketika halaman di load
window.addEventListener("DOMContentLoaded", function () {
  let savedDatabase = localStorage.getItem("database");

  if (savedDatabase) {
    database = JSON.parse(savedDatabase);
  }

  readData();
});

//Read data => DISIMPAN DALAM FUNCTION
function readData() {
  //1. Buat template dengan string kosong
  let template = "";

  //2. loopoing database sampai dapat perObject
  for (let i = 0; i < database.length; i++) {
    // console.log(database[i]);
    let perObject = database[i];

    //3. Didalam looping, concate variable template dengan elemen HTML
    template += `
      <tr>
        <td>${perObject.id}</td>
        <td>${perObject.nama}</td>
        <td>${perObject.stok}</td>
        <td>${perObject.deskripsi}</td>
        <td><img src="${perObject.foto}" alt="${perObject.nama}" style="width: 100px;"></td>
      </tr>
    `;
  }

  //4. Diluar looping, get element yang akan menjadi container dari elemen template
  let tbody = document.getElementById("container-data");
  tbody.innerHTML = template;
}
readData();

//Create data =>  DISIMPAN DALAM FUNCTION
function createData() {
  //1. Ambil value dari form input
  let inputNama = document.getElementById("nama");
  let inputStok = document.getElementById("stok");
  let inputFoto = document.getElementById("foto");
  let inputDeskripsi = document.getElementById("deskripsi");

  //1.1 Validasi input nama tidak boleh kosong
  if (inputNama.value === "") {
    alert("Please fill in all required fields.");
    return;
  }

  //2. Buat id secara dinamis dengan id default adalah 1
  let id = 1;
  if (database.length !== 0) {
    id = database[database.length - 1].id + 1;
  }

  //3. Cek apakah ada file yang diupload (Jika YA, lakukan proses Baca file)
  if (inputFoto.files.length > 0) {
    let reader = new FileReader();

    reader.onload = function (e) {
      saveToDatabase(
        id,
        inputNama.value,
        inputStok.value,
        e.target.result,
        inputDeskripsi.value,
      );
      clearForm();
    };

    reader.readAsDataURL(inputFoto.files[0]);
  }
  // 3.1 Jika TIDAK ada file yang diupload, gunakan gambar default
  else {
    saveToDatabase(
      id,
      inputNama.value,
      inputStok.value,
      "../images/no-image.png",
      inputDeskripsi.value,
    );
    clearForm();
  }
}

// 4. function untuk menyimpan data ke database dan localStorage
function saveToDatabase(id, nama, stok, foto, deskripsi) {
  let newObject = {
    id: id,
    nama: nama,
    stok: Number(stok),
    foto: foto, // Base64 string stored here
    deskripsi: deskripsi,
  };
  database.push(newObject);

  // 4.1 Simpan database ke localStorage
  localStorage.setItem("database", JSON.stringify(database));

  readData();
}

// 5. function untuk membersihkan form setelah submit
function clearForm() {
  //5.1 Bersihkan data dari createData function
  document.getElementById("nama").value = "";
  document.getElementById("stok").value = "0";
  document.getElementById("foto").value = "";
  document.getElementById("deskripsi").value = "";

  //5.2 Bersihkan data dari previewImage function
  document.getElementById("imagePreview").src = "";
  document.getElementById("preview-container").style.display = "none";
}

//6. function untuk menunjukan gambar setelah memiliki file
function previewImage() {
  let inputFoto = document.getElementById("foto");
  let preview = document.getElementById("imagePreview");
  let container = document.getElementById("preview-container");

  if (inputFoto.files && inputFoto.files[0]) {
    let file = inputFoto.files[0];

    //6.1 membuat URL sementara untuk gambar
    preview.src = URL.createObjectURL(file);
    container.classList.add("has-image");
  } else {
    container.classList.remove("has-image");
  }
}

//7. function to reset Database in localstorage
function resetDatabase() {
  if (confirm("⚠️ Delete all data and reset to default?")) {
    localStorage.removeItem("database");
    location.reload(); // Refresh page
  }
}
