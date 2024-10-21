import connect from '../database/connect.js';

const getAllReservationModel = async (pkUser, isReservation = 1) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.query('SELECT *, (SELECT name FROM `professional` AS pro WHERE `pro`.pkProfessional = `res`.fkProfessional) AS nameProfessional FROM `reservation` AS res WHERE `fkUser` = ? AND `isReservation` = ?',
            [ pkUser, isReservation ]
        );
        return result;
        
    }catch(error){
        return error;
        
    };
};
const createReservationModel = async (pkUser, pkProfessional, services, dateReservation, timeReservation, price, duration, dateTimeRegistration, isReservation, name, email, phone, observation) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('INSERT INTO `reservation` (`nameCustomer`, `emailCustomer`, `phoneCustomer`, `observationCustomer`, `dateReservation`, `timeReservation`, `services`, `price`, `duration`, `isReservation`, `dateTimeRegistration`, `fkUser`, `fkProfessional`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [ name, email, phone, observation, dateReservation, timeReservation, services, price, duration, isReservation, dateTimeRegistration, pkUser, pkProfessional ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};
const deleteReservationModel = async (pkReservation, isReservation) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('UPDATE `reservation` SET `isReservation` = ? WHERE `pkReservation` = ?',
            [ isReservation, pkReservation ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};

export {
    getAllReservationModel,
    createReservationModel,
    deleteReservationModel

};