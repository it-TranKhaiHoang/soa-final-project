const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Attendance = new Schema(
    {
        class: { type: mongoose.Types.ObjectId, ref: 'Class' },
        students: [
            {
                student: { type: mongoose.Types.ObjectId, ref: 'Student' },
                isPresent: { type: Boolean, default: true },
            },
        ],
        date: {
            type: Date,
            default: Date.now,
        },
        description: String,
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Attendance', Attendance);
