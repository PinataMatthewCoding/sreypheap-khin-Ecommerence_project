function createCard(title, price, qty, col, img){
    const card = document.createElement("div");
    card.classList.add("card")
    
    const titleElement = document.createElement("div");
    titleElement.classList.add("title");
    titleElement.textContent = title;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const priceElement = document.createElement("div");
    priceElement.classList.add("price");
    priceElement.textContent = "$" + price;

    const qtyElement = document.createElement("div");
    qtyElement.classList.add("qty");
    qtyElement.textContent = qty;

    const colElement = document.createElement("div");
    colElement.classList.add("col");
    colElement.textContent = col;

    const imgElement = document.createElement("img");
    // imgElement.classList.add("img");
    imgElement.src = img;

    cardBody.appendChild(priceElement);
    cardBody.appendChild(qtyElement);
    cardBody.appendChild(colElement);
    cardBody.appendChild(imgElement);

    card.appendChild(titleElement);
    card.appendChild(cardBody);
 
    return card;
}

//----------------------------------------display products on customer------------------------------//
function displayProduct() {
    let products = JSON.parse(localStorage.getItem("product-name")) ?? [];
    for (let product of products) {
        let card = createCard(product.name, product.price, product.quantity, product.color, product.Img);
        container.appendChild(card);
    }
}
const container = document.querySelector("#container");
document.addEventListener("DOMContentLoaded", () => { displayProduct() });


// ------------------------------------Customer search productslist----------------------------//
function searchTask() {
    let text = search.value.toLowerCase();
    let tasks = document.querySelectorAll('.card');
    for (let task of tasks) {
      let taskTitle = task.firstElementChild.textContent.toLowerCase();
      if (taskTitle.indexOf(text) === -1) {
        task.style.display = "none";
      } else {
        task.style.display = "block";
      }
    }
}
const search = document.getElementById("search");
search.addEventListener('keyup', searchTask);
console.log(search)
