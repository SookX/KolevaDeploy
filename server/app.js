const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const AppError = require('./utils/appError')

const appointmentRouter = require('./routes/appointmentRoutes')
const adminRouter = require('./routes/adminRoutes');
const intervalRouter =  require('./routes/intervalRoutes');
const serviceRouter =  require('./routes/servicesRoutes');

const globalErrorHandler = require('./controllers/errorController');

const cors = require('cors');
const app = express();
const path = require('path')

console.log(`Type of running: ${process.env.NODE_ENV}`)


// Initializing the Middlewares

app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use(express.static(path.join(__dirname, '/client/dist')))



if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


app.use('/api/appointments', appointmentRouter);
app.use('/api/admin', adminRouter);
app.use('/api/interval', intervalRouter);
app.use('/api/service', serviceRouter);

app.get("*", (req, res) => res.sendFile(path.join(__dirname, '/client/dist/index.html')))
app.all('*', (req, res, next) => {

    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)); 
})

app.use(globalErrorHandler);

module.exports = app;