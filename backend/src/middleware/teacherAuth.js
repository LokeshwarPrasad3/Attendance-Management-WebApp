import TeacherModel from "../models/Teacher.model.js";
import jwt from "jsonwebtoken";

const teacherProtect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.teacher = await TeacherModel.findById(decoded.id).select("-password");
            console.log(`${req.teacher.name} - ${req.teacher._id} - Teacher is Authorized !!`);
            next();
        } catch (error) {
            console.log("Error during verify token of teacher", error);
            res.status(401).json({ message: "Unauthorized User" });
            return;
        }
    } if (!token) {
        console.log("teacher - token not found");
        res.status(401).json({ message: req.headers.authorization });
    }
}

export default teacherProtect ;