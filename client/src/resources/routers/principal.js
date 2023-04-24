const express = require('express');
const router = express.Router();

router.get('/classroom', (req, res, next) => {
    if (!req.session.token) return res.redirect('/auth/login');
    res.render('principal/classroom');
});

module.exports = router;
