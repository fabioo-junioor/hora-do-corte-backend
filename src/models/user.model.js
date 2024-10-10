import connect from '../database/connect.js';

const loginUserModel = async (email, password) => {
    const conn = await connect();
    
    try {
        const [ result ] = await conn.query('SELECT * FROM `user` WHERE `email` = ? AND `password` = ?',
            [ email, password ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};
const getUserByIdModel = async (pkUser) => {
    const conn = await connect();
    
    try {
        const [ result ] = await conn.query('SELECT * FROM `user` WHERE `pkUser` = ?',
            [ pkUser ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};
const createUserModel = async (email, password, situationActive, dateTimeRegistration) => {
    const conn = await connect();
    
    try {
        const [ result ] = await conn.query('INSERT INTO `user` (`email`, `password`, `situationActive`, `dateTimeRegistration`) VALUES (?, ?, ?, ?)',
            [ email, password, situationActive, dateTimeRegistration ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};
const updateUserModel = async (pkUser, newPassword) => {
    const conn = await connect();
    try {
        const [ result ] = await conn.execute('UPDATE `user` SET `password` = ? WHERE `pkUser` = ?',
            [ newPassword, pkUser ]
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
    updateUserModel

};