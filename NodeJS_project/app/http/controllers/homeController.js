const Menu = require('../../models/menu')


function indexController() {

    return {
        async index(req, res) {
            const items = await Menu.find()
                //console.log(items)
            return res.render('index', { items: items })



        }
    }
}

module.exports = indexController