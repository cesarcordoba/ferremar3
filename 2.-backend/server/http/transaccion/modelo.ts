

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Version } from '../version/modelo';
import { Margen } from '../margen/modelo';
import { Promo } from '../promo/modelo';
import { Descuento } from '../descuento/modelo';
import { Precio } from '../precio/modelo';
import { Orden } from '../orden/modelo';
import { Entrega } from '../entrega/modelo';

@Table({
    timestamps: true,
    tableName: 'transacciones'
})
export class Transaccion extends Model<Transaccion> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.INTEGER)
    cantidad : number;



    @Column(DataType.INTEGER)
    total : number;



    @Column(DataType.INTEGER)
    status : number;



    @BelongsTo(()=> Version, 'IdVersion')
    Version : Version;

    @ForeignKey(() => Version)
    @Column
    IdVersion: number;
    

    @BelongsToMany(()=> Margen,'transacciones_margenes','IdTransaccion', 'IdMargen')
    Margenes : Margen[];

    @BelongsTo(()=> Promo, 'IdPromo')
    Promo : Promo;

    @ForeignKey(() => Promo)
    @Column
    IdPromo: number;
    

    @BelongsToMany(()=> Descuento,'transacciones_descuentos','IdTransaccion', 'IdDescuento')
    Descuentos : Descuento[];

    @BelongsTo(()=> Precio, 'IdPrecio')
    Precio : Precio;

    @ForeignKey(() => Precio)
    @Column
    IdPrecio: number;
    

    @BelongsTo(()=> Orden, 'IdOrden')
    Orden : Orden;

    @ForeignKey(() => Orden)
    @Column
    IdOrden: number;
    

    @BelongsTo(()=> Entrega, 'IdEntrega')
    Entrega : Entrega;

    @ForeignKey(() => Entrega)
    @Column
    IdEntrega: number;
    

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}