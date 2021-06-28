require('dotenv').config()
const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const expressLayout = require('express-ejs-layouts');

const Emitter = require('events')
    //const PORT = process.env.PORT;

const server = http.createServer(app);
const socketio = require('socket.io')
const PORT = process.env.PORT || 3000;


const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash')
const MongoStore = require('connect-mongo')(session);
const passport = require('passport')

//Database connection  
//const url = process.env.mongo_url;
const url = 'mongodb://localhost:27017/onlinefood';


mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});




//Session will be stored in mongodb database
let mongoStore = new MongoStore({
    mongooseConnection: connection,
    // the cart session will be stored in the database collection named ''sessions''
    collection: 'sessions'
})

// Event emitter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)

// Session middleware configuration. We will store cart inside session
// maxAge unit in ms so 24hr =  1000*60*60*24
app.use(session({
    // process env  allow us to access our .env file
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
            //SameSite = None // must be 'none' to enable cross-site delivery
            //secure
    }

    //cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))

// passport config
// passport configuration should be placed under session config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

//express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. 
app.use(express.urlencoded({ extended: false }))

// express.json() is s a built-in middleware function in Express.
// It parses incoming requests with JSON payloads
app.use(express.json())


//// Set static folder. This is for static routing
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));


//Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})


app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'));
/* ejs view engine template setup. This will help us to dynamically route*/
app.set('view engine', 'ejs');


//routing from routes folder
require('./routes/web')(app);




server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);

})


const io = socketio(server, { cors: { origin: "*" } });
io.on('connection', (socket) => {
    console.log("socket connection successfull" + " " + socket.id)
    socket.on('join', (orderid) => {
        console.log(orderid)
        socket.join(orderid)

    })
})
eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data.id}`).emit('orderUpdated', data)
})

eventEmitter.on('orderPlaced', (data) => {
    io.to('adminChatRoom').emit('orderPlaced', data)
})