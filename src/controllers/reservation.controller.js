import { getAllReservationModel, getAllReservationByProfessionalModel,
    getReservationByPkReservationModel,
    createReservationModel, deleteReservationModel
} from '../models/reservation.model.js';
import { getUserByIdModel } from '../models/user.model.js';
import { getUserDetailsByFkModel } from '../models/userDetails.model.js';
import { getProfessionalByPkModel } from '../models/professional.model.js';
import { validatorIsReserved, verifyService, convertStringToArray } from '../helpers/reservation.helper.js';
import { getTimeZone } from '../helpers/global.helper.js';
import { sendEmail } from '../core/communication/config.email.js';
import { templateEmailReservation } from '../core/communication/templates.js';

const dateToday = getTimeZone();
const isReservation = 1;
const contactSuport = process.env.CONTACT_SUPORT;

const getReservationController = async (req, res) => {
    try {
        const pkUser = req.params.pk;
        
        const dataResult = await getAllReservationModel(pkUser, isReservation);
        if (!dataResult) {
            return res.status(500).json({
                statusCode: 500,
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
            return res.status(500).json({
                statusCode: 500,
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
            return res.status(500).json({
                statusCode: 500,
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
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo de errado no agendamento!'

            });
        };

        let dataUser = await getUserByIdModel(pkUser);
        let dataUserDetails = await getUserDetailsByFkModel(pkUser);
        let dataProfessional = await getProfessionalByPkModel(pkProfessional);

        let responseEmailClient = await sendEmail(email, 'Reserva realizada',
            templateEmailReservation('Reserva realizada!',
                name,
                dateReservation,
                timeReservation,
                verifyService(services),
                phone,
                price,
                observation,
                dataProfessional[0].name,
                dataUserDetails[0].phone,
                contactSuport));

        let responseEmailEstablishment = await sendEmail(dataUser[0].email, 'Reserva realizada',
            templateEmailReservation('Reserva realizada!',
                name,
                dateReservation,
                timeReservation,
                verifyService(services),
                phone,
                price,
                observation,
                dataProfessional[0].name,
                dataUserDetails[0].phone,
                contactSuport));
        
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
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado ao excluir o agendamento!'

            });
        };
        let dataReservation = await getReservationByPkReservationModel(pkReservation);
        let dataUser = await getUserByIdModel(dataReservation[0].fkUser);
        let dataUserDetails = await getUserDetailsByFkModel(dataReservation[0].fkUser);
        let dataProfessional = await getProfessionalByPkModel(dataReservation[0].fkProfessional);
        
        let newArrayServices = convertStringToArray(dataReservation[0].services);        
                
        let responseEmailClient = await sendEmail(dataReservation[0].emailCustomer, 'Reserva cancelada',
            templateEmailReservation('Reserva cancelada!',
                dataReservation[0].nameCustomer,
                dataReservation[0].dateReservation,
                dataReservation[0].timeReservation,
                verifyService(newArrayServices),
                dataReservation[0].phoneCustomer,
                dataReservation[0].price,
                dataReservation[0].observationCustomer,
                dataProfessional[0].name,
                dataUserDetails[0].phone,
                contactSuport));
                
        let responseEmailEstablishment = await sendEmail(dataUser[0].email, 'Reserva cancelada',
            templateEmailReservation('Reserva cancelada!',
                dataReservation[0].nameCustomer,
                dataReservation[0].dateReservation,
                dataReservation[0].timeReservation,
                verifyService(newArrayServices),
                dataReservation[0].phoneCustomer,
                dataReservation[0].price,
                dataReservation[0].observationCustomer,
                dataProfessional[0].name,
                dataUserDetails[0].phone,
                contactSuport));
        
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