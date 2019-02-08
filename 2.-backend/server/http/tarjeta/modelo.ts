

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Usuario } from '../usuario/modelo';
import { Orden } from '../orden/modelo';
import { Cargo } from '../cargo/modelo';

@Table({
    timestamps: true,
    tableName: 'tarjetas'
})
export class Tarjeta extends Model<Tarjeta> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.STRING)
    marca : string;



    @Column(DataType.STRING)
    numero : string;



    @Column(DataType.STRING)
    mes : string;



    @Column(DataType.STRING)
    periodo : string;



    @Column(DataType.STRING)
    nombre : string;



    @Column(DataType.STRING)
    IdOpenpay : string;



    @Column(DataType.INTEGER)
    principal : number;



    @BelongsTo(()=> Usuario, 'IdUsuario')
    Usuario : Usuario;

    @ForeignKey(() => Usuario)
    @Column
    IdUsuario: number;
    

    @HasMany(()=> Orden, 'IdTarjeta')
    Ordenes : Orden[];

    @HasMany(()=> Cargo, 'IdTarjeta')
    Cargos : Cargo[];

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}