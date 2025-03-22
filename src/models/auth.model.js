import connect from '../database/connect.js';

const loginAuthModel = async (email, isActive) => {
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

export {
    loginAuthModel

};