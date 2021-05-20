const indexController = require('../app/http/controllers/homeController')
const userController = require('../app/http/controllers/userController')
const cartController = require('../app/http/controllers/client/cartController')

function initRoutes(app) {

    // Home page
    app.get('/', indexController().index)


    // login page
    app.get('/login', userController().login);


    // The cart page is inside a folder named clients
    app.get('/cart', cartController().cart);

    app.get('/about', (req, res) => {
        res.render('about');
    });

    app.get('/404', (req, res) => {
        res.render('404');
    });
}

//exporting the 'initRoutes' module
module.exports = initRoutes