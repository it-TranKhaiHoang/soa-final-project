const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Schedule = new Schema(
    {
        class: { type: mongoose.Types.ObjectId, ref: 'Class' },
        subject: { type: mongoose.Types.ObjectId, ref: 'Subject' },
        dayOfWeek: {
            type: String,
            required: true,
            enum: [''],
        },
        session: {
            type: String,
            required: true,
            enum: ['morning', 'afternoon'],
        },
        startAt: {
            type: Date,
            required: true,
        },
        endAt: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Schedule', Schedule);
