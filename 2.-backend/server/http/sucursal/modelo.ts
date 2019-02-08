

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Inventario } from '../inventario/modelo';
import { Version } from '../version/modelo';
import { Usuario } from '../usuario/modelo';
import { Orden } from '../orden/modelo';

@Table({
    timestamps: true,
    tableName: 'sucursales'
})
export class Sucursal extends Model<Sucursal> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.INTEGER)
    clave : number;



    @Column(DataType.STRING)
    nombre : string;



    @Column(DataType.INTEGER)
    status : number;



    @Column(DataType.STRING)
    calle : string;



    @Column(DataType.STRING)
    colonia : string;



    @Column(DataType.STRING)
    estado : string;



    @Column(DataType.STRING)
    codigopostal : string;



    @Column(DataType.INTEGER)
    latitude : number;



    @Column(DataType.INTEGER)
    longitude : number;



    @Column(DataType.INTEGER)
    numero : number;


        

    @HasOne(()=> Usuario, 'IdSucursal')
    Usuario : Usuario;

    @HasMany(()=> Orden, 'IdSucursal')
    Ordenes : Orden[];
    @BelongsToMany(()=> Version, () => Inventario,'IdSucursal', 'IdVersion')
    Versiones : Version[];

            

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}