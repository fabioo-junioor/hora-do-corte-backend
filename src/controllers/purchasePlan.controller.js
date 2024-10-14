import { getPlanByPkModel } from '../models/plan.model.js';
import { createPurchasePlanModel, getLastPurchasePlanByPkModel } from '../models/purchasePlan.model.js';
import { buyPlan, checkLastPurchaseValidity } from '../helpers/purchaseCalculations.helper.js';

const dateToday = new Date();

const getLastPurchasePlanController = async (req, res) => {
    try{
        const pkUser = req.params.pk;
        const dataResult = await getLastPurchasePlanByPkModel(pkUser);
        if(!dataResult){
            return res.status(401).json({
                statusCode: 401,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.length === 0){
            return res.status(401).json({
                statusCode: 401,
                message: 'Nenhum plano comprado!'

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
        const { pkUser, pkPlan, purchaseDate, purchaseTime } = req.body;
        
        const dataPlansLastBuy = await getLastPurchasePlanByPkModel(pkUser);
        if(dataPlansLastBuy.length === 0 && pkPlan == 1){
            const dataPlans = await getPlanByPkModel(pkPlan);
            if(!dataPlans){
                return res.status(401).json({
                    statusCode: 401,
                    message: 'Algo deu errado na conexão!'

                });
            };
            const { name, price, time } = dataPlans[0];
            const purchaseValidity = buyPlan(purchaseDate, time);
            const dataResult = await createPurchasePlanModel(pkUser, pkPlan, purchaseDate, purchaseTime, purchaseValidity, price, time, dateToday);
            if(dataResult.affectedRows === 0 || !dataResult){
                return res.status(401).json({
                    statusCode: 401,
                    message: 'Algo deu errado na compra do plano!'

                });
            };
            return res.status(200).json({
                statusCode: 200,
                message: `Compra realizada, plano [${name}]!`,
                data: { "validade": purchaseValidity }

            });
        };
        if(dataPlansLastBuy.length !== 0 && pkPlan == 1){
            const dateLastBuy = dataPlansLastBuy[0].purchaseValidity;
            const timeLastBuy = dataPlansLastBuy[0].purchaseTime;
            const dataValidityBuy = checkLastPurchaseValidity(purchaseDate, dateLastBuy, purchaseTime, timeLastBuy);
            if(dataValidityBuy){
                return res.status(401).json({
                    statusCode: 401,
                    message: 'Sua ultima compra aida está vigente!'

                });
            };
            return res.status(200).json({
                statusCode: 200,
                message: 'O plano [Free] é só na primeira compra!'

            });
        };
        if(dataPlansLastBuy.length === 0 && pkPlan != 1){
            const dataPlans = await getPlanByPkModel(pkPlan);
            if(!dataPlans){
                return res.status(401).json({
                    statusCode: 401,
                    message: 'Algo deu errado na conexão!'

                });
            };
            const { name, price, time } = dataPlans[0];
            const purchaseValidity = buyPlan(purchaseDate, time);
            const dataResult = await createPurchasePlanModel(pkUser, pkPlan, purchaseDate, purchaseTime, purchaseValidity, price, time, dateToday);
            if(dataResult.affectedRows === 0 || !dataResult){
                return res.status(401).json({
                    statusCode: 401,
                    message: 'Algo deu errado na compra do plano!'

                });
            };
            return res.status(200).json({
                statusCode: 200,
                message: `Compra realizada, plano [${name}]!`,
                data: { "validade": purchaseValidity }

            });            
        };
        
        const dateLastBuy = dataPlansLastBuy[0].purchaseValidity;
        const timeLastBuy = dataPlansLastBuy[0].purchaseTime;
        const dataValidityBuy = checkLastPurchaseValidity(purchaseDate, dateLastBuy, purchaseTime, timeLastBuy);
        if(dataValidityBuy){
            return res.status(401).json({
                statusCode: 401,
                message: 'Sua ultima compra aida está vigente!'

            });
        };
        const dataPlans = await getPlanByPkModel(pkPlan);
        if(!dataPlans){
            return res.status(401).json({
                statusCode: 401,
                message: 'Algo deu errado na conexão!'

            });
        };
        const { name, price, time } = dataPlans[0];
        const purchaseValidity = buyPlan(purchaseDate, time);
        const dataResult = await createPurchasePlanModel(pkUser, pkPlan, purchaseDate, purchaseTime, purchaseValidity, price, time, dateToday);
        if(dataResult.affectedRows === 0 || !dataResult){
            return res.status(401).json({
                statusCode: 401,
                message: 'Algo deu errado na compra do plano!'

            });
        };
        return res.status(200).json({
            statusCode: 200,
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