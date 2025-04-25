import * as dotenv from 'dotenv';
import app from './src/app.js';
import logger from './src/core/security/logger.js'

dotenv.config();
const PORT = process.env.SERVER_PORT;
const DBHOST = process.env.DBHOST

app.listen(PORT, (error) => {
    if(error){
        logger.error(error.message, { status: { code: 500, path: 'Init server' }});
        return;

    };
    console.log('Servidor rodando [' + DBHOST + ':' + PORT + ']!');
    return;

});