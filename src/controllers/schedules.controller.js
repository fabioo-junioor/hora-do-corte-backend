import { getScheduleModel, createScheduleModel, updateScheduleModel } from '../models/schedules.model.js';

const dateToday = new Date();

const getScheduleController = async (req, res) => {
    try{
        const pkProfessional = req.params.pk;
        
        const dataResult = await getScheduleModel(pkProfessional);
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
            message: 'Todos os seviços!',
            data: dataResult

        });
    } catch (error){
        res.status(500).json({
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
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataSchedule.length !== 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Horários já existe!'
                
            });
        };
        const dataResult = await createScheduleModel(schedules, dateToday, pkProfessional);
        if(!dataResult){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!!'

            });
        };
        if(dataResult.affectedRows === 0){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo de errado na criação dos horários!'

            });
        };        
        return res.status(201).json({
            statusCode: 201,
            message: 'Horário criado!'

        });
    } catch (error){
        res.status(500).json({
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
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows === 0){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo de errado na atualização do horário!'
                
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
    getScheduleController,
    createScheduleController,
    updateScheduleController

};