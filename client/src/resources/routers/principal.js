const express = require('express');
const router = express.Router();
const axios = require('axios');
const API_URL = process.env.API_URL;
const qs = require('qs');

router.get('/', (req, res, next) => {
    res.redirect('/p/classroom');
});

const fetchData = async (url) => {
    try {
        const response = await axios.get(`${API_URL}${url}`);
        return response.data;
    } catch (error) {
        return null;
    }
};

router.get('/classroom', async (req, res, next) => {
    const success = req.flash('success') || '';
    const error = req.flash('error') || '';
    let listClass;
    let listTeacher;
    let listAvailableStudent;
    listClass = (await fetchData('class/list')) || null;
    listTeacher = (await fetchData('SchoolStaff/available')) || null;
    listAvailableStudent = (await fetchData('student/list/available')) || null;
    const list = listClass?.map((item) => {
        return { ...item, listStudent: listAvailableStudent };
    });
    const grade1st = list.filter((item) => {
        return item.grade == '1st';
    });
    const grade2nd = list.filter((item) => {
        return item.grade == '2nd';
    });
    const grade3rd = list.filter((item) => {
        return item.grade == '3rd';
    });
    const grade4th = list.filter((item) => {
        return item.grade == '4th';
    });
    const grade5th = list.filter((item) => {
        return item.grade == '5th';
    });
    res.render('principal/classroom', {
        user: 'principal',
        grade1st,
        grade2nd,
        grade3rd,
        grade4th,
        grade5th,
        listTeacher,
        listClass: list,
        success,
        error,
    });
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
    res.render('principal/announcement', { user: 'principal', error, success, listTeacher, listParent, history, countAnnouncement,  countInvitation, countRemind});
});

router.get('/schedule', (req, res, next) => {
    res.render('principal/schedule', { user: 'principal' });
});

router.post('/classroom', (req, res, next) => {
    const data = {
        name: req.body.name,
        currentYear: req.body.currentYear,
        teacher: req.body.teacher,
        grade: req.body.grade,
    };
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data,
        url: `${API_URL}class/create`,
    };
    axios(options)
        .then(function (response) {
            req.flash('success', 'Create new class successfully');
            res.redirect('/principal/classroom');
        })
        .catch(function (error) {
            req.flash('error', 'Create new class fail ' + error);
            res.redirect('/principal/classroom');
        });
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
