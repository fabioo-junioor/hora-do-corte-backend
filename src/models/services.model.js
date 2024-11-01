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
const createServiceModel = async (services, dateTimeRegistration, pkProfessional) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('INSERT INTO `professionalservices` (`services`, `dateTimeRegistration`, `fkProfessional`) VALUES (?, ?, ?)',
            [ services, dateTimeRegistration, pkProfessional ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};
const updateServiceModel = async (services, pkProfessionalServices) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('UPDATE `professionalservices` SET `services` = ? WHERE `pkProfessionalServices` = ?',
            [ services, pkProfessionalServices ]
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