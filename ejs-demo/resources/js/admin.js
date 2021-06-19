import axios from 'axios'
import moment from 'moment'



export function initAdmin() {
    const tbody = document.querySelector('#tbody')
        //console.log(tbody)
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
        tbody.innerHTML = "Hi Its working now"
            //orderTableBody.innerHtml = markup
    }).catch(err => {
        console.log(err)
    })

    function renderItems(items) {
        let parsedItems = Object.values(items)
            //console.log(parsedItems)
        return parsedItems.map((orderedItem) => {
            //console.log(orderedItem.item.name)

            return `
                <p>${ orderedItem.item.name } - ${ orderedItem.qty } pcs </p>
            `
        }).join('')
    }

    function generateMarkup(orders) {
        return orders.map(order => {
            return `
                <tr>
                <td class="border px-4 py-2 text-green-900">
                    <p>${ order._id }</p>
                    <div>${ renderItems(order.items) }</div>
                </td>
                <td class="name_column">${ order.userId.name }</td>
                <td class="address_column">${ order.address }</td>
                </td>
                <td class="border px-4 py-2">
                    ${ moment(order.createdAt).format('hh:mm A') }
                </td>
            </tr>
        `
        }).join('')

    }

}