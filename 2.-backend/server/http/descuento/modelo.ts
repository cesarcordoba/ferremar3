

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Version } from '../version/modelo';
import { Promo } from '../promo/modelo';
import { Transaccion } from '../transaccion/modelo';

@Table({
    timestamps: true,
    tableName: 'descuentos'
})
export class Descuento extends Model<Descuento> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.INTEGER)
    cantidad : number;



    @Column(DataType.INTEGER)
    status : number;



    @BelongsToMany(()=> Version,'versiones_descuentos','IdDescuento', 'IdVersion')
    Versiones : Version[];

    @BelongsTo(()=> Promo, 'IdPromo')
    Promo : Promo;

    @ForeignKey(() => Promo)
    @Column
    IdPromo: number;
    

    @BelongsToMany(()=> Transaccion,'transacciones_descuentos','IdDescuento', 'IdTransaccion')
    Transacciones : Transaccion[];

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}