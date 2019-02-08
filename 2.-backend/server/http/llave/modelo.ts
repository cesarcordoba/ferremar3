

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Usuario } from '../usuario/modelo';

@Table({
    timestamps: true,
    tableName: 'llaves'
})
export class Llave extends Model<Llave> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.STRING)
    IdTwitter : string;



    @Column(DataType.STRING)
    IdFacebook : string;



    @Column(DataType.STRING)
    IdGoogle : string;



    @Column(DataType.STRING)
    IdInstagram : string;



    @Column(DataType.STRING)
    password : string;



    @Column(DataType.STRING)
    IdOpenpay : string;



    @BelongsTo(()=> Usuario, 'IdUsuario')
    Usuario : Usuario;

    @ForeignKey(() => Usuario)
    @Column
    IdUsuario: number;
    

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}