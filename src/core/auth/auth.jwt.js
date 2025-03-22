import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { getUserByEmailModel } from '../../models/user.model.js';

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
        jwt.verify(token, secret, (req, res, error) => {
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
const createToken = (email, pkUser) => {
    const token = jwt.sign({ email: email, pkUser: String(pkUser) }, secret, {
        //expiresIn: '15sec'
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
            return res.status(token == 'notToken' ? 401 : 403).json({
                statusCode: token == 'notToken' ? 401 : 403,
                message: token == 'notToken' ? 'Token inválido!' : 'Sessão expirou!',
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
    } catch (error){
        return res.status(token == 'notToken' ? 401 : 403).json({
            statusCode: token == 'notToken' ? 401 : 403,
            message: token == 'notToken' ? 'Token inválido!' : 'Sessão expirou!',
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