const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

    const query = req.query;

    res.json({
        ok: true,
        msg: 'Peticion get al api --  controlador ',
        query
    });
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        ok: true,
        msg: 'Peticion put al api -- desde el controlador ',
        id
    });
}

const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        ok: true,
        msg: 'Peticion post al api -- desde el controlador ',
        nombre, edad
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Peticion delete al api -- desde el controlador '
    });
}

module.exports = { usuariosGet, usuariosPut, usuariosPost, usuariosDelete };