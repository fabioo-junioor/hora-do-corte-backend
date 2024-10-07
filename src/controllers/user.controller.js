import connect from '../database/connect.js';
import * as dotenv from 'dotenv';
import { login, create } from '../models/user.model.js';

dotenv.config();

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try{
        const result = await login(email, password);
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
            message: 'Login autorizado!'

        });
    } catch (error){
        res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};
const createUser = async(req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        const userExists = await login(email, password);

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
        const resultCreate = await create(email, password, 1, new Date());

        if(resultCreate.affectedRows > 0){
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

export default {
    loginUser,
    createUser
};