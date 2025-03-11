import { getPlanByPkModel } from '../models/plan.model.js';
import { createPurchasePlanModel, getLastPurchasePlanByPkModel } from '../models/purchasePlan.model.js';
import { buyPlan, checkLastPurchaseValidity } from '../helpers/purchaseCalculations.helper.js';

const dateToday = new Date();

const getLastPurchasePlanController = async (req, res) => {
    try{
        const pkUser = req.params.pk;
        
        const dataResult = await getLastPurchasePlanByPkModel(pkUser);
        if(!dataResult){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.length === 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Nenhum plano comprado!',
                data: dataResult

            });
        };
        return res.status(200).json({
            statusCode: 200,
            message: 'Ultimo plano comprado!',
            data: dataResult

        });
    } catch (error){
        res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};
const createPurchasePlanController = async (req, res) => {
    try{
        const pkUser = req.params.pk;
        const { pkPlan, purchaseDate, purchaseTime } = req.body;
        
        const dataPlans = await getPlanByPkModel(pkPlan);
        if(dataPlans[0].name === 'Free'){
            const { name, price, time } = dataPlans[0];
            const purchaseValidity = buyPlan(purchaseDate, time);
            const dataPlansLastBuy = await getLastPurchasePlanByPkModel(pkUser);
            if(dataPlansLastBuy.length !== 0){
                return res.status(200).json({
                    statusCode: 200,
                    message: `O plano ${dataPlans[0].name} já foi utilizado!`
                    
                });
            };
            let dataResult = await createPurchasePlanModel(pkUser, purchaseDate, purchaseTime, purchaseValidity, price, time, dateToday);
            if(dataResult.affectedRows === 0){
                return res.status(502).json({
                    statusCode: 502,
                    message: `Algo deu errado na compra do plano ${dataPlans[0].name}!`
    
                });
            };
            return res.status(201).json({
                statusCode: 201,
                message: `Compra realizada, plano [${name}]!`,
                data: { "validade": purchaseValidity }
    
            });
        };
        const { name, price, time } = dataPlans[0];
        const purchaseValidity = buyPlan(purchaseDate, time);

        /* Adicionar integração mercado pago */

        let dataResult = await createPurchasePlanModel(pkUser, purchaseDate, purchaseTime, purchaseValidity, price, time, dateToday);
        if(dataResult.affectedRows === 0){
            return res.status(502).json({
                statusCode: 502,
                message: `Algo deu errado na compra do plano ${dataPlans[0].name}!`

            });
        };
        return res.status(201).json({
            statusCode: 201,
            message: `Compra realizada, plano [${name}]!`,
            data: { "validade": purchaseValidity }

        });
    } catch (error){
        res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};

export default {
    getLastPurchasePlanController,
    createPurchasePlanController

};