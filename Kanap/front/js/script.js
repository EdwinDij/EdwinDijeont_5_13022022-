    


fetch ("http://localhost:3000/api/products")
    .then(response => response.json())
    
    .then (data =>{
        allProducts(data)
        console.log(data)
    })

function allProducts(data) {
    for (product of data) {

        // création des cartes

    link = document.createElement('a');
    article = document.createElement('article');
    imgProduct = document.createElement('img');
    altImg = document.createElement('alt')
    nameProduct = document.createElement('h3');
    descriptionProduct = document.createElement('p');
    items = document.getElementById('items');
    items.appendChild(link);
    link.appendChild(article);
    article.appendChild(imgProduct);
    article.appendChild(nameProduct);
    article.appendChild(descriptionProduct);

    nameProduct.innerText = `${product.name}`
    descriptionProduct.innerText = `${product.description}`
    imgProduct.src = `${product.imageUrl}`
    link.href = `${product._id}`
    
    }
}