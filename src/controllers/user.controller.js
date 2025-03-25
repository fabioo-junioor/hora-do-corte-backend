import { getUserByPkModel,
        getUserByEmailModel, createUserModel, 
        updateUserModel, deleteUserModel } from '../models/user.model.js';
import { deleteProfessionalAtUserModel } from '../models/professional.model.js';
import { getTimeZone } from '../helpers/global.helper.js';
import { validAuthPk } from '../core/auth/auth.jwt.js';
import { encryptPass, comparePass } from '../core/security/bcryptjs.js';
import { generatorPass } from '../core/security/passwordGenerator.js';
import { sendEmail } from '../core/communication/config.email.js';
import { templateEmailRecoverPass } from '../core/communication/templates.js';

const isActive = 1;
const isBlocked = 1;
const contactSuport = process.env.CONTACT_SUPORT;

const createUserController = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        let dataUser = await getUserByEmailModel(email);
        if(!dataUser){
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataUser.length !== 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Usuário já existe!',
                data: []

            });
        };
        if(password !== confirmPassword){
            return res.status(200).json({
                statusCode: 200,
                message: 'Senha são diferentes!',
                data: []

            });
        };

        let hash = await encryptPass(password);
        let dataResult = await createUserModel(email, hash, isActive, !isBlocked, getTimeZone());
        if(!dataResult){
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows !== 0){
            return res.status(201).json({
                statusCode: 201,
                message: 'Usuário criado. Efetue o login!',
                data: []
    
            });
        }
    }catch(error){
        return res.status(500).json({
            statusCode: 500,
            message: 'Error ao criar o registro!'

        });
    };
};
const updateUserController = async (req, res) => {
    try {
        const pkUser = req.params.pk;
        const { password, newPassword, confirmPassword } = req.body;
    
        if(!await validAuthPk(req, pkUser)){
            return res.status(400).json({
                statusCode: 400,
                message: 'Operação inválida!'

            });
        };

        let dataUser = await getUserByPkModel(pkUser);
        if(!dataUser){
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };

        let validHash = await comparePass(password, dataUser[0].password);
        if(!validHash){
            return res.status(200).json({
                statusCode: 200,
                message: 'Senha atual não corresponde!',
                data: []

            });
        };   
        if(newPassword !== confirmPassword){
            return res.status(200).json({
                statusCode: 200,
                message: 'As senhas são diferentes!',
                data: []

            });
        };

        let hash = await encryptPass(newPassword);
        let dataResult = await updateUserModel(pkUser, hash, getTimeZone(), isActive);
        if(!dataResult){
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows !== 0){
            return res.status(201).json({
                statusCode: 201,
                message: 'Dados atualizados!',
                data: []
    
            });
        };
    }catch(error){
        return res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};
const deleteUserController = async (req, res) => {
    try{
        const pkUser = req.params.pk;

        if(!await validAuthPk(req, pkUser)){
            return res.status(400).json({
                statusCode: 400,
                message: 'Operação inválida!'

            });
        };
        
        await deleteProfessionalAtUserModel(!isActive, getTimeZone(), pkUser);
        let dataResult = await deleteUserModel(pkUser, getTimeZone(), !isActive);
        if(!dataResult){
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows === 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Algo deu errado ao excluir o usuário!',
                data: []

            });
        };
        return res.status(200).json({
            statusCode: 200,
            message: 'Usuário excluido!',
            data: []

        });
    } catch (error){
        return res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};
const recoverPassUser = async (req, res) => {
    try{
        const { email } = req.body;

        let dataUser = await getUserByEmailModel(email);
        if(!dataUser){
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataUser.length === 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Email incorreto!',
                data: []

            });
        };
        if(dataUser[0].isBlocked == 1){
            return res.status(200).json({
                statusCode: 200,
                message: 'Operação inválida no momento!',
                data: []
                
            });
        };
        
        let newPassword = generatorPass();
        let hash = await encryptPass(newPassword);
        let dataResult = await updateUserModel(dataUser[0].pkUser, hash, getTimeZone(), isActive);
        if(!dataResult){
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows === 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Operação negada para esse email!',
                data: []
    
            });
        };

        /* Enviar email com nova senha */
        let responseEmail = await sendEmail(email, 'Recuperação de senha', templateEmailRecoverPass('Recuperação de senha', newPassword, contactSuport));
        return res.status(201).json({
            statusCode: 201,
            message: `Nova senha encaminhada para o email!`,
            data: []

        });
    } catch (error){
        return res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};

export default {
    createUserController,
    updateUserController,
    deleteUserController,
    recoverPassUser
    
};