const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
    image: {
        type: String
    }
})

const Image = mongoose.model('image', imageSchema)
module.exports = Image;