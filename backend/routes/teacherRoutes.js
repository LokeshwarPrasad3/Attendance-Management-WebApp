const express = require('express');
const { registerTeacher, loginTeacher, getLoggedTeacherData, saveClassWiseAttendanceForHod, getAllTeachers, setAssignSubject } = require('../controllers/teacherControllers');
const hodProtect = require('../middleware/hodAuth');
const teacherProtect = require('../middleware/teacherAuth');
const router = express.Router();

router.route('/register').post(registerTeacher);
router.route('/login').post(loginTeacher);

// This route giving logged Teacher Details
router.route('/').get(teacherProtect, getLoggedTeacherData);

// teacher done attendence and save in class attedance for hod
router.route('/save-class-attendance').post(teacherProtect, saveClassWiseAttendanceForHod)

// Hod have need to access teachers data when class assigned
router.route('/get-all-teachers').get(hodProtect, getAllTeachers).post(hodProtect, setAssignSubject);


module.exports = router;