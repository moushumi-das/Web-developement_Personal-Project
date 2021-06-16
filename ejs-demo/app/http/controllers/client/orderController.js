const Order = require('../../../models/order')
const moment = require('moment')

function orderController() {
    return {
        store(req, res) {
            // request validation

            const { phone, address } = req.body
            if (!phone || !address) {
                req.flash('error', 'All fields are required')
                return res.redirect('/cart')
            }
            console.log(req.body)

            const order = new Order({
                userId: req.user._id,
                items: req.session.cart.items,
                phone: phone,
                address: address
            })
            order.save().then(result => {
                req.flash('success', 'Order placed successfully')

                delete req.session.cart // empty the cart
                return res.redirect('/client/order')

            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/cart')
            })
        },
        async index(req, res) {
            // sorting the active ordes in descending order
            const orders = await Order.find({ userId: req.user._id }, null, { sort: { 'createdAt': -1 } })
            res.render('client/order', { orders: orders, moment: moment })
            console.log(orders)
        },
        async tracker(req, res) {
            // sorting the active ordes in descending order
            const order = await Order.findById(req.params.id)

            // User authurization
            if (req.user._id.toString() == order.userId.toString()) {
                res.render('client/order_tracker', { order: order })
            } else {
                res.redirect('/')
            }
        }
    }
}


module.exports = orderController