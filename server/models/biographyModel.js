const mongoose = require('mongoose')

const biographySchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
    }
})

const Biography = mongoose.model('Biography', biographySchema);
module.exports = Biography;