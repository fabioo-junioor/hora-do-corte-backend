import connect from '../database/connect.js';

const loginUserModel = async (email, password) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.query('SELECT * FROM `user` WHERE `email` = ? AND `password` = ?',
            [ email, password ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};
const getUserByIdModel = async (pkUser) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.query('SELECT * FROM `user` WHERE `pkUser` = ?',
            [ pkUser ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};
const createUserModel = async (email, password, isActive, dateTimeRegistration) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('INSERT INTO `user` (`email`, `password`, `isActive`, `dateTimeRegistration`) VALUES (?, ?, ?, ?)',
            [ email, password, isActive, dateTimeRegistration ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};
const updateUserModel = async (pkUser, newPassword) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('UPDATE `user` SET `password` = ? WHERE `pkUser` = ?',
            [ newPassword, pkUser ]
        );
        return result;

    }catch(error){
        return false;

    };
};
const deleteUserModel = async (pkUser, isActive) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('UPDATE `user` SET `isActive` = ? WHERE `pkUser` = ?',
            [ isActive, pkUser ]
        );
        return result;

    }catch(error){
        return false;

    };
};

export {
    loginUserModel,
    getUserByIdModel,
    createUserModel,
    updateUserModel,
    deleteUserModel

};