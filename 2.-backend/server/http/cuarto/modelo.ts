

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Ambiente } from '../ambiente/modelo';

@Table({
    timestamps: true,
    tableName: 'cuartos'
})
export class Cuarto extends Model<Cuarto> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.STRING)
    nombre : string;



    @HasMany(()=> Ambiente, 'IdCuarto')
    Ambientes : Ambiente[];

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}