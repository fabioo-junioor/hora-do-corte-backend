import { getAllReservationModel, getAllReservationByProfessionalModel,
    getReservationByPkReservationModel,
    createReservationModel, deleteReservationModel
} from '../models/reservation.model.js';
import { getUserByIdModel } from '../models/user.model.js';
import { validatorIsReserved, verifyService } from '../helpers/reservation.helper.js';
import { getTimeZone } from '../helpers/global.helper.js';
import { sendEmail } from '../core/communication/config.email.js';

const dateToday = getTimeZone();
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
        return res.status(500).json({
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
        return res.status(500).json({
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
                message: 'Esse horário já foi agendado!',
                data: []

            });
        };
        
        const dataResult = await createReservationModel(pkUser, pkProfessional, services, dateReservation, timeReservation, price, duration, dateToday, isReservation, name, email, phone, observation);
        if (dataResult.affectedRows === 0 || !dataResult) {
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo de errado no agendamento!'

            });
        };

        let dataUser = await getUserByIdModel(pkUser);
        let responseEmailEstablishment = await sendEmail(
            dataUser[0].email, 'Reserva realizada',
            `Cliente: ${name} / 
            Data: ${dateReservation} - ${timeReservation} /
            Serviços: ${verifyService(services)} /
            Telefone: ${phone}`);
            
        //let responseEmailClient
        
        return res.status(201).json({
            statusCode: 201,
            message: 'Agendamento criado!',
            data: []

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
        let dataReservation = await getReservationByPkReservationModel(pkReservation);
        let dataUser = await getUserByIdModel(dataReservation[0].fkUser);
                
        let responseEmailClient = await sendEmail(
            dataReservation[0].emailCustomer, 'Reserva cancelada',
            `Cliente: ${dataReservation[0].nameCustomer} / 
            Data: ${dataReservation[0].dateReservation} - ${dataReservation[0].timeReservation} /
            Contato Estabelecimento: ${dataUser[0].email}`);
            
        //let responseEmailEstablishment
        
        return res.status(200).json({
            statusCode: 200,
            message: 'Agendamento excluido!',
            data: []

        });
    } catch (error) {
        return res.status(500).json({
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