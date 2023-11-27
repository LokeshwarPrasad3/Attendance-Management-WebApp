const { TeacherModel } = require("../models/TeacherModel");
const { generateToken } = require('../context/generateAuthToken');
const { allAttedenceModel } = require("../models/AllAttendenceModel");

const registerTeacher = async (req, res) => {
    try {
        const { name, email, specilization, pic, password } = req.body;
        if (!name || !email || !specilization || !password) {
            console.log("Fill all fields");
            res.status(400).json({ message: "Fill all field" });
            return;
        }

        //check if data is exist in db 
        const teacherExist = await TeacherModel.findOne({ email });
        if (teacherExist) {
            console.log("User already exist");
            res.status(400).json({ message: "User already exist" });
            return;
        }

        // user not exist then create new teacher 
        let teacher;
        if (pic) {
            teacher = await TeacherModel.create({ name, email, specilization, pic, password });
        } else {
            teacher = await TeacherModel.create({ name, email, specilization, password });
        }
        // successfully not created
        if (!teacher) {
            console.log("Teacher accounot not created");
            res.status(500).json({ message: "Server Bad Req" });
            return;
        }
        // successfully created
        const token = generateToken(teacher._id);
        teacher.token = token;
        const data = teacher;
        console.log("Account teacher successfully created");
        console.log(data);
        res.status(201).json(data);

    } catch (error) {
        console.log("Catch error ", error);
        res.status(500).json({ message: "Server bad req" });
        return;
    }
}

// login teacher
const loginTeacher = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check not empty
        if (!email || !password) {
            console.log("Fill all fields");
            res.status(400).json({ message: "Fill all fields" });
            return;
        }

        // check user email registered
        const teacherExist = await TeacherModel.findOne({ email });
        if (!teacherExist) {
            console.log("Teacher email not exist");
            res.status(404).json({ message: "email not exist" });
            return;
        }
        // then check password is right or not
        if (await teacherExist.matchPassword(password)) {
            // means user is valid so generate token and send response
            const token = generateToken(teacherExist._id);
            teacherExist.token = token;
            const data = teacherExist;
            console.log("tacher login successfully");
            console.log(data);
            res.status(200).json(data);
            return;
        } else {
            console.log("passowrd not matched");
            res.status(401).json({ message: "Invalid password" });
            return;
        }
    } catch (error) {
        console.log("catch block login ", error);
        res.status(500).json({ message: "server failed" });
        return;
    }
}

// get only logged teacher data by teacher
const getLoggedTeacherData = async (req, res) => {
    try {
        const teacherRes = req.teacher;
        if (!teacherRes) {
            console.log("Invalid token get teacher data");
            return res.status(401).json({ message: "Unauthorized teacher invalid token" });
        }
        console.log(teacherRes);
        res.status(200).json(teacherRes);
    } catch (error) {
        console.log("catch error get teacher", error);
    }
}

// taking attendence saved then store students
const getAllTeachers = async (req, res) => {
    try {
        const teachers = await TeacherModel.find();
        console.log(teachers);
        res.status(200).json(teachers);
    }
    catch (error) {
        console.log("Failed to get teachers");
        res.status(500).json({ message: "Failed to get teachers" });
        return;
    }
}



// set subject of teacher which have they accessed
const setAssignSubject = async (req, res) => {
    try {
        // get object form of sem and branch which teacher teach
        const { teacherId, teacherTeachClassesData } = req.body;

        console.log("TEacher details " + teacherId);
        console.log("TEacher details " + teacherTeachClassesData);
        // check cannot empty
        if (!teacherId || !teacherTeachClassesData) {
            console.log("Teacher assign data empty:");
            res.status(400).json({ message: "Fill assign class for teacher" })
            return;
        }
        // all done then change to teacher db
        // search that teacher
        const teacherExist = await TeacherModel.findOne({ _id: teacherId });
        // if not exist then return
        if (!teacherExist) {
            console.log("TEacher not exist");
            return res.status(404).json({ message: "Teacher not exist" });
        }
        console.log("teacher exist");
        // if teacher exist
        // teacherExist.updateById(teacherId, { $set: { teach: [teacherTeachClassesData] } });
        teacherExist.teach = teacherTeachClassesData;
        await teacherExist.save();
        console.log("classess assinged : ", teacherExist.teach);
        res.status(201).json(teacherExist);

    } catch (error) {
        console.log("Cannot assign class", error);
        res.status(500).json({ message: "Cannot assign class to teacher" });
        return;
    }
}


// after student attendence saved that details in hod access db
const saveHodAccessAttendence = async (req, res) => {
    try {
        const { date, day, sem, branch, total } = req.body;

        if (!date || !day || !sem || !branch || !total) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        console.log("hod get date : " + date)

        const attendance = await allAttedenceModel.create({ date, day, sem, branch, total });

        res.status(201).json(attendance);
        console.log("Successfully created in hod access");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error occurred", error: error.message });
    }
}


// -------------- Testing Purpose Controller ---------
const reverseModel = async (req, res) => {
    try {

        // Fetch all documents
        const allDocuments = await allAttedenceModel.find();

        // Reverse the order of documents
        const reversedDocuments = allDocuments.reverse();

        // Clear existing documents
        await allAttedenceModel.deleteMany();

        // Save the reversed documents
        await allAttedenceModel.insertMany(reversedDocuments);

        res.json({ success: true, message: 'Documents reversed and saved successfully.' });

    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ message: "Error occured ", error })
    }
}


module.exports = { registerTeacher, loginTeacher, reverseModel, getLoggedTeacherData, saveHodAccessAttendence, getAllTeachers, setAssignSubject }