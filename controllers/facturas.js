const { response, request } = require('express');
const Facturas = require('../models/facturas');

const getFacturas = async (req = request, res = response) => {

    const query = { estado: true };

    const listaFacturas = await Promise.all([
        Facturas.countDocuments(query),
        Facturas.find(query)
    ]);

    res.json({
        msg: 'Get API de Facturas', listaFacturas
    });
}

const postFacturas = async (req = request, res = response) => {
    const { nombre, nit, direccion, descripcion, total } = req.body;

    const facturaDB = new Facturas({ nombre, nit, direccion, descripcion, total });

    await facturaDB.save();

    res.json({
        msg: 'POST API de Facturas',
        facturaDB
    });
}

const putFacturas = async (req = request, res = response) => {
    const { id } = req.params;


    const { _id, estado, ...resto } = req.body;


    const facturaEditada = await Facturas.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API de Facturas',
        facturaEditada
    });
}

const deleteFacturas = async (req = request, res = response) => {
    const { id } = req.params;


    const facturaEliminada = await Facturas.findByIdAndDelete(id);
    res.json({
        msg: 'DELETE API de Factura',
        facturaEliminada
    });
}

module.exports = {
    getFacturas,
    postFacturas,
    putFacturas,
    deleteFacturas
}