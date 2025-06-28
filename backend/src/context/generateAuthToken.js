
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    try {
        const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '5d' });
        // console.log(`${id} - JWTToken successfully Generated !`);
        return token;
    } catch (error) {
        console.log("Error in method", error)
        return;
    }
}

export default generateToken;