let allProducts = []
const img = document.getElementsByTagName('img')


function fetchProducts () {
fetch ("http://localhost:3000/api/products")
    .then((response) =>{
        return response.json()
    })
    .then((allProducts) => {
        console.log(allProducts)
    })
}
console.log(allProducts.length)
fetchProducts()

