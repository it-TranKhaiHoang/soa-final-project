const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('student');
});

router.get('/a', (req, res, next) => {
    res.send('student1');
});
module.exports = router;
