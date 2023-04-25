const express = require('express');
const router = express.Router();
const axios = require('axios');
const qs = require('qs');
const { getClassroom, createClass } = require('../controllers/principal');

router.get('/', (req, res, next) => {
    res.redirect('/p/classroom');
});

router.get('/classroom', getClassroom);
router.post('/classroom', createClass);

router.get('/teacher', (req, res, next) => {
    res.render('principal/teacher', { user: 'principal', title: 'Teacher' });
});

router.get('/announcement', async (req, res, next) => {
    const user = req.session.acc;
    let listParent;
    let listTeacher;
    let history;
    let countAnnouncement = 0;
    let countRemind = 0;
    let countInvitation = 0;
    listTeacher = (await fetchData('SchoolStaff/teacher')) || null;
    listParent = (await fetchData('parent/list')) || null;
    history = (await fetchData(`ancm/list/sent/${user._id}`)) || null;
    history.forEach((element) => {
        if (element.type == 'remind') countRemind++;
        else if (element.type == 'announcement') countAnnouncement++;
        else countInvitation++;
    });
    const success = req.flash('success') || '';
    const error = req.flash('error') || '';
    res.render('principal/announcement', {
        user: 'principal',
        error,
        success,
        listTeacher,
        listParent,
        history,
        countAnnouncement,
        countInvitation,
        countRemind,
    });
});

router.get('/schedule', (req, res, next) => {
    res.render('principal/schedule', { user: 'principal', title: 'Schedule' });
});

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
router.get('/teacher', async (req, res, next) => {
    const success = req.flash('success') || '';
    const error = req.flash('error') || '';
    const user = req.session.acc;
    let listTeacher;
    listTeacher = (await fetchData('SchoolStaff/teacher')) || null;
    const listFree = listTeacher.filter((item) => {
        return !item.isHomeroom;
    });
    const listHomeroom = listTeacher.filter((item) => {
        return item.isHomeroom;
    });
    res.render('principal/teacher', { user: 'principal', error, success, listFree, listHomeroom, listTeacher });
});
module.exports = router;
