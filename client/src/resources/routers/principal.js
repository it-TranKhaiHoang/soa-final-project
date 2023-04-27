const express = require('express');
const router = express.Router();
const { principalController } = require('../controllers');

router.get('/', principalController.dashboard);

router.get('/classroom', principalController.getClassroom);
router.post('/classroom', principalController.createClass);

router.get('/teacher', principalController.getTeacher);

router.get('/announcement', principalController.getAnnouncement);

router.get('/schedule', principalController.getSchedule);

router.post('/announcement', principalController.createAnnouncement);

router.get('/schedule/:id', principalController.getScheduleDetail);
router.get('/student', (req, res, next) => {
    const success = req.flash('success') || '';
    const error = req.flash('error') || '';
    const user = req.session.acc;
    res.render('principal/student', { user: 'principal', error, success });
});

module.exports = router;
