

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Producto } from '../producto/modelo';

@Table({
    timestamps: true,
    tableName: 'imagenes'
})
export class Imagen extends Model<Imagen> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.TEXT)
    link : string;



    @BelongsTo(()=> Producto, 'IdProducto')
    Producto : Producto;

    @ForeignKey(() => Producto)
    @Column
    IdProducto: number;
    

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}