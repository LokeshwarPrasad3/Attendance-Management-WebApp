const express = require('express');
const { getStudent, createStudent } = require('../controllers/studentControllers');
const router = express.Router();

router.route('/').post(createStudent).get(getStudent);

module.exports = router;