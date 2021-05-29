const mongoose = require('mongoose')
const Schema = mongoose.Schema

//schema 
const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'customer' }

}, { timestamps: true })

// foods is our collection name that's why we pass food(singular form of foods)in this function
module.exports = mongoose.model('User', userSchema)