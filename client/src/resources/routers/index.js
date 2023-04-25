const express = require('express');
const router = express.Router();
const principalRouter = require('./principal');
const studentRouter = require('./student');
const teacherRouter = require('./teacher');
const authRouter = require('./auth');
const verify = require('../middlewares/verify');
const API_URL = process.env.API_URL;
const axios = require('axios');

router.get('/', (req, res) => {
    res.redirect('/auth/login');
});

router.use('/s', verify, studentRouter);
router.use('/t', verify, teacherRouter);
router.use('/p', verify, principalRouter);
router.use('/auth', authRouter);

router.get('/addStudent/:classID/:studentID', async (req, res) => {
    await axios
        .put(`${API_URL}class/addStudent/${req.params.classID}/${req.params.studentID}`)
        .then(function (response) {
            if (response) {
                req.flash('success', 'Add student to class successfully');
                res.redirect('/p/classroom');
            } else {
                req.flash('error', 'Add student fail ');
                res.redirect('/p/classroom');
            }
        })
        .catch(function (error) {
            req.flash('error', 'Add student fail ' + error);
            res.redirect('/p/classroom');
        });
});

module.exports = router;
