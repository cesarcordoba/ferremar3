"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const subdomain = require("express-subdomain");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const morgan = require("morgan");
const Autentificacion_1 = require("./http/rutas/Autentificacion");
const Prospecto_1 = require("./http/rutas/Prospecto");
//conexion a la base de datos
const conexion_1 = require("./http/conexion");
const ruteo_1 = require("./http/ruteo");
// import { ImagenRouter } from './http/rutas/Imagen';
// import { VideoRouter } from './http/rutas/Video';
const ruta_1 = require("./http/producto/ruta");
const ruta_2 = require("./http/categoria/ruta");
const ruta_3 = require("./http/color/ruta");
const ruta_4 = require("./http/imagen/ruta");
const ruta_5 = require("./http/portada/ruta");
const ruta_6 = require("./http/version/ruta");
const ruta_7 = require("./http/atributo/ruta");
const ruta_8 = require("./http/opcion/ruta");
const ruta_9 = require("./http/marca/ruta");
const ruta_10 = require("./http/gama/ruta");
const ruta_11 = require("./http/linea/ruta");
const ruta_12 = require("./http/margen/ruta");
const ruta_13 = require("./http/catalogo/ruta");
const ruta_14 = require("./http/promo/ruta");
const ruta_15 = require("./http/disponible/ruta");
const ruta_16 = require("./http/descuento/ruta");
const ruta_17 = require("./http/oferta/ruta");
const ruta_18 = require("./http/saliente/ruta");
const ruta_19 = require("./http/entrante/ruta");
const ruta_20 = require("./http/inventario/ruta");
const ruta_21 = require("./http/precio/ruta");
const ruta_22 = require("./http/sucursal/ruta");
const ruta_23 = require("./http/existencia/ruta");
const ruta_24 = require("./http/ambiente/ruta");
const ruta_25 = require("./http/posicion/ruta");
const ruta_26 = require("./http/cuarto/ruta");
const ruta_27 = require("./http/espacio/ruta");
const ruta_28 = require("./http/usuario/ruta");
const ruta_29 = require("./http/transaccion/ruta");
const ruta_30 = require("./http/orden/ruta");
const ruta_31 = require("./http/llave/ruta");
const ruta_32 = require("./http/avatar/ruta");
const ruta_33 = require("./http/favorito/ruta");
const ruta_34 = require("./http/log/ruta");
const ruta_35 = require("./http/accion/ruta");
const ruta_36 = require("./http/direccion/ruta");
const ruta_37 = require("./http/tarjeta/ruta");
const ruta_38 = require("./http/anuncio/ruta");
const ruta_39 = require("./http/cartel/ruta");
const ruta_40 = require("./http/entrega/ruta");
const ruta_41 = require("./http/variacionmargen/ruta");
const ruta_42 = require("./http/variacionprecio/ruta");
const ruta_43 = require("./http/tutorial/ruta");
const ruta_44 = require("./http/cargo/ruta");
const modelo_1 = require("./http/producto/modelo");
const modelo_2 = require("./http/categoria/modelo");
const modelo_3 = require("./http/color/modelo");
const modelo_4 = require("./http/imagen/modelo");
const modelo_5 = require("./http/portada/modelo");
const modelo_6 = require("./http/version/modelo");
const modelo_7 = require("./http/atributo/modelo");
const modelo_8 = require("./http/opcion/modelo");
const modelo_9 = require("./http/marca/modelo");
const modelo_10 = require("./http/gama/modelo");
const modelo_11 = require("./http/linea/modelo");
const modelo_12 = require("./http/margen/modelo");
const modelo_13 = require("./http/catalogo/modelo");
const modelo_14 = require("./http/promo/modelo");
const modelo_15 = require("./http/disponible/modelo");
const modelo_16 = require("./http/descuento/modelo");
const modelo_17 = require("./http/oferta/modelo");
const modelo_18 = require("./http/saliente/modelo");
const modelo_19 = require("./http/entrante/modelo");
const modelo_20 = require("./http/inventario/modelo");
const modelo_21 = require("./http/precio/modelo");
const modelo_22 = require("./http/sucursal/modelo");
const modelo_23 = require("./http/existencia/modelo");
const modelo_24 = require("./http/ambiente/modelo");
const modelo_25 = require("./http/posicion/modelo");
const modelo_26 = require("./http/cuarto/modelo");
const modelo_27 = require("./http/espacio/modelo");
const modelo_28 = require("./http/usuario/modelo");
const modelo_29 = require("./http/transaccion/modelo");
const modelo_30 = require("./http/orden/modelo");
const modelo_31 = require("./http/llave/modelo");
const modelo_32 = require("./http/avatar/modelo");
const modelo_33 = require("./http/favorito/modelo");
const modelo_34 = require("./http/log/modelo");
const modelo_35 = require("./http/accion/modelo");
const modelo_36 = require("./http/direccion/modelo");
const modelo_37 = require("./http/tarjeta/modelo");
const modelo_38 = require("./http/anuncio/modelo");
const modelo_39 = require("./http/cartel/modelo");
const modelo_40 = require("./http/entrega/modelo");
const modelo_41 = require("./http/variacionmargen/modelo");
const modelo_42 = require("./http/variacionprecio/modelo");
const modelo_43 = require("./http/tutorial/modelo");
const modelo_44 = require("./http/cargo/modelo");
class Server {
    constructor(port, modo, urlAllowOrigin) {
        this.port = port;
        console.log(modo);
        this._url_allow_origin = urlAllowOrigin;
        this.app = express();
        this.config();
        this.apiRutas();
    }
    static init(port, modo, urlAllowOrigin) {
        return new Server(port, modo, urlAllowOrigin);
    }
    iniciarServidor(callback) {
        this.app.listen(this.port, callback);
    }
    config() {
        let conexion = new conexion_1.Conexion();
        conexion.addModels([
            modelo_1.Producto,
            modelo_2.Categoria,
            modelo_3.Color,
            modelo_4.Imagen,
            modelo_5.Portada,
            modelo_6.Version,
            modelo_7.Atributo,
            modelo_8.Opcion,
            modelo_9.Marca,
            modelo_10.Gama,
            modelo_11.Linea,
            modelo_12.Margen,
            modelo_13.Catalogo,
            modelo_14.Promo,
            modelo_15.Disponible,
            modelo_16.Descuento,
            modelo_17.Oferta,
            modelo_18.Saliente,
            modelo_19.Entrante,
            modelo_20.Inventario,
            modelo_21.Precio,
            modelo_22.Sucursal,
            modelo_23.Existencia,
            modelo_24.Ambiente,
            modelo_25.Posicion,
            modelo_26.Cuarto,
            modelo_27.Espacio,
            modelo_28.Usuario,
            modelo_29.Transaccion,
            modelo_30.Orden,
            modelo_31.Llave,
            modelo_32.Avatar,
            modelo_33.Favorito,
            modelo_34.Log,
            modelo_35.Accion,
            modelo_36.Direccion,
            modelo_37.Tarjeta,
            modelo_38.Anuncio,
            modelo_39.Cartel,
            modelo_40.Entrega,
            modelo_41.Variacionmargen,
            modelo_42.Variacionprecio,
            modelo_43.Tutorial,
            modelo_44.Cargo,
        ]);
        // conexion.sync();
        this.app.use((req, res, next) => {
            let origin = req.headers.origin;
            if (origin && this._url_allow_origin.indexOf(origin.toString()) > -1) {
                res.setHeader('Access-Control-Allow-Origin', origin);
            }
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(cookieParser());
        this.app.use(session({ secret: '01f4845/564564/6@@fas588--[[}++', resave: true, saveUninitialized: true }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        morgan('combined', { skip: function (req, res) { return res.statusCode < 400; } });
    }
    apiRutas() {
        let rutas = ruteo_1.Ruteador.init([
            new ruta_1.ProductoRouter().rutas(),
            new ruta_2.CategoriaRouter().rutas(),
            new ruta_3.ColorRouter().rutas(),
            new ruta_4.ImagenRouter().rutas(),
            new ruta_5.PortadaRouter().rutas(),
            new ruta_6.VersionRouter().rutas(),
            new ruta_7.AtributoRouter().rutas(),
            new ruta_8.OpcionRouter().rutas(),
            new ruta_9.MarcaRouter().rutas(),
            new ruta_10.GamaRouter().rutas(),
            new ruta_11.LineaRouter().rutas(),
            new ruta_12.MargenRouter().rutas(),
            new ruta_13.CatalogoRouter().rutas(),
            new ruta_14.PromoRouter().rutas(),
            new ruta_15.DisponibleRouter().rutas(),
            new ruta_16.DescuentoRouter().rutas(),
            new ruta_17.OfertaRouter().rutas(),
            new ruta_18.SalienteRouter().rutas(),
            new ruta_19.EntranteRouter().rutas(),
            new ruta_20.InventarioRouter().rutas(),
            new ruta_21.PrecioRouter().rutas(),
            new ruta_22.SucursalRouter().rutas(),
            new ruta_23.ExistenciaRouter().rutas(),
            new ruta_24.AmbienteRouter().rutas(),
            new ruta_25.PosicionRouter().rutas(),
            new ruta_26.CuartoRouter().rutas(),
            new ruta_27.EspacioRouter().rutas(),
            new ruta_28.UsuarioRouter().rutas(),
            new ruta_29.TransaccionRouter().rutas(),
            new ruta_30.OrdenRouter().rutas(),
            new ruta_31.LlaveRouter().rutas(),
            new ruta_32.AvatarRouter().rutas(),
            new ruta_33.FavoritoRouter().rutas(),
            new ruta_34.LogRouter().rutas(),
            new ruta_35.AccionRouter().rutas(),
            new ruta_36.DireccionRouter().rutas(),
            new ruta_37.TarjetaRouter().rutas(),
            new ruta_38.AnuncioRouter().rutas(),
            new ruta_39.CartelRouter().rutas(),
            new ruta_40.EntregaRouter().rutas(),
            new ruta_41.VariacionmargenRouter().rutas(),
            new ruta_42.VariacionprecioRouter().rutas(),
            new ruta_43.TutorialRouter().rutas(),
            new ruta_44.CargoRouter().rutas(),
            // new UsuarioRouter().rutas(),
            new Autentificacion_1.AutentificacionRouter().rutas(),
            new Prospecto_1.ProspectoRouter().rutas(),
        ]);
        this.app.use(subdomain('api.elgigantedelosazulejos', rutas.route));
    }
}
exports.Server = Server;
