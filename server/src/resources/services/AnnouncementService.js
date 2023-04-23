const Announcement = require('../models/Announcement');

const AnnouncementService = {
    create: async (data) => {
        return Announcement.create(data);
    },
    getList: async (condition, options, sortBy, populate) => {
        let skip = options.skip || 0;
        let limit = options.limit || 0;
        return Announcement.find(condition).sort(sortBy).skip(skip).limit(limit).populate(populate).lean();
    },
    getOne: async (condition) => {
        return Announcement.findOne(condition);
    },
    getOneByID: async (id) => {
        return Announcement.findById(id);
    },
    update: async (id, data) => {
        return Announcement.findByIdAndUpdate(id, { $set: data });
    },
    delete: async (id) => {
        return Announcement.findByIdAndDelete(id);
    },
};

module.exports = AnnouncementService;
