import connect from '../database/connect.js';

const getUserDetailsBySlugModel = async (slug) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.query('SELECT * FROM `userDetails` WHERE `slug` = ?',
            [ slug ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};
const getUserDetailsByFkModel = async (fkUser) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.query('SELECT * FROM `userDetails` WHERE `fkUser` = ?',
            [ fkUser ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};
const createUserDetailsModel = async (name, slug, phone, instagram, image, cep, state, city, street, number, dateTimeRegistration, pkUser) =>{
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('INSERT INTO `userDetails` (`name`, `slug`, `phone`, `instagram`, `image`, `cep`, `state`, `city`, `street`, `number`, `dateTimeRegistration`, `fkUser`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [ name, slug, phone, instagram, image, cep, state, city, street, number, dateTimeRegistration, pkUser ]
        );
        return result;

    }catch(error){
        return false;

    };
};
const updateUserDetailsModel = async (name, slug, phone, instagram, image, cep, state, city, street, number, pkUser) =>{
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('UPDATE `userDetails` SET `name` = ?, `slug` = ?, `phone` = ?, `instagram` = ?, `image` = ?, `cep` = ?, `state` = ?, `city` = ?, `street` = ?, `number` = ? WHERE `fkUser` = ?',
            [ name, slug, phone, instagram, image, cep, state, city, street, number, pkUser ]
        );
        return result;

    }catch(error){
        return false;

    };
};

export {
    getUserDetailsBySlugModel,
    getUserDetailsByFkModel,
    createUserDetailsModel,
    updateUserDetailsModel

};