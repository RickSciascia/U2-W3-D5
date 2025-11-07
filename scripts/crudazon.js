const authkey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmE2MmY0YmQ0NzAwMTU4NWIxZTciLCJpYXQiOjE3NjI1MDczNjIsImV4cCI6MTc2MzcxNjk2Mn0.vQzChT97YTOe2A45k6nIDMqA-gNygnjtO0nK5x1s4vk";
const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

getProducts = function () {
  fetch(endpoint, {
    method: "GET", // metodo GET per ottenere informazioni dal DB
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
    })
    .catch((error) => {
      console.log("ERRORE: ", error);
    });
};
getProducts();
