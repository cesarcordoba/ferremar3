"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modelo_1 = require("../modelo");
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
        modelo_1.Tarjeta.findById(req.params.id)
            .then((tarjeta) => {
            modelo_1.Tarjeta.update({ principal: 0 }, { where: { IdUsuario: tarjeta.IdUsuario, id: { $notLike: req.params.id } } });
            tarjeta.update({ principal: 1 })
                .then(response => resolve(response));
        });
    });
};
