const{ Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    carrito: [{
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    }],
    total: {
        type: Number
    },
    role: {
        type: String,
        required: true,
        default: 'CLIENTE'
    },
    estado: {
        type: Boolean,
        default: true
    }
    
});


module.exports = model('Usuario',UsuarioSchema)