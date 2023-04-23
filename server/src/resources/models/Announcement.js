const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Announcement = new Schema(
    {
        sendBy: { type: mongoose.Types.ObjectId, ref: 'SchoolStaff' },
        sendTo: { type: mongoose.Types.ObjectId, ref: 'Student' },
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
