const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Subject = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    grade: { type: String, enum: ['1st', '2nd', '3rd', '4th', '5th'], required: true },
});

module.exports = mongoose.model('Subject', Subject);
