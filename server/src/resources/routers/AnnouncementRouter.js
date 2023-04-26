const express = require('express');
const router = express.Router();
const AnnouncementController = require('../controllers/AnnouncementController');

router.post('/create', AnnouncementController.postCreate);
router.get('/list/receive/:id', AnnouncementController.getListReceived);
router.get('/list/sent/:id', AnnouncementController.getListSent);
router.get('/:id', AnnouncementController.getDetailByID);
module.exports = router;
