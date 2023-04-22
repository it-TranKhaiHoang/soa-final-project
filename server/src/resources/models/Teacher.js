const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Teacher = new Schema({
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
});

module.exports = mongoose.model('Teacher', Teacher);
