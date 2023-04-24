const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Announcement = new Schema(
    {
        sendBy: { type: mongoose.Types.ObjectId, ref: 'SchoolStaff' },
        sendTo: { type: [String], required: true },
        type: { type: String, required: true },
        role: { type: String, required: true, enum: ['teachers', 'parents', 'students', 'all'] },
        title: {
            type: String,
            required: true,
        },
        attachment: {
            type: String,
        },
        body: {
            type: String,
            required: true,
        },
        status: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Announcement', Announcement);
