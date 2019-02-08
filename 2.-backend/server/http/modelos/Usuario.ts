import { PrimaryKey, Table, Column, Model, HasOne, DataType, Default, BeforeUpdate, AfterCreate, AfterUpdate, BeforeCreate } from 'sequelize-typescript';
import { LlaveSocial } from './LlaveSocial';
import * as bcrypt from 'bcrypt';

@Table({
    timestamps: true
})
export class Usuario extends Model<Usuario> {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: number;

    @Column(DataType.STRING)
    nombre: string;

    // @Column(DataType.STRING)
    // apellidos: string;      

    @Column(DataType.STRING)
    correo: string;

    @Column(DataType.VIRTUAL)
    password: string;

    @Column(DataType.STRING)
    tipo: string;

    @HasOne(() => LlaveSocial, 'id_usuario')
    llaveSocial: LlaveSocial

    constructor(values?: any, options?: any) {
        super(values, options);
    }

    @BeforeUpdate
    @BeforeCreate
    static formatearDatos(user: Usuario) {
        user.correo = user.correo.toLowerCase();
    }

    
    @AfterCreate
    @AfterUpdate
    static crearLLave(user: Usuario, options) {
        if(user.llaveSocial){
            if(user.password){
                console.log('tiene llave y paswwor, actualicemos')
                user.$get('LlaveSocial').then((llave: LlaveSocial) => {
                    bcrypt.hash(user.password, 10, function (err, hash) {
                        if (err) return err;
                        llave.update({password: hash});
                    }); 
                })
            }
        } 
        else{
            console.log('no tiene llave , vamo a crearla')
        bcrypt.hash(user.password, 10, function (err, hash) {
            if (err) return err;
            user.$create('LlaveSocial', { password: hash })
                .then(llave => {
                    llave ?
                        llave.$create('Avatar', { fb_avatar: 'assets/images/perfil.png' })
                            .then(avatar => avatar ? user : { err: 'no se creo el avatar' })
                        :
                        { err: 'No se creo la llave' }
                })
                .catch(erro => erro)
        });            
        }
    }

    autenticacion(password: string) {
        if (bcrypt.compareSync(password, this.llaveSocial.password))
            return true;
        else
            return false;
    }


    getAvatar() {
        this.id && this.llaveSocial && this.llaveSocial.avatar ?
            this.llaveSocial.avatar
            :
            { fb_avatar: 'assets/images/perfil.png' };
    }


}
