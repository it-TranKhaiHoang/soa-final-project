const Student = require('../models/Student');

const StudentService = {
    create: async (data) => {
        return Student.create(data);
    },
    getList: async (condition, options, sortBy, populate) => {
        let skip = options.skip || 0;
        let limit = options.limit || 0;
        return Student.find(condition).sort(sortBy).skip(skip).limit(limit).populate(populate).lean();
    },
    getOne: async (condition) => {
        return Student.findOne(condition);
    },
    getOneByID: async (id) => {
        return Student.findById(id);
    },
    update: async (id, data) => {
        return Student.findByIdAndUpdate(id, { $set: data });
    },
    delete: async (id) => {
        return Student.findByIdAndDelete(id);
    },
};

module.exports = StudentService;
