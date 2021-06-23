const Menu = require('../../../models/menu')


function menuController() {

    return {
        async index(req, res) {
            const items = await Menu.find()
                //console.log(items)
            return res.render('menu', { items: items })



        }
    }
}

module.exports = menuController