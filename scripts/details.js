const authkey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmE2MmY0YmQ0NzAwMTU4NWIxZTciLCJpYXQiOjE3NjI1MDczNjIsImV4cCI6MTc2MzcxNjk2Mn0.vQzChT97YTOe2A45k6nIDMqA-gNygnjtO0nK5x1s4vk";
const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

// recuperare parametro ID dal URL
const url = document.location.search;
const urlParameters = new URLSearchParams(url);
const id = urlParameters.get("productID");
// recuperare i dettagli dal API tramite ID
const getDetails = function () {
  fetch(endpoint + id, {
    // method: "GET", // metodo GET per sottointeso.
    headers: {
      Authorization: authkey,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("errore nella response", res.status);
      }
    })
    .then((dataProdotto) => {
      console.log("dettagli Prodotto", dataProdotto);
      document.getElementById("name").innerText = dataProdotto.name;
      document.getElementById("description").innerText =
        dataProdotto.description;
      document.getElementById("brand").innerText = dataProdotto.brand;
      document.getElementById("price").innerText = dataProdotto.price + " €";
      document
        .getElementById("imgUrl")
        .setAttribute("src", dataProdotto.imageUrl);
    })
    .catch((error) => {
      console.log("Errore: ", error);
    });
};
getDetails();

// ora logica bottoni

const editData = function () {
  location.assign("./backoffice.html?productID=" + id);
};
