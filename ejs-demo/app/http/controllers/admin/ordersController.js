 const Order = require('../../../models/order')

 function OrderController() {
     return {
         index(req, res) {
             console.log('all good')
             Order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 } })
                 .populate('userId', '-password').exec((err, orders) => {
                     /*The req.xhr property returns a true value if the request’s X-Requested-With header 
                     field is XMLHttpRequest which indicates that the request was issued by a client library such as jQuery.*/
                     if (req.xhr) {
                         console.log(orders)
                         return res.json(orders)
                     } else {
                         return res.render('admin/orders')

                     }
                 })


         }
     }

 }

 module.exports = OrderController