const express = require('express');
const authController = require('../controllers/authController');

const adminRouter = express.Router();

adminRouter.post('/registerAdmin', authController.registerNewAdmin);
adminRouter.post('/login', authController.loginAdmin);

module.exports = adminRouter