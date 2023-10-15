const express = require('express');
const { getAllAttendence } = require('../controllers/hodControllers');
const router = express.Router();

router.route('/').get(getAllAttendence)

module.exports = router;