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

router.get('/announcement', (req, res, next) => {
    res.render('principal/announcement', { user: 'principal', title: 'Announcement' });
});

router.get('/schedule', (req, res, next) => {
    res.render('principal/schedule', { user: 'principal', title: 'Schedule' });
});

module.exports = router;
