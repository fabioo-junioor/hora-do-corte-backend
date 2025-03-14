import { loginUserModel, getUserByIdModel,
        getUserByEmailModel, createUserModel, 
        updateUserModel, deleteUserModel } from '../models/user.model.js';
import { getAllProfessionalModel } from '../models/professional.model.js';
import { createToken } from '../core/auth/auth.jwt.js';
import { encryptPass, comparePass } from '../core/security/bcryptjs.js';
import { generatorPass } from '../core/security/passwordGenerator.js';
import { sendEmail } from '../core/communication/config.email.js';

const dateToday = new Date();
const isActive = 1;

const loginUserController = async (req, res) => {
    try{
        const { email, password } = req.body;

        const dataResult = await loginUserModel(email);
        if(!dataResult){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.length === 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Email incorreto!',
                data: []

            });
        };
        let validHash = await comparePass(password, dataResult[0].password);
        if(!validHash){
            return res.status(200).json({
                statusCode: 200,
                message: 'Senha incorreta!',
                data: []

            });
        };
        const token = createToken(email);
        return res.status(200).json({
            statusCode: 200,
            message: 'Login autorizado!',
            data: { pkUser: dataResult[0].pkUser, email: dataResult[0].email, token: token }

        });
    } catch (error){
        return res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};
const createUserController = async(req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        
        const dataUser = await getUserByEmailModel(email);
        if(!dataUser){
            return res.status(502).json({
                statusCode: 502,
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
        const dataResult = await createUserModel(email, hash, isActive, dateToday);
        if(!dataResult){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows !== 0){
            return res.status(201).json({
                statusCode: 201,
                message: 'Usuário criado. Agora Efetue o login!',
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
        
        const dataUser = await getUserByIdModel(pkUser);
        if(!dataUser){
            return res.status(502).json({
                statusCode: 502,
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
        const dataResult = await updateUserModel(pkUser, hash);
        if(!dataResult){
            return res.status(502).json({
                statusCode: 502,
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
            message: 'Error ao criar o registro!'

        });
    };
};
const deleteUserController = async (req, res) => {
    try{
        const pkUser = req.params.pk;
        
        const dataProfessional = await getAllProfessionalModel(pkUser);
        if(!dataProfessional){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataProfessional.length !== 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Primeiramente excluir os profissionais cadastrados!',
                data: []

            });
        };        
        const dataResult = await deleteUserModel(pkUser, !isActive);
        if(!dataResult){
            return res.status(502).json({
                statusCode: 502,
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

        const dataUser = await getUserByEmailModel(email);
        if(!dataUser){
            return res.status(502).json({
                statusCode: 502,
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
        let newPassword = generatorPass();
        let hash = await encryptPass(newPassword);
        const dataResult = await updateUserModel(dataUser[0].pkUser, hash);
        if(!dataResult){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows === 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Algo deu errado ao gerar nova senha!',
                data: []
    
            });
        };

        /* Enviar email com nova senha */
        let responseEmail = await sendEmail(email, 'Recuperação de senha', `Nova senha: ${newPassword}`);
        return res.status(201).json({
            statusCode: 201,
            message: `Nova senha enviada para o email: ${email}!`,
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
    loginUserController,
    createUserController,
    updateUserController,
    deleteUserController,
    recoverPassUser
    
};