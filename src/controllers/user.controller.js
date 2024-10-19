import { loginUserModel, getUserByIdModel,
        getUserByEmailModel, createUserModel, 
        updateUserModel, deleteUserModel } from '../models/user.model.js';
import { getAllProfessionalModel } from '../models/professional.model.js';

const dateToday = new Date();
const isActive = 1;

const loginUserController = async (req, res) => {
    try{
        const { email, password } = req.body;

        const dataResult = await loginUserModel(email, password);
        if(!dataResult){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.length === 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Email ou senha incorreto!',
                data: dataResult

            });
        };
        res.status(200).json({
            statusCode: 200,
            message: 'Login autorizado!',
            data: { pkUser: dataResult[0].pkUser, email: dataResult[0].email, token: 'test-as54a65s' }

        });
    } catch (error){
        res.status(500).json({
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
                message: 'Usuário já existe!'

            });
        };
        if(password !== confirmPassword){
            return res.status(200).json({
                statusCode: 200,
                message: 'Senha são diferentes!'

            });
        };
        const dataResult = await createUserModel(email, password, isActive, dateToday);
        if(!dataResult){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows !== 0){
            return res.status(201).json({
                statusCode: 201,
                message: 'Usuário criado!'
    
            });
        }
    }catch(error){
        res.status(500).json({
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
        if(password !== dataUser[0].password){
            return res.status(200).json({
                statusCode: 200,
                message: 'Senha atual não corresponde!'

            });
        };   
        if(newPassword !== confirmPassword){
            return res.status(200).json({
                statusCode: 200,
                message: 'As senhas são diferentes!'

            });
        };
        const dataResult = await updateUserModel(pkUser, newPassword);
        if(!dataResult){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows !== 0){
            return res.status(201).json({
                statusCode: 201,
                message: 'Dados atualizados!'
    
            });
        };
    }catch(error){
        res.status(500).json({
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
                message: 'Primeiramente excluir os profissionais cadastrados!'

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
                message: 'Algo deu errado ao excluir o usuário!'

            });
        };
        return res.status(200).json({
            statusCode: 200,
            message: 'Usuário excluido!'

        });
    } catch (error){
        res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};

export default {
    loginUserController,
    createUserController,
    updateUserController,
    deleteUserController
    
};