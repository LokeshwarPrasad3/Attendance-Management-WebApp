
import express from "express"
const app = express();
import cors from "cors"

// Parse URL-encoded data
app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"))

// access json data from frontend
app.use(express.json());

// cors used for access requested url
app.use(cors({
    // origin: "*",
    origin: ["https://lokeshwar-attendance.onrender.com", "https://lokeshwar-attendance.netlify.app"],
    credentials: true,
}));

// There are three main users Routes are below
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import hodRoutes from "./routes/hodRoutes.js";

// Making EndPoint For all three users
// for student 
app.use('/api/student', studentRoutes);
// for teacher
app.use('/api/teacher', teacherRoutes);
// for HOD
app.use('/api/hod', hodRoutes);



export { app };