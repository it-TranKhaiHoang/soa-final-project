const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Subject = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    teacher: { type: mongoose.Types.ObjectId, ref: 'SchoolStaff' },
});

module.exports = mongoose.model('Subject', Subject);
