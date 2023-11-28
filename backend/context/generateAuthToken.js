
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

const generateToken = (id) => {
    const token = jwt.sign({id}, SECRET_KEY, {expiresIn: '5d'});
    console.log("Token successfully crated" , token);
    return token;
}

module.exports = generateToken;