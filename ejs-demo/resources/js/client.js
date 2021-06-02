import axios from 'axios'
//const axios = require('axios');
//import Noty from 'noty'

//'button2' class is added for 'Add' button which is used to add item in the cart
let addToCart = document.querySelectorAll('.button2');
let cartCouter = document.querySelector('#cartCouter')

function updateCart(item) {
    axios.post('/update-cart', item).then(res => {
        console.log(res.data.totalQty)
        cartCouter.innerText = res.data.totalQty
            /*new Noty({
                text: "Item added to cart"
            }).show();*/
    })
}


addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        // JSON. parse convert json string to object
        let item = JSON.parse(btn.dataset.item)
        updateCart(item)
    })
})