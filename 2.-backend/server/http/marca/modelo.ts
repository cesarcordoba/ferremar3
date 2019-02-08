

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Producto } from '../producto/modelo';
import { Gama } from '../gama/modelo';
import { Linea } from '../linea/modelo';
import { Margen } from '../margen/modelo';
import { Catalogo } from '../catalogo/modelo';

@Table({
    timestamps: true,
    tableName: 'marcas'
})
export class Marca extends Model<Marca> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.STRING)
    nombre : string;



    @Column(DataType.STRING)
    clave : string;



    @Column(DataType.INTEGER)
    status : number;



    @Column(DataType.STRING)
    razon : string;



    @HasMany(()=> Producto, 'IdMarca')
    Productos : Producto[];

    @HasMany(()=> Gama, 'IdMarca')
    Gamas : Gama[];

    @HasMany(()=> Linea, 'IdMarca')
    Lineas : Linea[];

    @HasMany(()=> Margen, 'IdMarca')
    Margenes : Margen[];

    @HasMany(()=> Catalogo, 'IdMarca')
    Catalogos : Catalogo[];

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}