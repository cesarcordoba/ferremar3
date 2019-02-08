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
const S3 = require("aws-sdk/clients/s3");
const modelo_1 = require("../modelo");
const _ = require("lodash");
const fs = require("fs");
var jimp = require('jimp');
let s3 = new S3({
    accessKeyId: 'AKIAJCKJUEZYTONXU7OQ',
    secretAccessKey: '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',
    region: 'us-east-1'
});
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
        modelo_1.Portada.findAll()
            .then(portadas => {
            var datos = (page) => new Promise((resolve, reject) => resolve(_.chunk(portadas, 10)[page]));
            // datos(1).then(response => res.status(200).jsonp(response))
            const generador = {
                [Symbol.asyncIterator]: function () {
                    return __asyncGenerator(this, arguments, function* () {
                        let page = 0, cache = null;
                        while (!_.isNull(cache) || page === 0) {
                            cache = yield __await(datos(page));
                            for (const portada of cache) {
                                yield yield __await(new Object({
                                    origen: portada,
                                    nuevos: yield __await(Promise.all([50, 100, 200].map(async (nuevo) => await procesarArchivos(nuevo, portada)
                                        .then(body => crearArchivo(nuevo, portada, body))
                                        .then(path => subirArchivo(nuevo, portada, path))
                                        .then((key) => modelo_1.Portada.findOrCreate({ where: { link: portada.IdProducto, dimension: nuevo + "x" + nuevo }, defaults: new Object({
                                            "link": key.Location,
                                            "Key": nuevo + '_' + portada.IdProducto + '.png',
                                            "dimension": nuevo + "x" + nuevo,
                                            "folio": portada.folio,
                                            "width": nuevo,
                                            "height": nuevo,
                                            "IdProducto": portada.IdProducto,
                                        })
                                    })
                                        .spread((portada, created) => {
                                        portada.update({
                                            "link": key.Location
                                        });
                                    })))))
                                }));
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
                        resolve(item);
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
    });
};
var procesarArchivos = (nuevo, portada) => new Promise((resolve, reject) => jimp.read(portada.link, (err, image) => {
    if (err)
        reject(err);
    image.resize(nuevo, nuevo).getBase64("image/png", (err, Buff) => {
        if (err)
            reject(err);
        resolve(Buff);
    });
}));
var crearArchivo = (nuevo, portada, body) => new Promise((resolve, reject) => {
    fs.exists('../temp/ ' + nuevo + '_' + portada.IdProducto + '.png', (exists) => {
        resolve('../temp/ ' + nuevo + '_' + portada.IdProducto + '.png');
        // fs.writeFile('../temp/ '+ nuevo + '_' + portada.IdProducto + '.png', body.replace(/^data:image\/png;base64,/, ""), 'base64', (err) => {
        //     })
    });
});
var subirArchivo = (nuevo, portada, path) => new Promise((resolve, reject) => {
    // fs.writeFile('../temp/ '+ nuevo + '_' + portada.IdProducto + '.png', body.replace(/^data:image\/png;base64,/, ""), 'base64', (err) => {
    s3.upload({
        Bucket: 'star-pruebas',
        Key: nuevo + '_' + portada.IdProducto + '.png',
        // ContentLength: 'file_info.size',
        Body: fs.createReadStream(path),
        ACL: 'public-read'
    }, (err, data) => {
        console.log(data);
        if (err)
            console.log('There was an error uploading your file: ', err);
        console.log(data);
        resolve(data);
    });
});
