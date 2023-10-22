const { generateToken } = require('../context/generateAuthToken');
const { studentModel } = require('../models/studentModel');
const { AttendenceModel } = require('../models/AttendenceModel');


// route method for registration of student
const RegisterStudent = async (req, res) => {
    try {
        const { name, email, pic, course, sem, branch, password } = req.body;
        // check value is not empty
        if (!name || !email || !course || !sem || !branch || !password) {
            console.log("Please fill all fields");
            res.status(400).json({ message: "Please fill all filds" });
            return;
        }

        // if user is already exist 
        const existUser = await studentModel.findOne({ email });
        if (existUser) {
            console.log("User already exist");
            res.status(400).json({ message: "User already exist" });
            return;
        }

        // save to db
        let student;
        if (!pic) {
            student = await studentModel.create({ name, email, course, sem, branch, password });
        } else {
            student = await studentModel.create({ name, email, course, pic, sem, branch, password });
        }
        if (!student) {
            console.log("failed to store data");
            res.status(500).json({ message: "Failed to store Data" });
            return;
        }
        const token = generateToken(student._id)
        student.token = token;
        const data = student;
        console.log(data);
        res.status(201).json(data);
    } catch (error) {
        console.log(`Getting Error Catch Block ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Login user method post
const LoginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check that not be empty
        if (!email || !password) {
            console.log("Fill all fields");
            res.status(400).json({ message: "Fill all fields" });
            return;
        }

        // if filled then check if user exist or not
        const studentExist = await studentModel.findOne({ email });
        if (!studentExist) {
            console.log("User not exist");
            res.status(404).json({ message: "User not exist" });
            return;
        }
        // check password is right or not
        if (studentExist && await studentExist.matchPassword(password)) {
            const token = generateToken(studentExist._id);
            studentExist.token = token;
            let data = studentExist;
            console.log(data);
            res.status(200).json(data);
        } else {
            console.log("Password not matched");
            res.status(401).json({ message: "Unauthorized user" });
            return;
        }

    } catch (error) {
        console.log(`Getting Error ${error}`)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getLoggedStudentData = async (req, res) => {
    try {
        const studentRes = req.student;
        if (!studentRes) {
            console.log("Invalid token getstudentdata");
            return res.status(401).json({ message: "Unauthorized user invalid token" });
        }
        console.log(studentRes);
        res.status(200).json(studentRes);
    } catch (error) {
        console.log("catch error get student", error);
    }
}

// Get student attendence by id
const getStudentAttendeceById = async (req, res) => {
    try {
        const { _id } = req.body;
        // check _id is not empty
        if (!_id) {
            console.log("Id is required");
            return res.status(401).json({ message: "Id is required" });
        }
        // Search that student attendece by Id
        const student = await AttendenceModel.findOne({ studentId: _id });
        // check student is exist
        if (!student) {
            console.log("Student is not found");
            return res.status(401).json({ message: "Student does not exist!" });
        }
        console.log("Student Attendence Found");
        res.status(200).json(student);
    } catch (error) {
        console.log("Error during fetching attendence of student", error);
        return res.status(500).json({ message: "Getting error to find Student attendence" })
    }
}

// Retrieve all students data by semester
const getAllStudentData = async (req, res) => {
    try {
        const { sem, branch } = req.body;
        // Check if the 'sem' parameter is provided
        if (!sem || !branch) {
            console.log("Semester required");
            return res.status(400).json({ message: "Semester, Branch required" });
        }
        // Query the database for students in the specified semester
        const students = await studentModel.find({ sem: sem, branch: branch });
        // Log the retrieved students (for debugging purposes)
        console.log("getted all students " + students);
        // Return the retrieved students as a JSON response
        return res.status(201).json(students);
    } catch (error) {
        console.log("Error getting students", error);
        return res.status(500).json({ message: "Error getting students" });
    }
}

// Retrieve all student attendence data by semester
const getAllAttendence = async (req, res) => {
    try {
        const { sem, branch } = req.body;
        // Check if the 'sem' parameter is provided
        if (!sem || !branch) {
            console.log("Semester required");
            return res.status(400).json({ message: "Semester, Branch required" });
        }
        // Query the database for students in the specified semester
        const attendence = await AttendenceModel.find({ sem: sem, branch: branch });
        // Log the retrieved attendence (for debugging purposes)
        console.log("getted all attendence " + attendence);
        // Return the retrieved attendence as a JSON response
        return res.status(201).json(attendence);
    } catch (error) {
        console.log("Error getting attendence", error);
        return res.status(500).json({ message: "Error getting attendence" });
        // Teacher access all attendence
    }
}


// when clicked saved attendence by teacher then changes in every student database
const submitAttendance = async (req, res) => {
    try {
        const { sem, branch, subject, presentStudentsIds, date, day } = req.body;

        if (!sem || !branch, !subject || !presentStudentsIds || !date || !day) {
            console.log("Missing required data");
            return res.status(400).json({ message: "Semester, students, date, or day not provided." });
        }

        const attendanceRecord = {
            subject,
            date,
            day,
            status: true,
        };

        let data = [];

        for (const student of presentStudentsIds) {
            const studentId = student._id;
            const studentName = student.name;

            // Find the student by ID
            const foundStudent = await studentModel.findById(studentId);
            // student must be valid then
            if (foundStudent && foundStudent.sem === sem) {
                // Check if the attendance record exists for this student and semester
                let attendanceDoc = await AttendenceModel.findOne({ studentId });

                if (!attendanceDoc) {
                    console.log("Tu nhi miila");
                    // If the attendance record doesn't exist, create it
                    attendanceDoc = new AttendenceModel({
                        studentId,
                        studentName,
                        sem,
                        branch,
                        all_attendence: [attendanceRecord], // Note the correct field name here
                    });
                    await attendanceDoc.save();
                } else {
                    console.log("tu mil gya bro");
                    // If the attendance record exists, push the attendance data
                    attendanceDoc.all_attendence.push(attendanceRecord); // Note the correct field name here
                    data.push(await attendanceDoc.save()); // Save the updated document
                }
            }
        }

        res.json({ message: "Attendance records updated successfully.", data: data });
    } catch (error) {
        console.log("Error in submit attendance:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};







module.exports = {
    RegisterStudent, LoginStudent, getLoggedStudentData, getStudentAttendeceById,
    submitAttendance, getAllAttendence, getAllStudentData
}