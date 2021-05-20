function userController() {

    return {
        login(req, res) {
            res.render('login')
        }
    }
}

module.exports = userController