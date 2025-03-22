import { getServiceModel, createServiceModel, updateServiceModel } from '../models/services.model.js';
import { validAuth } from '../core/auth/auth.jwt.js';
import { getTimeZone } from '../helpers/global.helper.js';

const dateToday = getTimeZone();

const getServiceController = async (req, res) => {
    try{
        const pkProfessional = req.params.pk;
        
        let dataResult = await getServiceModel(pkProfessional);
        if(!dataResult){
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.length === 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Serviço não definido!',
                data: []

            });
        };
        return res.status(200).json({
            statusCode: 200,
            message: 'Todos seviços!',
            data: dataResult.map((
                { createdAt, updatedAt, ...rest }) => rest
            
            )
        });
    } catch (error){
        return res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};
const createServiceController = async (req, res) => {
    try{
        const { pkProfessional, services, pkUser } = req.body;

        if(!await validAuth(req, pkUser)){
            return res.status(400).json({
                statusCode: 400,
                message: 'Operação inválida!'

            });
        };
    
        let dataService = await getServiceModel(pkProfessional);
        if(!dataService){
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataService.length !== 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Serviço ja existe!',
                data: []
                
            });
        };

        let dataResult = await createServiceModel(services, dateToday, dateToday, pkProfessional);
        if(!dataResult){
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows === 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Algo de errado na criação dos serviços!',
                data: []

            });
        };
        return res.status(201).json({
            statusCode: 201,
            message: 'Seviço criado!',
            data: []

        });
    } catch (error){
        return res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};
const updateServiceController = async (req, res) => {
    try {
        const pkProfessionalServices = req.params.pk;
        const { services, pkUser } = req.body;

        if(!await validAuth(req, pkUser)){
            return res.status(400).json({
                statusCode: 400,
                message: 'Operação inválida!'

            });
        };
        
        let dataResult = await updateServiceModel(services, dateToday, pkProfessionalServices);
        if(!dataResult){
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.changedRows === 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Algo de errado na atualização do serviço!',
                data: []
                
            });
        };
        return res.status(201).json({
            statusCode: 201,
            message: 'Dados salvos!',
            data: []

        });
    }catch(error){
        return res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};

export default {
    getServiceController,
    createServiceController,
    updateServiceController

};