const authkey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmE2MmY0YmQ0NzAwMTU4NWIxZTciLCJpYXQiOjE3NjI1MDczNjIsImV4cCI6MTc2MzcxNjk2Mn0.vQzChT97YTOe2A45k6nIDMqA-gNygnjtO0nK5x1s4vk";
const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

// logica per gestire EDIT e Delete
const url = location.search;
const urlParameters = new URLSearchParams(url);
const id = urlParameters.get("productID");

// entrerò in questo IF SOLO SE esiste l ID altrimenti il resto del codice viene eseguito regolarmente
if (id) {
  fetch(endpoint + id, {
    headers: {
      Authorization: authkey,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .then((details) => {
      document.getElementById("name").value = details.name;
      document.getElementById("description").value = details.description;
      document.getElementById("brand").value = details.brand;
      document.getElementById("imageURL").value = details.imageUrl;
      document.getElementById("price").value = details.price;
      const allH3 = document.getElementsByTagName("h3");
      allH3[0].innerText = "Modifica Prodotto:";
      const newBtnDel = document.createElement("button");
      newBtnDel.innerText = "CANCELLA";
      newBtnDel.setAttribute("class", "btn btn-danger my-3");
      newBtnDel.setAttribute("onclick", "delete()");
      document.getElementsByClassName("col-lg-6")[0].appendChild(newBtnDel);
    })
    .catch((error) => {
      console.log("Errore nel recuperare i dati del FORM", error);
    });
}
// FINE BLOCCO PER EDIT E DELETE

// classe con cui costruirò gli oggetti Product:
class ProductsObject {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

const form = document.getElementById("product-form");
const formReset = () => {
  form.reset();
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  //   dom traversing
  const nameInput = document.getElementById("name");
  const descriptionInput = document.getElementById("description");
  const brandInput = document.getElementById("brand");
  const imageUrlInput = document.getElementById("imageURL");
  const priceInput = document.getElementById("price");
  //   recupero i valori degli input
  const name = nameInput.value;
  const description = descriptionInput.value;
  const brand = brandInput.value;
  const imageUrl = imageUrlInput.value;
  const price = priceInput.value;

  // richiamo la classe ProductObject per costruire gli oggetti
  const newProduct = new ProductsObject(
    name,
    description,
    brand,
    imageUrl,
    price
  );
  console.log("new product", newProduct); // controllo se l oggetto è come me lo aspetto.
  //   ora invio alle API tramite fetch
  // BLOCCO AGGIUNTO DOPO PER EDIT:
  let method;
  let completeEndpoint;
  if (id) {
    method = "PUT";
    completeEndpoint = endpoint + id;
  } else {
    method = "POST";
    completeEndpoint = endpoint;
  }
  // FINE BLOCCO AGGIUNTO DOPO PER EDIT
  // modifico l endpoint originale e il method mettendo le nuove variabili che mi biforcheranno il codice
  // SE c'è ID faccio una PUT con Endpoint+ID
  // SE NON c'`e faccio una POST con ENDPOINT
  //   -------modifiche qui sotto nel fetch originale------
  // vvvv                                                vvvv

  fetch(completeEndpoint, {
    method: method, // metodo POST per inserire in DB metodo PUT per aggiornare DB
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization: authkey,
    },
  })
    .then((res) => {
      if (res.ok) {
        // se response OK entro in questo blocco
        alert("PRODOTTO INSERITO CORRETTAMENTE");
        form.reset();
      } else {
        throw new Error(`Errore nella risposta dal server: ${res.status}`);
      }
    })
    .catch((error) => {
      console.log("problema nel inserimento prodotto", error);
    });
});
