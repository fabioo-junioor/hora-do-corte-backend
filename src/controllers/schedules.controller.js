import { getScheduleModel, createScheduleModel, updateScheduleModel } from '../models/schedules.model.js';
import { validAuthPk } from '../core/auth/auth.jwt.js';
import { getTimeZone } from '../helpers/global.helper.js';
import logger from '../core/security/logger.js';

const getScheduleController = async (req, res) => {
    try{
        const pkProfessional = req.params.pk;
        
        let dataResult = await getScheduleModel(pkProfessional);
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
                message: 'Horário não definido!',
                data: []

            });
        };
        return res.status(200).json({
            statusCode: 200,
            message: 'Todos os horários!',
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
const createScheduleController = async (req, res) => {
    try{
        const { pkProfessional, schedules, pkUser } = req.body;

        if(!await validAuthPk(req, pkUser)){
            logger.warn('Operação inválida', { status: { code: 400, path: req.path }, context: { pkUser: pkUser }});
            return res.status(400).json({
                statusCode: 400,
                message: 'Operação inválida!'

            });
        };

        let dataSchedule = await getScheduleModel(pkProfessional);
        if(!dataSchedule){
            logger.error('Erro na conexão', { status: { code: 500, path: req.path }, context: { pkProfessional: pkProfessional }});
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataSchedule.length !== 0){
            logger.error('Horário já existe', { status: { code: 200, path: req.path }, context: { pkProfessional: pkProfessional }});
            return res.status(200).json({
                statusCode: 200,
                message: 'Horários já existe!',
                data: []
                
            });
        };

        let dataResult = await createScheduleModel(schedules, getTimeZone(), getTimeZone(), pkProfessional);
        if(!dataResult){
            logger.error('Erro na conexão', { status: { code: 500, path: req.path }, context: { pkProfessional: pkProfessional }});
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows === 0){
            logger.warn('Erro ao criar horário', { status: { code: 200, path: req.path }, context: { pkProfessional: pkProfessional }});
            return res.status(200).json({
                statusCode: 200,
                message: 'Algo de errado na criação dos horários!',
                data: []

            });
        };

        logger.info('Horário criado', { status: { code: 201, path: req.path }, context: { pkProfessional: pkProfessional }});
        return res.status(201).json({
            statusCode: 201,
            message: 'Horário criado!',
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
const updateScheduleController = async (req, res) => {
    try {
        const pkProfessionalSchedule = req.params.pk;
        const { schedules, pkUser } = req.body;

        if(!await validAuthPk(req, pkUser)){
            logger.warn('Operação inválida', { status: { code: 400, path: req.path }, context: { pkUser: pkUser }});
            return res.status(400).json({
                statusCode: 400,
                message: 'Operação inválida!'

            });
        };

        let dataResult = await updateScheduleModel(schedules, getTimeZone(), pkProfessionalSchedule);
        if(!dataResult){
            logger.error('Erro na conexão', { status: { code: 500, path: req.path }, context: { pkProfessionalSchedule: pkProfessionalSchedule }});
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows === 0){
            logger.warn('Erro ao atualizar o horário', { status: { code: 200, path: req.path }, context: { pkProfessionalSchedule: pkProfessionalSchedule }});
            return res.status(200).json({
                statusCode: 200,
                message: 'Algo de errado na atualização do horário!',
                data: []
                
            });
        };

        logger.info('Horário atualizado', { status: { code: 201, path: req.path }, context: { pkProfessionalSchedule: pkProfessionalSchedule }});
        return res.status(201).json({
            statusCode: 201,
            message: 'Dados salvos!',
            data: []

        });
    }catch(error){
        logger.error(error.message, { status: { code: 500, path: req.path }});
        return res.status(500).json({
            statusCode: 500,
            message: 'Error ao criar o registro!'

        });
    };
};

export default {
    getScheduleController,
    createScheduleController,
    updateScheduleController

};