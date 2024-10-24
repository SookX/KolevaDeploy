const mongoose = require('mongoose')
const AppError = require('../utils/appError')

const defaultIntervalSchema = new mongoose.Schema({

    days: {
        type: [String],
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: [true, 'Please enter the days that you want to work in']
    },
    startHour: {
        type: String,
        required: [true, 'Please enter the start hour'],
        validate: {
            validator: function(v) {
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v); 
            },
            message: props => `${props.value} is not a valid start time! Use HH:mm format.`
        }
    },
    endHour: {
        type: String,
        required: [true, 'Please enter the end hour'],
        validate: {
            validator: function(v) {
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v); 
            },
            message: props => `${props.value} is not a valid end time! Use HH:mm format.`
        }
    },
    duration: {
        type: Number,
        default: 30
    },
    breakBetweenAppointments: {
        type: Number,
        default: 0
    },
})

const Interval = mongoose.model('defaultInterval', defaultIntervalSchema);
module.exports = Interval;