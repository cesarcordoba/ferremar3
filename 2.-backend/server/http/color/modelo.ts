

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Producto } from '../producto/modelo';

@Table({
    timestamps: true,
    tableName: 'colores'
})
export class Color extends Model<Color> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.STRING)
    nombre : string;



    @Column(DataType.STRING)
    hex : string;



    @Column(DataType.INTEGER)
    status : number;



    @BelongsToMany(()=> Producto,'productos_colores','IdColor', 'IdProducto')
    Productos : Producto[];

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}