

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';

@Table({
    timestamps: true,
    tableName: 'disponibles'
})
export class Disponible extends Model<Disponible> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.INTEGER)
    oferta : number;



    @Column(DataType.INTEGER)
    descuento : number;



    constructor(values?: any, options?: any) {
        super(values, options);
    }
}