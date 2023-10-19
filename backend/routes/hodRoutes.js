const express = require('express');
const { getAllAttendence, registerHOD, loginHOD } = require('../controllers/hodControllers');
const router = express.Router();

router.route('/').get(getAllAttendence)
router.route('/register').post(registerHOD);
router.route('/login').post(loginHOD);

module.exports = router;