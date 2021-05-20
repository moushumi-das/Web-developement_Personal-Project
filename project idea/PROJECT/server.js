const express = require('express')
const app = express()
const ejs = require('ejs')
const expressLut = require('express-ejs-layouts')
const path = require('path')
const expresslayout = require('express-ejs-layouts')

app.use(expresslayout)

const PORT = process.env.PORT || 3300

//set up our public folder for static files
app.use(express.static('./public'));
//// view engine setup
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs');



// add the ‘/’ route to render the views/app.ejs page
app.get('/', (request, response) => {
    response.render('home');
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);

})



//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));