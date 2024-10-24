const mongoose = require('mongoose');

const qualificationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Qualifications = mongoose.model('Qualification', qualificationSchema);
module.exports = Qualifications;