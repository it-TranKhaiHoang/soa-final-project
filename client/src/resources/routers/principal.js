const express = require('express');
const router = express.Router();
const { principalController } = require('../controllers');

router.get('/', principalController.dashboard);

router.get('/classroom', principalController.getClassroom);
router.post('/classroom', principalController.createClass);

router.get('/teacher', principalController.getTeacher);

router.get('/announcement', principalController.getAnnouncement);

router.get('/schedule', principalController.getSchedule);

module.exports = router;
