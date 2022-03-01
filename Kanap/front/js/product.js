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

// Ajouté un article au panier
let add = document.getElementById('addToCart');
add.addEventListener('click', addToCart);

function addToCart() {

    const colors = document. querySelector('#colors');
    const quantity = document.querySelector('#quantity');

    if (quantity.value > 0 && quantity.value <=100 && quantity.value != 0 && colors.value != 0) { 

        if (localStorage.getItem('cart')) {
    
            let productCart = JSON.parse(localStorage.getItem('cart'));
            console.log(productCart);

            let idKanap = idProduct;
            let colorKanap = document.querySelector('#colors').value;
            let quantityKanap = document.querySelector('#quantity').value;

            const productFind = productCart.find(
                (el) => el.idKanap === idProduct && el.colorKanap === colorKanap);
                //Si le produit commandé est déjà dans le panier


                if (productFind) {
                    let newQuantiy = parseInt(quantityKanap) + parseInt(productFind.quantityKanap);
                    productFind.quantityKanap = newQuantiy;
                    localStorage.setItem('cart', JSON.stringify(productCart));

                //Si le produit commandé n'est pas dans le panier
                } else {
                    
                    let productCart = JSON.parse(localStorage.getItem('cart'));

                    let idKanap = idProduct;
                    let nameKanap = document.querySelector('#title').textContent;
                    let imgKanap = imgProduct.src;
                    let altImg = imgProduct.alt;
                    let colorKanap = document.querySelector('#colors').value;
                    let quantityKanap = document.querySelector('#quantity').value;
                    let priceKanap = document.querySelector('#price').textContent;
                
                    console.log(idKanap, nameKanap, colorKanap, quantityKanap,imgKanap, altImg, priceKanap);
                
                    let productCartObj = {
                        idKanap : idProduct,
                        nameKanap : nameKanap,
                        colorKanap : colorKanap,
                        imgKanap : imgKanap,
                        altImg : altImg,
                        quantityKanap  : quantityKanap,
                        priceKanap : priceKanap
                    };
                
                    productCart.push(productCartObj);
                
                    let objCart = JSON.stringify(productCart);
                    localStorage.setItem('cart', objCart);
                    alert('Votre ' + nameKanap + ' a été ajouté au panier!');
                }

        } else {

            let productCart = [];

            let idKanap = idProduct;
            let nameKanap = document.querySelector('#title').textContent;
            let colorKanap = document.querySelector('#colors').value;
            let imgKanap = imgProduct.src;
            let altImg = imgProduct.alt;
            let quantityKanap = document.querySelector('#quantity').value;
            let priceKanap = document.querySelector('#price').textContent;
            
            console.log(idKanap, nameKanap, colorKanap, quantityKanap,imgKanap, altImg, priceKanap);
        
            let productCartObj = {
                idKanap : idProduct,
                nameKanap : nameKanap,
                colorKanap : colorKanap,
                imgKanap : imgKanap,
                altImg : altImg,
                quantityKanap  : quantityKanap,
                priceKanap : priceKanap
            };
        
            productCart.push(productCartObj);
        
            let objCart = JSON.stringify(productCart);
            localStorage.setItem('cart', objCart);
        
            alert('Votre ' + nameKanap + ' a été ajouté au panier!');
        }
    }
}
