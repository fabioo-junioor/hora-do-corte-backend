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
const getProfessionalByPkModel = async (pkProfessional, isActive = 1) => {
    try {
        const conn = await connect();    
        const [ result ] = await conn.query('SELECT * FROM `professional` WHERE `pkProfessional` = ? AND `isActive` = ?',
            [ pkProfessional, isActive ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};
const createProfessionalModel = async (name, image, instagram, isUnavailable, isActive, createdAt, updatedAt, pkUser) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('INSERT INTO `professional` (`name`, `image`, `instagram`, `isUnavailable`, `isActive`, `createdAt`, `updatedAt`, `fkUser`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [ name, image, instagram, isUnavailable, isActive, createdAt, updatedAt, pkUser ]
        );
        return result;

    }catch(error){
        return false;

    };
};
const updateProfessionalModel = async (pkProfessional, name, image, instagram, isUnavailable, isActive, updatedAt, pkUser) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('UPDATE `professional` SET `name` = ?, `image` = ?, `instagram` = ?, `isUnavailable` = ?, `updatedAt` = ? WHERE `pkProfessional` = ? AND `isActive` = ? AND `fkUser` = ?',
            [ name, image, instagram, isUnavailable, updatedAt, pkProfessional, isActive, pkUser ]
        );
        return result;

    }catch(error){
        return false;

    };
};
const deleteProfessionalModel = async (pkProfessional, isActive, updatedAt, pkUser) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('UPDATE `professional` SET `isActive` = ?, `updatedAt` = ? WHERE `pkProfessional` = ? AND `fkUser` = ?',
            [ isActive, updatedAt, pkProfessional, pkUser ]
        );
        return result;

    }catch(error){
        return false;

    };
};
export {
    getAllProfessionalModel,
    getProfessionalByPkModel,
    createProfessionalModel,
    updateProfessionalModel,
    deleteProfessionalModel
    
};