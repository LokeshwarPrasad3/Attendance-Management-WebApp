const { generateToken } = require('../context/generateAuthToken');
const { allAttedenceModel } = require('../models/AllAttendenceModel');
const HodModel = require('../models/HodModel');


const registerHOD = async (req, res) => {

    try {
        const { name, email, branch, pic, password } = req.body;
        if (!name || !email || !branch || !pic || !password) {
            console.log("Fill all fields");
            res.status(400).json({ message: "Fill all field" });
            return;
        }

        //check if data is exist in db 
        const hodExist = await HodModel.findOne({ email });
        if (hodExist) {
            console.log("HOD already exist");
            res.status(400).json({ message: "User already exist" });
            return;
        }

        // user not exist then create new hod 
        const hod = await HodModel.create({ name, email, branch, pic, password });
        // successfully not created
        if (!hod) {
            console.log("HOD accounot not created");
            res.status(500).json({ message: "Server Bad Req" });
            return;
        }
        // successfully created
        const token = generateToken(hod._id);
        hod.token = token;
        const data = hod;
        console.log("Account hod successfully created");
        console.log(data);
        res.status(201).json(data);

    } catch (error) {
        console.log("Catch error ", error);
        res.status(500).json({ message: "Server bad req" });
        return;
    }
}

const loginHOD = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check not empty
        if (!email || !password) {
            console.log("Fill all fields");
            res.status(400).json({ message: "Fill all fields" });
            return;
        }

        // check user email registered
        const hodExist = await HodModel.findOne({ email });
        if (!hodExist) {
            console.log("HOD email not exist");
            res.status(404).json({ message: "email not exist" });
            return;
        }
        // then check password is right or not
        if (hodExist.matchPassword(password)) {
            // means user is valid so generate token and send response
            const token = generateToken(hodExist._id);
            hodExist.token = token;
            const data = hodExist;
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

const getLoggedHodData = async (req, res) => {
    try {
        const hodRes = req.hod;
        if (!hodRes) {
            console.log("Invalid token get hod data");
            return res.status(401).json({ message: "Unauthorized hod invalid token" });
        }
        console.log(hodRes);
        res.status(200).json(hodRes);
    } catch (error) {
        console.log("catch error get hod", error);
    }
}

// HOd can access via sem branch form
const getClassDetails = async (req, res) => {
    try {
        const { sem, branch, date } = req.body;
        if (!sem || !branch) {
            console.log("Fill all fields");
            return;
        }
        let attendence
        if (date) {
            attendence = await allAttedenceModel.find({ sem, branch, date });
        } else {
            attendence = await allAttedenceModel.find({ sem, branch });
        }
        res.status(201).json(attendence);
    } catch (error) {
        console.log("Getting error", error);
        return;
    }

}


module.exports = { registerHOD, loginHOD, getLoggedHodData, getClassDetails }