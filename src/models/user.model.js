import connect from '../database/connect.js';

const loginUserModel = async (email, isActive) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.query('SELECT * FROM `user` WHERE `email` = ? AND `isActive` = ?',
            [ email, isActive ]
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
const getUserByEmailModel = async (email) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.query('SELECT * FROM `user` WHERE `email` = ?',
            [ email ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};
const createUserModel = async (email, password, isActive, createdAt) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('INSERT INTO `user` (`email`, `password`, `isActive`, `createdAt`, updatedAt) VALUES (?, ?, ?, ?, ?)',
            [ email, password, isActive, createdAt, createdAt ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};
const updateUserModel = async (pkUser, newPassword, dateToday, isActive) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('UPDATE `user` SET `password` = ?, `updatedAt` = ? WHERE `pkUser` = ? AND `isActive` = ?',
            [ newPassword, dateToday, pkUser, isActive ]
        );
        return result;

    }catch(error){
        return false;

    };
};
const deleteUserModel = async (pkUser, updatedAt, isActive) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('UPDATE `user` SET `updatedAt` = ?, `isActive` = ? WHERE `pkUser` = ?',
            [ updatedAt, isActive, pkUser ]
        );
        return result;

    }catch(error){
        return false;

    };
};

export {
    loginUserModel,
    getUserByIdModel,
    getUserByEmailModel,
    createUserModel,
    updateUserModel,
    deleteUserModel

};