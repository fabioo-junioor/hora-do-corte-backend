import * as dotenv from 'dotenv';
import { getAllReservationModel, getAllReservationByProfessionalModel,
    getReservationByPkReservationModel,
    createReservationModel, deleteReservationModel
} from '../models/reservation.model.js';
import { validAuthPk } from '../core/auth/auth.jwt.js';
import { getUserByPkModel } from '../models/user.model.js';
import { getUserDetailsByFkModel } from '../models/userDetails.model.js';
import { getProfessionalByPkModel } from '../models/professional.model.js';
import { validatorIsReserved, verifyService, convertStringToArray } from '../helpers/reservation.helper.js';
import { sendEmail } from '../core/communication/config.email.js';
import { sendAlertReservation } from '../core/communication/discord.js';
import { templateEmailReservation, templateAlertDiscordReservation } from '../core/communication/templates.js';
import { getTimeZone } from '../helpers/global.helper.js';
import logger from '../core/security/logger.js';

dotenv.config();
const isReservation = 1;
const contactSuport = process.env.CONTACT_SUPORT;

const getReservationController = async (req, res) => {
    try {
        const pkUser = req.params.pk;
        const { today } = req.body;

        if(!await validAuthPk(req, pkUser)){
            logger.warn('Operação inválida', { status: { code: 400, path: req.path }, context: { pkUser: pkUser }});
            return res.status(400).json({
                statusCode: 400,
                message: 'Operação inválida!'

            });
        };
        
        let dataResult = await getAllReservationModel(pkUser, isReservation, today);
        if (!dataResult) {
            logger.error('Erro na conexão', { status: { code: 500, path: req.path }, context: { pkUser: pkUser }});
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.length === 0) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Sem agendamentos!',
                data: []

            });
        };
        return res.status(200).json({
            statusCode: 200,
            message: 'Todos os agendamento!',
            data: dataResult.map((
                { createdAt, updatedAt, isReservation, ...rest }) => rest

            )
        });
    } catch (error) {
        logger.error(error.message, { status: { code: 500, path: req.path }});
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

        let dataResult = await getAllReservationByProfessionalModel(pkProfessional, dateReservation, isReservation)
        if(!dataResult) {
            logger.error('Erro na conexão', { status: { code: 500, path: req.path }, context: { pkProfessional: pkProfessional }});
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.length === 0) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Sem agendamentos!',
                data: []

            });
        };
        return res.status(200).json({
            statusCode: 200,
            message: 'Todos os agendamento!',
            data: dataResult.map((elem) => {
                return {
                    pkReservation: elem.pkReservation,
                    timeReservation: elem.timeReservation,
                    duration: elem.duration,
                    fkUser: elem.fkUser,
                    fkProfessional: elem.fkProfessional
                }
            })
        });
    } catch (error) {
        logger.error(error.message, { status: { code: 500, path: req.path }});
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
        if(!dataReservations) {
            logger.error('Erro na conexão', { status: { code: 500, path: req.path }, context: { pkUser: pkUser }});
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo de errado no agendamento!'

            });
        };

        let validatorReserved = validatorIsReserved(dataReservations, timeReservation, duration);
        if(validatorReserved) {
            logger.warn('Horário já foi agendado', { status: { code: 200, path: req.path }, context: { pkUser: pkUser, phone: phone, name: name, dateReservation: dateReservation, timeReservation: timeReservation }});
            return res.status(200).json({
                statusCode: 200,
                message: 'Esse horário já foi agendado!',
                data: []

            });
        }; 

        let dataResult = await createReservationModel(pkUser, pkProfessional, services, dateReservation, timeReservation, price, duration, getTimeZone(), getTimeZone(), isReservation, name, email, phone, observation);
        if(dataResult.affectedRows === 0 || !dataResult) {
            logger.error('Erro na conexão', { status: { code: 500, path: req.path }, context: { pkUser: pkUser }});
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo de errado no agendamento!!'

            });
        };

        let dataUser = await getUserByPkModel(pkUser);
        let dataUserDetails = await getUserDetailsByFkModel(pkUser);
        let dataProfessional = await getProfessionalByPkModel(pkProfessional);
        
        let responseEmailEstablishment = await sendEmail(dataUser[0].email, 'Reserva realizada',
            templateEmailReservation('Dados da reserva!',
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
        
        if(email !== ''){
            let responseEmailClient = await sendEmail(email, 'Reserva realizada',
                templateEmailReservation('Dados da reserva!',
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
        
        };

        sendAlertReservation(templateAlertDiscordReservation('Reserva criada', getTimeZone(), dataUser[0].email, phone, name, price));
        logger.info('Agendamento criado', { status: { code: 201, path: req.path }, context: { pkUser: pkUser, phone: phone, name: name, price: price, dateReservation: dateReservation, timeReservation: timeReservation }});
        return res.status(201).json({
            statusCode: 201,
            message: 'Agendamento criado!',
            data: []

        });
    } catch (error) {
        logger.error(error.message, { status: { code: 500, path: req.path }});
        return res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};
const deleteReservationController = async (req, res) => {
    try {
        const pkReservation = req.params.pk;
        const { pkUser } = req.body;

        if(!await validAuthPk(req, pkUser)){
            logger.warn('Operação inválida', { status: { code: 400, path: req.path }, context: { pkUser: pkUser }});
            return res.status(400).json({
                statusCode: 400,
                message: 'Operação inválida!'

            });
        };
        
        let dataResult = await deleteReservationModel(pkReservation, !isReservation, getTimeZone(), pkUser);
        if (dataResult.affectedRows === 0 || !dataResult) {
            logger.error('Erro ao excluir agendamento', { status: { code: 500, path: req.path }, context: { pkUser: pkUser }});
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado ao excluir o agendamento!'

            });
        };

        let dataReservation = await getReservationByPkReservationModel(pkReservation);
        let dataUser = await getUserByPkModel(dataReservation[0].fkUser);
        let dataUserDetails = await getUserDetailsByFkModel(dataReservation[0].fkUser);
        let dataProfessional = await getProfessionalByPkModel(dataReservation[0].fkProfessional);
        let newArrayServices = convertStringToArray(dataReservation[0].services);        

        let responseEmailEstablishment = await sendEmail(dataUser[0].email, 'Reserva cancelada',
            templateEmailReservation('Dados da reserva!',
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

        if(dataReservation[0].emailCustomer !== ''){
            let responseEmailClient = await sendEmail(dataReservation[0].emailCustomer, 'Reserva cancelada',
                templateEmailReservation('Dados da reserva!',
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
                    
        
        };
        
        logger.info('Agendamento excluido', { status: { code: 200, path: req.path }, context: { pkReservation: pkReservation }});
        return res.status(200).json({
            statusCode: 200,
            message: 'Agendamento excluido!',
            data: []

        });
    } catch (error) {
        logger.error(error.message, { status: { code: 500, path: req.path }});
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