

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Usuario } from '../usuario/modelo';
import { Orden } from '../orden/modelo';

@Table({
    timestamps: true,
    tableName: 'direcciones'
})
export class Direccion extends Model<Direccion> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.STRING)
    calle : string;



    @Column(DataType.STRING)
    ciudad : string;



    @Column(DataType.INTEGER)
    codigopostal : number;



    @Column(DataType.STRING)
    colonia : string;



    @Column(DataType.STRING)
    estado : string;



    @Column(DataType.STRING)
    numero : string;



    @Column(DataType.INTEGER)
    principal : number;



    @BelongsTo(()=> Usuario, 'IdUsuario')
    Usuario : Usuario;

    @ForeignKey(() => Usuario)
    @Column
    IdUsuario: number;
    

    @HasMany(()=> Orden, 'IdDireccion')
    Ordenes : Orden[];

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}