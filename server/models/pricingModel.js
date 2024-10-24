const mongoose = require('mongoose')

const pricingSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const Pricing = mongoose.model('pricing', pricingSchema);
module.exports = Pricing;