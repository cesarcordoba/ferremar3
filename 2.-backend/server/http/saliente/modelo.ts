

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';

@Table({
    timestamps: true,
    tableName: 'salientes'
})
export class Saliente extends Model<Saliente> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.INTEGER)
    cantidad : number;



    constructor(values?: any, options?: any) {
        super(values, options);
    }
}