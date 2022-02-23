     //creation du local storage

let productLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(productLocalStorage);
const positionEmptyCart = document.querySelector("#cart__items");

// Si le panier est vide
function getCart(){
    if (productLocalStorage === null || productLocalStorage == 0) {
        const titleCart = document.querySelector('h1')

        titleCart.innerText = 'Votre panier est vide !'
    
    }else{
        for (let product in productLocalStorage)
    }
}

getCart()