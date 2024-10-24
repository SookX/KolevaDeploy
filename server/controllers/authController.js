const Appointment = require('./../models/appointmentModel');
const Admin  = require('./../models/adminModel');
const AppError = require('./../utils/appError');
const jwt = require('jsonwebtoken');
const express = require('express')
const {promisify} = require('util')
const catchAsync = require('./../utils/catchAsync');

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    })
}

exports.registerNewAdmin = catchAsync(async(req, res, next) => {
    const newAdmin = await Admin.create(req.body);
    const token = signToken(newAdmin._id);
    res.status(201).json({
        status: "Success",
        token,
        data: {
            admin: newAdmin
        } 
    })

})

exports.loginAdmin = catchAsync(async(req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }
    const admin = await Admin.findOne({email}).select('+password');
    if(!admin || !(await admin.correctPassword(password, admin.password))) {
        return next(new AppError('Incorrect email or password', 401)); 
    } 
    const token = signToken(admin._id);
    res.status(200).json({
        status: "Success",
        token
    })
})

exports.protect = catchAsync(async(req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token) {
        return next(new AppError('You are not an admin in.', 401));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if(!admin) {
        return next(new AppError('There is no such admin', 401));
    }
    next();
})