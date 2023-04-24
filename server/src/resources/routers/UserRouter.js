const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/login', UserController.postLogin);
router.post('/logout', UserController.postLogout);

module.exports = router;
