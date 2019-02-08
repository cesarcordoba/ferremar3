"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modelo_1 = require("../modelo");
const modelo_2 = require("../../precio/modelo");
const modelo_3 = require("../../variacionprecio/modelo");
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
        modelo_1.Inventario.findAll({
            include: [
                { model: modelo_2.Precio,
                    as: 'Precios' }
            ]
        })
            .then(inventarios => inventarios.filter(inventario => inventario.Precios.length > 0))
            .then(inventarios => Promise.all(inventarios.map(async (inventario) => {
            let precio = _.first(inventario.Precios.sort((a, b) => (new Date(a.createdAt).getTime()) + (new Date(b.createdAt).getTime())));
            return await new Object({
                inventario: inventario,
                precio: precio,
                precios: inventario.Precios.filter(n => n.id !== precio.id)
            });
        })))
            .then(inventarios => Promise.all(inventarios.map(async (inventario) => await Promise.all([
            modelo_3.Variacionprecio.update({ status: 1 }, { where: { IdPrecio: inventario.precio.id, IdInventario: inventario.inventario.id } }),
            Promise.all(inventario.precios.map(async (precio) => await modelo_3.Variacionprecio.update({ status: 1 }, { where: { IdPrecio: precio.id, IdInventario: inventario.inventario.id } })))
        ]))))
            .then(response => resolve(response));
    });
};
