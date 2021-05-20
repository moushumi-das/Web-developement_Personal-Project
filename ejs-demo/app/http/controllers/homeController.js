const Menu = require('../../models/menu')


function indexController() {

    return {
        index(req, res) {
            Menu.find().then(function(items) {
                console.log(items)
                return res.render('index', { items: items })
            })


        }
    }
}

module.exports = indexController