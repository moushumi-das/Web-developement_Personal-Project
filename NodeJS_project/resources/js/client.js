import moment from 'moment';
import axios from 'axios'
//const initAdmin = require('./admin')
import { initAdmin } from './admin';
import Noty from 'noty'


//'button2' class is added for 'Add' button which is used to add item in the cart
let addToCart = document.querySelectorAll('.button2');
let cartCouter = document.querySelector('#cartCouter')

function updateCart(item) {
    axios.post('/update-cart', item).then(res => {
        //console.log(res.data.totalQty)
        cartCouter.innerText = res.data.totalQty

    })
}


addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        // JSON. parse convert json string to object
        let item = JSON.parse(btn.dataset.item)
        updateCart(item)
    })
})

let removeCartItemButton = document.getElementsByClassName('btn btn-danger')

for (var i = 0; i < removeCartItemButton.length; i++) {
    var button = removeCartItemButton[i]
    button.addEventListener('click', removeCartItem)

}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()

}





// change order status
let orderStatus = document.querySelectorAll('.status_line')
let order = document.querySelector('#hiddeninput') ? document.querySelector('#hiddeninput').value : null
order = JSON.parse(order)
let time = document.createElement('small')
    //console.log(orderStatus)

function updateStatus(order) {
    orderStatus.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    // status is local variable here
    orderStatus.forEach((status) => {
        //
        let datas = status.dataset.status
            //console.log(datas)
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

//console.log(orderId)

// socket connection
let socket = io()
initAdmin(socket)
    //socket.emit('join', 'welcome')

if (order) {
    // socket join
    socket.emit('join', `order_${order._id}`)

}

let AdminPath = window.location.pathname
console.log(AdminPath)
if (AdminPath.includes()) {
    socket.emit('join', 'adminChatRoom')
}

socket.on('orderUpdated', (data) => {
    console.log('Hi testing the socket io')
    const updatedOrder = {...order }
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    updateStatus(updatedOrder)
    console.log(data.status)
    new Noty({
        type: 'success',
        timeout: 1000,
        text: 'Order updated',
        progressBar: false,
    }).show();
})