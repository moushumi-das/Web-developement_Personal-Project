const Order = require('../../../models/order')

function statusController() {
    return {

        statusUpdate(req, res) {
            console.log("statusUpdate function working......")
            Order.updateOne({ _id: req.body.orderId }, { status: req.body.orderStatus }, (err, data) => {
                if (err) {
                    return res.redirect('/admin/orders')
                }
                //Emit event
                const eventEmitter = req.app.get('eventEmitter')
                eventEmitter.emit('orderUpdated', { id: req.body.orderId, status: req.body.status })

                return res.redirect('/admin/orders')
            })

        }




    }

}

module.exports = statusController