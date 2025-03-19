import { getScheduleModel, createScheduleModel, updateScheduleModel } from '../models/schedules.model.js';
import { getTimeZone } from '../helpers/global.helper.js';

const dateToday = getTimeZone();

const getScheduleController = async (req, res) => {
    try{
        const pkProfessional = req.params.pk;
        
        const dataResult = await getScheduleModel(pkProfessional);
        if(!dataResult){
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
            data: dataResult

        });
    } catch (error){
        return res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};
const createScheduleController = async (req, res) => {
    try{
        const { schedules, pkProfessional } = req.body;

        const dataSchedule = await getScheduleModel(pkProfessional);
        if(!dataSchedule){
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataSchedule.length !== 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Horários já existe!',
                data: []
                
            });
        };
        const dataResult = await createScheduleModel(schedules, dateToday, pkProfessional);
        if(!dataResult){
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!!'

            });
        };
        if(dataResult.affectedRows === 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Algo de errado na criação dos horários!',
                data: []

            });
        };        
        return res.status(201).json({
            statusCode: 201,
            message: 'Horário criado!',
            data: []

        });
    } catch (error){
        return res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};
const updateScheduleController = async (req, res) => {
    try {
        const pkProfessionalSchedule = req.params.pk;
        const { schedules } = req.body;

        const dataResult = await updateScheduleModel(schedules, pkProfessionalSchedule);
        if(!dataResult){
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows === 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Algo de errado na atualização do horário!',
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
            message: 'Error ao criar o registro!'

        });
    };
};

export default {
    getScheduleController,
    createScheduleController,
    updateScheduleController

};