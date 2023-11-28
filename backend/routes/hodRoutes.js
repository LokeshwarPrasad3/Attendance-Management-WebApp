const express = require('express');
const { registerHOD, loginHOD, getLoggedHodData, getClassWiseAttendance } = require('../controllers/hodControllers');
const  hodProtect  = require('../middleware/hodAuth');
const router = express.Router();

router.route('/register').post(registerHOD);
router.route('/login').post(loginHOD);

// getting logged hod details
router.route('/').get(hodProtect, getLoggedHodData);

// only hod can get class wise attendence of assign branch
router.route('/class-wise-attendance').post(hodProtect, getClassWiseAttendance)

module.exports = router;