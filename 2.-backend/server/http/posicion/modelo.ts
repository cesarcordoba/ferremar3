

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';

@Table({
    timestamps: true,
    tableName: 'posiciones'
})
export class Posicion extends Model<Posicion> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.INTEGER)
    x : number;



    @Column(DataType.INTEGER)
    y : number;



    constructor(values?: any, options?: any) {
        super(values, options);
    }
}