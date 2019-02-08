

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Anuncio } from '../anuncio/modelo';

@Table({
    timestamps: true,
    tableName: 'carteles'
})
export class Cartel extends Model<Cartel> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.STRING)
    url : string;



    @Column(DataType.STRING)
    key : string;



    @Column(DataType.STRING)
    tamano : string;



    @BelongsTo(()=> Anuncio, 'IdAnuncio')
    Anuncio : Anuncio;

    @ForeignKey(() => Anuncio)
    @Column
    IdAnuncio: number;
    

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}