//0. Load database dari localStorage ketika halaman di load
window.addEventListener("DOMContentLoaded", function () {
  let savedDatabase = localStorage.getItem("database");

  if (savedDatabase) {
    database = JSON.parse(savedDatabase);
  }

  readData();
});

function searchByName() {
  let keyword = document.getElementById("searchInput").value.toLowerCase();
  let filteredData = [];

  for (let i = 0; i < database.length; i++) {
    let nama = database[i].nama.toLowerCase();

    if (nama.includes(keyword)) {
      filteredData.push(database[i]);
    }
  }

  readData(filteredData);
}

function readData(data = database) {
  let template = "";

  for (let i = 0; i < data.length; i++) {
    let perObject = data[i];

    template += `
    <div class="col reptile-card">
        <div class="card h-100">
          <img src="${perObject.foto}" class="card-img-top card-img-custom">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${perObject.nama}</h5>
            <p class="card-text">
              <strong>Stok:</strong> ${perObject.stok}<br>
              <strong>Harga:</strong> Rp.${perObject.harga},00<br>
              <strong>Deskripsi:</strong> ${perObject.deskripsi}
            </p>
            <div class="mt-auto">
              <button class="btn btn-warning" onclick="editData(${perObject.id})">Edit</button>
              <button class="btn btn-danger" onclick="deleteData(${perObject.id})">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  document.getElementById("container-data").innerHTML = template;
}

// Edit data berdasarkan id
function editData(id) {
  window.location.href = `pages/edit-item.html?id=${id}`;
}

// Hapus data berdasarkan id
function deleteData(id) {
  if (!confirm("Delete this item?")) return;

  database = database.filter((item) => item.id !== id);
  localStorage.setItem("database", JSON.stringify(database));
  readData();
}
