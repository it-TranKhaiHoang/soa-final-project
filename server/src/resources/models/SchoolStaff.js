const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchoolStaff = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        enum: ['teacher', 'principal'],
    },
    address: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    isHomeroom: {
        type: Boolean,
        default: false,
    },
    classHomeroom: {
        type: mongoose.Types.ObjectId,
        ref: 'Class',
    },
});

module.exports = mongoose.model('SchoolStaff', SchoolStaff);
