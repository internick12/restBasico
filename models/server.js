const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middlewares();

        //Lectura y parseo
        this.app.use( express.json() );

        //Ruras de la aplicacion
        this.routes();
    }

    middlewares(){
        this.app.use(cors() );
        this.app.use( express.static('public'));
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto: ' + this.port );
        });
    }

}

module.exports = Server;