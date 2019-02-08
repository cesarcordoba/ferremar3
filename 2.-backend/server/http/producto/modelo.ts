

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { Categoria } from '../categoria/modelo';
import { Color } from '../color/modelo';
import { Imagen } from '../imagen/modelo';
import { Portada } from '../portada/modelo';
import { Version } from '../version/modelo';
import { Marca } from '../marca/modelo';
import { Gama } from '../gama/modelo';
import { Linea } from '../linea/modelo';
import { Margen } from '../margen/modelo';
import { Disponible } from '../disponible/modelo';
import { Promo } from '../promo/modelo';
import { Posicion } from '../posicion/modelo';
import { Ambiente } from '../ambiente/modelo';

@Table({
    timestamps: true,
    tableName: 'productos'
})
export class Producto extends Model<Producto> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;



    @Column(DataType.STRING)
    nombre : string;



    @Column(DataType.INTEGER)
    status : number;



    @BelongsTo(()=> Categoria, 'IdCategoria')
    Categoria : Categoria;

    @ForeignKey(() => Categoria)
    @Column
    IdCategoria: number;
    

    @BelongsToMany(()=> Color,'productos_colores','IdProducto', 'IdColor')
    Colores : Color[];

    @HasMany(()=> Imagen, 'IdProducto')
    Imagenes : Imagen[];

    @HasMany(()=> Portada, 'IdProducto')
    Portadas : Portada[];

    @HasMany(()=> Version, 'IdProducto')
    Versiones : Version[];

    @BelongsTo(()=> Marca, 'IdMarca')
    Marca : Marca;

    @ForeignKey(() => Marca)
    @Column
    IdMarca: number;
    

    @BelongsTo(()=> Gama, 'IdGama')
    Gama : Gama;

    @ForeignKey(() => Gama)
    @Column
    IdGama: number;
    

    @BelongsTo(()=> Linea, 'IdLinea')
    Linea : Linea;

    @ForeignKey(() => Linea)
    @Column
    IdLinea: number;
    

    @BelongsToMany(()=> Margen,'productos_margenes','IdProducto', 'IdMargen')
    Margenes : Margen[];
        
        
    @BelongsToMany(()=> Promo, () => Disponible,'IdProducto', 'IdPromo')
    Promos : Promo[];

            
    @BelongsToMany(()=> Ambiente, () => Posicion,'IdProducto', 'IdAmbiente')
    Ambientes : Ambiente[];

            

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}