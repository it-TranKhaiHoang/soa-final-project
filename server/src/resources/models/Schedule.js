const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Schedule = new Schema(
    {
        currentClass: { type: mongoose.Types.ObjectId, ref: 'Class' },
        subject: { type: mongoose.Types.ObjectId, ref: 'Subject' },
        dayOfWeek: {
            type: String,
            required: true,
            enum: ['1', '2', '3', '4', '5'],
        },
        startAt: {
            type: Date,
            required: true,
        },
        endAt: {
            type: Date,
            required: true,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Schedule', Schedule);
