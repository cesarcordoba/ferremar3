"use strict";
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const modelo_1 = require("../modelo");
const modelo_2 = require("../../precio/modelo");
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
        modelo_1.Inventario.findAll({
            include: [
                { model: modelo_2.Precio, as: 'Precios' }
            ]
        })
            .then(inventarios => inventarios.filter(inventario => inventario.Precios.length > 0))
            // .then(inventarios => Promise.all(inventarios.map(async (inventario) =>
            //     inventario.$get('Precios')
            // )))
            .then(inventarios => {
            let items = _.flattenDeep(Object.entries(_.groupBy(inventarios, (x) => x.IdVersion)).map(n => new Object({ version: Number(n[0]), inventarios: n[1] })).filter((item) => item.inventarios.length > 0)
                .map((version) => version.inventarios.map(inventario => inventario.Precios.map(precio => new Object({
                inventario: inventario.id,
                version: version.version,
                clave: inventario.clave,
                precio: precio.cantidad,
                fecha: precio.createdAt
            })))));
            let item2 = Object.entries(_.groupBy(items, (x) => x.version)).map((n) => new Object({
                version: Number(n[0]),
                inventario: _.last(n[1].sort((a, b) => (new Date(b.createdAt).getTime()) + (new Date(a.createdAt).getTime())))
            }));
            resolve(item2);
            var datos = (page) => new Promise((resolve, reject) => resolve(_.chunk(items, 10)[page]));
            // datos(1).then(response => res.status(200).jsonp(response))
            const generador = {
                [Symbol.asyncIterator]: function () {
                    return __asyncGenerator(this, arguments, function* () {
                        let page = 0, cache = null;
                        while (!_.isNull(cache) || page === 0) {
                            cache = yield __await(datos(page));
                            for (const inventario of cache) {
                                console.log(inventario);
                                yield yield __await(modelo_1.Inventario.findById(inventario.inventario).then(inventario => inventario.update({ status: 1 })));
                            }
                            page = page + 1;
                        }
                    });
                }
            };
            (async function () {
                var e_1, _a;
                try {
                    for (var _b = __asyncValues(generador[Symbol.asyncIterator]()), _c; _c = await _b.next(), !_c.done;) {
                        const item = _c.value;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            })();
        });
        // .then(response => resolve(response))
    });
};
