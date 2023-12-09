const URL = "https://striveschool-api.herokuapp.com/api/product/";

const fetchData = function () {
  isLoading(true);
  fetch(URL, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxYzlhYzBkOGEyMDAwMThhNDhhM2MiLCJpYXQiOjE3MDE5NTYwMTIsImV4cCI6MTcwMzE2NTYxMn0.9jdY2QHE5tyB7MCfefphT5CfhoAxtZJ0SXHJPMRU9dk",
    },
  })
    .then((response) => {
      if (response.status === 404) throw new Error("Risorsa non trovata");
      if (response.status >= 400 && response.status < 500) throw new Error("Errore lato Client");
      if (response.status >= 500 && response.status < 600) throw new Error("Errore lato Server");
      if (!response.ok) throw new Error("Errore nel reperimento dei dati");

      return response.json();
    })
    .then((products) => {
      products.forEach((product) => {
        let pImg = product.imageUrl;
        let pName = product.name;
        let pBrand = product.brand;
        let pPrice = product.price;
        let pId = product._id;
        // let pDes = product.description;

        createCardProd(pImg, pName, pBrand, pPrice, pId);
      });
    })
    .finally(() => isLoading(false));
};

// ----------------------- CREATE CARD PROD
const createCardProd = function (img, name, brand, price, id) {
  let productContainer = document.getElementById("productsContainer");
  let product = document.createElement("div");
  product.classList.add(
    "card",
    "border",
    "border-4",
    "border-epicode-2",
    "rounded-4",
    "mx-1",
    "p-2",
    "d-flex",
    "flex-column",
    "justify-content-between"
  );
  product.style.width = "18rem";
  let prodContent = `            
  <div>
    <img
  src="${img}"
  class="card-img-top cardImg"
  alt="prod-img"
    />
</div>
<div class="card-body">
    <h4 class="card-title mb-3">${name}</h4>
    <h5 id="brand">Brand<span class="badge bg-epicode-4 p-2 fs-6 ms-2">${brand}</span></h5>
    <h5 id="price">Price<span class="badge bg-epicode-3 p-2 fs-6 ms-3">${price}€</span></h5>
    </div>
  <div class="d-flex justify-content-evenly">
    <a href="#"  class="btn btn-epicode-1">Compra<i class="bi bi-cart-check-fill ps-2"></i></a>
    <a href="./info.html?resourceId=${id}" class="btn btn-epicode-2">Dettagli<i class="bi bi-zoom-in ps-2"></i></a>
    <a id="${id}" href="./login.html?resourceId=${id}" class="btn btn-secondary"><i class="bi bi-pencil-fill"></i></a>
  </div>`;

  product.innerHTML = prodContent;
  productContainer.appendChild(product);
};
// ----------------------------------------

// -----------------Search--------------------

let searchEngine = function () {
  let serchName = document.getElementById("searchInput");
  let h4Collection = document.querySelectorAll("h4");

  h4Collection.forEach((i) => {
    if (!i.innerText.toLowerCase().includes(serchName.value)) {
      i.parentNode.parentNode.classList.add("d-none");
    }
  });
};

// let searchEngine = function () {
//   let searchName = document.getElementById("searchInput");
//   let h4Collection = document.querySelectorAll("h4");

//   h4Collection.forEach((i) => {
//     const text = i.innerText;
//     const lowerCaseText = i.innerText.toLowerCase();
//     const upperCaseText = i.innerText.toUpperCase();
//     if (!lowerCaseText.includes(searchName)) {
//       i.parentNode.parentNode.classList.add("d-none");
//     } else {
//       i.parentNode.parentNode.classList.remove("d-none");
//     }
//   });
// };

let btnSerch = document.getElementById("src");
btnSerch.addEventListener("click", searchEngine);

let showAll = function () {
  let h4Collection = document.querySelectorAll("h4");
  h4Collection.forEach((i) => {
    if (i.classList.contains("d-none")) {
      i.classList.remove("d-none");
      i.classList.add("d-inline-block");
    }
  });
};

// -------------------SPINNER-----------------

const isLoading = (x) => {
  const spinner = document.querySelector(".spinner-border");
  const blur = document.getElementById("blur");

  if (x) {
    spinner.classList.remove("d-none");
    blur.classList.remove("d-none");
    blur.classList.add("blur");
  } else {
    spinner.classList.add("d-none");
    spinner.classList.add("d-none");
    blur.classList.remove("blur");
  }
};
// -------------------------------------------

window.addEventListener("DOMContentLoaded", () => {
  fetchData();
  showAll();
});
