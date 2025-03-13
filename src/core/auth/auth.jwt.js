import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();
const secret = process.env.TOKEN_API;

const verifyToken = (req, res, next) => {
    const tokenHeader = req.headers["authorization"];
    const token = tokenHeader && tokenHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({
            statusCode: 401,
            message: 'Não autorizado!'
        });
    };
    try {
        jwt.verify(token, secret);
        next();

    } catch(err){
        return res.status(500).json({
            statusCode: 500,
            message: 'Token invalido!'
        });
    };
};

const createToken = (email) => {
    const token = jwt.sign({name: email}, secret, {
        //expiresIn: 2 * 60
    });
    return token;

};

export {
    verifyToken,
    createToken

};