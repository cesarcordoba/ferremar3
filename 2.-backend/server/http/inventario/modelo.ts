

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Existencia } from '../existencia/modelo';
import { Variacionmargen } from '../variacionmargen/modelo';
import { Margen } from '../margen/modelo';
import { Variacionprecio } from '../variacionprecio/modelo';
import { Precio } from '../precio/modelo';

@Table({
    timestamps: true,
    tableName: 'inventarios'
})
export class Inventario extends Model<Inventario> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.STRING)
    clave : string;



    @Column(DataType.INTEGER)
    status : number;



    @BelongsToMany(()=> Existencia,'inventarios_existencias','IdInventario', 'IdExistencia')
    Existencias : Existencia[];
        
        
    @BelongsToMany(()=> Margen, () => Variacionmargen,'IdInventario', 'IdMargen')
    Margenes : Margen[];

            
    @BelongsToMany(()=> Precio, () => Variacionprecio,'IdInventario', 'IdPrecio')
    Precios : Precio[];

            

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}