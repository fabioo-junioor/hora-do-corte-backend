import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { getUserByEmailModel } from '../../models/user.model.js';
import logger from '../security/logger.js';

dotenv.config();
const secret = process.env.SECRET_TOKEN;

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    const statusCode = token == 'notToken' ? 401 : 403;
    const message = token == 'notToken' ? 'Token inválido!' : 'Sessão expirou!';

    if(!token){
        logger.warn('Token não fornecido', { status: { code: 401, path: 'Auth rote' }});
        return res.status(401).json({
            statusCode: 401,
            message: 'Não autorizado!',
            data: []

        });
    };
    try {
       jwt.verify(token, secret);
       next();

    } catch(error) {
        logger.error(message, { status: { code: statusCode, path: 'Auth rote' }});
        return res.status(statusCode).json({
            statusCode: statusCode,
            message: message,
            data: []

        });
    };
};
const createToken = (email, pkUser) => {
    const token = jwt.sign({ email: email, pkUser: String(pkUser) }, secret, {
        expiresIn: '120h'

    });
    return token;

};
const validAuthPk = async (req, pkUser) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if(!token){
        return false;
        
    };
    
    let payload = jwt.verify(token, secret);
    let dataResult = await getUserByEmailModel(payload?.email);
    if(Number(dataResult[0]?.pkUser) !== Number(pkUser)){
        return false;

    };
    return true;

};
const checkUserStatus = async (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1];
    const statusCode = token == 'notToken' ? 401 : 403;
    const message = token == 'notToken' ? 'Token inválido!' : 'Sessão expirou!';
    
    if(!token){
        return res.status(401).json({
            statusCode: 401,
            message: 'Não autorizado!',
            data: []

        });
    };

    try {
        let payload = jwt.verify(token, secret);
        if(!payload?.email){
            return res.status(statusCode).json({
                statusCode: statusCode,
                message: message,
                data: []
    
            });
        };
    
        let dataResult = await getUserByEmailModel(payload?.email);
        return res.status(200).json({
            statusCode: 200,
            message: 'Autorizado!',
            data: dataResult.map((elem) => {
                return { pkUser: elem.pkUser, isBlocked: elem.isBlocked }

            })
        });
    } catch (error) {
        return res.status(statusCode).json({
            statusCode: statusCode,
            message: message,
            data: []

        });
    }
};

export {
    verifyToken,
    createToken,
    validAuthPk,
    checkUserStatus

};