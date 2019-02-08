"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modelo_1 = require("../modelo");
const modelo_2 = require("../../inventario/modelo");
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
        modelo_1.Version.findById(req.params.id)
            .then(version => version.$get('Sucursales'))
            .then((sucursales) => sucursales.find(sucursal => sucursal.Inventario.status === 1))
            .then(sucursal => modelo_2.Inventario.findById(sucursal.Inventario.id))
            .then(async (inventario) => Promise.all([
            inventario.$get('Precios'),
            inventario.$get('Margenes')
        ]))
            .then((array) => {
            let precio = array[0].find(precio => precio.Variacionprecio.status === 1);
            let margenes = array[1].filter(margen => margen.Variacionmargen.status === 1);
            return margenes.reduce((precio, margen) => {
                return precio + (precio * (margen.cantidad / 100));
            }, precio.cantidad);
        })
            .then(precio => {
            modelo_1.Version.update({ precio: precio }, { where: { id: req.params.id } });
            resolve(precio);
        });
    });
};
