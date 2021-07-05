import moment from 'moment';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
//const initAdmin = require('./admin')
import { initAdmin } from './admin';
import Noty from 'noty'
//import { CardWidget } from './CardWidget';


//'button2' class is added for 'Add' button which is used to add item in the cart
let addToCart = document.querySelectorAll('.button2');
let orderButton = document.querySelectorAll('button');
let cartCouter = document.querySelector('#cartCouter');

let deleteCartItem = document.querySelectorAll('.delete-item'); //remove button
let addItem = document.querySelectorAll('.add-item');
let removeCartItem = document.querySelectorAll('.remove-item');
let updatedprice = document.querySelector('#updated-price');

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
                //console.log(item)
            updateCart(item)
        })
    })
    /*
    // Edit cart logic
    function reduceCartItem(item) {
        axios.post('/reduce-cart', item).then(res => {
            //console.log(res.data.totalQty)
            cartCouter.innerText = res.data.totalQty
            let item = JSON.parse(btn.dataset.item)
            updateCart(item)
            window.location.href = '/cart';

        })

    }
    */






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

addItem.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        // JSON. parse convert json string to object
        let item = JSON.parse(btn.dataset.additem)

        editCart(item, 'increase')


    })
})

deleteCartItem.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let deleteitem = JSON.parse(btn.dataset.deleteitem)
        editCart(deleteitem, 'decrease')


    })
})
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


// stripe

/*
async function initStripe() {
    const stripe = await loadStripe('pk_test_51J6LHZKXBspD5h0ztZ4VCDD7TP310reDozCqDVaN5KFgujqOlV5FQO3ZYDS8vtgKaL9bJmAkxtq7yse4eqBBsEOk00yjsEAJCu');
    const elements = stripe.elements()
    let style = {
        base: {
            color: '#303238',
            fontSize: '16px',
            fontFamily: '"Open Sans", sans-serif',
            fontSmoothing: 'antialiased',
            '::placeholder': {
                color: '#CFD7DF',
            },
        },
        invalid: {
            color: '#e5424d',
            ':focus': {
                color: '#303238',
            },
        },
    };
    let card = elements.create('card', { style })
    card.mount('#card-element')
    const paymentMethod = document.querySelector('#paymentMethod')
    paymentMethod.addEventListener('change', (event) => {
        console.log(event)
        if (event.target.value === 'card') {


        } else {

        }
    })


    //Ajax
    const srtipePayment = document.querySelector('#srtipe_payment_form');
    if (srtipePayment) {
        srtipePayment.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(e)
                //The FormData interface provides a way to easily construct a set of key/value pairs representing form fields and their values,
            let paymentFormData = new FormData(srtipePayment);
            let paymentFormObject = {}
            for (let [key, value] of paymentFormData.entries()) {
                paymentFormObject[key] = value


            }
            axios.post('/order', paymentFormObject).then((res) => {
                console.log(res.data);
                /*new Noty({
                    type: 'success',
                    timeout: 1000,
                    text: res.data.message,
                    progressBar: false,
                }).show();*/

/* window.location.href = '/client/order';

            }).catch((err) => {
                console.log(err)
                    /*new Noty({
                        type: 'success',
                        timeout: 1000,
                        text: err.res.data.message,
                        progressBar: false,
                    }).show();*/
/* })
            console.log(paymentFormObject);
        })
    }
}*/
//console.log(orderId)

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
        /* new Noty({
             type: 'success',
             timeout: 1000,
             text: 'Order updated',
             progressBar: false,
         }).show();*/
})