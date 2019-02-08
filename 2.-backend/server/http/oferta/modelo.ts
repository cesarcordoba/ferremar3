

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Promo } from '../promo/modelo';
import { Saliente } from '../saliente/modelo';
import { Version } from '../version/modelo';
import { Entrante } from '../entrante/modelo';

@Table({
    timestamps: true,
    tableName: 'ofertas'
})
export class Oferta extends Model<Oferta> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @BelongsTo(()=> Promo, 'IdPromo')
    Promo : Promo;

    @ForeignKey(() => Promo)
    @Column
    IdPromo: number;
    
        
        
    @BelongsToMany(()=> Version, () => Saliente,'IdOferta', 'IdVersion')
    Salientes : Version[];

            
    @BelongsToMany(()=> Version, () => Entrante,'IdOferta', 'IdVersion')
    Entrantes : Version[];

            

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}