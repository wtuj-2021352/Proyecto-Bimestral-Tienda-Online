
const { response, request } = require('express');

const Categoria = require('../models/categoria');


const getCategoria = async (req = request, res = response) => {
    
    const listaCategorias = await Promise.all([
        Categoria.countDocuments(),
        Categoria.find()
    ]);

    res.status(302).json({
        listaCategorias
    });
}

const getCategoriaId = async ( req = request, res = response) =>{
    const {id} = req.params;
    const categoria = await Categoria.findById(id)

    res.json({
        categoria
    })
}

const postCategoria = async (req = request, res = response) => {
    
    const { estado, ...body} = req.body;
    
    const categoriaDB = await Categoria.findOne({nombre: body.nombre});

    if (categoriaDB) {
        return res.status(400).json({
            msg: `El producto ${categoriaDB.nombre} ya esta en la DB`
        });
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
    }

    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json({
        categoria
    });
}

const putCategoria = async(req = request, res = response) => {
    
    const {id} = req.params;

    const {_id, ...resto} = req.body;

    resto.nombre = resto.nombre.toUpperCase()

    const categoriaEditada = await Categoria.findByIdAndUpdate(id,resto, {new: true});

    res.json({
        categoriaEditada
    });
}

const deleteCategoria = async(req = request, res = response) => {
    
    const {id} = req.params;

    const categoriaEliminada = await Categoria.findByIdAndDelete(id, {new: true});

    res.json({
        categoriaEliminada
    });
}


module.exports = {
    getCategoria,
    getCategoriaId,
    postCategoria,
    putCategoria,
    deleteCategoria,
}

