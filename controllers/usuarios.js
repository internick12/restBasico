const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');



const usuariosGet = async(req = request, res = response) => {

    const{ limite=5, desde = 0 } = req.query;
    const query = { estado: true }
    
    //const usuarios = await Usuario.find(query).skip(Number(desde)).limit( Number(limite) );
    //const total = await Usuario.countDocuments( query );

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find(query).skip(Number(desde)).limit( Number(limite) )
    ]);

    res.json({
        total, usuarios
        //total,
        //usuarios
    });
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO: validar contra db
    if( password ){
        //Encriptar password
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json( Usuario );
}

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario({ nombre, correo, password, role });
   

    //Encriptar password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );

    //Guardar en bd

    await usuario.save();

    res.json({
        ok: true,
        msg: 'Peticion post al api -- desde el controlador ',
        usuario
    });
}

const usuariosDelete = async (req, res = response) => {

    const{ id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false} );

    res.json(usuario);
    
}

module.exports = { usuariosGet, usuariosPut, usuariosPost, usuariosDelete };