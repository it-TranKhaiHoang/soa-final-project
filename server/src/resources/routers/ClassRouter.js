const express = require('express');
const router = express.Router();
const ClassController = require('../controllers/ClassController');

router.post('/create', ClassController.postCreate);
router.put('/update', ClassController.putUpdate);
router.get('/list', ClassController.getAllList);
router.get('/list/:grade', ClassController.getListByGrade);
router.get('/:id', ClassController.getDetail);

module.exports = router;
