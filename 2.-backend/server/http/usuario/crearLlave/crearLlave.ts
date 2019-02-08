// import { Gama } from '../modelo'
// import { Ambiente } from '../../ambiente/modelo'
// import { Espacio } from '../../espacio/modelo'


const _ = require('lodash');
module.exports = (user) => {

    user.$create('Llave', {})
        .then(llave => {
            // llave ?
            //     llave.$create('Avatar', { fb_avatar: 'assets/images/perfil.png' })
            //         .then(avatar => avatar ? user : { err: 'no se creo el avatar' })
            //     :
            //     { err: 'No se creo la llave' }
        })
        .catch(erro => erro)


    // return new Promise((resolve, reject) => {
    //     Gama.findById(req.params.id)
    //     .then(gama => gama.$get('Productos', {
    //         include : [
    //             {
    //                 model : Ambiente,
    //                 as : 'Ambientes',
    //                 include : [
    //                     {
    //                         model : Espacio,
    //                         as : 'Espacios'
    //                     }
    //                 ]
    //             }
    //         ]
    //     }))
    //     .then((response : any) =>  _.uniqBy(_.flattenDeep(response.map(n => n.Ambientes)), (n => n.id)))
    //     .then(response => resolve(response))
    //
    // })
}
