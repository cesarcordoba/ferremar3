
import { Producto } from './producto/modelo';
import { Categoria } from './categoria/modelo';
import { Color } from './color/modelo';
import { Imagen } from './imagen/modelo';
import { Portada } from './portada/modelo';
import { Version } from './version/modelo';
import { Atributo } from './atributo/modelo';
import { Opcion } from './opcion/modelo';
import { Marca } from './marca/modelo';
import { Gama } from './gama/modelo';
import { Linea } from './linea/modelo';
import { Margen } from './margen/modelo';
import { Catalogo } from './catalogo/modelo';
import { Promo } from './promo/modelo';
import { Disponible } from './disponible/modelo';
import { Descuento } from './descuento/modelo';
import { Oferta } from './oferta/modelo';
import { Saliente } from './saliente/modelo';
import { Entrante } from './entrante/modelo';
import { Inventario } from './inventario/modelo';
import { Precio } from './precio/modelo';
import { Sucursal } from './sucursal/modelo';
import { Existencia } from './existencia/modelo';
import { Ambiente } from './ambiente/modelo';
import { Posicion } from './posicion/modelo';
import { Cuarto } from './cuarto/modelo';
import { Espacio } from './espacio/modelo';
import { Usuario } from './usuario/modelo';
import { Transaccion } from './transaccion/modelo';
import { Orden } from './orden/modelo';
import { Llave } from './llave/modelo';
import { Avatar } from './avatar/modelo';
import { Favorito } from './favorito/modelo';
import { Log } from './log/modelo';
import { Accion } from './accion/modelo';
import { Direccion } from './direccion/modelo';
import { Tarjeta } from './tarjeta/modelo';
import { Anuncio } from './anuncio/modelo';
import { Cartel } from './cartel/modelo';
import { Entrega } from './entrega/modelo';
import { Variacionmargen } from './variacionmargen/modelo';
import { Variacionprecio } from './variacionprecio/modelo';
import { Tutorial } from './tutorial/modelo';
import { Cargo } from './cargo/modelo';

import { Sequelize } from 'sequelize-typescript';
import { config } from '../conf/config';

export class Conexion extends Sequelize{

    constructor() {
        super({
            database: config.db.database,
            dialect: 'mysql',
            username: config.db.username,
            password: config.db.password,
            host: config.db.host,
            port: config.db.port,
            modelPaths: [],
            operatorsAliases: true
        });



    }
}