const authkey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmE2MmY0YmQ0NzAwMTU4NWIxZTciLCJpYXQiOjE3NjI1MDczNjIsImV4cCI6MTc2MzcxNjk2Mn0.vQzChT97YTOe2A45k6nIDMqA-gNygnjtO0nK5x1s4vk";
const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

getProducts = function () {
  fetch(endpoint, {
    // method: "GET", // metodo GET per ottenere informazioni dal DB sarebbe sottointeso.
    headers: {
      Authorization: authkey,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Errore nella risposta dal server: ${response.status}`);
      }
    })
    .then((data) => {
      console.log(data);
      data.forEach((prodotto) => {
        // prendo tutte le variabili che mi interessano dal prodotto
        const name = prodotto.name;
        const description = prodotto.description;
        const brand = prodotto.brand;
        const imageUrl = prodotto.imageUrl;
        const price = prodotto.price;
        const productID = prodotto._id;
        // creo un nuovo div con classe "col"
        const newCol = document.createElement("div");
        newCol.classList.add("col");
        // inserisco la card bootstrap
        newCol.innerHTML = `
        <div class="card h-100 d-flex flex-column">
          <img src="${imageUrl}" class="card-img-top" alt="img-${name}">
        <div class="card-body flex-grow-1 d-flex flex-column">
            <h5 class="card-title">${name}</h5>
            <h6>Descrizione Prodotto:</h6>
            <p class="card-text flex-grow-1">${description}</p>
            <h6>Brand:</h6>
            <p class="card-text">${brand}</p>
            <p class="card-text text-danger fw-bold fs-5 text-center">Prezzo: ${price} €</p>
            </div>
            <a href="./details.html?productID=${productID}" class="btn btn-primary w-50 align-self-center my-3">Dettagli</a>
        </div>`;
        // appendo al cardContainer la card
        document.getElementById("cardContainer").appendChild(newCol);
      });
    })
    .catch((error) => {
      console.log("ERRORE: ", error);
    });
};
getProducts();
