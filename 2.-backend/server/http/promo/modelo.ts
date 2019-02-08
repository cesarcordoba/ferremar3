

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Disponible } from '../disponible/modelo';
import { Producto } from '../producto/modelo';
import { Descuento } from '../descuento/modelo';
import { Oferta } from '../oferta/modelo';
import { Transaccion } from '../transaccion/modelo';

@Table({
    timestamps: true,
    tableName: 'promos'
})
export class Promo extends Model<Promo> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.STRING)
    nombre : string;



    @Column(DataType.INTEGER)
    status : number;



    @Column(DataType.DATE)
    inicio : Date;



    @Column(DataType.DATE)
    final : Date;


        

    @HasMany(()=> Descuento, 'IdPromo')
    Descuentos : Descuento[];

    @HasMany(()=> Oferta, 'IdPromo')
    Ofertas : Oferta[];

    @HasMany(()=> Transaccion, 'IdPromo')
    Transacciones : Transaccion[];
    @BelongsToMany(()=> Producto, () => Disponible,'IdPromo', 'IdProducto')
    Productos : Producto[];

            

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}