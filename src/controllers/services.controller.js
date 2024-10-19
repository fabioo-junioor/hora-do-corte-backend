import { getServiceModel, createServiceModel, updateServiceModel } from '../models/services.model.js';

const dateToday = new Date();

const getServiceController = async (req, res) => {
    try{
        const pkProfessional = req.params.pk;
        
        const dataResult = await getServiceModel(pkProfessional);
        if(!dataResult){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.length === 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Serviço não existe!',
                data: dataResult

            });
        };
        return res.status(200).json({
            statusCode: 200,
            message: 'Todos seviços!',
            data: dataResult

        });
    } catch (error){
        res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};
const createServiceController = async (req, res) => {
    try{
        const { pkProfessional, services } = req.body;
        
        const dataService = await getServiceModel(pkProfessional);
        if(!dataService){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataService.length !== 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Serviço ja existe!',
                data: dataService
                
            });
        };
        const dataResult = await createServiceModel(services, dateToday, pkProfessional);
        if(!dataResult){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows === 0){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo de errado na criação dos serviços!'

            });
        };
        return res.status(201).json({
            statusCode: 201,
            message: 'Seviço criado!'

        });
    } catch (error){
        res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};
const updateServiceController = async (req, res) => {
    try {
        const pkProfessionalServices = req.params.pk;
        const { services } = req.body;
        
        const dataResult = await updateServiceModel(services, pkProfessionalServices);
        if(!dataResult){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.changedRows === 0){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo de errado na atualização do serviço!'
                
            });
        };
        return res.status(201).json({
            statusCode: 201,
            message: 'Dados salvos!'

        });
    }catch(error){
        res.status(500).json({
            statusCode: 500,
            message: 'Error ao criar o registro!'

        });
    };
};

export default {
    getServiceController,
    createServiceController,
    updateServiceController

};