const{ Schema, model } = require('mongoose');

const FacturaSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El id del usuario es obligatorio']
    },
    productos: [{
        producto: {
            type: Schema.Types.ObjectId,
            ref: 'Producto',
           required: [true, 'el id del producto es obligatorio']
        }
    }],
    fecha: {
        type: Date,
        default: Date.now
    }
})


module.exports = model('Factura',FacturaSchema)