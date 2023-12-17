import express from "express";
import { registerHOD, loginHOD, getLoggedHodData, getClassWiseAttendance } from "../controllers/hodControllers.js";
import hodProtect from "../middleware/hodAuth.js";
const router = express.Router();

router.route('/register').post(registerHOD);
router.route('/login').post(loginHOD);

// getting logged hod details
router.route('/').get(hodProtect, getLoggedHodData);

// only hod can get class wise attendence of assign branch
router.route('/class-wise-attendance').post(hodProtect, getClassWiseAttendance)

export default router;