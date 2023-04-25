const express = require('express');
const router = express.Router();
const principalRouter = require('./principal');
const studentRouter = require('./student');
const teacherRouter = require('./teacher');
const authRouter = require('./auth');
const verify = require('../middlewares/verify');
const API_URL = process.env.API_URL;
const axios = require('axios');
router.use('/student', verify, studentRouter);
router.use('/teacher', verify, teacherRouter);
router.use('/principal', verify, principalRouter);
router.use('/auth', authRouter);
router.get('/', (req, res) => {
    if (!req.session.token) return res.redirect('/auth/login');
});

router.get('/addStudent/:classID/:studentID', async (req, res) => {
    await axios
        .put(`${API_URL}class/addStudent/${req.params.classID}/${req.params.studentID}`)
        .then(function (response) {
            if (response) {
                req.flash('success', 'Add student to class successfully');
                res.redirect('/principal/classroom');
            } else {
                req.flash('error', 'Add student fail ');
                res.redirect('/principal/classroom');
            }
        })
        .catch(function (error) {
            req.flash('error', 'Add student fail ' + error);
            res.redirect('/principal/classroom');
        });
});

module.exports = router;
