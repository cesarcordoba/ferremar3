

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Transaccion } from '../transaccion/modelo';
import { Orden } from '../orden/modelo';

@Table({
    timestamps: true,
    tableName: 'entregas'
})
export class Entrega extends Model<Entrega> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.DATE)
    fecha : Date;



    @Column(DataType.INTEGER)
    status : number;



    @Column(DataType.TEXT)
    descripcion : string;



    @HasMany(()=> Transaccion, 'IdEntrega')
    Transacciones : Transaccion[];

    @BelongsTo(()=> Orden, 'IdOrden')
    Orden : Orden;

    @ForeignKey(() => Orden)
    @Column
    IdOrden: number;
    

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}