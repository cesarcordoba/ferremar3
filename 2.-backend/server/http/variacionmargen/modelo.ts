

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';

@Table({
    timestamps: true,
    tableName: 'variacionesmargenes'
})
export class Variacionmargen extends Model<Variacionmargen> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.INTEGER)
    status : number;



    constructor(values?: any, options?: any) {
        super(values, options);
    }
}