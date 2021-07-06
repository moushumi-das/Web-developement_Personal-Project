import axios from 'axios'
import Noty from 'noty'

export function placeOrder(formObject) {
    axios.post('/order', formObject).then((res) => {

        setTimeout(() => {
            window.location.href = '/client/order';
        }, 1000);
    }).catch((err) => {
        console.log(err)
    })
}