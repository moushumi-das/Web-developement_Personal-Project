const Order = require('../../../models/order')

function OrderController() {
    return {
        index(req, res) {

            Order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 } }).populate(userId, '-password').exec((err, orders) => {
                res.render('admin/orders')
            })

        }
    }

}

module.exports = OrderController