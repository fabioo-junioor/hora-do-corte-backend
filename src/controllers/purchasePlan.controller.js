import { getPlanByPkModel } from '../models/plan.model.js';
import { createPurchasePlanModel, getLastPurchasePlanByPkModel } from '../models/purchasePlan.model.js';
import { getUserByIdModel } from '../models/user.model.js';
import { buyPlan, checkLastPurchaseValidity } from '../helpers/purchaseCalculations.helper.js';
import { sendEmail } from '../core/communication/config.email.js';
import { templateEmailBuyPlan } from '../core/communication/templates.js';
import { getTimeZone } from '../helpers/global.helper.js';

const dateToday = getTimeZone();
const contactSuport = process.env.CONTACT_SUPORT;

const getLastPurchasePlanController = async (req, res) => {
    try{
        const pkUser = req.params.pk;
        
        const dataResult = await getLastPurchasePlanByPkModel(pkUser);
        if(!dataResult){
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.length === 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Nenhum plano comprado!',
                data: []

            });
        };
        return res.status(200).json({
            statusCode: 200,
            message: 'Último plano comprado!',
            data: dataResult

        });
    } catch (error){
        return res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};
const createPurchasePlanController = async (req, res) => {
    try{
        const pkUser = req.params.pk;
        const { pkPlan, purchaseDate, purchaseTime } = req.body;
        
        const dataPlan = await getPlanByPkModel(pkPlan);
        const dataUser = await getUserByIdModel(pkUser);
        const { name, price, time } = dataPlan[0];
        const purchaseValidity = buyPlan(purchaseDate, time);
        const dataPlansLastBuy = await getLastPurchasePlanByPkModel(pkUser);
        
        if(name === 'Free'){
            if(dataPlansLastBuy.length !== 0){
                return res.status(200).json({
                    statusCode: 200,
                    message: `O plano ${name} já foi utilizado!`,
                    data: []
                    
                });
            };
            let dataResult = await createPurchasePlanModel(pkUser, purchaseDate, purchaseTime, purchaseValidity, price, time, dateToday);
            if(dataResult.affectedRows === 0){
                return res.status(500).json({
                    statusCode: 500,
                    message: `Algo deu errado na compra do plano ${dataPlans[0].name}!`
    
                });
            };

            /* Enviar email com dados da compra */
            let responseEmailPlanFree = await sendEmail(dataUser[0].email, 'Plano adiquirido',
                templateEmailBuyPlan('Plano adiquirido!',
                    dataUser[0].email,
                    name,
                    price,
                    time,
                    purchaseDate,
                    purchaseTime,
                    purchaseValidity,
                    purchaseTime,
                    contactSuport));
            
            return res.status(201).json({
                statusCode: 201,
                message: `Compra realizada, plano [${name}]!`,
                data: { "validade": purchaseValidity }
    
            });
        };

        /* Adicionar integração mercado pago */
        
        /* Enviar email com dados da compra */
        let responseEmailOtherPlans = await sendEmail(dataUser[0].email, 'Plano adiquirido',
            templateEmailBuyPlan('Plano adiquirido!',
                dataUser[0].email,
                name,
                price,
                time,
                purchaseDate,
                purchaseTime,
                purchaseValidity,
                purchaseTime,
                contactSuport));

        let dataResult = await createPurchasePlanModel(pkUser, purchaseDate, purchaseTime, purchaseValidity, price, time, dateToday);
        if(dataResult.affectedRows === 0){
            return res.status(500).json({
                statusCode: 500,
                message: `Algo deu errado na compra do plano ${dataPlans[0].name}!`

            });
        };
        return res.status(201).json({
            statusCode: 201,
            message: `Compra realizada, plano [${name}]!`,
            data: { "validade": purchaseValidity }
            
        });
    } catch (error){
        return res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};

export default {
    getLastPurchasePlanController,
    createPurchasePlanController

};