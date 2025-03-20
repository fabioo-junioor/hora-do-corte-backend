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
        jwt.verify(token, secret, (error) => {
            if(error){
                return res.status(token == 'notToken' ? 401 : 403).json({
                    statusCode: token == 'notToken' ? 401 : 403,
                    message: token == 'notToken' ? 'Token inválido!' : 'Sessão expirou!',
                    data: []
        
                });
            };
            next();
    
        });
    } catch(error){
        return res.status(token == 'notToken' ? 401 : 403).json({
            statusCode: token == 'notToken' ? 401 : 403,
            message: token == 'notToken' ? 'Token inválido!' : 'Sessão expirou!',
            data: []

        });
    };
};
const createToken = (email) => {
    const token = jwt.sign({ email: email }, secret, {
        //expiresIn: '15sec'
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
    jwt.verify(token, secret, (error, info) => {
        if(error){
            return res.status(403).json({
                statusCode: 403,
                message: token == 'notToken' ? 'Token inválido!' : 'Sessão expirou!',
                data: []
    
            });
        };
        req.user = token;
        next();

    });
};

export {
    verifyToken,
    createToken

};