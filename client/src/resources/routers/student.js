const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');
router.get('/', studentController.dashboard);
router.get('/announcement', studentController.getAnnouncement);
router.get('/scores', studentController.getScores);
router.get('/schedule', studentController.getSchedule);
module.exports = router;
