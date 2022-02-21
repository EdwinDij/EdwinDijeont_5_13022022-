let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");
console.log(idProduct);

let imgContainer = document.querySelector('item__img');
let imgProduct = document.createElement('img');
imgContainer.appendChild(imgProduct);
