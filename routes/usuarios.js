
const{ Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('role').custom( esRoleValido ),
    validarCampos
],usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('correo').custom(emailExiste),
    // check('role', 'No es un role valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( esRoleValido ),
    validarCampos

],usuariosPost);

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    tieneRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete);



module.exports = router;





