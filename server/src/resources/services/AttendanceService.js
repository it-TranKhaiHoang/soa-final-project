const Attendance = require('../models/Attendance');

const AttendanceService = {
    create: async (data) => {
        return Attendance.create(data);
    },
    getList: async (condition, options, sortBy, populate) => {
        let skip = options.skip || 0;
        let limit = options.limit || 0;
        return Attendance.find(condition).sort(sortBy).skip(skip).limit(limit).populate(populate).lean();
    },
    getOne: async (condition, populate) => {
        return Attendance.findOne(condition).populate(populate).lean();
    },
    getOneByID: async (id) => {
        return Attendance.findById(id);
    },
    update: async (id, data) => {
        return Attendance.findByIdAndUpdate(id, { $set: data });
    },
    delete: async (id) => {
        return Attendance.findByIdAndDelete(id);
    },
};

module.exports = AttendanceService;
