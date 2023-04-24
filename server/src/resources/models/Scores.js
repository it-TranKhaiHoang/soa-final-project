const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Scores = new Schema(
    {
        student: { type: mongoose.Types.ObjectId, ref: 'Student' },
        subject: { type: mongoose.Types.ObjectId, ref: 'Subject' },
        semester: {
            type: String,
            required: true,
            enum: ['1st', '2nd'],
        },
        year: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            default: 'pending',
            required: true,
        },
        score: {
            type: String,
            required: true,
        },
        levelAchieved: {
            type: String,
            enum: ['H', 'T', 'K'],
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Scores', Scores);
