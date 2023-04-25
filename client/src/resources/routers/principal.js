const express = require('express');
const router = express.Router();
const { principalController } = require('../controllers');

router.get('/', principalController.dashboard);

router.get('/classroom', principalController.getClassroom);
router.post('/classroom', principalController.createClass);

router.get('/teacher', principalController.getTeacher);

router.get('/announcement', principalController.getAnnouncement);

router.get('/schedule', principalController.getSchedule);

router.post('/announcement', (req, res, next) => {
    const user = req.session.acc;

    const data = {
        title: req.body.title,
        type: req.body.type,
        sendTo: req.body.sendTo,
        body: req.body.body,
        role: req.body.role,
        sendBy: user._id,
    };
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data,
        url: `${API_URL}ancm/create`,
    };
    axios(options)
        .then(function (response) {
            req.flash('success', 'Create new announcement successfully');
            res.redirect('/p/announcement');
        })
        .catch(function (error) {
            req.flash('error', 'Create new announcement fail ' + error);
            res.redirect('/p/announcement');
        });
});

router.get('/student', (req, res, next) => {
    const success = req.flash('success') || '';
    const error = req.flash('error') || '';
    const user = req.session.acc;
    res.render('principal/student', { user: 'principal', error, success });
});

module.exports = router;
