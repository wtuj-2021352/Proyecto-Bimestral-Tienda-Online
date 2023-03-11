const { Router } = require('express');
const { check } = require('express-validator');
const { getProductos, postProductos, putProductos, deleteProductos, ProductosNoDisponibles, getProductoPorCategoria, getProductoPorNombre } = require('../controllers/productos');
const { existeProducto, existeProductoPorId, esProductoValido } = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-role');

const router = Router();

router.get('/mostrar', getProductos);

router.get('/productosPorCategoria/:idCategoria', getProductoPorCategoria);

router.get('/productosPorNombre', [
    check('nombre').custom(esProductoValido),
    validarCampos
], getProductoPorNombre);

router.get('/mostrarAgotados',[
    validarJWT,
    esAdminRole
], ProductosNoDisponibles);

router.post('/agregar', [
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre no puede ir vacio').not().isEmpty(),
    check('nombre').custom(existeProducto),
    check('precio','tienes que colocar un numero para el precio').isInt(),
    check('stock','tienes que coloar un numero para el stock').isInt(),
    check('categoria', 'La categoria no puede ir vacia').not().isEmpty(),
    check('categoria', 'No es un id valido').isMongoId(),
    validarCampos
], postProductos);


router.put('/editar/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    check('categoria', 'La categoria no puede ir vacia').not().isEmpty(),
    check('categoria', 'No es un id valido').isMongoId(),
    check('precio','tienes que colocar un numero para el precio').isInt(),
    check('stock','tienes que colocar un numero para el stock').isInt(),
    check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
    validarCampos
], putProductos);

router.delete('/eliminar/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], deleteProductos);



module.exports = router;