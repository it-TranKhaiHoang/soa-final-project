const SchoolStaff = require('../models/SchoolStaff');

const SchoolStaffService = {
    create: async (data) => {
        return SchoolStaff.create(data);
    },
    getList: async (condition, options, sortBy, populate) => {
        let skip = options.skip || 0;
        let limit = options.limit || 0;
        return SchoolStaff.find(condition).sort(sortBy).skip(skip).limit(limit).populate(populate).lean();
    },
    getOne: async (condition) => {
        return SchoolStaff.findOne(condition);
    },
    getOneByID: async (id) => {
        return SchoolStaff.findById(id);
    },
    update: async (id, data) => {
        return SchoolStaff.findByIdAndUpdate(id, { $set: data });
    },
    delete: async (id) => {
        return SchoolStaff.findByIdAndDelete(id);
    },
};

module.exports = SchoolStaffService;
