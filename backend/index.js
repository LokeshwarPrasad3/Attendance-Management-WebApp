const express = require('express');
const cors = require('cors');
const app = express();
// initialized secret variables file .env
require('dotenv').config();
app.use(express.json());
// connection established
require('./db/conn');
// getting PORT no from secret .env file
const PORT = process.env.PORT || 5000;
// cors used for access requested url
app.use(cors());
// getting routes
const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');
const hodRoutes = require('./routes/hodRoutes');


// Making EndPoint of routes

// for teacher
app.use('/api/teacher', teacherRoutes);
// for student 
app.use('/api/student', studentRoutes);
// for HOD
app.use('/api/hod', hodRoutes);


app.get("/", async (req, res) => {
    res.send("Hello from home");
});

app.listen(PORT, () => {
    console.log(`Listen at ${PORT}`);
})
