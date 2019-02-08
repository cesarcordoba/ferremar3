

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Producto } from '../producto/modelo';
import { Atributo } from '../atributo/modelo';

@Table({
    timestamps: true,
    tableName: 'categorias'
})
export class Categoria extends Model<Categoria> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.STRING)
    nombre : string;



    @Column(DataType.INTEGER)
    nivel : number;



    @Column(DataType.INTEGER)
    status : number;



    @HasMany(()=> Producto, 'IdCategoria')
    Productos : Producto[];

            @HasMany(()=> Categoria, 'IdCategoria')
            SubCategorias : Categoria[];

            @BelongsTo(()=> Categoria, 'IdCategoria')
            PreCategoria : Categoria[];

            @ForeignKey(() => Categoria)
            @Column
            IdCategoria: number;

            

    @BelongsToMany(()=> Atributo,'categorias_atributos','IdCategoria', 'IdAtributo')
    Atributos : Atributo[];

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}