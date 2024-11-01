import connect from '../database/connect.js';

const getLastPurchasePlanByPkModel = async (pkUser) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.query('SELECT * FROM `purchaseplanuser` WHERE `fkUser` = ? ORDER BY `pkPurchasePlanUser` DESC LIMIT 1',
            [ pkUser ]
        );
        return result;

    }catch(error){
        return false;

    };
};
const createPurchasePlanModel = async (pkUser, pkPlan, purchaseDate, purchaseTime, purchaseValidity, price, time, dateTimeRegistration) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('INSERT INTO `purchaseplanuser` (`purchaseDate`, `purchaseTime`, `purchaseValidity`, `price`, `time`, `dateTimeRegistration`, `fkUser`, `fkPlans`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [ purchaseDate, purchaseTime, purchaseValidity, price, time, dateTimeRegistration, pkUser, pkPlan ]
        );
        return result;

    }catch(error){
        return false;

    };
};

export {
    getLastPurchasePlanByPkModel,
    createPurchasePlanModel

};