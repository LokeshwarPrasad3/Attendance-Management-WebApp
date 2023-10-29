const express = require('express');
const { LoginStudent, RegisterStudent, getLoggedStudentData, getStudentAttendeceById,getAttendenceModelForHOD,getAllAttendence, submitAttendance, getAllStudentData } = require('../controllers/studentControllers');
const { studentProtect } = require('../middleware/studentAuth');
const { teacherProtect } = require('../middleware/teacherAuth');
const { hodProtect } = require('../middleware/hodAuth');
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
// Get all attedenceModel
router.route('/attendence-model').post(teacherProtect, getAttendenceModelForHOD);
// Get all attedenceModel for hod also
router.route('/attendence-model').post(hodProtect, getAttendenceModelForHOD);


module.exports = router;