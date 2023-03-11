const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {
    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.categoriaPath = '/api/categoria';
        this.ProductoPath = '/api/productos';
        this.FacturaPath = '/api/facturas';
        this.UsuarioPath = '/api/usuarios';
        this.AuthPath = '/api/auth';
        this.conectarDB();
        this.middlewares();
        this.routes();

    }


    async conectarDB() {
        await dbConection();
    }




    middlewares() {

        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }



    routes() {
        this.app.use(this.categoriaPath, require('../routes/categoria'));
        this.app.use(this.ProductoPath, require('../routes/productos'));
        this.app.use(this.FacturaPath, require('../routes/facturas'));
        this.app.use(this.UsuarioPath, require('../routes/usuarios'));
        this.app.use(this.AuthPath, require('../routes/auth'));

    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })
    }
}

module.exports = Server;