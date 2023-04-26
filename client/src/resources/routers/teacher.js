const express = require('express');
const router = express.Router();
const { teacherController } = require('../controllers');

router.get('/', teacherController.dashboard);

router.get('/classroom', teacherController.getClassroom);

router.get('/scoreboard', teacherController.getScoreBoard);

router.get('/schedule', teacherController.getSchedule);

router.get('/attendance', teacherController.getAttendance);

router.get('/announcement', teacherController.getAnnouncement);
router.post('/announcement', teacherController.createAnnouncement);
module.exports = router;
