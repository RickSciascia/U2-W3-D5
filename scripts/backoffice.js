const authkey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmE2MmY0YmQ0NzAwMTU4NWIxZTciLCJpYXQiOjE3NjI1MDczNjIsImV4cCI6MTc2MzcxNjk2Mn0.vQzChT97YTOe2A45k6nIDMqA-gNygnjtO0nK5x1s4vk";
const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

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
  fetch(endpoint, {
    method: "POST", // metodo POST per inserire in DB metodo PUT per aggiornare DB
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization: authkey,
    },
  })
    .then((res) => {
      if (res.ok) {
        // se responso OK entro in questo blocco
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
