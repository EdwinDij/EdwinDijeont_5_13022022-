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

        //creation des éléments html
        

    let article = document.createElement("article");
    document.querySelector("#cart__items").appendChild(article);
    article.className = "cart__item";
    article.setAttribute('data-id', productLocalStorage[produit].idProduit);

    // création de l'élément "div"
    let divImg = document.createElement("div");
    article.appendChild(divImg);
    divImg.className = "cart__item__img";

    // création de l'image
    let productImg = document.createElement("img");
    divImg.appendChild(productImg);
    productImg.src = productLocalStorage[produit].imgProduit;
    productImg.alt = productLocalStorage[produit].altImgProduit;
    
    // création de l'élément "div"
    let productItemContent = document.createElement("div");
    article.appendChild(productItemContent);
    productItemContent.className = "cart__item__content";

    // création de l'élément "div"
    let divPrice = document.createElement("div");
    productItemContent.appendChild(divPrice);
    divPrice.className = "cart__item__content__titlePrice";
    
    // création du titre h3
    let productTitle = document.createElement("h2");
    divPrice.appendChild(productTitle);
    productTitle.innerHTML = productLocalStorage[produit].nomProduit;

    // création de la couleur
    let productColor = document.createElement("p");
    productTitle.appendChild(productColor);
    productColor.innerHTML = productLocalStorage[produit].couleurProduit;
    productColor.style.fontSize = "20px";

    // création du prix
    let productPrice = document.createElement("p");
    divPrice.appendChild(productPrice);
    productPrice.innerHTML = productLocalStorage[produit].prixProduit + " €";

    // création de l'élément "div"
    let divSetting = document.createElement("div");
    productItemContent.appendChild(divSetting);
    divSetting.className = "cart__item__content__settings";

    // création de l'élément "div"
    let divSettingQuantity = document.createElement("div");
    divSetting.appendChild(divSettingQuantity);
    divSettingQuantity.className = "cart__item__content__settings__quantity";
    
    // création de "Qté : "
    let productQte = document.createElement("p");
    divSettingQuantity.appendChild(productQte);
    productQte.innerHTML = "Qté : ";

    // création de la quantité
    let productQuantity = document.createElement("input");
    divSettingQuantity.appendChild(productQuantity);
    productQuantity.value = productLocalStorage[produit].quantiteProduit;
    productQuantity.className = "itemQuantity";
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");

    // création de l'élément "div"
    let divSettingDelete = document.createElement("div");
    divSetting.appendChild(divSettingDelete);
    divSettingDelete.className = "cart__item__content__settings__delete";

    // création de "p" supprimer
    let productSupprimer = document.createElement("p");
    divSettingDelete.appendChild(productSupprimer);
    productSupprimer.className = "deleteItem";
    productSupprimer.innerText = "Supprimer";
    }
}

getCart()