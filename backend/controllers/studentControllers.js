const { generateToken } = require('../context/generateAuthToken');
const { studentModel } = require('../models/studentModel');

// route method for registration of student
const RegisterStudent = async (req, res) => {
    try {
        const { name, email, mono, pic, course, sem, branch, password } = req.body;
        // check value is not empty
        if (!name || !email || !mono || !pic || !course || !sem || !branch || !password) {
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
        const student = await studentModel.create({ name, email, mono, pic, course, sem, branch, password });
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

const getStudentData = async (req, res) => {
    try{
        const studentRes = req.student;
        if(!studentRes){
            console.log("Invalid token getstudentdata");
            res.status(401).json({message: "Unauthorized user invalid token"});
            return;
        }
        console.log(studentRes);
        res.status(200).json(studentRes);
    }catch(error){
        console.log("catch error get student", error);
    }
}

module.exports = { RegisterStudent, LoginStudent, getStudentData }