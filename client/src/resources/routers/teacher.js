const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const API_URL = process.env.API_URL;

router.get('/', (req, res, next) => {
    res.render('teacher/dashboard', { user: 'teacher' });
});

router.get('/classroom', (req, res, next) => {
    const user = req.session.user;
    fetch(API_URL + `student/${user.classHomeroom}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(async (result) => {
        result = await result.json();
        res.render('teacher/classroom', { students: result, user: 'teacher' });
    });
});

router.get('/attendance', (req, res, next) => {
    const user = req.session.user;
    fetch(API_URL + `student/${user.classHomeroom}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(async (result) => {
        result = await result.json();
        res.render('teacher/attendance', { students: result, user: 'teacher' });
    });
});

module.exports = router;
