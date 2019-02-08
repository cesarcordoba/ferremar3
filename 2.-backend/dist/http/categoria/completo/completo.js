"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modelo_1 = require("../modelo");
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
        function detective(guia, hijo) {
            let papa = guia.find(n => n.id === hijo.IdCategoria);
            return papa ? papa.nombre + ' / ' + hijo.nombre : hijo.nombre;
        }
        modelo_1.Categoria.findAll()
            .then(response => response.map(n => Object.assign(n, { nombre: detective(response, n) })))
            .then(result => resolve(result));
    });
};
