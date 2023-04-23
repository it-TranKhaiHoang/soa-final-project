const express = require('express');
const router = express.Router();
const SchoolStaffController = require('../controllers/SchoolStaffController');

router.post('/create', SchoolStaffController.postCreate);
router.put('/update/:id', SchoolStaffController.putUpdate);
router.put('/onHomeroom/:id', SchoolStaffController.putOnHomeroom);
router.put('/offHomeroom/:id', SchoolStaffController.putOffHomeroom);
router.get('/teacher', SchoolStaffController.getListTeacher);
router.get('/available', SchoolStaffController.getListAvailable);
router.get('/:id', SchoolStaffController.getDetail);

module.exports = router;
