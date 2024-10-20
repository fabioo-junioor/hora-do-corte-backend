import connect from '../database/connect.js';

const getAllPlanModel = async () => {
    try {
        const conn = await connect();    
        const [ result ] = await conn.query('SELECT * FROM `plans`');
        return result;
        
    }catch(error){
        return false;
        
    };
};
const getPlanByPkModel = async (pkPlan) => {
    try {
        const conn = await connect();    
        const [ result ] = await conn.query('SELECT * FROM `plans` WHERE `pkPlans` = ?',
            [ pkPlan ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};

export {
    getAllPlanModel,
    getPlanByPkModel

};