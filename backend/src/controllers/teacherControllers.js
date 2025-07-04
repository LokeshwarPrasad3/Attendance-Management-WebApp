import TeacherModel from "../models/Teacher.model.js";
import generateToken from "../context/generateAuthToken.js";
import AllAttendanceModel from "../models/AllAttendance.model.js";
import { defaultUserImage } from "../constant.js";

// Create account of Teacher
const registerTeacher = async (req, res) => {
    try {
        const { name, email, specilization, pic, password } = req.body;
        if (!name || !email || !specilization || !password) {
            console.log("Missing Required Filled for register Teacher");
            res.status(400).json({ message: "Fill all field" });
            return;
        }

        // check if user already exist
        const teacherExist = await TeacherModel.findOne({ email });
        if (teacherExist) {
            console.log(name, " Teacher already exist");
            res.status(400).json({ message: "User already exist" });
            return;
        }

        // user not exist then create new teacher 
        const teacher = await TeacherModel.create({
            name,
            email,
            specilization,
            pic: pic || defaultUserImage,
            password
        });
        // successfully not created
        if (!teacher) {
            console.log(name, "Error during creationg of teacher");
            res.status(500).json({ message: "Error not created teacher account" });
            return;
        }

        // We dont want to add password in response
        const createdTeacher = await TeacherModel.findById(teacher._id).select("-password");
        // console.log(createdTeacher);
        console.log(`${createdTeacher.name} - ${createdTeacher.id} teacher account successfully created!!`);
        res.status(201).json(createdTeacher);

    } catch (error) {
        console.log("Server Error during creation Teacher Account ", error);
        res.status(500).json({ message: "Server bad req" });
        return;
    }
}

// login teacher account
const loginTeacher = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check not empty
        if (!email || !password) {
            console.log("Missing Required Fieleds");
            res.status(400).json({ message: "Fill all fields" });
            return;
        }

        // check user email registered
        const teacherExist = await TeacherModel.findOne({ email });
        if (!teacherExist) {
            console.log(email, " Teacher not exist");
            res.status(404).json({ message: "email not exist" });
            return;
        }
        // then check password is right or not
        if (await teacherExist.matchPassword(password)) {
            // means user is valid so generate token and send response
            const token = generateToken(teacherExist._id);
            teacherExist.token = token;
            teacherExist.save({ validateBeforeSave: false });
            
            // we dont want to get password
            const teacher = await TeacherModel.findById(teacherExist._id).select("-password");

            // console.log(teacher);
            console.log(`${teacher.name} - ${teacher._id} - Teacher login successfully`);
            res.status(200).json(teacher);
            return;
        } else {
            console.log("teacher passowrd not matched");
            res.status(401).json({ message: "Invalid password" });
            return;
        }
    } catch (error) {
        console.log("Server Error during teacher login ", error);
        res.status(500).json({ message: "server failed" });
        return;
    }
}

// get logged teacher data by teacher
const getLoggedTeacherData = async (req, res) => {
    try {
        const teacherRes = req.teacher;
        if (!teacherRes) {
            console.log("Invalid Teacher Details Token");
            return res.status(401).json({ message: "Unauthorized teacher invalid token" });
        }
        // console.log(teacherRes);
        console.log(`${teacherRes.name} Data successfully found`)
        res.status(200).json(teacherRes);
    } catch (error) {
        console.log("server error to get teacher data", error);
    }
}

// Hod can access all teachers details
const getAllTeachers = async (req, res) => {
    try {
        const teachers = await TeacherModel.find();
        console.log("All Teachers Data Found");
        res.status(200).json(teachers);
    }
    catch (error) {
        console.log("Failed to get all teachers");
        res.status(500).json({ message: "Failed to get all teachers" });
        return;
    }
}

// HOD assign subjects to each teacher
const setAssignSubject = async (req, res) => {
    try {
        // get object form of sem and branch which teacher teach
        const { teacherId, teacherTeachClassesData } = req.body;

        // check cannot empty
        if (!teacherId || !teacherTeachClassesData) {
            console.log("Assign Subject for teacher Missing Required Filleds");
            res.status(400).json({ message: "Fill assign class for teacher" })
            return;
        }
        // all done then change to teacher db
        // search that teacher
        const teacherExist = await TeacherModel.findOne({ _id: teacherId });
        // if not exist then return
        if (!teacherExist) {
            console.log("Teacher does not exist");
            return res.status(404).json({ message: "Teacher not exist" });
        }
        // if teacher exist
        // teacherExist.updateById(teacherId, { $set: { teach: [teacherTeachClassesData] } });
        teacherExist.teach = teacherTeachClassesData;
        await teacherExist.save();
        console.log(teacherExist.name + " teacher classess assinged : ", teacherExist.teach);
        res.status(201).json(teacherExist);

    } catch (error) {
        console.log("Cannot assign class for teacher", error);
        res.status(500).json({ message: "Cannot assign class to teacher" });
        return;
    }
}

// after class attendance done by teacher saved in db accessed by hod only
const saveClassWiseAttendanceForHod = async (req, res) => {
    try {
        const { date, day, sem, branch, total, subject } = req.body;

        if (!date || !day || !sem || !branch || !total || !subject) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const attendance = await AllAttendanceModel.create({ date, day, sem, branch, total, subject });

        res.status(201).json(attendance);
        console.log(`${sem}-${branch}-${date} Attendance Done !!`);
    } catch (error) {
        console.error("Error during saved ClassWiseAttendance !!", error);
        res.status(500).json({ message: "Error occurred", error: error.message });
    }
}

// get class wise attendance for teacher subject wise details
const getEachSubjectAttendance = async (req, res) => {
    try {
        const { subjectArray } = req.body;
        console.log(subjectArray)
        if (!Array.isArray(subjectArray)) {
            console.log("Fill all fields");
            return;
        }
        const resForAllSubject = [];
        for (const subjectDetail of subjectArray) {
            let subjectAttendence = await AllAttendanceModel.find({ subject: subjectDetail?.sem, branch: subjectDetail?.branch, subject: subjectDetail?.subject });
            const newSubject = {
                subject: subjectDetail?.subject,
                totalClassess: subjectAttendence?.length || 0,
            }
            // console.log(newSubject)
            resForAllSubject.push(newSubject);
        }

        console.log("SubjectWise Data Found by Teacher");
        res.status(201).json({ resForAllSubject });
    } catch (error) {
        console.log("Error during fetch ClassWiseStudentAttendance", error);
        return;
    }

}



export { registerTeacher, loginTeacher, getLoggedTeacherData, saveClassWiseAttendanceForHod, getEachSubjectAttendance, getAllTeachers, setAssignSubject }