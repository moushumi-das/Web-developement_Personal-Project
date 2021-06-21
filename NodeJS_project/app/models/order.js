const mongoose = require('mongoose')
const Schema = mongoose.Schema

//schema 
const orderSchema = new Schema({

    // making relation between order modue and user module
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: { type: Object, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    paymenType: { type: String, defaut: 'COD' },
    status: { type: String, default: 'order_placed' }

}, { timestamps: true })

// Order will be our collection name 
module.exports = mongoose.model('Order', orderSchema)