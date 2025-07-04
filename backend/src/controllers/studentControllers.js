import generateToken from "../context/generateAuthToken.js";
import StudentModel from "../models/Student.model.js"
import AttendanceModel from "../models/Attendance.model.js";
import { defaultUserImage } from "../constant.js";

// route method for registration of student
const RegisterStudent = async (req, res) => {
    try {
        const { name, email, pic, course, sem, branch, password } = req.body;

        if (!name || !email || !course || !sem || !branch || !password) {
            console.log("Some Student details Empty");
            res.status(400).json({ message: "Please fill all filds" });
            return;
        }

        // check if user already exist 
        const existUser = await StudentModel.findOne({ email });
        if (existUser) {
            console.log(name, " Student Already Exist");
            res.status(400).json({ message: "User already exist" });
            return;
        }

        // User not exist ( create new user )
        const student = await StudentModel.create({
            name,
            email,
            course,
            pic: pic || defaultUserImage,
            sem,
            branch,
            password
        });

        if (!student) {
            console.log("Failed to Create Student Account");
            res.status(500).json({ message: "Failed to store Data" });
            return;
        }

        // Create Empty attendence for store Attendance in AttendanceModel
        const createAttendence = await AttendanceModel.create({
            studentId: student._id,
            studentName: student.name,
            sem: student.sem,
            branch: student.branch,
            present: 0,
        });

        if (!createAttendence) {
            console.log("Empty Attendence is not created");
            return;
        }

        console.log("Successfullyt Empty attendence created ");

        const token = generateToken(student._id)
        student.token = token;
        await student.save({ validateBeforeSave: false })

        const createdStudent = await StudentModel.findById(student._id).select("-password");

        // console.log(createdStudent);
        console.log(`${createdStudent.name} - ${createdStudent._id} - Account Successfully created!`);
        res.status(201).json(createdStudent);
    } catch (error) {
        console.log(`Server Error during register Student ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Login user method post
const LoginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check that not be empty
        if (!email || !password) {
            console.log("Student Login Input is empty");
            res.status(400).json({ message: "Fill all fields" });
            return;
        }

        // if filled then check if user exist or not
        const studentExist = await StudentModel.findOne({ email });
        if (!studentExist) {
            console.log(email, " Student not exist");
            res.status(404).json({ message: "Student not exist" });
            return;
        }
        // check password is right or not
        if (studentExist && await studentExist.matchPassword(password)) {
            const token = generateToken(studentExist._id);
            studentExist.token = token;
            studentExist.save({validateBeforeSave: false});

            // we dont need password 
            const student = await StudentModel.findById(studentExist._id).select("-password");

            // console.log(student);
            console.log(`${student.name} - ${student._id} - Successfully Login!`)
            res.status(200).json(student);
        } else {
            console.log("Student Password not matched");
            res.status(401).json({ message: "Unauthorized user" });
            return;
        }

    } catch (error) {
        console.log(`Server Error during Student Login ${error}`)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getLoggedStudentData = async (req, res) => {
    try {
        const studentRes = req.student;
        if (!studentRes) {
            console.log("Invalid Student Details Found!");
            return res.status(401).json({ message: "Unauthorized user invalid token" });
        }
        // console.log(studentRes);
        console.log(studentRes.name, " Student Data Fetched!");
        res.status(200).json(studentRes);
    } catch (error) {
        console.log("Server Error during Fetch Student Data", error);
        return;
    }
}

// Get student attendence by id
const getStudentAttendeceById = async (req, res) => {
    try {
        const { _id } = req.body;
        // console.log(_id)
        // check _id is not empty
        if (!_id) {
            console.log("Student Id is required");
            return res.status(401).json({ message: "Id is required" });
        }
        // Search that student attendece by Id
        const student = await AttendanceModel.findOne({ studentId: _id });
        // check student is exist
        if (!student) {
            console.log("Student Attendence is not found : ", student);
            return res.status(401).json({ message: "Student does not exist!" });
        }
        console.log(_id, " Attendence Found");
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
            console.log("Semester required to get Class Students");
            return res.status(400).json({ message: "Semester, Branch required" });
        }
        // Query the database for students in the specified semester
        const students = await StudentModel.find({ sem: sem, branch: branch });
        // Log the retrieved students (for debugging purposes)
        console.log(`You get ${sem} ${branch} Students Data`);
        // Return the retrieved students as a JSON response
        return res.status(201).json(students);
    } catch (error) {
        console.log("Error During Get Sem Branch Students data", error);
        return res.status(500).json({ message: "Error getting students" });
    }
}

// change profile avatar by student
const changeStudentAvatar = async (req, res) => {
    try {
        const { _id, type, avatarURL } = req.body;
        if (!_id || !type || !avatarURL) {
            console.log("Some Filled Empty ", _id, type, avatarURL);
            res.status(400).json({ message: "Empty filled found" });
            return;
        }

        const updatedStudent = await StudentModel.findByIdAndUpdate({ _id }, { $set: { pic: avatarURL } }, { new: true });
        if (!updatedStudent) {
            console.log("Student not found");
            return res.status(404).json({ message: "Student not found" });
        }
        console.log(`${updatedStudent.name} avatar updated successfully`);
        // console.log(updatedStudent);
        res.status(201).json(updatedStudent);

    } catch (error) {
        console.log("Error during set new avtar ", error);
        res.status(500).json({ "message": "Internal Server Error" });
        return;
    }
}

// For only teachers
const getStudentsForAttendance = async (req, res) => {
    try {
        // Get sem and branch
        const { sem, branch } = req.body;
        // Query the database for students in the specified semester branch
        const attendence = await AttendanceModel.find({ sem, branch });
        if (!attendence) {
            console.log("Attendance is Empty!");
            return res.status(500).json({ message: "empty data" });
        }
        // Log the retrieved attendence (for debugging purposes)
        // console.log("Found All Attendance " + attendence);
        // Return the retrieved attendence as a JSON response
        console.log("Student Details Found by Teacher")
        return res.status(201).json(attendence);
    } catch (error) {
        console.log("Error During Get Students for attendence", error);
        return res.status(500).json({ message: "Error getting attendence" });
    }
}

// Teacher/HOD can access student attedance of each class
const getStudentsAttendanceHistoryByTeacher = async (req, res) => {
    try {
        const { sem, branch, date, subject } = req.body;
        console.log(sem, branch, date, subject);
        if (!sem || !branch || !date || !subject) {
            console.log("Semester and Branch required");
            return res.status(400).json({ message: "Semester and Branch required" });
        }

        let attendence = await AttendanceModel.find({ sem: sem, branch: branch });
        attendence = attendence.reduce((acc, curr) => {
            const filtered = curr.all_attendence.filter(a => (a.date === date && a.subject === subject));
            if (filtered.length > 0) {
                acc.push({ ...curr._doc, all_attendence: filtered });
            }
            return acc;
        }, []);

        // console.log("Retrieved attendance for the date: ", attendence);
        console.log("Student History Attendance Get by Teacher")
        return res.status(200).json(attendence);
    } catch (error) {
        console.log("Error getting attendance: ", error);
        return res.status(500).json({ message: "Error getting attendance" });
    }
};

// Teacher/HOD can access student attedance of each class
const getStudentsAttendanceHistoryByHod = async (req, res) => {
    try {
        const { sem, branch, date } = req.body;

        if (!sem || !branch) {
            console.log("Semester and Branch required");
            return res.status(400).json({ message: "Semester and Branch required" });
        }

        let attendence = await AttendanceModel.find({ sem: sem, branch: branch });
        if (date) {
            attendence = attendence.reduce((acc, curr) => {
                const filtered = curr.all_attendence.filter(a => a.date === date);
                if (filtered.length > 0) {
                    acc.push({ ...curr._doc, all_attendence: filtered });
                }
                return acc;
            }, []);
        }

        // console.log("Retrieved attendance for the date: ", attendence);
        console.log("Student History Attendance Get by Teacher")
        return res.status(200).json(attendence);
    } catch (error) {
        console.log("Error getting attendance: ", error);
        return res.status(500).json({ message: "Error getting attendance" });
    }
};

// when clicked saved attendence by teacher then changes in every student database
const submitClassAttendance = async (req, res) => {
    try {
        const { sem, branch, subject, presentStudentsIds, date, day } = req.body;

        if (!sem || !branch, !subject || !presentStudentsIds || !date || !day) {
            console.log("Missing required data for submit attendance");
            res.status(400).json({ message: "Semester, students, date, or day not provided." });
            return;
        }

        const presentStudentRecord = {
            subject,
            date,
            day,
            status: true,
        };

        const absentStudentRecord = {
            subject,
            date,
            day,
            status: false,
        };

        const allStudents = await AttendanceModel.find({ sem, branch });

        if (!allStudents || allStudents.length === 0) {
            console.log("Students Not found to submit attendance");
            return res.status(404).json({ message: "Data not found" });
        }

        const updatedAttendances = [];

        for (const student of allStudents) {
            const studentId = student.studentId.toString(); // Convert to a string to ensure proper comparison

            const presentStudent = presentStudentsIds.find((studentObj) => studentObj._id.toString() === studentId);

            if (presentStudent) {
                console.log(student.name + " is present.");

                // logic for increase present of value

                student.all_attendence.unshift(presentStudentRecord);
            } else {
                console.log(student.name + " is absent.");
                student.all_attendence.unshift(absentStudentRecord);
            }

            updatedAttendances.push(student.save());
        }

        await Promise.all(updatedAttendances);


        console.log("Attendance recorded Successfully");
        // Return a response when all updates are completed
        return res.status(200).json({ message: "Attendance records updated successfully" });

    } catch (error) {
        console.log("Error in submit attendance:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



export {
    RegisterStudent, LoginStudent, getLoggedStudentData, getStudentAttendeceById,
    submitClassAttendance, getStudentsForAttendance, getStudentsAttendanceHistoryByTeacher, getStudentsAttendanceHistoryByHod, getAllStudentData, changeStudentAvatar
}

