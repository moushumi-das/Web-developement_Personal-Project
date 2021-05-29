import axios from 'axios'
import Noty from 'noty'

let addToCart = document.querySelectorAll('.button2');
let cartCouter = document.querySelector('#cartCouter')

function updateCart(item) {
    axios.post('/update-cart', item).then(res => {
        //console.log(res)
        cartCouter.innerText = res.data.totalQty
        new Noty({
            text: "Item added to cart"
        }).show();
    })
}


addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        //console.log(e)
        let item = JSON.parse(btn.dataset.item)

        updateCart(item)
    })
})