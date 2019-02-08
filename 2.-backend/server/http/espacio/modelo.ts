

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Ambiente } from '../ambiente/modelo';

@Table({
    timestamps: true,
    tableName: 'espacios'
})
export class Espacio extends Model<Espacio> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.TEXT)
    link : string;



    @BelongsTo(()=> Ambiente, 'IdAmbiente')
    Ambiente : Ambiente;

    @ForeignKey(() => Ambiente)
    @Column
    IdAmbiente: number;
    

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}