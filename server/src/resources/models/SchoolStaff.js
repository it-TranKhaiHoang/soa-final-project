const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchoolStaff = new Schema({
    email: {
        type: String,
        required: true,
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
        type: Number,
        required: true,
    },
    position: {
        type: String,
        enum: ["teacher", "principal"]
    },
    address: {
        type: String
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    }
});

module.exports = mongoose.model('SchoolStaff', SchoolStaff);
