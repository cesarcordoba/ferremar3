

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Usuario } from '../usuario/modelo';

@Table({
    timestamps: true,
    tableName: 'acciones'
})
export class Accion extends Model<Accion> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.STRING)
    seccion : string;



    @Column(DataType.STRING)
    contenido : string;



    @Column(DataType.STRING)
    objeto : string;



    @BelongsTo(()=> Usuario, 'IdUsuario')
    Usuario : Usuario;

    @ForeignKey(() => Usuario)
    @Column
    IdUsuario: number;
    

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}