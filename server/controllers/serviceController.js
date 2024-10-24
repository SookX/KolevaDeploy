const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const Service = require('../models/serviceModel')
const AppError = require('../utils/appError');

exports.addService = catchAsync(async (req, res, next) => {
    const {title, text} = req.body;
    const service = await Service.create({title, text});
    if(service) {
        res.status(201).json({
            status: "Success",
            data: {
                service: service
            }
        })
    }
    else {
        return next(new AppError('Something went wrong. Check your body!', 400));
    }
})

exports.getServices = catchAsync(async (req, res, next) => {
    const services = await Service.find();
    res.status(200).json({
        status: "Success",
        data: {
            services: services
        }
    })
})

exports.updateService = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const service = await Service.findByIdAndUpdate(id, req.body, {new: true});
    if(service) {
        res.status(200).json({
            status: "Success",
            data: {
                service: service
            }
        })
    }
    else {
        return next(new AppError('There is no service with this id', 404));
    }
})

exports.updateServices = catchAsync(async (req, res, next) => {
    const obj = req.body.services;
    
})

exports.deleteService = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const service = await Service.findByIdAndDelete(id);
    if(service) {
        res.status(204).json({
            status: "Success"
        })
    }
    else {
        return next(new AppError('There is no service with this id', 404));
    }
})