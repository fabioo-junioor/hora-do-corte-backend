import connect from '../database/connect.js';

const getUserDetailsBySlugModel = async (slug) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.query('SELECT * FROM `userdetails` WHERE `slug` = ?',
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
        const [ result ] = await conn.query('SELECT * FROM `userdetails` WHERE `fkUser` = ?',
            [ fkUser ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};
const createUserDetailsModel = async (name, slug, phone, instagram, image, cep, state, city, street, number, createdAt, updatedAt, pkUser) =>{
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('INSERT INTO `userdetails` (`name`, `slug`, `phone`, `instagram`, `image`, `cep`, `state`, `city`, `street`, `number`, `createdAt`, `updatedAt`, `fkUser`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [ name, slug, phone, instagram, image, cep, state, city, street, number, createdAt, updatedAt, pkUser ]
        );
        return result;

    }catch(error){
        return false;

    };
};
const updateUserDetailsModel = async (name, slug, phone, instagram, image, cep, state, city, street, number, updatedAt, pkUser) =>{
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('UPDATE `userdetails` SET `name` = ?, `slug` = ?, `phone` = ?, `instagram` = ?, `image` = ?, `cep` = ?, `state` = ?, `city` = ?, `street` = ?, `number` = ?, `updatedAt` = ? WHERE `fkUser` = ?',
            [ name, slug, phone, instagram, image, cep, state, city, street, number, updatedAt, pkUser ]
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