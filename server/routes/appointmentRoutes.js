const express = require('express')
const appointmentController = require('./../controllers/appointmentController');
const authController = require('../controllers/authController');

const appointmentRouter = express.Router()

appointmentRouter.route('/')
    .post(appointmentController.createAppointment)
    .delete(appointmentController.deleteAppointment)
    .get(authController.protect, appointmentController.getAppointmnet)

appointmentRouter.route('/deletePrev')
    .delete(appointmentController.deletePrev)

module.exports = appointmentRouter