const indexController = require('../app/http/controllers/homeController')
const userController = require('../app/http/controllers/userController')
const cartController = require('../app/http/controllers/client/cartController')
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/Auth')
const admin = require('../app/http/middlewares/admin')
const orderController = require('../app/http/controllers/client/orderController')
const ordersController = require('../app/http/controllers/admin/ordersController')
const statusController = require('../app/http/controllers/admin/statusController')
const menuController = require('../app/http/controllers/client/menuController')

function initRoutes(app) {
    // Home page
    app.get('/', indexController().index)



    // login page
    app.get('/login', guest, userController().login);
    app.post('/login', userController().postLogin)

    // Register Page
    app.get('/register', guest, userController().register);
    app.post('/register', userController().postRegister);

    //Logout page
    app.post('/logout', userController().logout);



    // The cart page is inside a folder named clients
    app.get('/cart', cartController().index);
    app.post('/update-cart', cartController().update);
    app.post('/edit-cart', cartController().edit); // auth middleware is used here to make sure only signed-in customer can complete an order
    app.post('/order', orderController().store);

    // 'auth' is a middleware is created to make sure only signed-in customers can access '/customer/order' page
    app.get('/client/order', orderController().index);
    app.get('/client/order/:id', orderController().tracker);


    app.get('/admin/orders', ordersController().index);
    app.post('/admin/order/status', statusController().statusUpdate);


    app.get('/about', (req, res) => {
        res.render('about');
    });

    app.get('/menu', menuController().index);

}

//exporting the 'initRoutes' module
module.exports = initRoutes