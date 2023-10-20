const express = require('express');
const { getAllAttendence, registerHOD, loginHOD, getLoggedHodData } = require('../controllers/hodControllers');
const { hodProtect } = require('../middleware/hodAuth');
const router = express.Router();

router.route('/admin').get(hodProtect, getAllAttendence)
router.route('/').get(hodProtect, getLoggedHodData);
router.route('/register').post(registerHOD);
router.route('/login').post(loginHOD);

module.exports = router;