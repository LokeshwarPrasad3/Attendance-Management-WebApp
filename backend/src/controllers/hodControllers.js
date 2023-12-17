import { defaultUserImage } from "../constant.js";
import generateToken from "../context/generateAuthToken.js";
import AllAttendanceModel from "../models/AllAttendance.model.js";
import HodModel from "../models/Hod.model.js";

// Create Hod Account
const registerHOD = async (req, res) => {

    try {
        const { name, email, branch, pic, password } = req.body;
        if (!name || !email || !branch || !password) {
            console.log("Empty Filled to register HOD");
            res.status(400).json({ message: "Fill all field" });
            return;
        }

        // check if user already exist
        const hodExist = await HodModel.findOne({ email });
        if (hodExist) {
            console.log(`${name} Accouont already exist`);
            res.status(400).json({ message: "User already exist" });
            return;
        }

        // user not exist then create new hod 
        const createHOD = await HodModel.create({
            name,
            email,
            branch,
            pic: pic || defaultUserImage,
            password
        });
        // successfully not created
        if (!createHOD) {
            console.log("HOD accounot not created");
            res.status(500).json({ message: "Server Bad Req" });
            return;
        }
        // successfully created
        console.log(`${createHOD.name} - ${createHOD._id} HOD Account successfully created`);
        console.log(createHOD);
        res.status(201).json(createHOD);

    } catch (error) {
        console.log("Server Error HOD Account not created!", error);
        res.status(500).json({ message: "Server bad req" });
        return;
    }
}

// Login Hod Account
const loginHOD = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check not empty
        if (!email || !password) {
            console.log("Missed Required Filled");
            res.status(400).json({ message: "Fill all fields" });
            return;
        }

        // check user email registered
        const hodExist = await HodModel.findOne({ email });
        if (!hodExist) {
            console.log(email, " HOD not exist");
            res.status(404).json({ message: "email not exist" });
            return;
        }
        // then check password is right or not
        if (hodExist.matchPassword(password)) {
            // means user is valid so generate token and send response
            const token = generateToken(hodExist._id);
            hodExist.token = token;
            hodExist.save({ validateBeforeSave: false });

            // We dont send password inside response
            const hod = await HodModel.findById(hodExist._id).select("-password");
            console.log(`${hod.name} - ${hod._id}  HOD login successfully`);
            console.log(hod);
            res.status(200).json(hod);
            return;
        } else {
            console.log(email, " HOD password not matched");
            res.status(401).json({ message: "Invalid password" });
            return;
        }
    } catch (error) {
        console.log("Server Error during login HOD", error);
        res.status(500).json({ message: "server failed" });
        return;
    }
}

// controller is giving logged hod data
const getLoggedHodData = async (req, res) => {
    try {
        const hodRes = req.hod;
        if (!hodRes) {
            console.log("Invalid token of HOD data");
            return res.status(401).json({ message: "Unauthorized hod invalid token" });
        }
        // console.log(hodRes);
        res.status(200).json(hodRes);
    } catch (error) {
        console.log("Server Error LoggedHOD data not found", error);
        return;
    }
}

// HOD have access class wise attendance of assign branch
const getClassWiseAttendance = async (req, res) => {
    try {
        const { sem, branch, date } = req.body;
        if (!sem || !branch) {
            console.log("Fill all fields");
            return;
        }
        const query = { sem, branch };
        if (date) {
            query.date = date;
        }
        const attendence = await AllAttendanceModel.find(query);

        console.log("ClassWiseStudentAttendance Found by HOD");
        res.status(201).json(attendence);
    } catch (error) {
        console.log("Error during fetch ClassWiseStudentAttendance", error);
        return;
    }

}


export { registerHOD, loginHOD, getLoggedHodData, getClassWiseAttendance }