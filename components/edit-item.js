let currentItemId = null;
let currentImage = null;

// Load item data when edit page opens
window.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const idParam = params.get("id");

  if (!idParam) {
    window.location.href = "../index.html";
    return;
  }

  currentItemId = Number(idParam);

  const savedDatabase = localStorage.getItem("database");
  if (savedDatabase) {
    database = JSON.parse(savedDatabase);
  }

  const item = database.find((obj) => obj.id === currentItemId);
  if (!item) {
    window.location.href = "../index.html";
    return;
  }

  // Prefill form
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

// Preview selected image and keep it in memory
function previewImage() {
  const fileInput = document.getElementById("foto");
  const preview = document.getElementById("imagePreview");
  const container = document.getElementById("preview-container");

  const file = fileInput.files[0];
  if (!file) {
    if (container) {
      container.classList.remove("has-image");
      container.style.display = "flex"; // optional, keep flex
    }
    if (preview) {
      preview.src = "";
    }
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    if (preview) {
      preview.src = e.target.result;
    }
    currentImage = e.target.result;
    if (container) {
      container.classList.add("has-image");
      container.style.display = "flex"; // was "block"
    }
  };
  reader.readAsDataURL(file);
}

// Save changes
function updateItem() {
  if (currentItemId == null) return;

  const nama = document.getElementById("nama").value.trim();
  const stok = Number(document.getElementById("stok").value) || 0;
  const harga = Number(document.getElementById("harga").value) || 0;
  const deskripsi = document.getElementById("deskripsi").value.trim();

  const index = database.findIndex((obj) => obj.id === currentItemId);
  if (index === -1) return;

  database[index] = {
    ...database[index],
    nama,
    stok,
    harga,
    deskripsi,
    foto: currentImage || database[index].foto,
  };

  localStorage.setItem("database", JSON.stringify(database));
  window.location.href = "../index.html";
}
