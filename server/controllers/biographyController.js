const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const Biography = require('../models/biographyModel')
const AppError = require('../utils/appError');

exports.createBiography = catchAsync(async (req, res, next) => {
    const text = req.body.text;
    if((await Biography.find()).length <= 0) {
        const biography = await Biography.create({text})
        res.status(201).json({
            data: {
                biography: biography
            }
        })
    }
    else {
        return next(new AppError('There is already a biography', 400));
    }
    
})

exports.getBiography = catchAsync(async (req, res, next) => {
    const biography = await Biography.find();
    if(biography) {
        res.status(200).json({
            data: {
                biography: biography
            }
        })
    }
    else {
        return next(new AppError('There is no biography added to the database', 404));
    }
})

exports.updateBiography = catchAsync(async (req, res, next) => {
    const newText = req.body.text;
    const biography = await Biography.findOneAndUpdate({}, {text: newText}, {new: true});
    if(biography) {
        res.status(200).json({
            data: {
                biography: biography
            }
        })
    }
    else {
        return next(new AppError('There is no biography added to the database', 404));
    }
})

exports.deleteBiography = catchAsync(async (req, res, next) => {
    const deletedBiography = await Biography.findOneAndDelete({});
    if(deletedBiography) {
        res.status(204).json({
            status: "Successfully deleted!"
        })
    }
    else {
        return next(new AppError('There is no biography added to the database', 404));
    }
})