const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios, putCarritoDeCompras, getCarritoDeCompras, putProductoDelCarrito, EmptyShopCar } = require('../controllers/usuarios');
const { emailExiste, existeUsuarioPorId } = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.get('/mostrar', getUsuarios)

router.post('/agregar', [
    check('nombre', 'El nombre es obligatorio para el post').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe ser mayor a 6 digitos').isLength({ main: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),



    validarCampos
], postUsuarios)

router.put('/editar/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),

    validarCampos
], putUsuarios)

router.delete('/eliminar/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
] , deleteUsuarios);

router.put('/carrito', [
    validarJWT,
], putCarritoDeCompras);

router.get('/mostrar/carrito/:id', [
    validarJWT,
], getCarritoDeCompras);

router.put('/delete/carrito/:id', [
    validarJWT,
], putProductoDelCarrito);

router.put('/quitar-Productos', [
    validarJWT,
], EmptyShopCar);

module.exports = router;