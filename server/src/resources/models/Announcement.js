const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Announcement = new Schema({})

module.exports = mongoose.model('Announcement', Announcement);