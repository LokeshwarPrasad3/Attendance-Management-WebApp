const jwt = require('jsonwebtoken');
const HodModel = require('../models/HodModel');

const hodProtect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        console.log("Inside protected");
        try {
            // check tooken from headers
            token = req.headers.authorization.split(" ")[1];
            console.log("hod token: " + token);
            // check verify from secret_key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("decoded hod : " + decoded.id)
            req.hod = await HodModel.findById(decoded.id).select("-password");
            // console.log(req.hod);
            console.log("Okoay hod token found");
            next();
        } catch (error) {
            console.log("UnAuthorized User", error);
            res.status(401).json({ message: "Unanuthorized User" });
            return;
        }
    } if (!token) {
        console.log("token not found");
        res.status(401).json({ message: "not found token authorization string = " + req.headers.authorization });
    }
}

module.exports = { hodProtect }