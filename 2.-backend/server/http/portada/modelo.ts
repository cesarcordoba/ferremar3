

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Producto } from '../producto/modelo';

@Table({
    timestamps: true,
    tableName: 'portadas'
})
export class Portada extends Model<Portada> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.STRING)
    link : string;



    @Column(DataType.STRING)
    key : string;



    @Column(DataType.STRING)
    dimension : string;



    @Column(DataType.INTEGER)
    folio : number;



    @Column(DataType.INTEGER)
    width : number;



    @Column(DataType.INTEGER)
    height : number;



    @BelongsTo(()=> Producto, 'IdProducto')
    Producto : Producto;

    @ForeignKey(() => Producto)
    @Column
    IdProducto: number;
    

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}