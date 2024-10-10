import { loginUserModel, getUserByIdModel,
        createUserModel, updateUserModel } from '../models/user.model.js';

const dateToday = new Date();

const loginUserController = async (req, res) => {
    try{
        const { email, password } = req.body;
        const result = await loginUserModel(email, password);
        if(result.length === 0){
            return res.status(401).json({
                statusCode: 401,
                message: 'Email ou senha incorreto!'

            });
        };/*
        if(result[0].password !== password){
            return res.status(401).json({
                statusCode: 401,
                message: 'Senha incorreta!'

            });
        };*/
        res.status(200).json({
            statusCode: 200,
            message: 'Login autorizado!',
            data: { pkUser: result[0].pkUser, email: result[0].email, token: 'test-as54a65s' }

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
        const userExists = await loginUserModel(email, password);

        if(userExists.length !== 0){
            return res.status(500).json({
                statusCode: 500,
                message: 'Usuário já existe!'

            });
        };
        if(password !== confirmPassword){
            return res.status(500).json({
                statusCode: 500,
                message: 'Senha são diferentes!'

            });
        };
        const resultCreate = await createUserModel(email, password, 1, dateToday);

        if(resultCreate.affectedRows !== 0){
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

        if(password !== dataUser[0].password){
            return res.status(500).json({
                statusCode: 500,
                message: 'Senha atual não corresponde!'

            });
        };
        
        if(newPassword !== confirmPassword){
            return res.status(500).json({
                statusCode: 500,
                message: 'As senhas são diferentes!'

            });
        };
        const updateUser = await updateUserModel(pkUser, newPassword);
        
        if(updateUser.changedRows !== 0){
            return res.status(201).json({
                statusCode: 201,
                message: 'Dados atualizados!'
    
            });
        }
    }catch(error){
        res.status(500).json({
            statusCode: 500,
            message: 'Error ao criar o registro!'

        });
    };
};


export default {
    loginUserController,
    createUserController,
    updateUserController
};