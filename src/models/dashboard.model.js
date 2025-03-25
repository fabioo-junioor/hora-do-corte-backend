import connect from '../database/connect.js';

const getStatsReservationsModel = async (pkuser) => {
    try {
        const conn = await connect();    
        const [ result ] = await conn.query('SELECT * FROM `reservation` WHERE `fkUser` = ?',
            [ pkuser ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};
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
const bestProfessionalsModel = async (pkUser, isReservation) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.query(`SELECT professional.name, COUNT(reservation.fkProfessional) AS total
            FROM reservation, professional
            WHERE reservation.fkUser = ?
            AND reservation.isReservation = ?
            AND reservation.fkProfessional = professional.pkProfessional
            AND STR_TO_DATE(reservation.dateReservation, '%d-%m-%Y') >= DATE_FORMAT(NOW(), '%Y-%m-01')
            AND STR_TO_DATE(reservation.dateReservation, '%d-%m-%Y') < DATE_FORMAT(NOW() + INTERVAL 1 MONTH, '%Y-%m-01')
            GROUP BY reservation.fkProfessional
            ORDER BY total DESC`,
            [ pkUser, isReservation ]
        );
        return result;

    }catch(error){
        return false;

    };
};

export {
    getStatsReservationsModel,
    getLastPurchasePlanByPkModel,
    bestProfessionalsModel

};