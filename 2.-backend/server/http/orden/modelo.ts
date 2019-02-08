

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Sucursal } from '../sucursal/modelo';
import { Usuario } from '../usuario/modelo';
import { Transaccion } from '../transaccion/modelo';
import { Direccion } from '../direccion/modelo';
import { Tarjeta } from '../tarjeta/modelo';
import { Entrega } from '../entrega/modelo';
import { Cargo } from '../cargo/modelo';

@Table({
    timestamps: true,
    tableName: 'ordenes'
})
export class Orden extends Model<Orden> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.INTEGER)
    status : number;



    @Column(DataType.STRING)
    IdOpenpay : string;



    @Column(DataType.INTEGER)
    total : number;



    @BelongsTo(()=> Sucursal, 'IdSucursal')
    Sucursal : Sucursal;

    @ForeignKey(() => Sucursal)
    @Column
    IdSucursal: number;
    

    @BelongsTo(()=> Usuario, 'IdUsuario')
    Usuario : Usuario;

    @ForeignKey(() => Usuario)
    @Column
    IdUsuario: number;
    

    @HasMany(()=> Transaccion, 'IdOrden')
    Transacciones : Transaccion[];

    @BelongsTo(()=> Direccion, 'IdDireccion')
    Direccion : Direccion;

    @ForeignKey(() => Direccion)
    @Column
    IdDireccion: number;
    

    @BelongsTo(()=> Tarjeta, 'IdTarjeta')
    Tarjeta : Tarjeta;

    @ForeignKey(() => Tarjeta)
    @Column
    IdTarjeta: number;
    

    @HasMany(()=> Entrega, 'IdOrden')
    Entregas : Entrega[];

    @HasMany(()=> Cargo, 'IdOrden')
    Cargos : Cargo[];

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}