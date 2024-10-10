import connect from '../database/connect.js';

const getAllProfessionalModel = async (pkuser) => {
    const conn = await connect();    
    try {
        const [ result ] = await conn.query('SELECT * FROM `professional` WHERE `fkUser` = ?',
            [ pkuser ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};
const createProfessionalModel = async (name, image, instagram, dateTimeRegistration, pkUser) => {
    const conn = await connect();
    try {
        const [ result ] = await conn.execute('INSERT INTO `professional` (`name`, `image`, `instagram`, `dateTimeRegistration`, `fkUser`) VALUES (?, ?, ?, ?, ?)',
            [ name, image, instagram, dateTimeRegistration, pkUser ]
        );
        return result;

    }catch(error){
        return false;

    };
};
const updateProfessionalModel = async (pkProfessional, name, image, instagram) => {
    const conn = await connect();
    try {
        const [ result ] = await conn.execute('UPDATE `professional` SET `name` = ?, `image` = ?, `instagram` = ? WHERE `pkProfessional` = ?',
            [ name, image, instagram, pkProfessional ]
        );
        return result;

    }catch(error){
        return false;

    };
};
export {
    getAllProfessionalModel,
    createProfessionalModel,
    updateProfessionalModel
};