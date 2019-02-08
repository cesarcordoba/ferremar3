

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Version } from '../version/modelo';
import { Atributo } from '../atributo/modelo';

@Table({
    timestamps: true,
    tableName: 'opciones'
})
export class Opcion extends Model<Opcion> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.STRING)
    nombre : string;



    @Column(DataType.INTEGER)
    status : number;



    @BelongsToMany(()=> Version,'versiones_opciones','IdOpcion', 'IdVersion')
    Versiones : Version[];

    @BelongsTo(()=> Atributo, 'IdAtributo')
    Atributo : Atributo;

    @ForeignKey(() => Atributo)
    @Column
    IdAtributo: number;
    

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}