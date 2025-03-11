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
const createPurchasePlanModel = async (pkUser, purchaseDate, purchaseTime, purchaseValidity, price, time, dateTimeRegistration) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('INSERT INTO `purchaseplanuser` (`purchaseDate`, `purchaseTime`, `purchaseValidity`, `price`, `time`, `dateTimeRegistration`, `fkUser`) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [ purchaseDate, purchaseTime, purchaseValidity, price, time, dateTimeRegistration, pkUser ]
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