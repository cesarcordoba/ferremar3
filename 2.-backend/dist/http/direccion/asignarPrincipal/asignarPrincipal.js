"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modelo_1 = require("../modelo");
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
        modelo_1.Direccion.findById(req.params.id)
            .then((direccion) => {
            modelo_1.Direccion.update({ principal: 0 }, { where: { IdUsuario: direccion.IdUsuario, id: { $notLike: req.params.id } } });
            direccion.update({ principal: 1 })
                .then(response => resolve(response));
        });
    });
};
