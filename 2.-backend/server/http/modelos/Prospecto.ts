import { PrimaryKey, Table, Column, Model, HasOne ,DataType, Default } from 'sequelize-typescript';

@Table({
    timestamps: true
})

export class Prospecto extends Model<Prospecto> {
    @Column({primaryKey: true, autoIncrement:true})
    id: number;

    @Column(DataType.STRING)
    nombre: string;

    @Column(DataType.STRING)
    apellidos: string;    

    @Column(DataType.STRING)
    correo: string;

    @Column(DataType.STRING)
    empresa: string;    

    @Column(DataType.STRING)
    numero: string;

    @Column(DataType.TEXT)
    asunto: string;


    constructor(values?: any, options?: any) {
        super(values, options);
    }
}