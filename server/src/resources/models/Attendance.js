const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Attendance = new Schema(
    {
        student: { type: mongoose.Types.ObjectId, ref: 'Student' },
        currentDate: {
            type: Date,
            default: Date.now,
        },
        isPresent: {
            type: Boolean,
            default: false,
        },
        description: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Attendance', Attendance);
