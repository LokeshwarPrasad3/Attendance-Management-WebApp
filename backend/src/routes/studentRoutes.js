import express from "express";

// getting router for better customization
const router = express.Router();
// required all controllers related to Student
import {
    LoginStudent, RegisterStudent, getLoggedStudentData, getStudentAttendeceById,
    getStudentsAttendanceHistoryByTeacher, getStudentsAttendanceHistoryByHod, getStudentsForAttendance,
    submitClassAttendance, getAllStudentData, changeStudentAvatar
} from "../controllers/studentControllers.js";
// middlewares manages layer security
import studentProtect from "../middleware/studentAuth.js";
import teacherProtect from "../middleware/teacherAuth.js";
import hodProtect from "../middleware/hodAuth.js";

router.route('/register').post(RegisterStudent)
router.route('/login').post(LoginStudent);

// student can see own details
router.route('/').get(studentProtect, getLoggedStudentData);
router.route('/logged-student-attendance').post(studentProtect, getStudentAttendeceById);

// change profile picture by user
router.route('/change-avatar').put(studentProtect, changeStudentAvatar);

// NEED OPTIMIZATION THAT TEACHER IS ONLY SEE NEEDED DETAILS NOT ALL like password
// future feature : use populate method for that

// Submit daily class Attendance 
router.route('/submit-class-attendance').post(teacherProtect, submitClassAttendance);

// give student list before attendance
router.route('/get-students-for-attendance').post(teacherProtect, getStudentsForAttendance);

// (not used) giving list of students details by sem, branch 
router.route('/get-all-student').post(teacherProtect, getAllStudentData);

// get students daily attendance history with date by teacher
router.route('/get-attendance-by-teacher').post(teacherProtect, getStudentsAttendanceHistoryByTeacher);
// same as teacher (after access classwise attendance hod can also access particular day of class student attendance)
router.route('/get-attendance-by-hod').post(hodProtect, getStudentsAttendanceHistoryByHod);


export default router;