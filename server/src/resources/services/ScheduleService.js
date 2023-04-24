const Schedule = require('../models/Schedule');

const ScheduleService = {
    create: async (data) => {
        return Schedule.create(data);
    },
    getList: async (condition, options, sortBy, populate) => {
        let skip = options.skip || 0;
        let limit = options.limit || 0;
        return Schedule.find(condition).sort(sortBy).skip(skip).limit(limit).populate(populate).lean();
    },
    getOne: async (condition) => {
        return Schedule.findOne(condition);
    },
    getOneByID: async (id) => {
        return Schedule.findById(id);
    },
    update: async (id, data) => {
        return Schedule.findByIdAndUpdate(id, { $set: data });
    },
    delete: async (id) => {
        return Schedule.findByIdAndDelete(id);
    },
};

module.exports = ScheduleService;
