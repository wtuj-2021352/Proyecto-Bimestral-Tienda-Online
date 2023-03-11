require('dotenv').config()

//Importacion de configuracion de servidor 
const Server = require('./models/server');

const servidorIniciado = new Server();

servidorIniciado.listen();

