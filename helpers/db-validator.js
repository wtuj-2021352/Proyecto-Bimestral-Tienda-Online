const Usuario = require('../models/usuarios');
const Role = require('../models/role');
const Categoria = require('../models/categoria');
const Producto = require('../models/productos');

const emailExiste = async( correo = '' ) => {

    const existeEmailDeUsuario = await Usuario.findOne( { correo } );
    if ( existeEmailDeUsuario) {
        throw new Error(`El correo ${ correo }, ya esta registrado en la DB `);
    }
}

const existeProducto = async( nombre = '') => {
    const existeProducto = await Producto.findOne({nombre});
    if (existeProducto) {
        throw new Error(`El producto ${ nombre }, ya esta registrado en la DB `);
    }
}

const categoriaExiste = async( nombre = '') => {
    const existeCategoria = await Categoria.findOne( { nombre } );
    if ( existeCategoria) {
        throw new Error(`La categoria ${ nombre }, ya esta registrado en la DB `);
    }
}

const esRoleValido = async( rol = '') => {
    if (rol != "") {
        const existeRolDB = await Role.findOne( { rol } );
        if ( !existeRolDB ) {
            throw new Error(`El rol ${ rol }, no existe en la DB `);
        }  
    }
}

const esProductoValido = async(nombre = '') => {
    const existeProductDB = await Producto.findOne({nombre});
    if (!existeProductDB){
        throw new Error(`El producto ${ nombre }, no existe en la DB `);
    }
}


const existeUsuarioPorId = async( id ) => {


    const existIdOfUser = await Usuario.findById( id );
    if ( !existIdOfUser ) {
        throw new Error(`El id: ${id} no existe en la DB`);
    }

}

const existeCategoriaPorId = async( id ) => {

    const existIdOfCategory = await Categoria.findById( id );
    if ( !existIdOfCategory ) {
        throw new Error(`El id: ${id} no existe en la DB`);
    }

}

const existeProductoPorId = async( id ) => {

    const existIdOfProduct = await Producto.findById( id );
    if ( !existIdOfProduct ) {
        throw new Error(`El id: ${id} no existe en la DB`);
    }

}

const validarStock = async (req, res, next) => {
    const { id} = req.body;
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    if (!producto.stock) {
      return res.status(400).json({ message: 'El producto está agotado' });
    }
    next();
  };


module.exports = {
    emailExiste,
    esRoleValido,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    categoriaExiste,
    existeProducto,
    esProductoValido,
    validarStock
   
}