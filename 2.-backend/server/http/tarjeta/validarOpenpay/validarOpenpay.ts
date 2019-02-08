var isProduction = false;
var resource_name = 'https://sandbox-api.openpay.mx'
//class
var Openpay = require('openpay');
//instantiation
var openpay = new Openpay('mzbzo4aoqvcld7vl9f9s', 'sk_6d675d731d594f29ba1466f2ee379e50', [isProduction]);

openpay.setMerchantId('mzbzo4aoqvcld7vl9f9s');
openpay.setPrivateKey('sk_6d675d731d594f29ba1466f2ee379e50');
openpay.setProductionReady(false);


import { Tarjeta } from '../modelo'
import { Llave } from '../../llave/modelo'
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {

        Llave.findOne({
            where : { IdUsuario : req.body.usuario},

        })
        .then(llave => {
            console.log(llave.IdOpenpay)
            console.log(req.body.tarjeta)
            openpay.customers.cards.create(llave.IdOpenpay, req.body.tarjeta, (error, card) =>  {
                !_.isNull(card) ?
                    Tarjeta.create({
                        IdOpenpay : card.id,
                        marca : card.brand,
                        numero : card.card_number,
                        mes : card.expiration_month,
                        periodo : card.expiration_year,
                        nombre : card.holder_name,
                        IdUsuario : req.body.usuario
                    })
                    .then(response => resolve(response))
                    : resolve(error)

            });
        })
    })
}
