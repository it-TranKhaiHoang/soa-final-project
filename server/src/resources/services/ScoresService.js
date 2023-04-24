const Scores = require('../models/Scores');

const ScoresService = {
    create: async (data) => {
        return Scores.create(data);
    },
    getList: async (condition, options, sortBy, populate) => {
        let skip = options.skip || 0;
        let limit = options.limit || 0;
        return Scores.find(condition).sort(sortBy).skip(skip).limit(limit).populate(populate).populate('student').lean();
    },
    getOne: async (condition) => {
        return Scores.findOne(condition);
    },
    getOneByID: async (id) => {
        return Scores.findById(id);
    },
    update: async (id, data) => {
        return Scores.findByIdAndUpdate(id, { $set: data });
    },
    delete: async (id) => {
        return Scores.findByIdAndDelete(id);
    },
};

module.exports = ScoresService;
