import connect from '../database/connect.js';

// Models user
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
const getUserById = async (pkUser) => {
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

// Models userDetails
const getUserDetailsBySlug = async (slug) => {
    const conn = await connect();
    
    try {
        const [ result ] = await conn.query('SELECT * FROM `userDetails` WHERE `slug` = ?',
            [ slug ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};
const getUserDetailsByFk = async (fkUser) => {
    const conn = await connect();
    
    try {
        const [ result ] = await conn.query('SELECT * FROM `userDetails` WHERE `fkUser` = ?',
            [ fkUser ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};
const createUserDetailsModel = async (name, slug, phone, instagram, image, state, city, street, number, dateTimeRegistration, pkUser) =>{
    const conn = await connect();
    try {
        const [ result ] = await conn.query('INSERT INTO `userDetails` (`name`, `slug`, `phone`, `instagram`, `image`, `state`, `city`, `street`, `number`, `dateTimeRegistration`, `fkUser`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [ name, slug, phone, instagram, image, state, city, street, number, dateTimeRegistration, pkUser ]
        );
        return result;

    }catch(error){
        return false;

    };
};
const updateUserDetailsModel = async (name, slug, phone, instagram, image, state, city, street, number, pkUser) =>{
    const conn = await connect();
    try {
        const [ result ] = await conn.execute('UPDATE `userDetails` SET `name` = ?, `slug` = ?, `phone` = ?, `instagram` = ?, `image` = ?, `state` = ?, `city` = ?, `street` = ?, `number` = ? WHERE `fkUser` = ?',
            [ name, slug, phone, instagram, image, state, city, street, number, pkUser ]
        );
        return result;

    }catch(error){
        return false;

    };
};

export {
    loginUserModel,
    getUserById,
    createUserModel,
    updateUserModel,
    getUserDetailsBySlug,
    getUserDetailsByFk,
    createUserDetailsModel,
    updateUserDetailsModel
};