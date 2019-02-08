

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Cartel } from '../cartel/modelo';

@Table({
    timestamps: true,
    tableName: 'anuncios'
})
export class Anuncio extends Model<Anuncio> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.STRING)
    link : string;



    @Column(DataType.STRING)
    tipo : string;



    @Column(DataType.INTEGER)
    posicion : number;



    @Column(DataType.STRING)
    nombre : string;



    @Column(DataType.INTEGER)
    status : number;



    @HasMany(()=> Cartel, 'IdAnuncio')
    Carteles : Cartel[];

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}