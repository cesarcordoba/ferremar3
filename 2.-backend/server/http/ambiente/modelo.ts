

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Posicion } from '../posicion/modelo';
import { Producto } from '../producto/modelo';
import { Cuarto } from '../cuarto/modelo';
import { Espacio } from '../espacio/modelo';

@Table({
    timestamps: true,
    tableName: 'ambientes'
})
export class Ambiente extends Model<Ambiente> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.STRING)
    nombre : string;


        

    @BelongsTo(()=> Cuarto, 'IdCuarto')
    Cuarto : Cuarto;

    @ForeignKey(() => Cuarto)
    @Column
    IdCuarto: number;
    

    @HasMany(()=> Espacio, 'IdAmbiente')
    Espacios : Espacio[];
    @BelongsToMany(()=> Producto, () => Posicion,'IdAmbiente', 'IdProducto')
    Productos : Producto[];

            

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}