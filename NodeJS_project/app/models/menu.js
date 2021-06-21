const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Creating a schema for feching menu to database
const menuSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true }

})

// foods is our collection name that's why we pass food(singular form of foods)in this function
const Menu = mongoose.model('food', menuSchema)
module.exports = Menu