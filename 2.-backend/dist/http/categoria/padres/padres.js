"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modelo_1 = require("../modelo");
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
        modelo_1.Categoria.findById(req.params.id)
            .then(response => detective(response, []))
            .then(response => response.sort(n => n.nivel))
            .then(result => resolve(result));
        async function detective(categoria, array) {
            return !_.isNull(categoria) ? await categoria.$get('PreCategoria')
                .then(response => {
                array.push(categoria);
                return detective(response, array);
            }) : array;
        }
    });
};
