import { getAllProfessionalModel, createProfessionalModel, updateProfessionalModel, deleteProfessionalModel } from '../models/professional.model.js';
import { getTimeZone } from '../helpers/global.helper.js';

const dateToday = getTimeZone();
const isActive = 1;

const getAllProfessionalController = async (req, res) => {
    try{
        const pkUser = req.params.pk;
        
        const dataResult = await getAllProfessionalModel(pkUser, isActive);
        if(!dataResult){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.length === 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Sem profissionais!',
                data: []

            });
        };
        return res.status(200).json({
            statusCode: 200,
            message: 'Todos os profissionais!',
            data: dataResult

        });
    } catch (error){
        return res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};
const createProfessionalController = async (req, res) => {
    try{
        const { name, image, instagram, isUnavailable, pkUser } = req.body;
        
        const dataResult = await createProfessionalModel(name, image, instagram, isUnavailable, isActive, dateToday, pkUser);
        if(!dataResult){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows === 0){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo de errado na criação do profissional!'

            });
        };
        return res.status(201).json({
            statusCode: 201,
            message: 'Profissional criado!',
            data: []

        });
    } catch (error){
        return res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};
const updateProfessionalController = async (req, res) => {
    try{
        const pkProfessional = req.params.pk;
        const { name, image, instagram, isUnavailable } = req.body;
        
        const dataResult = await updateProfessionalModel(pkProfessional, name, image, instagram, isUnavailable);
        if(!dataResult){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows === 0){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo de errado na atualização do profissional!'

            });
        };
        return res.status(201).json({
            statusCode: 201,
            message: 'Dados atualizados!',
            data: []

        });
    } catch (error){
        return res.status(500).json({
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
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows === 0){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado ao excluir o profissional!'

            });
        };
        return res.status(200).json({
            statusCode: 200,
            message: 'Profissional excluido!',
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
    getAllProfessionalController,
    createProfessionalController,
    updateProfessionalController,
    deleteProfessionalController
    
};