const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/StudentController');

router.post('/create', StudentController.postCreate);
router.put('/update/:id', StudentController.putUpdate);
router.get('/list', StudentController.getListAll);
router.get('/list/available', StudentController.getListFree);
router.get('/:classID', StudentController.getListByClass);
router.get('/:grade', StudentController.getListByGrade);

module.exports = router;
