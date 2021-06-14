const Order = require('../../../models/order')

function statusController() {
    return {

        statusUpdate(req, res) {
            Order.updateOne({ _id: req.body.orderId }, { status: req.body.orderStatus }, (err, data) => {
                if (err) {
                    return res.redirect('/admin/orders')
                }

                return res.redirect('/admin/orders')
            })

        }




    }

}

module.exports = statusController