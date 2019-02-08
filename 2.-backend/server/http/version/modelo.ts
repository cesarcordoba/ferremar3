

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Producto } from '../producto/modelo';
import { Opcion } from '../opcion/modelo';
import { Descuento } from '../descuento/modelo';
import { Saliente } from '../saliente/modelo';
import { Oferta } from '../oferta/modelo';
import { Entrante } from '../entrante/modelo';
import { Inventario } from '../inventario/modelo';
import { Sucursal } from '../sucursal/modelo';
import { Transaccion } from '../transaccion/modelo';
import { Favorito } from '../favorito/modelo';
import { Usuario } from '../usuario/modelo';

@Table({
    timestamps: true,
    tableName: 'versiones'
})
export class Version extends Model<Version> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.STRING)
    nombre : string;



    @Column(DataType.STRING)
    linea : string;



    @Column(DataType.INTEGER)
    status : number;



    @Column(DataType.INTEGER)
    precio : number;



    @Column(DataType.INTEGER)
    existencia : number;



    @BelongsTo(()=> Producto, 'IdProducto')
    Producto : Producto;

    @ForeignKey(() => Producto)
    @Column
    IdProducto: number;
    

    @BelongsToMany(()=> Opcion,'versiones_opciones','IdVersion', 'IdOpcion')
    Opciones : Opcion[];

    @BelongsToMany(()=> Descuento,'versiones_descuentos','IdVersion', 'IdDescuento')
    Descuentos : Descuento[];
        
        
        

    @HasMany(()=> Transaccion, 'IdVersion')
    Transacciones : Transaccion[];
        
    @BelongsToMany(()=> Oferta, () => Saliente,'IdVersion', 'IdOferta')
    Salientes : Oferta[];

            
    @BelongsToMany(()=> Oferta, () => Entrante,'IdVersion', 'IdOferta')
    Entrantes : Oferta[];

            
    @BelongsToMany(()=> Sucursal, () => Inventario,'IdVersion', 'IdSucursal')
    Sucursales : Sucursal[];

            
    @BelongsToMany(()=> Usuario, () => Favorito,'IdVersion', 'IdUsuario')
    Usuarios : Usuario[];

            

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}