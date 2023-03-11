const { Router } = require('express');
const { check } = require('express-validator');
const { postFacturas, putFacturas, deleteFacturas, getFacturas } = require('../controllers/facturas');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.get('/mostrar', getFacturas)


router.post('/agregar', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nit', 'El nit es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('direccion', 'La direccion no puede ir vacia').not().isEmpty(),
    check('total', 'El total es obligatorio').not().isEmpty(),

    validarCampos

], postFacturas)


router.put('/editar/:id', [
    check('id', 'No es un ID valido').isMongoId(),

    validarCampos
], putFacturas)


router.delete('/delete/:id', [
    check('id', 'No es un ID valido').isMongoId(),

    
    validarCampos
], deleteFacturas)



module.exports = router;