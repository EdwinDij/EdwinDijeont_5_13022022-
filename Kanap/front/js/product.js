let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");
console.log(idProduct);

let item = document.querySelector('.item__img');
let imgProduct = document.createElement('img');
let priceProduct = document.getElementById('price');
let nameProduct = document.getElementById('title');
let descriptionProduct = document.getElementById('description');
let colorsProduct = document.getElementById('colors');
let quantityProduct = document.getElementById('quantity');
item.appendChild(imgProduct)

        //Affichage du produit

async function getArticle() {
    await fetch("http://localhost:3000/api/products/" + idProduct)
    .then((response) => response.json())
    .then(product => {
        console.log(product)
        imgProduct.src = `${product.imageUrl}`
        imgProduct.setAttribute("alt", `${product.altTxt}`)
        nameProduct.innerText = `${product.name}`
        descriptionProduct.innerText = `${product.description}`
        priceProduct.innerText = `${product.price}`
        document.title = `${product.name}`

    })
}

getArticle()