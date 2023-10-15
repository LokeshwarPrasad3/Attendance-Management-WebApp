const express = require('express');
const { registerTeacher, loginTeacher } = require('../controllers/teacherControllers');
const router = express.Router();


router.route('/register').post(registerTeacher);
router.route('/login').post(loginTeacher);


module.exports = router;