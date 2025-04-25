import { getAllProfessionalModel, createProfessionalModel, updateProfessionalModel, deleteProfessionalModel } from '../models/professional.model.js';
import { getUserByPkModel } from '../models/user.model.js';
import { validAuthPk } from '../core/auth/auth.jwt.js';
import { getTimeZone } from '../helpers/global.helper.js';
import logger from '../core/security/logger.js';

const isActive = 1;

const getAllProfessionalController = async (req, res) => {
    try{
        const pkUser = req.params.pk;
        
        let dataResult = await getAllProfessionalModel(pkUser, isActive);
        if(!dataResult){
            logger.error('Erro na conexão', { status: { code: 500, path: req.path }, context: { pkUser: pkUser }});
            return res.status(500).json({
                statusCode: 500,
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
const createProfessionalController = async (req, res) => {
    try{
        const { name, image, instagram, isUnavailable, pkUser } = req.body;
        
        if(!await validAuthPk(req, pkUser)){
            logger.warn('Operação inválida', { status: { code: 400, path: req.path }, context: { pkUser: pkUser }});
            return res.status(400).json({
                statusCode: 400,
                message: 'Operação inválida!'

            });
        };

        let dataUser = await getUserByPkModel(pkUser);
        if(dataUser[0].isBlocked == 1){
            logger.warn('Operação inválida no momento', { status: { code: 200, path: req.path }, context: { pkUser: pkUser }});
            return res.status(200).json({
                statusCode: 200,
                message: 'Operação inválida no momento!',
                data: []
                
            });
        };

        let dataResult = await createProfessionalModel(name, image, instagram, isUnavailable, isActive, getTimeZone(), getTimeZone(), pkUser);
        if(!dataResult){
            logger.error('Erro na conexão', { status: { code: 500, path: req.path }, context: { pkUser: pkUser }});
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows === 0){
            logger.error('Erro ao criar profissional', { status: { code: 200, path: req.path }, context: { pkUser: pkUser }});
            return res.status(200).json({
                statusCode: 200,
                message: 'Algo de errado na criação do profissional!',
                data: []

            });
        };

        logger.info('Profissional criado', { status: { code: 201, path: req.path }, context: { pkUser: pkUser }});
        return res.status(201).json({
            statusCode: 201,
            message: 'Profissional criado!',
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
const updateProfessionalController = async (req, res) => {
    try{
        const pkProfessional = req.params.pk;
        const { name, image, instagram, isUnavailable, pkUser } = req.body;
        
        if(!await validAuthPk(req, pkUser)){
            logger.warn('Operação inválida', { status: { code: 400, path: req.path }, context: { pkProfessional: pkProfessional }});
            return res.status(400).json({
                statusCode: 400,
                message: 'Operação inválida!'

            });
        };
        
        let dataResult = await updateProfessionalModel(pkProfessional, name, image, instagram, isUnavailable, isActive, getTimeZone(), pkUser);
        if(!dataResult){
            logger.error('Erro na conexão', { status: { code: 500, path: req.path }, context: { pkProfessional: pkProfessional }});
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows === 0){
            logger.error('Erro ao atualizar profissional', { status: { code: 200, path: req.path }, context: { pkProfessional: pkProfessional }});
            return res.status(200).json({
                statusCode: 200,
                message: 'Algo de errado na atualização do profissional!',
                data: []

            });
        };

        logger.info('Profissional atualizado', { status: { code: 201, path: req.path }, context: { pkProfessional: pkProfessional }});
        return res.status(201).json({
            statusCode: 201,
            message: 'Dados atualizados!',
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
const deleteProfessionalController = async (req, res) => {
    try{
        const pkProfessional = req.params.pk;
        const { pkUser } = req.body;

        if(!await validAuthPk(req, pkUser)){
            logger.warn('Operação inválida', { status: { code: 400, path: req.path }, context: { pkProfessional: pkProfessional }});
            return res.status(400).json({
                statusCode: 400,
                message: 'Operação inválida!'

            });
        };
        
        let dataResult = await deleteProfessionalModel(pkProfessional, !isActive, getTimeZone(), pkUser);
        if(!dataResult){
            logger.error('Erro na conexão', { status: { code: 500, path: req.path }, context: { pkProfessional: pkProfessional }});
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows === 0){
            logger.error('Erro ao excluir profissional', { status: { code: 500, path: req.path }, context: { pkProfessional: pkProfessional }});
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado ao excluir o profissional!'

            });
        };

        logger.info('Profissional excluido', { status: { code: 200, path: req.path }, context: { pkProfessional: pkProfessional }});
        return res.status(200).json({
            statusCode: 200,
            message: 'Profissional excluido!',
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

export default {
    getAllProfessionalController,
    createProfessionalController,
    updateProfessionalController,
    deleteProfessionalController
    
};