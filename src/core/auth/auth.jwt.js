import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET_TOKEN;

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if(!token){
        return res.status(401).json({
            statusCode: 401,
            message: 'Não autorizado!',
            data: []

        });
    };
    try {
        jwt.verify(token, secret);
        next();

    } catch(error){
        return res.status(500).json({
            statusCode: 500,
            message: 'Token invalido!',
            data: []

        });
    };
};
const createToken = (email) => {
    const token = jwt.sign({ email: email }, secret, {
        expiresIn: '15sec'
    });
    return token;

};
const validAuth = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if(!token){
        return res.status(401).json({
            statusCode: 401,
            message: 'Não autorizado!',
            data: []

        });
    };
    jwt.verify(token, secret, (error, user) => {
        if(error){
            return res.status(403).json({
                statusCode: 403,
                message: 'Token inválido!',
                data: []
    
            });
        };
        req.user = token;
        next();

    });
};

export {
    verifyToken,
    createToken,
    validAuth

};