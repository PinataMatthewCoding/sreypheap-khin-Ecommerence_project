function addProductToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function getProductFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) ?? [];
}

function createNewRecord(name, price, quantity, color, img, edit_delete) {
    const tr = document.createElement("tr");
    const tdOne = document.createElement("td");
    const tdTwo = document.createElement("td");
    const tdThree = document.createElement("td");
    const tdFour = document.createElement("td");
    const tdFive = document.createElement("td");
    const tdSix = document.createElement("td");
    tdOne.textContent = name;
    tdTwo.textContent = price;
    tdThree.textContent = quantity;
    tdFour.textContent = color;
    tdFive.textContent = img;
    tdSix.textContent = edit_delete;

    // ----------------Include img Edit and Delete in edit_delete---------------//
    const buttonEdit = document.createElement("img");
    buttonEdit.src = "img/edite.png"
    
    const buttonDelete = document.createElement("img");
    buttonDelete.src = "img/delete.png"

    tdSix.appendChild(buttonEdit);
    tdSix.appendChild(buttonDelete);

    //------------------------------For delete products ------------------------//
    buttonDelete.addEventListener("click", (e) =>{
        let index = e.target.parentElement.parentElement.dataset.index;
        productList.splice(index, 1);
        addProductToLocalStorage("product-name", JSON.stringify(productList));
        displayProduct();
    })
    
    
    //-----------------------------for edit products---------------------------//
    buttonEdit.addEventListener('click',(e)=>{
        let index = e.target.parentElement.parentElement.dataset.index;
        productList.splice(index, 1);
        document.getElementById("product-name").value = name;
        document.getElementById("product-price").value = price;
        document.getElementById("product-quantity").value = quantity;
        document.getElementById("product-color").value= color;
        document.getElementById("product-img").value = img;
  
    })

    tr.appendChild(tdOne);
    tr.appendChild(tdTwo);
    tr.appendChild(tdThree);
    tr.appendChild(tdFour);
    tr.appendChild(tdFive);
    tr.appendChild(tdSix);

    return tr;
}

function createTableHeader() {
    const headerRow = document.createElement("tr");
    const thOne = document.createElement("th");
    const thTwo = document.createElement("th");
    const thThree = document.createElement("th");
    const thFour = document.createElement("th")
    const thFive = document.createElement("th")
    const thSix = document.createElement("th");
    
    thOne.textContent = "name"
    thTwo.textContent = "price";
    thThree.textContent = "quantity";
    thFour.textContent = "color"
    thFive.textContent = "img"
    thSix.textContent = "edit_delete"

    headerRow.appendChild(thOne);
    headerRow.appendChild(thTwo);
    headerRow.appendChild(thThree);
    headerRow.appendChild(thFour);
    headerRow.appendChild(thFive);
    headerRow.appendChild(thSix);

    return headerRow;
}
// -------------------------function display on seller -----------------//
function displayProduct() {
    if(tableData.firstElementChild !== null ) {
        document.querySelector("table").remove();
    }
    const  newTable = document.createElement("table");
    newTable.appendChild(createTableHeader());
    let products = getProductFromLocalStorage("product-name");
    for (let product of products) {
        let row = createNewRecord(product.name, product.price, product.quantity, product.color, product.Img);
        newTable.appendChild(row)
    }
    tableData.appendChild(newTable);
}

const result = document.querySelector("#result");
const productName = document.querySelector("#product-name");
const productPrice = document.querySelector("#product-price");
const productQuantity = document.querySelector("#product-quantity");
const productColor = document.querySelector("#product-color");
const productImg = document.querySelector("#product-img");
const button = document.querySelector("button");
const tableData = document.querySelector(".table-data");

let productList = JSON.parse(localStorage.getItem("product-name")) ?? [];

button.addEventListener("click", (e) => {
    e.preventDefault();
    if (productName.value === "") {
        return;
    }
    let productObject = {name: productName.value, price: productPrice.value, quantity: productQuantity.value, color: productColor.value, Img: productImg.value}

    productList.push(productObject);

    productName.value = ""
    productPrice.value = ""
    productQuantity.value = ""
    productColor.value = ""
    productImg.value = ""
    // add the product
    addProductToLocalStorage("product-name", JSON.stringify(productList));

    displayProduct();
})

document.addEventListener("DOMContentLoaded", () => { displayProduct() })


