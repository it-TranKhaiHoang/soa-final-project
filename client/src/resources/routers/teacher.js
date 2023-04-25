const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const API_URL = process.env.API_URL;

router.get('/', (req, res, next) => {
    res.send('teacher');
});

router.get('/classroom', (req, res, next) => {
    const user = req.session.user;
    fetch(API_URL + `student/${user.classHomeroom}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(async (result) => {
        result = await result.json();
        res.render('teacher/classroom', { students: result });
    });
});

router.get('/attendance', (req, res, next) => {
    const user = req.session.user;
    fetch(API_URL + `student/${user.classHomeroom}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(async (result) => {
        result = await result.json();
        res.render('teacher/attendance', { students: result });
    });
});

module.exports = router;
