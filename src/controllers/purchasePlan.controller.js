import { getPlanByPkModel } from '../models/plan.model.js';
import { createPurchasePlanModel, getLastPurchasePlanByPkModel } from '../models/purchasePlan.model.js';
import { getUserByPkModel } from '../models/user.model.js';
import { validAuthPk } from '../core/auth/auth.jwt.js';
import { calculatesExpirationDate } from '../helpers/purchase.helper.js';
import { sendEmail } from '../core/communication/config.email.js';
import { templateEmailBuyPlan } from '../core/communication/templates.js';
import { getTimeZone } from '../helpers/global.helper.js';

const contactSuport = process.env.CONTACT_SUPORT;

const getLastPurchasePlanController = async (req, res) => {
    try{
        const pkUser = req.params.pk;
        
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
                message: 'Nenhum plano comprado!',
                data: []

            });
        };
        return res.status(200).json({
            statusCode: 200,
            message: 'Último plano comprado!',
            data: dataResult.map((elem) => {
                return {
                    pkPurchasePlanUser: elem.pkPurchasePlanUser,
                    purchaseValidity: elem.purchaseValidity,
                    purchaseTime: elem.purchaseTime,
                    fkUser: elem.fkUser
                }
            })
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
        
        if(!await validAuthPk(req, pkUser)){
            return res.status(400).json({
                statusCode: 400,
                message: 'Operação inválida!'

            });
        };

        let dataUser = await getUserByPkModel(pkUser);
        if(dataUser[0].isBlocked == 1){
            return res.status(200).json({
                statusCode: 200,
                message: 'Operação inválida no momento!',
                data: []
                
            });
        };
        
        let dataPlan = await getPlanByPkModel(pkPlan);
        const { name, price, time, description, benefits } = dataPlan[0];
        let purchaseValidity = calculatesExpirationDate(purchaseDate, time);
        let dataPlansLastBuy = await getLastPurchasePlanByPkModel(pkUser);
        if(name === 'Free'){
            if(dataPlansLastBuy.length !== 0){
                return res.status(200).json({
                    statusCode: 200,
                    message: `O plano ${name} já foi utilizado!`,
                    data: []
                    
                });
            };

            let dataResult = await createPurchasePlanModel(pkUser, purchaseDate, purchaseTime, purchaseValidity, name, price, time, description, benefits, getTimeZone());
            if(dataResult.affectedRows === 0){
                return res.status(500).json({
                    statusCode: 500,
                    message: `Algo deu errado na compra do plano ${dataPlan[0].name}!`
    
                });
            };

            /* Enviar email com dados da compra */
            let responseEmailPlanFree = await sendEmail(dataUser[0].email, 'Plano adquirido',
                templateEmailBuyPlan('Dados do plano adquirido!',
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

        let dataResult = await createPurchasePlanModel(pkUser, purchaseDate, purchaseTime, purchaseValidity, name, price, time, description, benefits, getTimeZone());
        if(dataResult.affectedRows === 0){
            return res.status(500).json({
                statusCode: 500,
                message: `Algo deu errado na compra do plano ${dataPlan[0].name}!`

            });
        };

        /* Enviar email com dados da compra */
        let responseEmailOtherPlans = await sendEmail(dataUser[0].email, 'Plano adquirido',
            templateEmailBuyPlan('Dados do plano adquirido!',
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