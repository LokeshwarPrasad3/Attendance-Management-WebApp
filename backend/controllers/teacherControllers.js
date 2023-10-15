const { TeacherModel } = require("../models/TeacherModel");
const { generateToken } = require('../context/generateAuthToken');

const registerTeacher = async (req, res) => {
    try {
        const { name, email, specilization, pic, password } = req.body;
        if (!name || !email || !specilization || !pic || !password) {
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
        const teacher = await TeacherModel.create({ name, email, specilization, pic, password });
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

const loginTeacher = async (req, res) => {
    try{
        const {email, password} = req.body;
        // check not empty
        if(!email || !password){
            console.log("Fill all fields");
            res.status(400).json({message: "Fill all fields"});
            return;
        }

        // check user email registered
        const teacherExist = await TeacherModel.findOne({email});
        if(!teacherExist){
            console.log("Teacher email not exist");
            res.status(404).json({message: "email not exist"});
            return;
        }
        // then check password is right or not
        if(teacherExist.matchPassword(teacherExist._id)){
            // means user is valid so generate token and send response
            const token = generateToken(teacherExist._id);
            teacherExist.token = token;
            const data = teacherExist;
            console.log("tacher login successfully");
            console.log(data);
            res.status(200).json(data);
            return;
        }else{
            console.log("passowrd not matched");
            res.status(401).json({message: "Invalid password"});
            return;
        }
    }catch(error){
        console.log("catch block login " , error);
        res.status(500).json({message: "server failed"});
        return;
    }
}

module.exports = { registerTeacher, loginTeacher }