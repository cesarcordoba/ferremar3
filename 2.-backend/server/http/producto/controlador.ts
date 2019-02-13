
const filtro = require('./filtro/filtro');
    
const versionesdisponibles = require('./versionesdisponibles/versionesdisponibles');
    
const xNombre = require('./xNombre/xNombre');
    
const procesos = require('./procesos/procesos');
    
const contarProcesos = require('./contarProcesos/contarProcesos');
    
const errorHandler = require('../error');
const _ = require('lodash');

import { Producto } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class ProductoController {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        Producto.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crearProducto', res))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        Producto.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarProducto', res))
        :
        Producto.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscarProducto', res))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        Producto.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizarProducto', res))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminarProducto', res))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        Producto.findAndCountAll({
                order : req.body.order,
                where : req.body.where
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacionProducto', res))


    //* 2
    xcategoria = (req: Request, res: Response, next: NextFunction) =>
        Producto.findAll(
            { where : { 'IdCategoria' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xProductocategorias', res))

    //* 2
    categoria = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.id )
            .then(item => item.$get('Categoria'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Productocategorias', res))

    //* 2
    ligarcategorias = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.producto)
            .then(item => item.$set('Categoria', req.params.categoria))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarProductocategorias', res))

    //* 2
    desligarcategorias = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.producto)
            .then(item => item.$remove('Categoria', req.params.categoria))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarProductocategorias', res))


    
    //* 3
    colores = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.id)
            .then(item => item.$get('Colores'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Productocolores', res))

    //* 3
    ligarcolores = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.producto)
            .then(item => item.$add('Colores', req.params.color))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarProductocolores', res))

    //* 3
    desligarcolores = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.producto)
            .then(item => item.$remove('Colores', req.params.color))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarProductocolores', res))

    
    //* 4
    imagenes = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.id)
            .then(item => item.$get('Imagenes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Productoimagenes', res))

    //* 4
    ligarimagenes = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.producto)
            .then(item => item.$add('Imagenes', req.params.imagen))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarProductoimagenes', res))

    //* 4
    desligarimagenes = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.producto)
            .then(item => item.$remove('Imagenes', req.params.imagen))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarProductoimagenes', res))

    
    //* 5
    portadas = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.id)
            .then(item => item.$get('Portadas'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Productoportadas', res))

    //* 5
    ligarportadas = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.producto)
            .then(item => item.$add('Portadas', req.params.portada))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarProductoportadas', res))

    //* 5
    desligarportadas = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.producto)
            .then(item => item.$remove('Portadas', req.params.portada))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarProductoportadas', res))

    
    //* 9
    versiones = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.id)
            .then(item => item.$get('Versiones'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Productoversiones', res))

    //* 9
    ligarversiones = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.producto)
            .then(item => item.$add('Versiones', req.params.version))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarProductoversiones', res))

    //* 9
    desligarversiones = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.producto)
            .then(item => item.$remove('Versiones', req.params.version))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarProductoversiones', res))

    
    //* 12
    xmarca = (req: Request, res: Response, next: NextFunction) =>
        Producto.findAll(
            { where : { 'IdMarca' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xProductomarcas', res))

    //* 12
    marca = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.id )
            .then(item => item.$get('Marca'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Productomarcas', res))

    //* 12
    ligarmarcas = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.producto)
            .then(item => item.$set('Marca', req.params.marca))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarProductomarcas', res))

    //* 12
    desligarmarcas = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.producto)
            .then(item => item.$remove('Marca', req.params.marca))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarProductomarcas', res))


    
    //* 13
    xgama = (req: Request, res: Response, next: NextFunction) =>
        Producto.findAll(
            { where : { 'IdGama' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xProductogamas', res))

    //* 13
    gama = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.id )
            .then(item => item.$get('Gama'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Productogamas', res))

    //* 13
    ligargamas = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.producto)
            .then(item => item.$set('Gama', req.params.gama))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarProductogamas', res))

    //* 13
    desligargamas = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.producto)
            .then(item => item.$remove('Gama', req.params.gama))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarProductogamas', res))


    
    //* 14
    xlinea = (req: Request, res: Response, next: NextFunction) =>
        Producto.findAll(
            { where : { 'IdLinea' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'xProductolineas', res))

    //* 14
    linea = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.id )
            .then(item => item.$get('Linea'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Productolineas', res))

    //* 14
    ligarlineas = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.producto)
            .then(item => item.$set('Linea', req.params.linea))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarProductolineas', res))

    //* 14
    desligarlineas = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.producto)
            .then(item => item.$remove('Linea', req.params.linea))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarProductolineas', res))


    
    //* 15
    margenes = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.id)
            .then(item => item.$get('Margenes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Productomargenes', res))

    //* 15
    ligarmargenes = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.producto)
            .then(item => item.$add('Margenes', req.params.margen))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarProductomargenes', res))

    //* 15
    desligarmargenes = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.producto)
            .then(item => item.$remove('Margenes', req.params.margen))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarProductomargenes', res))

    
    //* 18
    promos = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.id)
            .then(item => item.$get('Promos'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ProductoPromos', res))

    //* 18
    ligarpromos = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.producto)
            .then(item => item.$add('Promos', req.params.promo, { through :  req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarProductoPromos', res))

    //* 18
    desligarpromos = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.producto)
            .then(item => item.$remove('Promos', req.params.promo))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarProductoPromos', res))

                
    //* 28
    ambientes = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.id)
            .then(item => item.$get('Ambientes'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ProductoAmbientes', res))

    //* 28
    ligarambientes = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.producto)
            .then(item => item.$add('Ambientes', req.params.ambiente, { through :  req.body ? req.body : null }))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligarProductoAmbientes', res))

    //* 28
    desligarambientes = (req: Request, res: Response, next: NextFunction) =>
        Producto.findById(req.params.producto)
            .then(item => item.$remove('Ambientes', req.params.ambiente))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligarProductoAmbientes', res))

                
    filtro = (req: Request, res: Response, next: NextFunction) =>
        filtro(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Producto_filtro', res))
    
    versionesdisponibles = (req: Request, res: Response, next: NextFunction) =>
        versionesdisponibles(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Producto_versionesdisponibles', res))
    
    xNombre = (req: Request, res: Response, next: NextFunction) =>
        xNombre(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Producto_xNombre', res))
    
    procesos = (req: Request, res: Response, next: NextFunction) =>
        procesos(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Producto_procesos', res))
    
    contarProcesos = (req: Request, res: Response, next: NextFunction) =>
        contarProcesos(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, 'Producto_contarProcesos', res))
    
    xStatus = (req: Request, res: Response, next: NextFunction) =>
        Producto.findAll({where:{status: 1}})
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'Producto_xStatus', res))
    
}