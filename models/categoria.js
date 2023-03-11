const{ Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la categoria es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    }  

});


module.exports = model('Categoria',CategoriaSchema)