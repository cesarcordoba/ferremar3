

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Transaccion } from '../transaccion/modelo';
import { Variacionprecio } from '../variacionprecio/modelo';
import { Inventario } from '../inventario/modelo';

@Table({
    timestamps: true,
    tableName: 'precios'
})
export class Precio extends Model<Precio> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.INTEGER)
    cantidad : number;



    @Column(DataType.INTEGER)
    status : number;



    @HasMany(()=> Transaccion, 'IdPrecio')
    Transacciones : Transaccion[];
        
    @BelongsToMany(()=> Inventario, () => Variacionprecio,'IdPrecio', 'IdInventario')
    Inventarios : Inventario[];

            

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}