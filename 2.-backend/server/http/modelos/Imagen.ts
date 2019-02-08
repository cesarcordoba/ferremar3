import { Table, Column, Model ,DataType, BelongsToMany } from 'sequelize-typescript';


@Table({
    timestamps: true
})
export class Imagen extends Model<Imagen> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;

    @Column(DataType.STRING)
    url: string;

    @Column({type: DataType.ENUM, values: [ 'normal', 'portada', 'otro' ], defaultValue: 'normal'})
    tipo: string;

    @Column(DataType.STRING)
    key: string;    
  

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}
