"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filtro = require('./filtro/filtro');
const versionesdisponibles = require('./versionesdisponibles/versionesdisponibles');
const xNombre = require('./xNombre/xNombre');
const procesos = require('./procesos/procesos');
const contarProcesos = require('./contarProcesos/contarProcesos');
const errorHandler = require('../error');
const _ = require('lodash');
const modelo_1 = require("./modelo");
class ProductoController {
    constructor() {
        //* null
        this.crear = (req, res, next) => modelo_1.Producto.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearProducto', res));
        //* null
        this.buscar = (req, res, next) => req.params.id ?
            modelo_1.Producto.findById(req.params.id)
                .then(response => res.status(200).jsonp(response))
                .catch(err => errorHandler(err, 'buscarProducto', res))
            :
                modelo_1.Producto.findAll()
                    .then(response => res.status(200).jsonp(response))
                    .catch(err => errorHandler(err, 'buscarProducto', res));
        //* null
        this.actualizar = (req, res, next) => modelo_1.Producto.update(req.body, { where: { id: req.params.id } })
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarProducto', res));
        //* null
        this.eliminar = (req, res, next) => modelo_1.Producto.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarProducto', res));
        //* null
        this.paginacion = (req, res, next) => modelo_1.Producto.findAndCountAll({
            order: req.body.order,
            where: req.body.where
        }).then(response => res.status(200).jsonp(new Object({
            items: _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
            paginas: Math.round(response.count / req.body.limite)
        })))
            .catch(err => errorHandler(err, 'paginacionProducto', res));
        //* 2
        this.xcategoria = (req, res, next) => modelo_1.Producto.findAll({ where: { 'IdCategoria': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xProductocategorias', res));
        //* 2
        this.categoria = (req, res, next) => modelo_1.Producto.findById(req.params.id)
            .then(item => item.$get('Categoria'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Productocategorias', res));
        //* 2
        this.ligarcategorias = (req, res, next) => modelo_1.Producto.findById(req.params.producto)
            .then(item => item.$set('Categoria', req.params.categoria))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarProductocategorias', res));
        //* 2
        this.desligarcategorias = (req, res, next) => modelo_1.Producto.findById(req.params.producto)
            .then(item => item.$remove('Categoria', req.params.categoria))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarProductocategorias', res));
        //* 3
        this.colores = (req, res, next) => modelo_1.Producto.findById(req.params.id)
            .then(item => item.$get('Colores'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Productocolores', res));
        //* 3
        this.ligarcolores = (req, res, next) => modelo_1.Producto.findById(req.params.producto)
            .then(item => item.$add('Colores', req.params.color))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarProductocolores', res));
        //* 3
        this.desligarcolores = (req, res, next) => modelo_1.Producto.findById(req.params.producto)
            .then(item => item.$remove('Colores', req.params.color))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarProductocolores', res));
        //* 4
        this.imagenes = (req, res, next) => modelo_1.Producto.findById(req.params.id)
            .then(item => item.$get('Imagenes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Productoimagenes', res));
        //* 4
        this.ligarimagenes = (req, res, next) => modelo_1.Producto.findById(req.params.producto)
            .then(item => item.$add('Imagenes', req.params.imagen))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarProductoimagenes', res));
        //* 4
        this.desligarimagenes = (req, res, next) => modelo_1.Producto.findById(req.params.producto)
            .then(item => item.$remove('Imagenes', req.params.imagen))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarProductoimagenes', res));
        //* 5
        this.portadas = (req, res, next) => modelo_1.Producto.findById(req.params.id)
            .then(item => item.$get('Portadas'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Productoportadas', res));
        //* 5
        this.ligarportadas = (req, res, next) => modelo_1.Producto.findById(req.params.producto)
            .then(item => item.$add('Portadas', req.params.portada))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarProductoportadas', res));
        //* 5
        this.desligarportadas = (req, res, next) => modelo_1.Producto.findById(req.params.producto)
            .then(item => item.$remove('Portadas', req.params.portada))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarProductoportadas', res));
        //* 9
        this.versiones = (req, res, next) => modelo_1.Producto.findById(req.params.id)
            .then(item => item.$get('Versiones'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Productoversiones', res));
        //* 9
        this.ligarversiones = (req, res, next) => modelo_1.Producto.findById(req.params.producto)
            .then(item => item.$add('Versiones', req.params.version))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarProductoversiones', res));
        //* 9
        this.desligarversiones = (req, res, next) => modelo_1.Producto.findById(req.params.producto)
            .then(item => item.$remove('Versiones', req.params.version))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarProductoversiones', res));
        //* 12
        this.xmarca = (req, res, next) => modelo_1.Producto.findAll({ where: { 'IdMarca': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xProductomarcas', res));
        //* 12
        this.marca = (req, res, next) => modelo_1.Producto.findById(req.params.id)
            .then(item => item.$get('Marca'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Productomarcas', res));
        //* 12
        this.ligarmarcas = (req, res, next) => modelo_1.Producto.findById(req.params.producto)
            .then(item => item.$set('Marca', req.params.marca))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarProductomarcas', res));
        //* 12
        this.desligarmarcas = (req, res, next) => modelo_1.Producto.findById(req.params.producto)
            .then(item => item.$remove('Marca', req.params.marca))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarProductomarcas', res));
        //* 13
        this.xgama = (req, res, next) => modelo_1.Producto.findAll({ where: { 'IdGama': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xProductogamas', res));
        //* 13
        this.gama = (req, res, next) => modelo_1.Producto.findById(req.params.id)
            .then(item => item.$get('Gama'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Productogamas', res));
        //* 13
        this.ligargamas = (req, res, next) => modelo_1.Producto.findById(req.params.producto)
            .then(item => item.$set('Gama', req.params.gama))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarProductogamas', res));
        //* 13
        this.desligargamas = (req, res, next) => modelo_1.Producto.findById(req.params.producto)
            .then(item => item.$remove('Gama', req.params.gama))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarProductogamas', res));
        //* 14
        this.xlinea = (req, res, next) => modelo_1.Producto.findAll({ where: { 'IdLinea': req.params.id } })
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xProductolineas', res));
        //* 14
        this.linea = (req, res, next) => modelo_1.Producto.findById(req.params.id)
            .then(item => item.$get('Linea'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Productolineas', res));
        //* 14
        this.ligarlineas = (req, res, next) => modelo_1.Producto.findById(req.params.producto)
            .then(item => item.$set('Linea', req.params.linea))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarProductolineas', res));
        //* 14
        this.desligarlineas = (req, res, next) => modelo_1.Producto.findById(req.params.producto)
            .then(item => item.$remove('Linea', req.params.linea))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarProductolineas', res));
        //* 15
        this.margenes = (req, res, next) => modelo_1.Producto.findById(req.params.id)
            .then(item => item.$get('Margenes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Productomargenes', res));
        //* 15
        this.ligarmargenes = (req, res, next) => modelo_1.Producto.findById(req.params.producto)
            .then(item => item.$add('Margenes', req.params.margen))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarProductomargenes', res));
        //* 15
        this.desligarmargenes = (req, res, next) => modelo_1.Producto.findById(req.params.producto)
            .then(item => item.$remove('Margenes', req.params.margen))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarProductomargenes', res));
        //* 18
        this.promos = (req, res, next) => modelo_1.Producto.findById(req.params.id)
            .then(item => item.$get('Promos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ProductoPromos', res));
        //* 18
        this.ligarpromos = (req, res, next) => modelo_1.Producto.findById(req.params.producto)
            .then(item => item.$add('Promos', req.params.promo, { through: req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarProductoPromos', res));
        //* 18
        this.desligarpromos = (req, res, next) => modelo_1.Producto.findById(req.params.producto)
            .then(item => item.$remove('Promos', req.params.promo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarProductoPromos', res));
        //* 28
        this.ambientes = (req, res, next) => modelo_1.Producto.findById(req.params.id)
            .then(item => item.$get('Ambientes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ProductoAmbientes', res));
        //* 28
        this.ligarambientes = (req, res, next) => modelo_1.Producto.findById(req.params.producto)
            .then(item => item.$add('Ambientes', req.params.ambiente, { through: req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarProductoAmbientes', res));
        //* 28
        this.desligarambientes = (req, res, next) => modelo_1.Producto.findById(req.params.producto)
            .then(item => item.$remove('Ambientes', req.params.ambiente))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarProductoAmbientes', res));
        this.filtro = (req, res, next) => filtro(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Producto_filtro', res));
        this.versionesdisponibles = (req, res, next) => versionesdisponibles(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Producto_versionesdisponibles', res));
        this.xNombre = (req, res, next) => xNombre(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Producto_xNombre', res));
        this.procesos = (req, res, next) => procesos(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Producto_procesos', res));
        this.contarProcesos = (req, res, next) => contarProcesos(req, res, next)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'Producto_contarProcesos', res));
    }
}
exports.ProductoController = ProductoController;
