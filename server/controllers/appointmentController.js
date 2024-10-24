const Appointment = require('./../models/appointmentModel');
const Admin = require('../models/adminModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const nodemailer = require('nodemailer');


exports.createAppointment = catchAsync(async (req, res, next) => {
    try {
        // Validate request body (add your validation logic here)

        // Create new appointment
        const newAppointment = await Appointment.create(req.body);

        // Setup email transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.APP_EMAIL,
                pass: process.env.APP_PASSWORD
            }
        });

        const date = new Date(req.body.date);
        const formattedDate = date.toISOString().split('T')[0]; 
        const formattedTime = date.toISOString().split('T')[1].split('.')[0];

        // Fetch admin emails
        const admins = await Admin.find({}, 'email');
        const emailPromises = admins.map(admin => {
            return transporter.sendMail({
                to: admin.email,
                subject: "Успешно запазен час",
                html: `
                    <h1>Имате нов запазен час</h1>
                    <h2><b>Дата:</b> ${formattedDate}</h2>
                    <h3><b>Час:</b> ${formattedTime}</h3>
                    <h3><b>Име:</b> ${req.body.firstName} ${req.body.lastName}</h3>
                    <h3><b>Номер:</b> ${req.body.phoneNumber}</h3>
                `
            });
        });

        // Wait for all emails to be sent
        await Promise.all(emailPromises);
        console.log("All emails sent!");

        // Send response
        res.status(201).json({
            status: "Successfully saved",
            data: {
                appointment: newAppointment
            }
        });
    } catch (error) {
        console.error("Error:", error); // Log error for debugging
        res.status(500).json({
            status: "error",
            message: "Something went wrong, please try again later."
        });
        next(error);
    }
});


exports.deleteAppointment = catchAsync(async(req, res, next) => {
    if(req.query.phoneNumber) {
        const deletedAppointment = await Appointment.findOneAndDelete({phoneNumber: req.query.phoneNumber});
        if(!deletedAppointment) {
            return next(new AppError('Няма записани часове на дадения телефонен номер.', 404));
        }
        res.status(204).json({
            status: "Success"
        })
    }
    else {
        return next(new AppError('Моля, напишете телефонен номер на пациент.', 400));
    }

});

exports.getAppointmnet = catchAsync(async(req, res, next) => {
    const appointments = await Appointment.find()
    res.status(200).json({
        status: "Success",
        data: {
            appointments: appointments
        }
    })
})

exports.deletePrev = catchAsync(async (req, res, next) => {
    const result = await Appointment.deleteMany({ date: { $lte: new Date() } });
    
    res.status(200).json({
        status: 'Success',
        message: `${result.deletedCount} appointments deleted successfully!`
    });
});
