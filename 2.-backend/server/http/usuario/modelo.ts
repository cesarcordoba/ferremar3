

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Sucursal } from '../sucursal/modelo';
import { Orden } from '../orden/modelo';
import { Llave } from '../llave/modelo';
import { Avatar } from '../avatar/modelo';
import { Favorito } from '../favorito/modelo';
import { Version } from '../version/modelo';
import { Log } from '../log/modelo';
import { Accion } from '../accion/modelo';
import { Direccion } from '../direccion/modelo';
import { Tarjeta } from '../tarjeta/modelo';

@Table({
    timestamps: true,
    tableName: 'usuarios'
})
export class Usuario extends Model<Usuario> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.STRING)
    nombre : string;



    @Column(DataType.STRING)
    apellido : string;



    @Column(DataType.STRING)
    correo : string;



    @Column(DataType.INTEGER)
    status : number;



    @Column(DataType.STRING)
    tipo : string;



    @BelongsTo(()=> Sucursal, 'IdSucursal')
    Sucursal : Sucursal;

    @ForeignKey(() => Sucursal)
    @Column
    IdSucursal: number;
    

    @HasMany(()=> Orden, 'IdUsuario')
    Ordenes : Orden[];

    @HasOne(()=> Llave, 'IdUsuario')
    Llave : Llave;

    @HasMany(()=> Avatar, 'IdUsuario')
    Avatares : Avatar[];
        

    @HasMany(()=> Log, 'IdUsuario')
    Logs : Log[];

    @HasMany(()=> Accion, 'IdUsuario')
    Acciones : Accion[];

    @HasMany(()=> Direccion, 'IdUsuario')
    Direcciones : Direccion[];

    @HasMany(()=> Tarjeta, 'IdUsuario')
    Tarjetas : Tarjeta[];
    @BelongsToMany(()=> Version, () => Favorito,'IdUsuario', 'IdVersion')
    Versiones : Version[];

            

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}