import connect from '../database/connect.js';

const getAllProfessionalModel = async (pkuser, isActive = 1) => {
    try {
        const conn = await connect();    
        const [ result ] = await conn.query('SELECT * FROM `professional` WHERE `fkUser` = ? AND `isActive` = ?',
            [ pkuser, isActive ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};
const createProfessionalModel = async (name, image, instagram, isUnavailable, isActive, dateTimeRegistration, pkUser) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('INSERT INTO `professional` (`name`, `image`, `instagram`, `isUnavailable`, `isActive`, `dateTimeRegistration`, `fkUser`) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [ name, image, instagram, isUnavailable, isActive, dateTimeRegistration, pkUser ]
        );
        return result;

    }catch(error){
        return false;

    };
};
const updateProfessionalModel = async (pkProfessional, name, image, instagram, isUnavailable) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('UPDATE `professional` SET `name` = ?, `image` = ?, `instagram` = ?, `isUnavailable` = ? WHERE `pkProfessional` = ?',
            [ name, image, instagram, isUnavailable, pkProfessional ]
        );
        return result;

    }catch(error){
        return false;

    };
};
const deleteProfessionalModel = async (pkProfessional, isActive) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('UPDATE `professional` SET `isActive` = ? WHERE `pkProfessional` = ?',
            [ isActive, pkProfessional ]
        );
        return result;

    }catch(error){
        return false;

    };
};
export {
    getAllProfessionalModel,
    createProfessionalModel,
    updateProfessionalModel,
    deleteProfessionalModel
    
};