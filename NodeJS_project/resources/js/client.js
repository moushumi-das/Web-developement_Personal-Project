import moment from 'moment';
import axios from 'axios';
import { initStripe } from './stripe'
//const initAdmin = require('./admin')
import { initAdmin } from './admin';
import Noty from 'noty'



//'button2' class is added for 'Add' button which is used to add item in the cart
let addToCart = document.querySelectorAll('.button2');
let orderButton = document.querySelectorAll('button');
let cartCouter = document.querySelector('#cartCouter');

let deleteCartItem = document.querySelectorAll('.delete-item'); //remove button
let addItem = document.querySelectorAll('.add-item');
let removeCartItem = document.querySelectorAll('.remove-item');
let updatedprice = document.querySelector('#updated-price');

// Add items in  the cart
function updateCart(item) {
    axios.post('/update-cart', item).then(res => {
        //console.log(res.data.totalQty)
        cartCouter.innerText = res.data.totalQty

    })
}
//  addToCart Button logic for adding item to cart
addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        // JSON. parse convert json string to object
        let item = JSON.parse(btn.dataset.item)
            //console.log(item)
        updateCart(item)
    })
})

// Edit cart logic

function editCart(itemToEdit, action) {
    axios.post('/edit-cart', { item: itemToEdit.item, action: action }).then(res => {

        console.log(res.data.totalQty)
        console.log(res.data.totalPrice)

        let cartItems = document.querySelectorAll('.ordered_item');

        cartItems.forEach(cartItem => {
            if (cartItem.classList.contains(itemToEdit.item._id)) {
                if (res.data.qty <= 0) {
                    cartItem.remove();
                } else {
                    cartItem.querySelector('#updatedqty').innerText = res.data.qty;
                    cartItem.querySelector('#current-item-price').innerText = res.data.itemPrice.toFixed(2);
                }
            }
        });

        cartCouter.innerText = res.data.totalQty > 0 ? res.data.totalQty : '';
        updatedprice.innerText = res.data.totalPrice > 0 ? res.data.totalPrice.toFixed(2) : 0.00;

    })
}
// increase  items in cart
addItem.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        // JSON. parse convert json string to object
        let item = JSON.parse(btn.dataset.additem)

        editCart(item, 'increase')


    })
})

// decrease the item in cart
deleteCartItem.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let deleteitem = JSON.parse(btn.dataset.deleteitem)
        editCart(deleteitem, 'decrease')


    })
})

// Remove items from cart
removeCartItem.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        // JSON. parse convert json string to object
        let item = JSON.parse(btn.dataset.removeitem)
        editCart(item, 'remove')
    })
})

// change order status
let orderStatus = document.querySelectorAll('.status_line')
let order = document.querySelector('#hiddeninput') ? document.querySelector('#hiddeninput').value : null
order = JSON.parse(order)
console.log('Printing order')
console.log(order)
let time = document.createElement('small')


function updateStatus(order) {
    orderStatus.forEach((status) => {
        //console.log(status.classList)
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    // status is local variable here
    orderStatus.forEach((status) => {
        let datas = status.dataset.status
        console.log(datas)
        if (stepCompleted) {
            status.classList.add('step-completed')

        }
        if (datas === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
            if (status.nextElementSibling) {
                status.nextElementSibling.classList.add('current')

            }
        }
    })

}
updateStatus(order);

initStripe()






// socket connection
//let socket = io()
//initAdmin(socket)
//socket.emit('join', 'welcome')
let socket = io()
initAdmin(socket)
if (order) {
    // socket join
    socket.emit('join', `order_${order._id}`)

}

let AdminPath = window.location.pathname
console.log(AdminPath)

if (AdminPath.includes('admin')) {
    initAdmin(socket)
    socket.emit('join', 'adminChatRoom')
}

socket.on('orderUpdated', (data) => {
    console.log('Hi testing the socket io')
    const updatedOrder = {...order }
    console.log(data)
    console.log(updatedOrder)
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    updateStatus(updatedOrder)
    console.log(data.status)
    console.log(updatedOrder.status)

})