const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Class = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        currentYear: {
            type: Number,
            require: true,
        },
        teacher: {
            type: mongoose.Types.ObjectId,
            ref: 'SchoolStaff',
        },
        schedule: { type: [mongoose.Types.ObjectId], ref: 'Schedule' },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Class', Class);
