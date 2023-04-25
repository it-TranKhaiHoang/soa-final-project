const Class = require('../models/Class');

const ClassService = {
    create: async (data) => {
        return Class.create(data);
    },
    getList: async (condition, options, sortBy, populate) => {
        let skip = options.skip || 0;
        let limit = options.limit || 0;
        return Class.find(condition)
            .sort(sortBy)
            .skip(skip)
            .limit(limit)
            .populate({
                path: 'students',
                populate: {
                    path: 'parent',
                },
            })
            .populate(populate)
            .lean();
    },
    getOne: async (condition) => {
        return Class.findOne(condition);
    },
    getOneByID: async (id) => {
        return Class.findById(id);
    },
    getOneByIDAndPopulate: async (id, populate) => {
        return Class.findById(id).populate(populate);
    },
    getByIDAndLean: async (id) => {
        return Class.findById(id);
    },
    update: async (id, data) => {
        return Class.findByIdAndUpdate(id, { $set: data });
    },
    delete: async (id) => {
        return Class.findByIdAndDelete(id);
    },
};

module.exports = ClassService;
