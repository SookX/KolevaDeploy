const mongoose = require('mongoose');

const Appointment = require('../models/appointmentModel');
const Interval = require('../models/defaultIntervalModel');
const Change = require('../models/changesModel');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const intervalIdToDict = require('../utils/intervalIdToDict');

exports.addChange = catchAsync(async(req, res, next) => {
    const {startDate, endDate, days, startHour, endHour, duration, breakBetweenAppointments} = req.body
    const changes = await Change.create({
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        days: days,
        startHour,
        endHour,
        duration,
        breakBetweenAppointments,
        
    })

    res.status(201).json({
        status: "Success",
        data: {
            changes: changes 
        }
    })
})

exports.getChanges = catchAsync(async(req, res, next) => {
    const changes = await Change.find();
    
    res.status(200).json({
        status: "Success",
        data: {
            changes: changes
        }
    })
})

exports.updateChange = catchAsync(async(req, res, next) => {
    const id = req.params.id;
    const {startDate, endDate, days, startHour, endHour, duration, breakBetweenAppointments} = req.body
    const changes = await Change.findByIdAndUpdate(id, {startDate, endDate, days, startHour, endHour, duration, breakBetweenAppointments}, {new: true});
    if(changes) {
        res.status(200).json({
            status: "Success",
            data: {
                change: changes
            }
        })
    }
    else {
        return next(new AppError('There is no pricing with this id', 404));
    }
})

exports.deleteChange = catchAsync(async(req, res, next) => {
    const id = req.params.id;
    await Change.findByIdAndDelete(id)
    res.status(204).json({
        status: "Success"
    })
})