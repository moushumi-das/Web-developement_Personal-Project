function cartController() {

    return {
        index(req, res) {
            res.render('client/cart')
        },
        update(req, res) {
            // for the first time creating cart and creating structure of object body
            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            let cart = req.session.cart
            if (!cart.items[req.body._id]) {
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                }
                cart.totalQty++;
                cart.totalPrice = cart.totalPrice + req.body.price
            } else {
                cart.items[req.body._id].qty++
                    cart.totalQty++
                    cart.totalPrice = cart.totalPrice + req.body.price
                console.log(cart)
            }
            return res.json({ totalQty: req.session.cart.totalQty, totalPrice: req.session.cart.totalPrice })

        },
        edit(req, res) {

            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            let cart = req.session.cart

            switch (req.body.action) {
                case 'decrease':

                    cart.totalQty--;
                    cart.totalPrice = cart.totalPrice - req.body.item.price
                    cart.items[req.body.item._id].qty--;

                    if (cart.items[req.body.item._id].qty <= 0) {
                        delete cart.items[req.body.item._id];
                    }

                    if (cart.totalQty < 0) {
                        cart.totalQty = 0;
                    }

                    if (cart.totalPrice < 0.00) {
                        cart.totalPrice = 0.00
                    }

                    let updatedCart = req.session.cart;


                    return res.json({

                        totalQty: updatedCart.totalQty,
                        totalPrice: updatedCart.totalPrice,
                        qty: updatedCart.items[req.body.item._id] ? updatedCart.items[req.body.item._id].qty : 0,
                        itemPrice: updatedCart.items[req.body.item._id] ? updatedCart.items[req.body.item._id].item.price * updatedCart.items[req.body.item._id].qty : 0.00
                    })

                case 'increase':

                    cart.totalQty++;
                    cart.totalPrice = cart.totalPrice + req.body.item.price
                    cart.items[req.body.item._id].qty++;

                    let newCart = req.session.cart;
                    return res.json({
                        //action: req.body,
                        totalQty: newCart.totalQty,
                        totalPrice: newCart.totalPrice,
                        qty: newCart.items[req.body.item._id] ? newCart.items[req.body.item._id].qty : 0,
                        itemPrice: newCart.items[req.body.item._id] ? newCart.items[req.body.item._id].item.price * newCart.items[req.body.item._id].qty : 0.00
                    })

                case 'remove':
                    console.log('inside the remove case')

                    cart.totalQty = cart.totalQty - cart.items[req.body.item._id].qty;
                    cart.totalPrice = cart.totalPrice - (req.body.item.price * cart.items[req.body.item._id].qty)
                    delete cart.items[req.body.item._id];

                    let updateCartAfterRemove = req.session.cart;


                    console.log(updateCartAfterRemove);
                    return res.json({
                        totalQty: updateCartAfterRemove.totalQty,
                        totalPrice: updateCartAfterRemove.totalPrice,
                        qty: 0,
                        itemPrice: 0.00
                    })
            }
        }

    }
}

module.exports = cartController