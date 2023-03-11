const{ Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la categoria es obligatorio']
    },
    proveedor: {
        type: String,
        required: [true, 'El nombre del proveedor es obligatorio'],
        unique: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true
    }  

});


module.exports = model('Categoria',CategoriaSchema)