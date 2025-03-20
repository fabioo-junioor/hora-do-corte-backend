import connect from '../database/connect.js';

const getServiceModel = async (pkProfessional) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.query('SELECT * FROM `professionalservices` WHERE `fkProfessional` = ?',
            [ pkProfessional ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};
const createServiceModel = async (services, createdAt, updatedAt, pkProfessional) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('INSERT INTO `professionalservices` (`services`, `createdAt`, `updatedAt`, `fkProfessional`) VALUES (?, ?, ?, ?)',
            [ services, createdAt, updatedAt, pkProfessional ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};
const updateServiceModel = async (services, updatedAt, pkProfessionalServices) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('UPDATE `professionalservices` SET `services` = ?, `updatedAt` = ? WHERE `pkProfessionalServices` = ?',
            [ services, updatedAt, pkProfessionalServices ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};

export {
    getServiceModel,
    createServiceModel,
    updateServiceModel

};