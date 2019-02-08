"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modelo_1 = require("../modelo");
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
        modelo_1.Inventario.findById(req.params.id)
            .then((inventario) => Promise.all([
            inventario.update({ status: 1 }),
            modelo_1.Inventario.update({ status: 0 }, { where: { id: { $not: req.params.id }, IdVersion: inventario.IdVersion } })
        ]))
            .then(response => resolve(response));
    });
};
