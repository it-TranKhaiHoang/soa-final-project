const express = require('express');
const router = express.Router();

router.get('/classroom', (req, res) => {
  res.render('teacher/classroom');
});

module.exports = router;
