import { getAllProfessionalModel, createProfessionalModel, updateProfessionalModel, deleteProfessionalModel } from '../models/professional.model.js';

const dateToday = new Date();
const isActive = 1;

const getAllProfessionalController = async (req, res) => {
    try{
        const pkUser = req.params.pk;
        
        const dataResult = await getAllProfessionalModel(pkUser, isActive);
        if(!dataResult){
            return res.status(401).json({
                statusCode: 401,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.length === 0){
            return res.status(401).json({
                statusCode: 401,
                message: 'Sem profissionais!'

            });
        };
        return res.status(200).json({
            statusCode: 200,
            message: 'Todos profissionais!',
            data: dataResult

        });
    } catch (error){
        res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};
const createProfessionalController = async (req, res) => {
    try{
        const { name, image, instagram, pkUser } = req.body;
        
        const dataResult = await createProfessionalModel(name, image, instagram, isActive, dateToday, pkUser);
        if(!dataResult){
            return res.status(401).json({
                statusCode: 401,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows === 0){
            return res.status(401).json({
                statusCode: 401,
                message: 'Algo de errado na criação do profissional!'

            });
        };
        return res.status(200).json({
            statusCode: 200,
            message: 'Profissional criado!'

        });
    } catch (error){
        res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};
const updateProfessionalController = async (req, res) => {
    try{
        const pkProfessional = req.params.pk;
        const { name, image, instagram } = req.body;
        
        const dataResult = await updateProfessionalModel(pkProfessional, name, image, instagram);
        if(!dataResult){
            return res.status(401).json({
                statusCode: 401,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.changedRows === 0){
            return res.status(401).json({
                statusCode: 401,
                message: 'Algo de errado na atualização do profissional!'

            });
        };
        return res.status(200).json({
            statusCode: 200,
            message: 'Dados atualizados!'

        });
    } catch (error){
        res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};
const deleteProfessionalController = async (req, res) => {
    try{
        const pkProfessional = req.params.pk;
        
        const dataResult = await deleteProfessionalModel(pkProfessional, !isActive);
        if(!dataResult){
            return res.status(401).json({
                statusCode: 401,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.changedRows === 0){
            return res.status(401).json({
                statusCode: 401,
                message: 'Algo deu errado ao excluir o profissional!'

            });
        };
        return res.status(200).json({
            statusCode: 200,
            message: 'Profissional excluido!'

        });
    } catch (error){
        res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};

export default {
    getAllProfessionalController,
    createProfessionalController,
    updateProfessionalController,
    deleteProfessionalController
    
};