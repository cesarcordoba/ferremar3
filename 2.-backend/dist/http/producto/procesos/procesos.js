"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modelo_1 = require("../modelo");
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
        Promise.all([
            modelo_1.Producto.count(),
            modelo_1.Producto.count({ where: { status: 1 } }),
            modelo_1.Producto.count({ where: { status: 2 } }),
            modelo_1.Producto.count({ where: { status: 3 } }),
            modelo_1.Producto.count({ where: { status: 4 } }),
            modelo_1.Producto.count({ where: { status: 5 } }),
            modelo_1.Producto.count({ where: { status: 6 } }),
            modelo_1.Producto.count({ where: { status: 0 } })
        ])
            .then(result => resolve(result));
    });
};
