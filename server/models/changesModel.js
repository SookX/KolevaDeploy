const mongoose = require('mongoose')
const AppError = require('../utils/appError')

const changesSchema = new mongoose.Schema({

    startDate: {
        type: Date,
        required: [true, 'Please enter the starting date'],
        unique: true
    },
    endDate: {
        type: Date,
        default: null 
    },
    days: {
        type: [String],
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
    working: {
        type: Boolean
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

changesSchema.pre('save', function(next) {
    if (this.days.length <= 0) {
        this.working = false
    }
    else {
        this.working = true
    }
    next();
})

changesSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();

    if (update.days) {
        if (update.days.length <= 0) {
            this.setUpdate({ ...update, working: false });
        } else {
            this.setUpdate({ ...update, working: true });
        }
    }

    next();
});

changesSchema.pre('save', function(next) {
    if(new Date(this.startDate).getTime() > new Date(this.endDate).getTime()) {
        return next(new AppError('The end date is before the start date', 400));      
    }
    if(parseInt(this.startHour.split(":")[0]) >= parseInt(this.endHour.split(":")[0])) {
        return next(new AppError('The end hour is before the start hour', 400));      
    }
    next();
})

changesSchema.pre('save', async function(next) {
    const overlappingWorkDay = await Change.findOne({
        $or: [
            {
                startDate: { $lte: new Date(this.startDate) },
                endDate: { $gte: new Date(this.startDate) }
            },
            {
                startDate: { $lte: new Date(this.endDate) },
                endDate: { $gte: new Date(this.endDate) }
            },
            {
                startDate: { $gte: new Date(this.startDate) },
                endDate: { $lte: new Date(this.endDate) }
            }
        ]
    });

    if (overlappingWorkDay) {
        return next(new AppError('The selected date range overlaps with an existing work schedule', 400));
    }

    next();
})



const Change = mongoose.model('changes', changesSchema);
module.exports = Change;