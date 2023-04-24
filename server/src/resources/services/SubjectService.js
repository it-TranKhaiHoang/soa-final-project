const Subject = require('../models/Subject');

const SubjectService = {
    create: async (data) => {
        return Subject.create(data);
    },
    getList: async (condition, options, sortBy, populate) => {
        let skip = options.skip || 0;
        let limit = options.limit || 0;
        return Subject.find(condition).sort(sortBy).skip(skip).limit(limit).populate(populate).lean();
    },
    getOne: async (condition) => {
        return Subject.findOne(condition);
    },
    getOneByID: async (id) => {
        return Subject.findById(id);
    },
    update: async (id, data) => {
        return Subject.findByIdAndUpdate(id, { $set: data });
    },
    delete: async (id) => {
        return Subject.findByIdAndDelete(id);
    },
};

module.exports = SubjectService;
