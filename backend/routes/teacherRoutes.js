const express = require('express');
const { registerTeacher, loginTeacher, getLoggedTeacherData, getAllTeachers, setAssignSubject } = require('../controllers/teacherControllers');
const { hodProtect } = require('../middleware/hodAuth');
const { teacherProtect } = require('../middleware/teacherAuth');
const router = express.Router();

router.route('/register').post(registerTeacher);
router.route('/login').post(loginTeacher);
router.route('/').get(teacherProtect, getLoggedTeacherData);

// taking attendence of student
router.route('/get-all-teachers').get(hodProtect, getAllTeachers).post(hodProtect,setAssignSubject);

module.exports = router;