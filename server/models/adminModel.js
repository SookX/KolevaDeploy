const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcrypt');


const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter a first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter a last name']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    },
    role: {
        type: String,
        default: 'admin'
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        validate: [validator.isEmail, 'Please enter a valid email address'],
        unique: true,
        lowercase: true,
    }
})

adminSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

adminSchema.methods.correctPassword = async function(candidatePassword, userPassword) {    
    return await bcrypt.compare(candidatePassword, userPassword);
}
const Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;