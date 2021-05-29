const indexController = require('../app/http/controllers/homeController')
const userController = require('../app/http/controllers/userController')
const cartController = require('../app/http/controllers/client/cartController')
const guest = require('../app/http/middlewares/guest')


function initRoutes(app) {
    // Home page
    app.get('/', indexController().index)


    // login page
    app.get('/login', guest, userController().login);
    app.post('/login', userController().postLogin);

    // Register Page
    app.get('/register', guest, userController().register);
    app.post('/register', userController().postRegister);

    //Logout page
    app.post('/logout', userController().logout);



    // The cart page is inside a folder named clients
    app.get('/cart', cartController().index);
    app.post('/update-cart', cartController().update);

    app.get('/about', (req, res) => {
        res.render('about');
    });

    app.get('/404', (req, res) => {
        res.render('404');
    });

}

//exporting the 'initRoutes' module
module.exports = initRoutes