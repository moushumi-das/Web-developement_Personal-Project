function cartController() {

    return {
        cart(req, res) {
            res.render('client/cart')
        }
    }
}

module.exports = cartController