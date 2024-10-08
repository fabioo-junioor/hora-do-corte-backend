import connect from '../database/connect.js';
import * as dotenv from 'dotenv';
import { loginUserModel, getUserById,
        createUserModel, updateUserModel,
        getUserDetailsBySlug, getUserDetailsByFk,
        createUserDetailsModel, updateUserDetailsModel } from '../models/user.model.js';

dotenv.config();
const dateToday = new Date();

// Controllers user
const loginUserController = async (req, res) => {
    const { email, password } = req.body;

    try{
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
        
        const dataUser = await getUserById(pkUser);

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

// Controllers userDetails
const createUserDetailsController = async (req, res) => {
    try {
        const pkUser = req.params.pk;
        const { name, slug, phone, instagram, image, state, city, street, number } = req.body;
        
        const dataUserDetailsByFk = await getUserDetailsByFk(pkUser);
        if(dataUserDetailsByFk.length !== 0){
            return res.status(500).json({
                statusCode: 500,
                message: 'Dados do usuário já existe!'
                
            });
        };
        
        const dataUserDetailsBySlug = await getUserDetailsBySlug(slug);
        if(dataUserDetailsBySlug.length !== 0){
            return res.status(500).json({
                statusCode: 500,
                message: 'O nome de usuário já existe!'
                
            });
        };
        
        const dataUserDetails = await createUserDetailsModel(name, slug, phone, instagram, image, state, city, street, number, dateToday, pkUser);
        if(dataUserDetails.affectedRows !== 0){
            return res.status(500).json({
                statusCode: 500,
                message: 'Dados salvos!'

            });
        };
        
    }catch(error){
        res.status(500).json({
            statusCode: 500,
            message: 'Error ao criar o registro!'

        });
    };
};
const updateUserDetailsController = async (req, res) => {
    try {
        const pkUser = req.params.pk;
        const { name, slug, phone, instagram, image, state, city, street, number } = req.body;
        
        const dataUserDetailsBySlug = await getUserDetailsBySlug(slug);
        const dataUserDetailsByFk = await getUserDetailsByFk(pkUser);                
        if((dataUserDetailsBySlug.length !== 0) && !(dataUserDetailsByFk[0].fkUser != pkUser)){
            return res.status(500).json({
                statusCode: 500,
                message: 'O nome de usuário já existe!'
                
            });
        };
        
        const dataUserDetails = await updateUserDetailsModel(name, slug, phone, instagram, image, state, city, street, number, pkUser);
        if(dataUserDetails.affectedRows !== 0){
            return res.status(500).json({
                statusCode: 500,
                message: 'Dados salvos!'
    
            });
        };
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
    updateUserController,
    createUserDetailsController,
    updateUserDetailsController
};