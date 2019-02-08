

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Categoria } from '../categoria/modelo';
import { Opcion } from '../opcion/modelo';

@Table({
    timestamps: true,
    tableName: 'atributos'
})
export class Atributo extends Model<Atributo> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.STRING)
    nombre : string;



    @BelongsToMany(()=> Categoria,'categorias_atributos','IdAtributo', 'IdCategoria')
    Categorias : Categoria[];

    @HasMany(()=> Opcion, 'IdAtributo')
    Opciones : Opcion[];

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}