import jwt from "jsonwebtoken";
import HodModel from "../models/Hod.model.js";

const hodProtect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // check token from headers (Bearer token)
            token = req.headers.authorization.split(" ")[1];
            console.log("hod token ", token)
            // check verify from secret_key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("decoded ", decoded.id)
            req.hod = await HodModel.findById(decoded.id).select("-password");
            console.log(`${req.hod.name} - ${req.hod._id} HOD is Authorized !!`);
            next();
        } catch (error) {
            console.log("Error during verify token of hod", error);
            res.status(401).json({ message: "Unanuthorized User" });
            return;
        }
    } if (!token) {
        console.log("HOD - token not found");
        res.status(401).json({ message: "not found token authorization string = " + req.headers.authorization });
    }
}

export default hodProtect;