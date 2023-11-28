const TeacherModel = require('../models/Teacher.model');
const jwt = require('jsonwebtoken');

const teacherProtect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1];
            console.log("token " , token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("deconded : ", decoded);

            req.teacher = await TeacherModel.findById(decoded.id).select("-password");
            console.log(req.teacher);
            next();
        } catch (error) {
            console.log("unauthorized user");
            res.status(401).json({ message: "Unauthorized User" });
            return;
        }
    } if (!token) {
        console.log("token not found");
        res.status(401).json({ message: req.headers.authorization });
    }
}

module.exports =  teacherProtect ;