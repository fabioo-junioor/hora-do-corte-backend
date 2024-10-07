import connect from '../database/connect.js';

const login = async (email, password) => {
    const conn = await connect();

    try {
        const [ result ] = await conn.query('SELECT * FROM `user` WHERE `email` = ? AND `password` = ?',
            [ email, password ]
        );
        return result;

    }catch(error){
        return error;

    };
};
const create = async(email, password, situationActive, dateTimeRegistration) => {
    const conn = await connect();

    try {
        const [ result ] = await conn.query('INSERT INTO `user` (`email`, `password`, `situationActive`, `dateTimeRegistration`) VALUES (?, ?, ?, ?)',
            [ email, password, situationActive, dateTimeRegistration ]
        );
        return result;

    }catch(error){
        return error;

    };
};

export {
    login,
    create
};