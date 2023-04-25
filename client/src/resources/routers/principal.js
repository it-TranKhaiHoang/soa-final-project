const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('principal');
});

router.get('/classroom', (req, res, next) => {
    res.render('principal/classroom');
});

module.exports = router;
