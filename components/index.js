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
