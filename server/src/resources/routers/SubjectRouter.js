const express = require('express');
const SubjectController = require('../controllers/SubjectController');
const router = express.Router();

router.post('/create', SubjectController.postCreate);
router.get('/list/:grade', SubjectController.getListByGrade);
router.get('/list', SubjectController.getListAll);
module.exports = router;
