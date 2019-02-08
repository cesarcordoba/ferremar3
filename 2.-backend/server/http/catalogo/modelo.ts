

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Marca } from '../marca/modelo';

@Table({
    timestamps: true,
    tableName: 'catalogos'
})
export class Catalogo extends Model<Catalogo> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @BelongsTo(()=> Marca, 'IdMarca')
    Marca : Marca;

    @ForeignKey(() => Marca)
    @Column
    IdMarca: number;
    

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}