const express = require('express');
const { LoginStudent, RegisterStudent, getLoggedStudentData, getStudentAttendeceById,getAllAttendence, submitAttendance, getAllStudentData } = require('../controllers/studentControllers');
const { studentProtect } = require('../middleware/studentAuth');
const { teacherProtect } = require('../middleware/teacherAuth');
const router = express.Router();

router.route('/register').post(RegisterStudent)
router.route('/login').post(LoginStudent);
// student can see own details
router.route('/').get(studentProtect, getLoggedStudentData);
router.route('/my-attendence').post(studentProtect, getStudentAttendeceById);


// NEED OPTIMIZATION THAT TEACHER IS ONLY SEE NEEDED DETAILS NOT ALL
// future feature : use populate method for that

// accept atttendence when done by teacher
router.route('/').post(teacherProtect, submitAttendance);
router.route('/all-attedence').post(teacherProtect, getAllAttendence);
// all student attendence gett
router.route('/get-all-student').post(teacherProtect, getAllStudentData);


module.exports = router;