const express = require('express');
const router = express.Router();
const ParentController = require('../controllers/ParentController');

router.post('/create', ParentController.postCreate);
router.get('/list', ParentController.getListAll);
router.put('/update/:id', ParentController.putUpdate);
router.get('/list/:classID', ParentController.getListByClassID)
router.get('/detail/:studentID', ParentController.getStudentID)
router.get('/:id', ParentController.getDetail)

module.exports = router;
