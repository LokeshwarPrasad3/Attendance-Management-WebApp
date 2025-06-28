import StudentModel from "../models/Student.model.js";
import jwt from "jsonwebtoken";


const studentProtect = async (req, res, next) => {
    let token;
    // check that requested header must contains bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1];
            // verify token from secret key
            console.log("token found fom headers", token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // give middleware to access user
            req.student = await StudentModel.findById(decoded.id).select("-password");
            console.log(`${req.student.name} - ${req.student._id} Student is Authorized !!`)
            next();

        } catch (error) {
            console.log("Error during verify token of Student ", error);
            res.status(401).json({ message: "UnAuthorized User" });
            return;
        }
    }
    if (!token) {
        console.log("Student - token not found");
        res.status(401).json({ message: "UnAuthorized User No token" });
        return;
    }
}


export default studentProtect;