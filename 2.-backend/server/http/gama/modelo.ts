

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Producto } from '../producto/modelo';
import { Marca } from '../marca/modelo';

@Table({
    timestamps: true,
    tableName: 'gamas'
})
export class Gama extends Model<Gama> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.STRING)
    nombre : string;



    @HasMany(()=> Producto, 'IdGama')
    Productos : Producto[];

    @BelongsTo(()=> Marca, 'IdMarca')
    Marca : Marca;

    @ForeignKey(() => Marca)
    @Column
    IdMarca: number;
    

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}