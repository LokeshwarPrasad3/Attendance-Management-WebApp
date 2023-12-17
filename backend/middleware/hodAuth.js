import jwt from "jsonwebtoken";
import HodModel from "../models/Hod.model.js";

const hodProtect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // check tooken from headers
            token = req.headers.authorization.split(" ")[1];
            // console.log("HOD Header Found token ", token);
            console.log("HOD is Authorized !!");
            // check verify from secret_key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.hod = await HodModel.findById(decoded.id).select("-password");
            // console.log(req.hod);
            next();
        } catch (error) {
            console.log("Error during verify token of hod");
            res.status(401).json({ message: "Unanuthorized User" });
            return;
        }
    } if (!token) {
        console.log("HOD - token not found");
        res.status(401).json({ message: "not found token authorization string = " + req.headers.authorization });
    }
}

export default hodProtect;