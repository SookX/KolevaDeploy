const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        unique: true
    },
    

});

const Appointment = mongoose.model('Appointments', appointmentSchema)
module.exports = Appointment;