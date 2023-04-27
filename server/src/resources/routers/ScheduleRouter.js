const express = require('express');
const router = express.Router();
const ScheduleController = require('../controllers/ScheduleController');

router.post('/create', ScheduleController.postCreate);
router.get('/:classID', ScheduleController.getListByClassID);
module.exports = router;
