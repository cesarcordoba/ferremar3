

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Inventario } from '../inventario/modelo';

@Table({
    timestamps: true,
    tableName: 'existencias'
})
export class Existencia extends Model<Existencia> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.INTEGER)
    cantidad : number;



    @Column(DataType.INTEGER)
    status : number;



    @BelongsToMany(()=> Inventario,'inventarios_existencias','IdExistencia', 'IdInventario')
    Inventarios : Inventario[];

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}