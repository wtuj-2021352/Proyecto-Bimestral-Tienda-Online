const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuarios');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async( req = request, res = response ) => {

    const { correo, password } = req.body;

    try {
        
        
        const usuario = await Usuario.findOne( { correo } );

        if ( !usuario ) {
            return res.status(404).json({
                msg: 'Correo de usuario no existe en la base de datos 404'
            });
        }
    
      
        if ( usuario.estado === false ) {
            return res.status(400).json({
                msg: 'La cuenta del usuario esta inactivo'
            });
        }
    

        const validarPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validarPassword ) {
            return res.status(400).json({
                msg: 'La password es incorrecta'
            });
        }

        const token = await generarJWT( usuario.id );
    
        res.json({
            msg: 'Login Auth Funciona!',
            correo, password,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el admin'
        })
    }


}


module.exports = {
    login
}