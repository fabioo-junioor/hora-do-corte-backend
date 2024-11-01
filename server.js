import app from './src/app.js';
const PORT = process.env.SERVER_PORT;
const DBHOST = process.env.DBHOST

app.listen(PORT, (error) => {
    if(error){
        console('Error ', error);
        return;

    };
    console.log('Servidor rodando [' + DBHOST + ':' + PORT + ']');

});