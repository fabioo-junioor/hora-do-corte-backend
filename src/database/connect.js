import mysql from 'mysql2/promise';
import getLogger from '../core/security/logger.js';

const connect = async () => {
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
    let dbLogger = getLogger('database');
    dbLogger.info('Conectou ao banco de dados');
    
    return conn;

};

export default connect;