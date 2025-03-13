import {
    getAllReservationModel, getAllReservationByProfessionalModel,
    createReservationModel, deleteReservationModel
} from '../models/reservation.model.js';
import { validatorIsReserved } from '../helpers/reservation.helper.js';

const dateToday = new Date();
const isReservation = 1;

const getReservationController = async (req, res) => {
    try {
        const pkUser = req.params.pk;
        
        const dataResult = await getAllReservationModel(pkUser, isReservation);
        if (!dataResult) {
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if (dataResult.length === 0) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Sem agendamentos!',
                data: []

            });
        };
        return res.status(200).json({
            statusCode: 200,
            message: 'Todos os agendamento!',
            data: dataResult

        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};
const getReservationByProfessionalController = async (req, res) => {
    try {
        const pkProfessional = req.params.pk;
        const { dateReservation } = req.body;

        const dataResult = await getAllReservationByProfessionalModel(pkProfessional, dateReservation, isReservation)
        if (!dataResult) {
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if (dataResult.length === 0) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Sem agendamentos!'

            });
        };
        return res.status(200).json({
            statusCode: 200,
            message: 'Todos os agendamento!',
            data: dataResult

        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};
const createReservationController = async (req, res) => {
    try {
        const { pkUser, pkProfessional, services, dateReservation, timeReservation, price, duration, name, email, phone, observation } = req.body;

        let dataReservations = await getAllReservationByProfessionalModel(pkProfessional, dateReservation, isReservation);
        if (!dataReservations) {
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo de errado no agendamento!'

            });
        };
        let validatorReserved = validatorIsReserved(dataReservations, timeReservation, duration);
        if (validatorReserved) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Esse horário já foi agendado!'

            });
        };
        const dataResult = await createReservationModel(pkUser, pkProfessional, services, dateReservation, timeReservation, price, duration, dateToday, isReservation, name, email, phone, observation);
        if (dataResult.affectedRows === 0 || !dataResult) {
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo de errado no agendamento!'

            });
        };
        return res.status(201).json({
            statusCode: 201,
            message: 'Agendamento criado!'

        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};
const deleteReservationController = async (req, res) => {
    try {
        const pkReservation = req.params.pk;

        const dataResult = await deleteReservationModel(pkReservation, !isReservation);
        if (dataResult.affectedRows === 0 || !dataResult) {
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado ao excluir o agendamento!'

            });
        };
        return res.status(200).json({
            statusCode: 200,
            message: 'Agendamento excluido!'

        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};

export default {
    getReservationController,
    getReservationByProfessionalController,
    createReservationController,
    deleteReservationController

};