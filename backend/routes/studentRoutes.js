const express = require('express');
const { LoginStudent, RegisterStudent, getStudentData } = require('../controllers/studentControllers');
const { studentProtect } = require('../middleware/studentAuth');
const router = express.Router();

router.route('/register').post(RegisterStudent)
router.route('/login').post(LoginStudent);
router.route('/').get(studentProtect, getStudentData);

module.exports = router;