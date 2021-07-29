const jwt = require('jsonwebtoken');
const { Usuario } = require('../models/usuario');

const generarJWT = (uid='') => {

    return new Promise( (resolve, reject ) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETO, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });

    });

}

module.exports = { generarJWT }