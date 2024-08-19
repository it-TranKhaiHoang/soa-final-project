const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Student = new Schema({
    studentID: {
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
    birth: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    address: { type: String },
    currentGrade: {
        type: String,
        enum: ['1st', '2nd', '3rd', '4th', '5th'],
        required: true,
    },
    currentClass: {
        type: mongoose.Types.ObjectId,
        ref: 'Class',
    },
    parent: { type: mongoose.Types.ObjectId, ref: 'Parent' },
});

module.exports = mongoose.model('Student', Student);
