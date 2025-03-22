import { getAllPlanModel } from '../models/plan.model.js';


const getAllPlansController = async (req, res) => {
    try{
        let dataResult = await getAllPlanModel();
        if(!dataResult){
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.length === 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Sem planos!',
                data: []

            });
        };
        return res.status(200).json({
            statusCode: 200,
            message: 'Todos os planos!',
            data: dataResult

        });
    } catch (error){
        return res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};

export default{
    getAllPlansController

};