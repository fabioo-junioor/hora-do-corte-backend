import { getStatsReservationsModel, getLastPurchasePlanByPkModel, bestProfessionalsModel } from '../models/dashboard.model.js';
import { validAuthPk } from '../core/auth/auth.jwt.js';

const isReservation = 1;

const statsReservationsController = async (req, res) => {
    try{
        const pkUser = req.params.pk;

        /*
        if(!await validAuthPk(req, pkUser)){
            return res.status(400).json({
                statusCode: 400,
                message: 'Operação inválida!'

            });
        };*/
        let dataResult = await getStatsReservationsModel(pkUser);
        if(!dataResult){
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.length === 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Sem estatisticas!',
                data: []

            });
        };
        return res.status(200).json({
            statusCode: 200,
            message: 'Todas estatisticas!',
            data: dataResult

        });
    } catch(error){
        return res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};
const lastPurchasePlanController = async (req, res) => {
    try{
        const pkUser = req.params.pk;

        /*
        if(!await validAuthPk(req, pkUser)){
            return res.status(400).json({
                statusCode: 400,
                message: 'Operação inválida!'

            });
        };*/
        let dataResult = await getLastPurchasePlanByPkModel(pkUser);
        if(!dataResult){
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.length === 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Nenhuma compra realizada!',
                data: []

            });
        };
        return res.status(200).json({
            statusCode: 200,
            message: 'Ultima compra de plano!',
            data: dataResult

        });

    } catch(error){
        return res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
}
const bestProfessionalsController = async (req, res) => {
    try{
        const pkUser = req.params.pk;

        /*
        if(!await validAuthPk(req, pkUser)){
            return res.status(400).json({
                statusCode: 400,
                message: 'Operação inválida!'

            });
        };*/
        let dataResult = await bestProfessionalsModel(pkUser, isReservation);
        if(!dataResult){
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
            message: 'Melhores profissionais!',
            data: dataResult

        });

    } catch(error){
        return res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
}

export default {
    statsReservationsController,
    lastPurchasePlanController,
    bestProfessionalsController

};