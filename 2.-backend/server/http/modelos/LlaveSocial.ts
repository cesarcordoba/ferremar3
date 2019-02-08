import { Avatar } from './Avatar';
import { Usuario } from './Usuario';
import { PrimaryKey, Table, Column, Model, BelongsTo, HasOne, DataType, Default } from 'sequelize-typescript';
// import { Item } from './Item';

@Table({
    timestamps: true
})
export class LlaveSocial extends Model<LlaveSocial> {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: number;

    @Column(DataType.STRING)
    fb_id: string

    @Column(DataType.STRING)
    tw_id: string;

    @Column(DataType.STRING)
    gl_id: string;

    @Column(DataType.STRING)
    inst_id: string;

    @Column(DataType.STRING)
    password: string;

    @BelongsTo(() => Usuario, 'id_usuario')
    usuario: Usuario;

    @HasOne(()=> Avatar, 'id_llave_social')
    avatar: Avatar;

    constructor(values?: any, options?: any) {
        super(values, options);
    }

}