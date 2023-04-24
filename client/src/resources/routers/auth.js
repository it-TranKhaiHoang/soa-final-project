const express = require('express');
const router = express.Router();

router.get('/login', (req, res, next) => {
  res.render('auth/login', { title: 'Login', layout: 'auth' });
});

router.get('/register', (req, res, next) => {
  res.render('auth/register', { title: 'Register', layout: 'auth' });
});

module.exports = router;
