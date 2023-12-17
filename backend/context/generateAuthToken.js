
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    try {
        console.log("Token value ........", process.env.JWT_SECRET)
        const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '5d' });
        console.log("JWT Token successfully Generated !", token);
        return token;
    } catch (error) {
        console.log("Error in method", error)
        return;
    }
}

export default generateToken;