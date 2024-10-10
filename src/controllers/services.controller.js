import { getServiceModel, createServiceModel, updateServiceModel } from '../models/services.model.js';

const dateToday = new Date();

const getServiceController = async (req, res) => {
    try{
        const pkProfessional = req.params.pk;
        
        const dataServices = await getServiceModel(pkProfessional);
        if(dataServices.length === 0){
            return res.status(401).json({
                statusCode: 401,
                message: 'Serviço não existe!'

            });
        };
        return res.status(200).json({
            statusCode: 200,
            message: 'Todos seviços!',
            data: dataServices

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
        
        const dataServices = await createServiceModel(services, dateToday, pkProfessional);
        if(dataServices.affectedRows === 0){
            return res.status(401).json({
                statusCode: 401,
                message: 'Algo de errado na criação dos serviços!'

            });
        };
        return res.status(200).json({
            statusCode: 200,
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
        
        const dataServices = await updateServiceModel(services, pkProfessionalServices);
        if(dataServices.changedRows === 0){
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo de errado na atualização do serviço!'
                
            });
        };
        return res.status(500).json({
            statusCode: 500,
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