const Parent = require('../models/Parent');

const ParentService = {
    create: async (data) => {
        return Parent.create(data);
    },
    getList: async (condition, options, sortBy, populate) => {
        let skip = options.skip || 0;
        let limit = options.limit || 0;
        return Parent.find(condition).sort(sortBy).skip(skip).limit(limit).populate(populate).lean();
    },
    getOne: async (condition) => {
        return Parent.findOne(condition).populate('student');
    },
    getOneByID: async (id) => {
        return Parent.findById(id).populate('student');
    },
    getOneByIDAndLean: async (id) => {
        return Parent.findById(id).populate('student').lean();
    },
    update: async (id, data) => {
        return Parent.findByIdAndUpdate(id, { $set: data });
    },
    delete: async (id) => {
        return Parent.findByIdAndDelete(id);
    },
};

module.exports = ParentService;
