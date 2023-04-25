const express = require('express');
const ScoresController = require('../controllers/ScoresController');
const router = express.Router();

router.post('/create', ScoresController.postCreate);
router.get('/list/wait', ScoresController.getListWaiting);
router.get('/list/:studentID', ScoresController.getListByStudentID);

module.exports = router;
