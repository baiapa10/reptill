//0. Load database dari localStorage ketika halaman di load
window.addEventListener("DOMContentLoaded", function () {
  let savedDatabase = localStorage.getItem("database");

  if (savedDatabase) {
    database = JSON.parse(savedDatabase);
  }

  readData();
});


// let banners = [
//   "../images/banner1.jpg",
//   "../images/banner2.jpg",
//   "../images/banner3.jpg"
// ];

// let currentIndex = 0;
// let bannerImg = document.getElementById("banner-img");

// setInterval(function () {
//   currentIndex++;

//   if (currentIndex >= banners.length) {
//     currentIndex = 0;
//   }

//   bannerImg.src = banners[currentIndex];
// }, 6000);

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
      <div class="col reptile-card">
        <div class="card h-100">
          <img 
            src="${perObject.foto}" 
            class="card-img-top card-img-custom" 
            alt="${perObject.nama}"
          >
          <div class="card-body">
            <h5 class="card-title">${perObject.nama}</h5>
            <p class="card-text">
              <strong>Stok:</strong> ${perObject.stok}<br>
              <strong>Harga:</strong> ${perObject.harga}<br>
              <strong>Deskripsi:</strong> ${perObject.deskripsi}
            </p>
            <button 
              class="btn btn-warning mt-auto"
              onclick="editData(${perObject.id})"
              
            >
              Edit
            </button>
            <button 
              class="btn btn-warning mt-auto"
              onclick="editData(${perObject.id})"
            >
              delete
            </button>
          </div>
        </div>
      </div>
    `;
  }

  //4. Diluar looping, get element yang akan menjadi container dari elemen template
  document.getElementById("container-data").innerHTML = template;
  // let tbody = document.getElementById("container-data");
  tbody.innerHTML = template;
}
readData();
