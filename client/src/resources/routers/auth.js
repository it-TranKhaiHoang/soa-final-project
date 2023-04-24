const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');

router.get('/login', (req, res, next) => {
    res.render('auth/login', { title: 'Login', layout: 'auth' });
});

router.post('/login', authController.postLogin);
router.get('/logout', authController.postLogout);

router.get('/register', (req, res, next) => {
    res.render('auth/register', { title: 'Register', layout: 'auth' });
});

module.exports = router;
