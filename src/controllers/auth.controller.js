import { loginAuthModel } from '../models/auth.model.js';
import { createToken } from '../core/auth/auth.jwt.js';
import { comparePass } from '../core/security/bcryptjs.js';

const isActive = 1;
const isBlocked = 1;

const loginAuthController = async (req, res) => {
    try{
        const { email, password } = req.body;
        
        let dataResult = await loginAuthModel(email, isActive);
        if(!dataResult){
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.length === 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Email e/ou senha incorretos!',
                data: []

            });
        };

        let validHash = await comparePass(password, dataResult[0].password);
        if(!validHash){
            return res.status(200).json({
                statusCode: 200,
                message: 'Email e/ou senha incorretos!',
                data: []

            });
        };
        
        let token = createToken(email, dataResult[0].pkUser);
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
        return res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};

export default {
    loginAuthController

};