import connect from '../database/connect.js';

const getUserDetailsBySlugModel = async (slug) => {
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
const getUserDetailsByFkModel = async (fkUser) => {
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
    getUserDetailsBySlugModel,
    getUserDetailsByFkModel,
    createUserDetailsModel,
    updateUserDetailsModel
};