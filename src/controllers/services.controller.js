import { getServiceModel, createServiceModel, updateServiceModel } from '../models/services.model.js';
import { validAuthPk } from '../core/auth/auth.jwt.js';
import { getTimeZone } from '../helpers/global.helper.js';
import logger from '../core/security/logger.js';

const getServiceController = async (req, res) => {
    try{
        const pkProfessional = req.params.pk;
        
        let dataResult = await getServiceModel(pkProfessional);
        if(!dataResult){
            logger.error('Erro na conexão', { status: { code: 500, path: req.path }, context: { pkProfessional: pkProfessional }});
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
        logger.error(error.message, { status: { code: 500, path: req.path }});
        return res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};
const createServiceController = async (req, res) => {
    try{
        const { pkProfessional, services, pkUser } = req.body;

        if(!await validAuthPk(req, pkUser)){
            logger.warn('Operação inválida', { status: { code: 400, path: req.path }, context: { pkUser: pkUser }});
            return res.status(400).json({
                statusCode: 400,
                message: 'Operação inválida!'

            });
        };
    
        let dataService = await getServiceModel(pkProfessional);
        if(!dataService){
            logger.error('Erro na conexão', { status: { code: 500, path: req.path }, context: { pkProfessional: pkProfessional }});
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataService.length !== 0){
            logger.warn('Serviço já existe', { status: { code: 200, path: req.path }, context: { pkProfessional: pkProfessional }});
            return res.status(200).json({
                statusCode: 200,
                message: 'Serviço ja existe!',
                data: []
                
            });
        };

        let dataResult = await createServiceModel(services, getTimeZone(), getTimeZone(), pkProfessional);
        if(!dataResult){
            logger.error('Erro na conexão', { status: { code: 500, path: req.path }, context: { pkProfessional: pkProfessional }});
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows === 0){
            logger.error('Erro na criação de serviço', { status: { code: 200, path: req.path }, context: { pkProfessional: pkProfessional }});
            return res.status(200).json({
                statusCode: 200,
                message: 'Algo de errado na criação dos serviços!',
                data: []

            });
        };

        logger.info('Serviço criado', { status: { code: 201, path: req.path }, context: { pkProfessional: pkProfessional }});
        return res.status(201).json({
            statusCode: 201,
            message: 'Seviço criado!',
            data: []

        });
    } catch (error){
        logger.error(error.message, { status: { code: 500, path: req.path }});
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

        if(!await validAuthPk(req, pkUser)){
            logger.warn('Operação inválida', { status: { code: 400, path: req.path }, context: { pkUser: pkUser }});
            return res.status(400).json({
                statusCode: 400,
                message: 'Operação inválida!'

            });
        };
        
        let dataResult = await updateServiceModel(services, getTimeZone(), pkProfessionalServices);
        if(!dataResult){
            logger.error('Erro na conexão', { status: { code: 500, path: req.path }, context: { pkProfessionalServices: pkProfessionalServices }});
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.changedRows === 0){
            logger.error('Erro ao atualizar o serviço', { status: { code: 200, path: req.path }, context: { pkProfessionalServices: pkProfessionalServices }});
            return res.status(200).json({
                statusCode: 200,
                message: 'Algo de errado na atualização do serviço!',
                data: []
                
            });
        };

        logger.info('Serviço atualizado', { status: { code: 201, path: req.path }, context: { pkProfessionalServices: pkProfessionalServices }});
        return res.status(201).json({
            statusCode: 201,
            message: 'Dados salvos!',
            data: []

        });
    }catch(error){
        logger.error(error.message, { status: { code: 500, path: req.path }});
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