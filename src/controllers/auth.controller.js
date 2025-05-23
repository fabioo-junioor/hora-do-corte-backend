import { loginAuthModel } from '../models/auth.model.js';
import { createToken } from '../core/auth/auth.jwt.js';
import { comparePass } from '../core/security/bcryptjs.js';
import { templateAlertDiscordUser } from '../core/communication/templates.js';
import { sendAlertUser } from '../core/communication/discord.js';
import { getTimeZone } from '../helpers/global.helper.js';
import logger from '../core/security/logger.js';

const isActive = 1;

const loginAuthController = async (req, res) => {
    try{
        const { email, password } = req.body;
        
        let dataResult = await loginAuthModel(email, isActive);
        if(!dataResult){
            logger.error('Erro na conexão', { status: { code: 500, path: req.path }, context: { email: email }});
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };

        if(dataResult.length === 0){
            logger.warn('Email incorreto', { status: { code: 200, path: req.path }, context: { email: email }});
            return res.status(200).json({
                statusCode: 200,
                message: 'Email e/ou senha incorretos!',
                data: []

            });
        };

        let validHash = await comparePass(password, dataResult[0].password);
        if(!validHash){
            logger.warn('Senha incorreta', { status: { code: 200, path: req.path }, context: { email: email }});
            return res.status(200).json({
                statusCode: 200,
                message: 'Email e/ou senha incorretos!',
                data: []

            });
        };

        let token = createToken(email, dataResult[0].pkUser);
        logger.info('Login autorizado', { status: { code: 200, path: req.path }, context: { email: email }});
        return res.status(200).json({
            statusCode: 200,
            message: 'Login autorizado!',
            data: { 
                pkUser: dataResult[0].pkUser,
                isBlocked: dataResult[0].isBlocked,
                token: token
                
            }
        });
    } catch (error){
        logger.error(error.message, { status: { code: 500, path: req.path }});
        return res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};

export default {
    loginAuthController

};