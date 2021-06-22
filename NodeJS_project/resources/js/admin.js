import axios from 'axios'
import moment from 'moment'
import Noty from 'noty'
//import { Socket } from 'socket.io'



export function initAdmin(socket) {
    const tbody = document.querySelector('#tbody')

    let orders = []
    let markup
    axios.get('/admin/orders', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res => {
        orders = res.data
            //console.log(orders)
        markup = generateMarkup(orders)
            //console.log(markup)
        tbody.innerHTML = markup

    }).catch(err => {
        console.log(err)
    })

    function renderItems(items) {
        let parsedItems = Object.values(items)

        return parsedItems.map((orderedItem) => {


            return `
                <p>${ orderedItem.item.name } - ${ orderedItem.qty } pcs </p>
            `
        }).join('')
    }

    function generateMarkup(orders) {
        return orders.map(order => {
            return `
                      <tr>
                      <td class="bord">
                          <p>${ order._id }</p>
                          <div>${ renderItems(order.items) }</div>
                      </td>
                      <td class="name_column">${ order.userId.username }</td>
                      <td class="address_column">${ order.address }</td>
                      </td>
                      <td >
            <div class="statusForm">
                <form action="/admin/order/status" method="POST">
                    <input type="hidden" name="orderId" value="${ order._id }">
                    <select name="orderStatus" onchange="this.form.submit()"
                        class="statusSelector">
                        <option value="order_placed"
                            ${ order.status === 'order_placed' ? 'selected' : '' }>
                            Placed</option>
                        <option value="confirmed" ${ order.status === 'confirmed' ? 'selected' : '' }>
                            Confirmed</option>
                        <option value="prepared" ${ order.status === 'prepared' ? 'selected' : '' }>
                            Prepared</option>
                        <option value="delivered" ${ order.status === 'delivered' ? 'selected' : '' }>
                            Delivered
                        </option>
                        <option value="completed" ${ order.status === 'completed' ? 'selected' : '' }>
                            Completed
                        </option> 
                    </select>
                </form>
                <div
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 86 56" fill-opacity="1">
                        <path
                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
        </td>
        <td class="border px-4 py-2">
            ${ moment(order.createdAt).format('hh:mm A') }
        </td>
                      
                  </tr>
              `
        }).join('')

    }
    socket.on('orderPlaced', (order) => {
        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'New order!',
            progressBar: false,
        }).show();
        orders.unshift(order)
        tbody.innerHTML = ''
        tbody.innerHTML = generateMarkup(orders)
    })

}