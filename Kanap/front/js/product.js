let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get('id');
console.log(idProduct);

let item = document.querySelector('.item__img');
let imgProduct = document.createElement('img');
let priceProduct = document.getElementById('price');
let nameProduct = document.getElementById('title');
let descriptionProduct = document.getElementById('description');
item.appendChild(imgProduct)

        //Affichage du produit

async function getArticle() {
    await fetch('http://localhost:3000/api/products/' + idProduct)
    .then((response) => response.json())
    .then(product => {
        console.log(product)
        imgProduct.src = `${product.imageUrl}`
        imgProduct.setAttribute('alt', `${product.altTxt}`)
        nameProduct.innerText = `${product.name}`
        descriptionProduct.innerText = `${product.description}`
        priceProduct.innerText = `${product.price}`
        document.title = `${product.name}`

        //boucle liste de couleurs

        for (let i=0; i < product.colors.length; i++) {
            let color = document.createElement('option');
            color.setAttribute('value', product.colors[i]);
            color.innerText = product.colors[i];
            colorsProduct.appendChild(color);
        }  
    })
}

getArticle()

        //ajout au panier

let addToCart = document.getElementById('addToCart')
addToCart.addEventListener('click', addToCart)

function addToCart {
    const colorsChoice = document.getElementById('colors');
    const quantityChoice = document.getElementById('quantity');

    if (quantityChoice.value > 0 && quantityChoice.value <=100 && quantityChoice.value != 0 && colorsChoice.value != 0) { 

        if (localStorage.getItem('cart')) {
            let productCart = JSON.parse(localStorage.getItem("cart"));
        }}