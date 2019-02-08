"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isProduction = false;
var resource_name = 'https://sandbox-api.openpay.mx';
//class
var Openpay = require('openpay');
//instantiation
var openpay = new Openpay('mzbzo4aoqvcld7vl9f9s', 'sk_6d675d731d594f29ba1466f2ee379e50', [isProduction]);
openpay.setMerchantId('mzbzo4aoqvcld7vl9f9s');
openpay.setPrivateKey('sk_6d675d731d594f29ba1466f2ee379e50');
openpay.setProductionReady(false);
const modelo_1 = require("../modelo");
const modelo_2 = require("../../usuario/modelo");
const modelo_3 = require("../../tarjeta/modelo");
const modelo_4 = require("../../llave/modelo");
const modelo_5 = require("../../cargo/modelo");
const _ = require("lodash");
var crearCliente = (orden) => new Promise((resolve, reject) => {
    if (_.isNull(orden.Usuario.Llave.IdOpenpay)) {
        openpay.customers.create({
            'name': orden.Usuario.nombre,
            'email': orden.Usuario.correo,
            'requires_account': false
        }, (error, customer) => {
            modelo_4.Llave.update({ IdOpenpay: customer.id }, { where: { IdUsuario: orden.Usuario.id } });
            orden.Usuario.Llave.IdOpenpay = customer.id;
            resolve(orden);
        });
    }
    else {
        resolve(orden);
    }
});
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
        console.log(req.body);
        modelo_1.Orden.findById(req.body.id, {
            include: [
                {
                    model: modelo_2.Usuario, as: 'Usuario',
                    include: [
                        { model: modelo_4.Llave, as: 'Llave' }
                    ]
                },
                { model: modelo_3.Tarjeta, as: 'Tarjeta' }
            ]
        })
            .then(orden => crearCliente(orden))
            .then((orden) => {
            openpay.customers.charges.create(orden.Usuario.Llave.IdOpenpay, {
                'source_id': orden.Tarjeta.IdOpenpay,
                'method': 'card',
                'amount': orden.total,
                'currency': 'MXN',
                'description': 'Compra',
                'order_id': orden.id,
                'device_session_id': req.body.device
            }, (error, body) => {
                if (error) {
                    modelo_5.Cargo.create({
                        IdOrden: orden.id,
                        status: 'error',
                        http: error.http_code,
                        error: error.error,
                        descripcion: error.description,
                        IdTarjeta: orden.Tarjeta.id
                    })
                        .then(response => resolve(response));
                }
                else {
                    modelo_5.Cargo.create({
                        IdOrden: orden.id,
                        status: body.status,
                        descripcion: body.status,
                        fee: body.fee.amount,
                        tax: body.fee.tax,
                        amount: body.amount,
                        autorizacion: body.authorization,
                        IdTarjeta: orden.Tarjeta.id
                    })
                        .then(response => resolve(response));
                }
            });
        });
        //
        // let obj =
        //
        // console.log(req.body)
        //
    });
};
