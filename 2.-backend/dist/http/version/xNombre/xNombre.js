"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modelo_1 = require("../modelo");
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
        modelo_1.Version.findAll({
            where: {
                nombre: {
                    $like: '%' + req.body.nombre + '%',
                },
                status: req.body.status
            }
        })
            .then(response => resolve(response));
    });
};
