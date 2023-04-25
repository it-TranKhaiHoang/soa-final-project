const express = require('express');
const router = express.Router();
const principalRouter = require('./principal');
const studentRouter = require('./student');
const teacherRouter = require('./teacher');
const authRouter = require('./auth');
const verify = require('../middlewares/verify');

router.use('/s', verify, studentRouter);
router.use('/t', verify, teacherRouter);
router.use('/p', verify, principalRouter);
router.use('/auth', authRouter);

module.exports = router;
