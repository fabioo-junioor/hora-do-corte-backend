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
const getAllReservationByProfessionalModel = async (pkProfessional, dateReservation, isReservation = 1) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.query('SELECT * FROM `reservation` WHERE `fkProfessional` = ? AND `dateReservation` = ? AND `isReservation` = ?',
            [ pkProfessional, dateReservation, isReservation ]
        );
        return result;
        
    }catch(error){
        return error;
        
    };
};
const getReservationByPkReservationModel = async (pkReservation) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.query('SELECT * FROM `reservation` WHERE `pkReservation` = ?',
            [ pkReservation ]
        );
        return result;
        
    }catch(error){
        return error;
        
    };
};
const createReservationModel = async (pkUser, pkProfessional, services, dateReservation, timeReservation, price, duration, createdAt, updatedAt, isReservation, name, email, phone, observation) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('INSERT INTO `reservation` (`nameCustomer`, `emailCustomer`, `phoneCustomer`, `observationCustomer`, `dateReservation`, `timeReservation`, `services`, `price`, `duration`, `isReservation`, `createdAt`, `updatedAt`, `fkUser`, `fkProfessional`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [ name, email, phone, observation, dateReservation, timeReservation, services, price, duration, isReservation, createdAt, updatedAt, pkUser, pkProfessional ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};
const deleteReservationModel = async (pkReservation, isReservation, updatedAt, pkUser) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('UPDATE `reservation` SET `isReservation` = ?, `updatedAt` = ? WHERE `pkReservation` = ? AND `fkUser` = ?',
            [ isReservation, updatedAt, pkReservation, pkUser ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};

export {
    getAllReservationModel,
    getAllReservationByProfessionalModel,
    getReservationByPkReservationModel,
    createReservationModel,
    deleteReservationModel

};