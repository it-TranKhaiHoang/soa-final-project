const express = require('express');
const router = express.Router();
const AnnouncementController = require('../controllers/AnnouncementController');

router.post('/create', AnnouncementController.postCreate);
router.get('/list/sent', AnnouncementController.getListSent);
router.get('/list/receive', AnnouncementController.getListReceived);
router.get('/:id', AnnouncementController.getDetailByID);
module.exports = router;
