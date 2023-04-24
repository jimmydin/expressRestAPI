const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Customer', customerSchema)

