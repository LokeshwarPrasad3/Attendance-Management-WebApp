const express = require('express');
const { getAllAttendence, registerHOD, loginHOD, getLoggedHodData, getClassDetails } = require('../controllers/hodControllers');
const { hodProtect } = require('../middleware/hodAuth');
const router = express.Router();

router.route('/').get(hodProtect, getLoggedHodData);
router.route('/hod-access').post(hodProtect, getClassDetails)
router.route('/register').post(registerHOD);
router.route('/login').post(loginHOD);

module.exports = router;