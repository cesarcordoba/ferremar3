

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';

@Table({
    timestamps: true,
    tableName: 'tutoriales'
})
export class Tutorial extends Model<Tutorial> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.STRING)
    nombre : string;



    @Column(DataType.TEXT)
    contenido : string;



    @Column(DataType.STRING)
    video : string;



    constructor(values?: any, options?: any) {
        super(values, options);
    }
}