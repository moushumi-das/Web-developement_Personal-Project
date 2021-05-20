const express = require('express');
const app = express();
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');

//Database connection

const url = 'mongodb://localhost:27017/onlinefood';

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Database connected...')
});




//// Set static folder. This is for static routing
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));


app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'));
/* ejs view engine template setup. This will help us to dynamically route*/
app.set('view engine', 'ejs');


//routing from routes folder
require('./routes/web')(app);




app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);

})