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

        // Create Empty attendence in attendenceModel
        const createAttendence = await AttendenceModel.create({
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
        console.log("Successfullyt Empty attendence created " + createAttendence);

        const token = generateToken(student._id)
        student.token = token;
        const data = student;
        console.log(data);
        res.status(201).json(data);
    } catch (error) {
        console.log(error.response)
        console.log(error.response.data.message)
        // toast.error(error.response.data);
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


// For only teachers
const getAllAttendence = async (req, res) => {
    try {
        // Get sem and branch
        const { sem, branch } = req.body;
        console.log("sem branch geeted", sem, branch);
        // Query the database for students in the specified semester branch
        const attendence = await AttendenceModel.find({ sem, branch });
        if (!attendence) {
            console.log("Empty attendence");
            return res.status(500).json({ message: "empty data" });
        }
        // Log the retrieved attendence (for debugging purposes)
        console.log("getted all attendence " + attendence);
        // Return the retrieved attendence as a JSON response
        console.log("Done all");
        return res.status(201).json(attendence);
    } catch (error) {
        console.log("Error getting attendence", error);
        console.log("Error all");
        return res.status(500).json({ message: "Error getting attendence" });
        // Teacher access all attendence
    }
}

// by Retrieve all student attendence data by semester
// const getAttendenceModelForHOD = async (req, res) => {
//     try {
//         console.log("INside function");
//         const { sem, branch, date } = req.body;
//         console.log(sem, branch, date);
//         // Check if the 'sem' parameter is provided
//         if (!sem || !branch) {
//             console.log("Semester required");
//             return res.status(400).json({ message: "Semester, Branch required" });
//         }
//         let attendence;
//         if (!date) {
//             // Query the database for students in the specified semester
//             attendence = await AttendenceModel.find({ sem, branch });
//             console.log("date is not available");
//         } else {
//             attendence = await AttendenceModel.find({ sem: sem, branch: branch });

//             attendence = attendence.filter(item =>
//                 item.all_attendence.some(attendence => attendence.date === date)
//             );

//             console.log("date is available");
//         }
//         // Log the retrieved attendence (for debugging purposes)
//         // console.log("getted all attendence " + attendence);
//         // Return the retrieved attendence as a JSON response
//         return res.status(201).json(attendence);
//     } catch (error) {
//         console.log("Error getting attendence", error);
//         return res.status(500).json({ message: "Error getting attendence" });
//         // Teacher access all attendence
//     }
// }

const getAttendenceModelForHOD = async (req, res) => {
    try {
        const { sem, branch, date } = req.body;

        if (!sem || !branch) {
            console.log("Semester and Branch required");
            return res.status(400).json({ message: "Semester and Branch required" });
        }

        let attendence = await AttendenceModel.find({ sem: sem, branch: branch });
        if (date) {
            attendence = attendence.reduce((acc, curr) => {
                const filtered = curr.all_attendence.filter(a => a.date === date);
                if (filtered.length > 0) {
                    acc.push({ ...curr._doc, all_attendence: filtered });
                }
                return acc;
            }, []);
        }

        console.log("Retrieved attendance for the date: ", attendence);
        return res.status(200).json(attendence);
    } catch (error) {
        console.log("Error getting attendance: ", error);
        return res.status(500).json({ message: "Error getting attendance" });
    }
};



// when clicked saved attendence by teacher then changes in every student database
const submitAttendance = async (req, res) => {
    try {
        const { sem, branch, subject, presentStudentsIds, date, day } = req.body;

        if (!sem || !branch, !subject || !presentStudentsIds || !date || !day) {
            console.log("Missing required data");
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

        const allStudents = await AttendenceModel.find({ sem, branch });

        if (!allStudents || allStudents.length === 0) {
            console.log("Data not found");
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



        // Return a response when all updates are completed
        return res.status(200).json({ message: "Attendance records updated successfully" });

    } catch (error) {
        console.log("Error in submit attendance:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



module.exports = {
    RegisterStudent, LoginStudent, getLoggedStudentData, getStudentAttendeceById,
    submitAttendance, getAllAttendence, getAttendenceModelForHOD, getAllStudentData
}