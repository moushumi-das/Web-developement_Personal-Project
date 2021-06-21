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

initAdmin()

// change order status
let orderStatus = document.querySelectorAll('.status_line')
let order = document.querySelector('#hiddeninput') ? document.querySelector('#hiddeninput').value : null
order = JSON.parse(order)
let time = document.createElement('small')
    //console.log(orderStatus)

function updateStatus(order) {
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
//let socket = io()
//socket.emit('join', 'welcome')

if (order) {
    // socket join
    socket.emit('join', `order_${order._id}`)

}

socket.on('orderUpdated', (data) => {
    console.log('Hi')
    const updatedOrder = {...order }
    console.log('Hi')
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    console.log("Print data:" + " " + data)
})