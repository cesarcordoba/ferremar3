"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modelo_1 = require("../modelo");
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
        modelo_1.Linea.findAll({
            where: {
                nombre: {
                    $like: '%' + req.body.nombre + '%',
                }
            }
        })
            .then(response => resolve(response));
    });
};
