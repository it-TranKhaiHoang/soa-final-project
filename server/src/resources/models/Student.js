const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Student = new Schema({
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
        enum: ['male', 'female', 'none'],
        default: 'none',
    },
    address: { type: String },
    grade: {
        type: String,
        enum: ['1st', '2nd', '3rd', '4th', '5th'],
        required: true,
    },
    class: {
        type: mongoose.Types.ObjectId,
        ref: 'Class',
        required: true,
    },
});

module.exports = mongoose.model('Student', Student);
