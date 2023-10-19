const express = require('express');
const { registerTeacher, loginTeacher, getTeachers, setAssignSubject } = require('../controllers/teacherControllers');
const { hodProtect } = require('../middleware/hodAuth');
const router = express.Router();

router.route('/register').post(registerTeacher);
router.route('/login').post(loginTeacher);

// taking attendence of student
router.route('/').get(hodProtect, getTeachers).post(hodProtect,setAssignSubject);

module.exports = router;