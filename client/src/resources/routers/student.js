const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (!req.session.token) return res.redirect('/auth/login');
    res.render('student/schedule');
});

module.exports = router;
