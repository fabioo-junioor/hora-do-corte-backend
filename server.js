import app from './src/app.js';
const PORT = process.env.SERVER_PORT;

app.listen(PORT, (error) => {
    if(error){
        console('Error ', error);
        return;

    };
    console.log('Servidor rodando na porta ' + PORT + '!');

});