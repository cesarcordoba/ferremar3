

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Orden } from '../orden/modelo';
import { Tarjeta } from '../tarjeta/modelo';

@Table({
    timestamps: true,
    tableName: 'cargos'
})
export class Cargo extends Model<Cargo> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.STRING)
    descripcion : string;



    @Column(DataType.STRING)
    request : string;



    @Column(DataType.STRING)
    status : string;



    @Column(DataType.INTEGER)
    fee : number;



    @Column(DataType.INTEGER)
    tax : number;



    @Column(DataType.INTEGER)
    amount : number;



    @Column(DataType.STRING)
    autorizacion : string;



    @Column(DataType.INTEGER)
    error : number;



    @Column(DataType.INTEGER)
    http : number;



    @BelongsTo(()=> Orden, 'IdOrden')
    Orden : Orden;

    @ForeignKey(() => Orden)
    @Column
    IdOrden: number;
    

    @BelongsTo(()=> Tarjeta, 'IdTarjeta')
    Tarjeta : Tarjeta;

    @ForeignKey(() => Tarjeta)
    @Column
    IdTarjeta: number;
    

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}