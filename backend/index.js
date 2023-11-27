const express = require('express');
const cors = require('cors');
const app = express();
// initialized secret variables file .env
require('dotenv').config();
// access json data from frontend
app.use(express.json());
// connection established
require('./db/conn');
// getting PORT no from secret .env file
const PORT = process.env.PORT || 5000;
// cors used for access requested url
app.use(cors());

// There are three main users Routes are below
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const hodRoutes = require('./routes/hodRoutes');

// Making EndPoint For all three users
// for student 
app.use('/api/student', studentRoutes);
// for teacher
app.use('/api/teacher', teacherRoutes);
// for HOD
app.use('/api/hod', hodRoutes);


app.listen(PORT, () => {
    console.log(`Listen at ${PORT}`);
})
