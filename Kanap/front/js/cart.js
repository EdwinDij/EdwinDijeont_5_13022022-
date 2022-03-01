//creation du local storage

let productLocalStorage = JSON.parse(localStorage.getItem('cart'));
console.table(productLocalStorage);
const positionEmptyCart = document.querySelector('#cart__items');

// Si le panier est vide
function getCart() {
    if (productLocalStorage === null || productLocalStorage == 0) {
        const titleCart = document.querySelector('h1')

        titleCart.innerText = 'Votre panier est vide !'

    } else {
        for (let i=0; i < productLocalStorage.length; i++) {

            //creation des éléments html

           //article
            let article = document.createElement("article");
            document.querySelector("#cart__items").appendChild(article);
            article.className = "cart__item";
            article.setAttribute("data-id", productLocalStorage[i].idKanap);

            // Insertion de l'élément "div" pour l'image produit
            let divImg = document.createElement("div");
            article.appendChild(divImg);
            divImg.className = "cart__item__img";

            // Insertion de l'image
            let productImg = document.createElement("img");
            divImg.appendChild(productImg);
            productImg.src = productLocalStorage[i].imgKanap;
            // productImg.alt = productLocalStorage.altImgProduit;

            // Insertion de l'élément "div" pour la description produit
            let productContent = document.createElement("div");
            article.appendChild(productContent);
            productContent.className = "cart__item__content";

            // Insertion de l'élément "div"
            let productContentTitlePrice = document.createElement("div");
            productContent.appendChild(productContentTitlePrice);
            productContentTitlePrice.className = "cart__item__content__titlePrice";

            // Insertion du titre h2
            let productTitle = document.createElement("h2");
            productContentTitlePrice.appendChild(productTitle);
            productTitle.innerText = productLocalStorage[i].nameKanap;

            // Insertion de la couleur
            let productColor = document.createElement("p");
            productTitle.appendChild(productColor);
            productColor.innerText = productLocalStorage[i].colorKanap;
            productColor.style.fontSize = "20px";

            // Insertion du prix
            let productPrice = document.createElement("p");
            productContentTitlePrice.appendChild(productPrice);
            productPrice.innerText = productLocalStorage[i].priceKanap + " €";

            // Insertion de l'élément "div"
            let productContentSettings = document.createElement("div");
            productContent.appendChild(productContentSettings);
            productContentSettings.className = "cart__item__content__settings";

            // Insertion de l'élément "div"
            let productContentSettingsQuantity = document.createElement("div");
            productContentSettings.appendChild(productContentSettingsQuantity);
            productContentSettingsQuantity.className = "cart__item__content__settings__quantity";

            // Insertion de "Qté : "
            let productQty = document.createElement("p");
            productContentSettingsQuantity.appendChild(productQty);
            productQty.innerText = "Qté : ";

            // Insertion de la quantité
            let productQuantity = document.createElement("input");
            productContentSettingsQuantity.appendChild(productQuantity);
            productQuantity.value = productLocalStorage[i].qtyKanap;
            productQuantity.className = "itemQuantity";
            productQuantity.setAttribute("type", "number");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productQuantity.setAttribute("name", "itemQuantity");

            // Insertion de l'élément "div"
            let productContentSettingsDelete = document.createElement("div");
            productContentSettings.appendChild(productContentSettingsDelete);
            productContentSettingsDelete.className = "cart__item__content__settings__delete";

            // supprimer
            let productSupprimer = document.createElement("p");
            productContentSettingsDelete.appendChild(productSupprimer);
            productSupprimer.className = "deleteItem";
            productSupprimer.innerText = "Supprimer";
            productSupprimer.addEventListener("click", (e) => {
                e.preventDefault;

                // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
                let deleteId = productLocalStorage[i].idKanap;
                let deleteColor = productLocalStorage[i].colorKanap;

                // filtrer l'élément cliqué par le bouton supprimer
                productLocalStorage = productLocalStorage.filter(elt => elt.idKanap !== deleteId || elt.colorKanap !== deleteColor);

                // envoyer les nouvelles données dans le localStorage
                localStorage.setItem('cart', JSON.stringify(productLocalStorage));

                // avertir de la suppression et recharger la page
                alert('Votre article a bien été supprimé.');

                //Si pas de produits dans le local storage on affiche que le panier est vide
                if (productLocalStorage.length === 0) {
                    localStorage.clear();
                }
                //Refresh rapide de la page
                location.reload();

            });
        }
    }
}

getCart()
function getTotals(){

    // Récupération du total des quantités
    var elemsQtt = document.getElementsByClassName('itemQuantity');
    var myLength = elemsQtt.length,
    totalQtt = 0;

    for (var i = 0; i < myLength; ++i) {
        totalQtt += elemsQtt[i].valueAsNumber;
    }
    
    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerText = totalQtt;

    // Récupération du prix total
    totalPrice = 0;
    for (var i = 0; i < myLength; ++i) {
        totalPrice += (elemsQtt[i].valueAsNumber * productLocalStorage[i].priceKanap);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerText = totalPrice;
}
getTotals();


function modifyQtt() {
    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let k= 0; k < qttModif.length; k++){
        qttModif[k].addEventListener("change" , (event) => {
            event.preventDefault();

            //Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = productLocalStorage[k].qtyKanap;
            let qttModifValue = qttModif[k].valueAsNumber;
            
            const resultFind = productLocalStorage.find((el) => el.qttModifValue !== quantityModif);

            resultFind.qtyKanap = qttModifValue;
            productLocalStorage[k].qtyKanap = resultFind.qtyKanap;

            localStorage.setItem("cart", JSON.stringify(productLocalStorage));
        
            // refresh rapide
            location.reload();
        })
    }
}
modifyQtt();


//Instauration formulaire avec regex
function getForm() {
    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    // Ecoute de la modification du prénom
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    // Ecoute de la modification du prénom
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    // Ecoute de la modification du prénom
    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    // Ecoute de la modification du prénom
    form.city.addEventListener('change', function() {
        validCity(this);
    });

    // Ecoute de la modification du prénom
    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    //validation du prénom
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerText = '';
        } else {
            firstNameErrorMsg.innerText = 'Veuillez renseigner ce champ.';
        }
    };

    //validation du nom
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerText = '';
        } else {
            lastNameErrorMsg.innerText = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'adresse
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerText = '';
        } else {
            addressErrorMsg.innerText = 'Veuillez renseigner une adresse valide.';
        }
    };

    //validation de la ville
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerText = '';
        } else {
            cityErrorMsg.innerText = 'Veuillez renseigner une ville.';
        }
    };

    //validation de l'email
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerText = '';
        } else {
            emailErrorMsg.innerText = 'Veuillez renseigner un mail valide. ex:(exemple@[domaine].fr,com, etc).';
        }
    };
    }
getForm();

function postForm() {
    const order = document.getElementById('order');
    order.addEventListener('click', (event) => {
    event.preventDefault();
  
    // je récupère les données du formulaire dans un objet
    const contact = {
      firstName : document.getElementById('firstName').value,
      lastName : document.getElementById('lastName').value,
      address : document.getElementById('address').value,
      city : document.getElementById('city').value,
      email : document.getElementById('email').value
    }

    //Construction d'un array d'id depuis le local storage
    let products = [];
    for (let i = 0; i< productLocalStorage.length;i++) {
        products.push(productLocalStorage[i].idKanap);
    }
    console.log(products);
 
    const sendFormData = {
      contact,
      products,
    }
  
  
    const options = {
      method: 'POST',
      body: JSON.stringify(sendFormData),
      headers: { 
        'Content-Type': 'application/json',
      }
    };
  
    fetch("http://localhost:3000/api/products/order", options)
        .then(response => response.json())
        .then(data => {
        localStorage.setItem('orderId', data.orderId);
        document.location.href = 'confirmation.html?id='+ data.orderId;
      });
  
  }); 
}
  postForm();