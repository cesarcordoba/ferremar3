

import * as express from 'express';
import * as subdomain from 'express-subdomain';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import * as morgan from 'morgan';

import { AutentificacionRouter } from './http/rutas/Autentificacion';
import { ProspectoRouter } from './http/rutas/Prospecto';


//conexion a la base de datos
import { Conexion } from './http/conexion';
import { Ruteador } from './http/ruteo';
// import { ImagenRouter } from './http/rutas/Imagen';
// import { VideoRouter } from './http/rutas/Video';


import { ProductoRouter } from './http/producto/ruta';
import { CategoriaRouter } from './http/categoria/ruta';
import { ColorRouter } from './http/color/ruta';
import { ImagenRouter } from './http/imagen/ruta';
import { PortadaRouter } from './http/portada/ruta';
import { VersionRouter } from './http/version/ruta';
import { AtributoRouter } from './http/atributo/ruta';
import { OpcionRouter } from './http/opcion/ruta';
import { MarcaRouter } from './http/marca/ruta';
import { GamaRouter } from './http/gama/ruta';
import { LineaRouter } from './http/linea/ruta';
import { MargenRouter } from './http/margen/ruta';
import { CatalogoRouter } from './http/catalogo/ruta';
import { PromoRouter } from './http/promo/ruta';
import { DisponibleRouter } from './http/disponible/ruta';
import { DescuentoRouter } from './http/descuento/ruta';
import { OfertaRouter } from './http/oferta/ruta';
import { SalienteRouter } from './http/saliente/ruta';
import { EntranteRouter } from './http/entrante/ruta';
import { InventarioRouter } from './http/inventario/ruta';
import { PrecioRouter } from './http/precio/ruta';
import { SucursalRouter } from './http/sucursal/ruta';
import { ExistenciaRouter } from './http/existencia/ruta';
import { AmbienteRouter } from './http/ambiente/ruta';
import { PosicionRouter } from './http/posicion/ruta';
import { CuartoRouter } from './http/cuarto/ruta';
import { EspacioRouter } from './http/espacio/ruta';
import { UsuarioRouter } from './http/usuario/ruta';
import { TransaccionRouter } from './http/transaccion/ruta';
import { OrdenRouter } from './http/orden/ruta';
import { LlaveRouter } from './http/llave/ruta';
import { AvatarRouter } from './http/avatar/ruta';
import { FavoritoRouter } from './http/favorito/ruta';
import { LogRouter } from './http/log/ruta';
import { AccionRouter } from './http/accion/ruta';
import { DireccionRouter } from './http/direccion/ruta';
import { TarjetaRouter } from './http/tarjeta/ruta';
import { AnuncioRouter } from './http/anuncio/ruta';
import { CartelRouter } from './http/cartel/ruta';
import { EntregaRouter } from './http/entrega/ruta';
import { VariacionmargenRouter } from './http/variacionmargen/ruta';
import { VariacionprecioRouter } from './http/variacionprecio/ruta';
import { TutorialRouter } from './http/tutorial/ruta';
import { CargoRouter } from './http/cargo/ruta';
import { Producto } from './http/producto/modelo';
import { Categoria } from './http/categoria/modelo';
import { Color } from './http/color/modelo';
import { Imagen } from './http/imagen/modelo';
import { Portada } from './http/portada/modelo';
import { Version } from './http/version/modelo';
import { Atributo } from './http/atributo/modelo';
import { Opcion } from './http/opcion/modelo';
import { Marca } from './http/marca/modelo';
import { Gama } from './http/gama/modelo';
import { Linea } from './http/linea/modelo';
import { Margen } from './http/margen/modelo';
import { Catalogo } from './http/catalogo/modelo';
import { Promo } from './http/promo/modelo';
import { Disponible } from './http/disponible/modelo';
import { Descuento } from './http/descuento/modelo';
import { Oferta } from './http/oferta/modelo';
import { Saliente } from './http/saliente/modelo';
import { Entrante } from './http/entrante/modelo';
import { Inventario } from './http/inventario/modelo';
import { Precio } from './http/precio/modelo';
import { Sucursal } from './http/sucursal/modelo';
import { Existencia } from './http/existencia/modelo';
import { Ambiente } from './http/ambiente/modelo';
import { Posicion } from './http/posicion/modelo';
import { Cuarto } from './http/cuarto/modelo';
import { Espacio } from './http/espacio/modelo';
import { Usuario } from './http/usuario/modelo';
import { Transaccion } from './http/transaccion/modelo';
import { Orden } from './http/orden/modelo';
import { Llave } from './http/llave/modelo';
import { Avatar } from './http/avatar/modelo';
import { Favorito } from './http/favorito/modelo';
import { Log } from './http/log/modelo';
import { Accion } from './http/accion/modelo';
import { Direccion } from './http/direccion/modelo';
import { Tarjeta } from './http/tarjeta/modelo';
import { Anuncio } from './http/anuncio/modelo';
import { Cartel } from './http/cartel/modelo';
import { Entrega } from './http/entrega/modelo';
import { Variacionmargen } from './http/variacionmargen/modelo';
import { Variacionprecio } from './http/variacionprecio/modelo';
import { Tutorial } from './http/tutorial/modelo';
import { Cargo } from './http/cargo/modelo';

export class Server {

    app: express.Application;
    private _url_allow_origin: string[];

    constructor(private port: number, modo, urlAllowOrigin?: string[]) {
        console.log(modo)
        this._url_allow_origin = urlAllowOrigin;
        this.app = express();
        this.config();
        this.apiRutas();

    }

    static init(port: number, modo, urlAllowOrigin?: string[]): Server {
        return new Server(port, modo, urlAllowOrigin);
    }

    iniciarServidor(callback?: Function) {
        this.app.listen(this.port, callback);
    }

    private config() {

        let conexion = new Conexion();
        conexion.addModels([

            Producto,
            Categoria,
            Color,
            Imagen,
            Portada,
            Version,
            Atributo,
            Opcion,
            Marca,
            Gama,
            Linea,
            Margen,
            Catalogo,
            Promo,
            Disponible,
            Descuento,
            Oferta,
            Saliente,
            Entrante,
            Inventario,
            Precio,
            Sucursal,
            Existencia,
            Ambiente,
            Posicion,
            Cuarto,
            Espacio,
            Usuario,
            Transaccion,
            Orden,
            Llave,
            Avatar,
            Favorito,
            Log,
            Accion,
            Direccion,
            Tarjeta,
            Anuncio,
            Cartel,
            Entrega,
            Variacionmargen,
            Variacionprecio,
            Tutorial,
            Cargo,
        ])
        conexion.sync();

        this.app.use((req, res, next) => {
            let origin = req.headers.origin;

            if(origin && this._url_allow_origin.indexOf(origin.toString()) > -1){
                 res.setHeader('Access-Control-Allow-Origin', origin);
            }
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
            res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept"
            );
            next();
        })

        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(cookieParser());

        this.app.use(session({ secret: '01f4845/564564/6@@fas588--[[}++', resave: true, saveUninitialized: true }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        morgan('combined', { skip: function (req, res) { return res.statusCode < 400 } });
    }

    private apiRutas() {
        let rutas
        =Ruteador.init([
            new ProductoRouter().rutas(),
            new CategoriaRouter().rutas(),
            new ColorRouter().rutas(),
            new ImagenRouter().rutas(),
            new PortadaRouter().rutas(),
            new VersionRouter().rutas(),
            new AtributoRouter().rutas(),
            new OpcionRouter().rutas(),
            new MarcaRouter().rutas(),
            new GamaRouter().rutas(),
            new LineaRouter().rutas(),
            new MargenRouter().rutas(),
            new CatalogoRouter().rutas(),
            new PromoRouter().rutas(),
            new DisponibleRouter().rutas(),
            new DescuentoRouter().rutas(),
            new OfertaRouter().rutas(),
            new SalienteRouter().rutas(),
            new EntranteRouter().rutas(),
            new InventarioRouter().rutas(),
            new PrecioRouter().rutas(),
            new SucursalRouter().rutas(),
            new ExistenciaRouter().rutas(),
            new AmbienteRouter().rutas(),
            new PosicionRouter().rutas(),
            new CuartoRouter().rutas(),
            new EspacioRouter().rutas(),
            new UsuarioRouter().rutas(),
            new TransaccionRouter().rutas(),
            new OrdenRouter().rutas(),
            new LlaveRouter().rutas(),
            new AvatarRouter().rutas(),
            new FavoritoRouter().rutas(),
            new LogRouter().rutas(),
            new AccionRouter().rutas(),
            new DireccionRouter().rutas(),
            new TarjetaRouter().rutas(),
            new AnuncioRouter().rutas(),
            new CartelRouter().rutas(),
            new EntregaRouter().rutas(),
            new VariacionmargenRouter().rutas(),
            new VariacionprecioRouter().rutas(),
            new TutorialRouter().rutas(),
            new CargoRouter().rutas(),
            // new UsuarioRouter().rutas(),
            new AutentificacionRouter().rutas(),
            new ProspectoRouter().rutas(),
            // new ImagenRouter().rutas(),
            // new VideoRouter().rutas()
        ])

        this.app.use(subdomain('api', rutas.route))
    }
}
