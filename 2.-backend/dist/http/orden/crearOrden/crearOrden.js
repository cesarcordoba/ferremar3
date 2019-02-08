"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modelo_1 = require("../modelo");
const modelo_2 = require("../../usuario/modelo");
const modelo_3 = require("../../transaccion/modelo");
const modelo_4 = require("../../promo/modelo");
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
        modelo_2.Usuario.findById(req.body.usuario)
            .then(usuario => Promise.all([
            usuario.$get('Versiones'),
            usuario.$get('Tarjetas', { where: { principal: 1 } }),
            usuario.$get('Direcciones', { where: { principal: 1 } }),
            usuario.$get('Sucursal')
        ]))
            .then((response) => modelo_1.Orden.create({
            IdUsuario: req.body.usuario,
            IdTarjeta: response[1][0].id,
            IdDireccion: response[2][0].id,
            IdSucursal: response[3].id,
            status: 0
        }).then(orden => Promise.all(response[0].map(async (version) => await Promise.all([
            version.$get('Sucursales')
                .then((items) => Promise.all(items.filter((sucursal) => sucursal.Inventario.status === 1).map(async (n) => Promise.all([
                n.Inventario.$get('Precios'),
                n.Inventario.$get('Margenes')
            ]))))
                .then(response => _.flattenDepth(response, 1)),
            version.$get('Descuentos', { include: [
                    { model: modelo_4.Promo, as: 'Promo', where: {
                            status: 1
                        } }
                ] })
        ]).then((response) => {
            let precio = _.last(response[0][0].filter((item) => item.Variacionprecio.status === 1));
            let margenes = response[0][1].filter((item) => item.Variacionmargen.status === 1);
            let descuentos = response[1];
            return modelo_3.Transaccion.create({
                IdOrden: orden.id,
                IdVersion: version.id,
                IdPrecio: precio.id,
                cantidad: version.Favorito.cantidad,
                total: descuentos.reduce((ac, v) => {
                    return ac - (ac * (v.cantidad / 100));
                }, margenes.reduce((ac, v) => {
                    return ac + (ac * (v.cantidad / 100));
                }, precio.cantidad))
            })
                .then(async (transaccion) => {
                await Promise.all([
                    transaccion.$set('Margenes', margenes.map(n => n.id)),
                    transaccion.$set('Descuentos', descuentos.map(n => n.id))
                ]);
                return await transaccion;
                // new Object({
                //     transacciones : transaccion,
                //     precio : precio,
                //     margenes : margenes,
                //     descuentos : descuentos
                // })
            });
        })))
            .then(transacciones => orden.update({ total: transacciones.reduce((ac, v) => ac + v.total, 0) }))))
            .then(response => resolve(response));
    });
};
