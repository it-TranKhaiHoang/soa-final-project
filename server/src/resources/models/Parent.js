const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Parent = new Schema({
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
    student: { type: mongoose.Types.ObjectId, ref: 'Student' }
});

module.exports = mongoose.model('Parent', Parent);
