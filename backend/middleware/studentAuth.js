const StudentModel = require("../models/Student.model");
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const studentProtect = async (req, res, next) => {
    let token;
    // check that requested header must contains bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1];
            console.log("token : ", token)
            // verify token from secret key
            const decoded = await jwt.verify(token, JWT_SECRET);
            console.log("decoded .id" + decoded.id);  //it give .id not ._id

            // getting res to req.student
            req.student = await StudentModel.findById(decoded.id).select("-password");
            next();

        } catch (error) {
            console.log("Unathorized user", error);
            res.status(401).json({ message: "UnAuthorized User" });
            return;
        }
    }
    if (!token) {
        console.log("Unathorized user no token");
        res.status(401).json({ message: "UnAuthorized User No token" });
        return;
    }
}

module.exports = studentProtect ;