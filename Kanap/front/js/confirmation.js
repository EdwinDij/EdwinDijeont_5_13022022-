const id = new URL(window.location.href).searchParams.get('id');
console.log(id);

const orderId = document.getElementById('orderId');
let p = document.querySelector('p')

if (id ==='undefined') {
        p.innerText = 'Erreur lors de la commande, veuillez remplir le formulaire entièrement!' 
        setTimeout('window.location="cart.html"',6000)
        
}else{
        orderId.innerText = id;
        localStorage.clear();
}