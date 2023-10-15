const { teacherModel } = require('../models/TeacherModel');
const jwt = require('jsonwebtoken');

const teacherProtect = async (req, res, next) => {
    let token;
    // checkout that headers must contains 'Bearer token'
    if (req.headers.autherization && req.headers.autherization.startWith('Bearer')) {
        try {
            token = req.headers.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("deconded : ", decoded);

            req.teacher = await teacherModel.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            console.log("unauthorized user");
            res.status(401).json({ message: "Unauthorized User" });
            return;
        }
    } if(!token){
        console.log("token not found");
        res.tatus(401).json({message : "Unauthorized Usre"});
    }
}

module.exports = {teacherProtect};