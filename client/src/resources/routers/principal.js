const express = require('express');
const router = express.Router();

router.get('/classroom', (req, res, next) => {
  res.render('principal/classroom');
});

module.exports = router;
