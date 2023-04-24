const express = require('express');
const router = express.Router();
const principalRouter = require('./principal');
const studentRouter = require('./student');
const teacherRouter = require('./teacher');
const authRouter = require('./auth');
const verify = require('../middlewares/verify');

router.use(
  '/',
  verify('student'),
  studentRouter,
  verify('teacher'),
  teacherRouter,
  verify('principal'),
  principalRouter
);
router.use('/auth', authRouter);

module.exports = router;
