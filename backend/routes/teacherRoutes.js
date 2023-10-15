const express = require('express');
const { createTeacher } = require('../controllers/teacherControllers');
const router = express.Router();


router.post('/', createTeacher)


module.exports = router;