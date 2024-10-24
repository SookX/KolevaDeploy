const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const Pricing = require('../models/pricingModel');
const AppError = require('../utils/appError');


exports.addPricing = catchAsync(async (req, res, next) => {
    const {title, price} = req.body;
    const pricing = await Pricing.create({title, price});
    if(pricing) {
        res.status(201).json({
            status: "Success",
            data: {
                pricing: pricing
            }
        })
    }
    else {
        return next(new AppError('Something went wrong. Check your body!', 400));
    }
})

exports.getPricing = catchAsync(async (req, res, next) => {
    const pricing = await Pricing.find();
    res.status(200).json({
        status: "Success",
        data: {
            pricing: pricing
        }
    })
})

exports.updatePricing = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const pricing = await Pricing.findByIdAndUpdate(id, req.body, {new: true});
    if(pricing) {
        res.status(200).json({
            status: "Success",
            data: {
                pricing: pricing
            }
        })
    }
    else {
        return next(new AppError('There is no pricing with this id', 404));
    }
})

exports.deletePricing = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const pricing = await Pricing.findByIdAndDelete(id);
    if(pricing) {
        res.status(204).json({
            status: "Success"
        })
    }
    else {
        return next(new AppError('There is no pricing with this id', 404));
    }
})