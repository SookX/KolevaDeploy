const mongoose = require('mongoose');

const Appointment = require('../models/appointmentModel');
const Interval = require('../models/defaultIntervalModel');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const intervalIdToDict = require('../utils/intervalIdToDict');


exports.addInterval = catchAsync(async(req, res, next) => {
    const {days, startHour, endHour, duration, breakBetweenAppointments} = req.body
    if(!Array.isArray(days) || days.length === 0) {
        return next(new AppError('Provide the data', 400));
    }

    if((await Interval.find()).length <= 0) {
        const interval = await Interval.create({
            days: days,
            startHour,
            endHour,
            duration,
            breakBetweenAppointments
        })

        res.status(201).json({
            status: "Success",
            data: {
                interval: interval 
            }
        })
    }
    else {
        return next(new AppError('There is already a default interval', 400));
    }
})


exports.getInterval = catchAsync(async(req, res, next) => {
    const interval = await Interval.find();
    res.status(200).json({
        status: "Success",
        data: {
            interval: interval 
        }
    })
})

exports.updateInterval = catchAsync(async(req, res, next) => {
    const {days, startHour, endHour, duration, breakBetweenAppointments} = req.body;
    const interval = await Interval.findOneAndUpdate({}, {days, startHour, endHour, duration, breakBetweenAppointments}, {new: true});
    if(interval) {
        res.status(200).json({
            data: {
                interval: interval
            }
        })
    }
    else {
        return next(new AppError('There is no interval added to the database', 404));
    }
}) 

exports.getDays = catchAsync(async(req, res, next) => {
    let startDate = new Date().setUTCHours(0, 0, 0, 0);
    let endDate = new Date(new Date().setMonth(new Date().getMonth() + 8))
    
    const allData = await intervalIdToDict(startDate, endDate)

    if(req.query.year) {
        const year = req.query.year;
        let month = req.query.month ? parseInt(req.query.month) - 1 : undefined;
        const day = req.query.day ? parseInt(req.query.day) : undefined;

        const formattedMonth = month !== undefined ? String(month + 1).padStart(2, '0') : '';
        const formattedDay = day !== undefined ? String(day).padStart(2, '0') : '';

        let dateString;
        if (year) {
            if (month !== undefined) {
                dateString = day ? `${year}-${formattedMonth}-${formattedDay}` : `${year}-${formattedMonth}`;
            } else {
                dateString = `${year}`;
            }
        }



        let data = {};
        if (day) {
            data[dateString] = allData[dateString];
            if (!data[dateString]) {
                return next(new AppError('No schedule for this day', 400));
            }
        } else {
            const keys = Object.keys(allData).filter(key => key.startsWith(dateString));
            const filteredData = Object.entries(allData).filter(([key]) => keys.includes(key));
            data = Object.fromEntries(filteredData);
        }
        

        res.status(200).json({
            status: "Success",
            data: {
                data: data,
            },
        });
    }


})