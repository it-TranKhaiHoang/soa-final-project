const express = require('express');
const AttendanceController = require('../controllers/AttendanceController');
const router = express.Router();

router.post('/create', AttendanceController.postCreate)
router.get('/list', AttendanceController.getListAll);
router.get('/list/:studentID', AttendanceController.getListByStudentID);
router.get('/list/:classID/:date', AttendanceController.getListByClassIDandDate)

module.exports = router;
