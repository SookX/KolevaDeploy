const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

const Service = mongoose.model('service', serviceSchema);
module.exports = Service;