const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(role='') => {
    const existeRole = await Role.findOne({ role });
    if(!existeRole){
        throw new Error(`El role ${role}, no esta registrado en la bd`);
    }
}

const emailExiste = async( correo='' ) => {
    //Validar si correo existe
    const existeEmail = await Usuario.findOne({ correo });

    if( existeEmail ){
        throw new Error(`El correo: ${correo}, ya esta registrado`);
    }
} 

const existeUsuarioPorId = async( id='' ) => {
    //Validar si correo existe
    const existeUsuario = await Usuario.findById( id );

    if( !existeUsuario ){
        throw new Error(`El id: ${correo}, no existe`);
    }
} 

module.exports = { esRoleValido, emailExiste, existeUsuarioPorId };