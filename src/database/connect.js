import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import logger from '../core/security/logger.js';

dotenv.config();

const connect = async () => {
    try {
        if(global.connection && global.connection.state !== 'disconect'){
            return global.connection;
    
        };
        const conn = await mysql.createConnection({
            host: process.env.DBHOST,
            port: process.env.DBPORT,
            user: process.env.DBUSER,
            password: process.env.DBPASSWORD,
            database: process.env.DBDATABASE
    
        });
        global.connection = conn;
        return conn;

    } catch (error) {
        logger.error(error.message, { status: { code: 500 }});
        return null;

    };
};

export default connect;