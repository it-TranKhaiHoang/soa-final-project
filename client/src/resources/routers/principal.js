const express = require('express');
const router = express.Router();
const { principalController } = require('../controllers');

router.get('/', principalController.dashboard);

router.get('/classroom', principalController.getClassroom);
router.post('/classroom', principalController.createClass);

router.get('/teacher', principalController.getTeacher);
router.post('/teacher', principalController.createTeacher);

router.get('/subject', principalController.getSubject);
router.post('/subject', principalController.createSubject);

router.get('/announcement', principalController.getAnnouncement);
router.post('/announcement', principalController.createAnnouncement);

router.post('/schedule', principalController.createSchedule);
router.get('/schedule/:id', principalController.getScheduleDetail);

router.get('/student', principalController.getStudent);
router.post('/student', principalController.createStudent);

module.exports = router;
