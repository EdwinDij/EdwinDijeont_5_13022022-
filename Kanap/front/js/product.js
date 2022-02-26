let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get('id');
console.log(idProduct);

let item = document.querySelector('.item__img');
let imgProduct = document.createElement('img');
let priceProduct = document.getElementById('price');
let nameProduct = document.getElementById('title');
let descriptionProduct = document.getElementById('description');
let colorsProduct = document.getElementById('colors')
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

            for (let i = 0; i < product.colors.length; i++) {
                let color = document.createElement('option');
                color.setAttribute('value', product.colors[i]);
                color.innerText = product.colors[i];
                colorsProduct.appendChild(color);
            }
        })
}

getArticle()

//ajout au panier

let buttonAddToCart = document.getElementById('addToCart')
buttonAddToCart.addEventListener('click', addToCart)

function addToCart() {
    const colorsChoice = document.getElementById('colors');
    const quantityChoice = document.getElementById('quantity');

    if (quantityChoice.value > 0 && quantityChoice.value <= 100 && quantityChoice.value != 0 && colorsChoice.value != 0) {

        if (localStorage.getItem('cart')) {

            let productCart = JSON.parse(localStorage.getItem("cart"));
            console.log(productCart);

            let kanapId = idProduct;
            let colorsProduct = document.querySelector('#colors').value;
            let quantityKanap = document.querySelector('#quantity').value;
            let result = productCart.find(
                (el) => el.kanapId === idProduct && el.colorsProduct === colorsProduct);

            if (result) {
                console.log('result kanap =' + result.quantityKanap);
                let newQuantity = parseInt(quantityKanap) + parseInt(result.quantityKanap)
                result.quantityKanap = newQuantity;
                localStorage.setItem("cart", JSON.stringify(productCart));
            } else {

                let productCart = JSON.parse(localStorage.getItem("cart"));

                let idKanap = idProduct;
                let nameKanap = document.querySelector("#title").textContent;
                let colorKanap = document.querySelector("#colors").value;
                let qtyKanap = document.querySelector("#quantity").value;
                let imgKanap = imgProduct.src;
                let altImg = imgProduct.alt;
                let priceKanap = document.querySelector("#price").textContent;

                console.log(idKanap, nameKanap, colorKanap, qtyKanap, imgKanap, altImg, priceKanap);

                let productCartObj = {
                    idKanap: idProduct,
                    nameKanap: nameKanap,
                    colorKanap: colorKanap,
                    qtyKanap: qtyKanap,
                    imgKanap: imgKanap,
                    altImg: altImg,
                    priceKanap: priceKanap
                };

                productCart.push(productCartObj);

                let objCart = JSON.stringify(productCart);
                localStorage.setItem("cart", objCart);

                alert("Ajouté au panier !");
            }

        } else {

            let productCart = [];

            let idKanap = idProduct;
            let nameKanap = document.querySelector("#title").textContent;
            let colorKanap = document.querySelector("#colors").value;
            let qtyKanap = document.querySelector("#quantity").value;
            let imgKanap = imgProduct.src;
            let altImg = imgProduct.altTxt;
            let priceKanap = document.querySelector("#price").textContent;
            
            console.log(idKanap, nameKanap, colorKanap, qtyKanap, imgKanap, altImg, priceKanap);

            let productCartObj = {
                idKanap: idProduct,
                nameKanap: nameKanap,
                colorKanap: colorKanap,
                qtyKanap: qtyKanap,
                imgKanap: imgKanap,
                altImg: altImg,
                priceKanap: priceKanap
            };

            productCart.push(productCartObj);

            let objCart = JSON.stringify(productCart);
            localStorage.setItem("cart", objCart);

            alert("Produit ajouté au panier !");
        }
    }
}