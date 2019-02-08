import { PrimaryKey, Table, Column, Model, BelongsTo, DataType, Default } from 'sequelize-typescript';
import { LlaveSocial } from './LlaveSocial';
// import { Item } from './Item';

@Table({
    timestamps: true
})
export class Avatar extends Model<Avatar> {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: number;

    @Column(DataType.STRING)
    fb_avatar: string;

    @Column(DataType.STRING)
    tw_avatar: string;

    @Column(DataType.STRING)
    gg_avatar: string;

    @Column(DataType.STRING)
    insta_avatar: string;

    @BelongsTo(() => LlaveSocial, 'id_llave_social')
    llaveSocial: LlaveSocial;

    constructor(values?: any, options?: any) {
        super(values, options);
    }

}