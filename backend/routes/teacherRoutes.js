import express from "express"
import {
    registerTeacher, loginTeacher, getLoggedTeacherData, saveClassWiseAttendanceForHod, getEachSubjectAttendance, getAllTeachers,
    setAssignSubject
} from "../controllers/teacherControllers.js"
import hodProtect from "../middleware/hodAuth.js"
import teacherProtect from "../middleware/teacherAuth.js"
const router = express.Router();

router.route('/register').post(registerTeacher);
router.route('/login').post(loginTeacher);

// This route giving logged Teacher Details
router.route('/').get(teacherProtect, getLoggedTeacherData);

// teacher done attendence and save in class attedance for hod
router.route('/save-class-attendance').post(teacherProtect, saveClassWiseAttendanceForHod)

// teacher done attendence and save in class attedance for hod
router.route('/get-each-subject-attendance').post(teacherProtect, getEachSubjectAttendance)

// Hod have need to access teachers data when class assigned
router.route('/get-all-teachers').get(hodProtect, getAllTeachers).post(hodProtect, setAssignSubject);

export default router;