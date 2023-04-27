const express = require('express');
const router = express.Router();
const AnnouncementRouter = require('../routers/AnnouncementRouter');
const AttendanceRouter = require('../routers/AttendanceRouter');
const ClassRouter = require('../routers/ClassRouter');
const ParentRouter = require('../routers/ParentRouter');
const ScheduleRouter = require('../routers/ScheduleRouter');
const SchoolStaffRouter = require('../routers/SchoolStaffRouter');
const ScoresRouter = require('../routers/ScoresRouter');
const StudentRouter = require('../routers/StudentRouter');
const SubjectRouter = require('../routers/SubjectRouter');
const UserRouter = require('../routers/UserRouter');

router.use('/ancm', AnnouncementRouter);
router.use('/attend', AttendanceRouter);
router.use('/class', ClassRouter);
router.use('/parent', ParentRouter);
router.use('/schedule', ScheduleRouter);
router.use('/SchoolStaff', SchoolStaffRouter);
router.use('/scores', ScoresRouter);
router.use('/student', StudentRouter);
router.use('/subject', SubjectRouter);
router.use('/user', UserRouter);

module.exports = router;
