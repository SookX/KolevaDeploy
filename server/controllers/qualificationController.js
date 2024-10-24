const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const Qualification = require('../models/qualificationModel')
const AppError = require('../utils/appError');

exports.createQualification = catchAsync(async (req, res, next) => {
    const name = req.body.name;
    const qualification = await Qualification.create({name});
    if(qualification) {
        res.status(201).json({
            status: "Success",
            data: {
                qualification: qualification
            }
        })
    }
    else {
        return next(new AppError('Something went wrong. Check your body!', 400));
    }
})

exports.getQualifications = catchAsync(async (req, res, next) => {

    const qualifications = await Qualification.find();
    res.status(200).json({
        status: "Success",
        data: {
            qualifications: qualifications
        }
    })
});

exports.getQualification = catchAsync(async (req, res, next) => {

    const id = req.params.id;
    const qualification = await Qualification.findById(id);
    if(qualification) {
        res.status(200).json({
            status: "Success",
            data: {
                qualification: qualification
            }
        })
    }
    else {
        return next(new AppError('There is no qualification with this id', 404));
    }
    
});

exports.updateQualification = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const newName = req.body.name;
    const qualification = await Qualification.findByIdAndUpdate(id, {name: newName}, {new: true});
    if(qualification) {
        res.status(200).json({
            status: "Success",
            data: {
                qualification: qualification
            }
        })
    }
    else {
        return next(new AppError('There is no qualification with this id', 404));
    }
})

exports.deleteQualification = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const qualification = await Qualification.findByIdAndDelete(id);
    if(qualification) {
        res.status(204).json({
            status: "Success"
        })
    }
    else {
        return next(new AppError('There is no qualification with this id', 404));
    }
})