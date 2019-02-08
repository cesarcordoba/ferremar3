const _ = require('lodash');

module.exports = (planeta, documento, modelo) =>
    new Promise(resolve => {

    console.log('**********************----*************************')


    // planetas.forEach(planeta => {
    if(planeta.orbitas.tipo === 1 || planeta.orbitas.tipo === 2 || planeta.orbitas.tipo === 4  ){
    documento.write(`
    ` + diferenciar(planeta) + ` : any;`)

        resolve(true)
    }

    if(planeta.orbitas.tipo === 7){

        planeta.getSubPlanetas()
        .then(planetas => { planetas.forEach(planetax => {

            if(planetax.orbitas.tipo === 5 && planetax.id !== modelo.id){

    documento.write(`
    ` + _.toLower(planetax.orbitas.alias) + ` : any;`)

            }

            resolve(true)

            })
        })

    }


    if(planeta.orbitas.tipo === 3 || planeta.orbitas.tipo === 5 || planeta.orbitas.tipo === 6) {
        documento.write(`//` + planeta.orbitas.tipo)
        resolve(true)
    }
        // })

//
//     if(planeta.orbitas.tipo === 1 || planeta.orbitas.tipo === 4 || planeta.orbitas.tipo === 2 || planeta.orbitas.tipo === 3){
//     documento.write(`
// import { `+ _.capitalize(planeta.singular) +` } from '../modelos/`+ _.capitalize(planeta.singular) +`.model';`)
//         chain.then(response => resolve(_.concat(response, planeta.singular )))
// }
//
//     if(planeta.orbitas.tipo === 6 || planeta.orbitas.tipo === 5 ){
//         chain.then(response => resolve(_.concat(response, planeta.singular )))
// }
//
//     if(planeta.orbitas.tipo === 7){
//
//         documento.write(`
// import { `+ _.capitalize(planeta.singular) +` } from '../modelos/`+ _.capitalize(planeta.singular) +`.model';`)
//
//     planeta.getSubPlanetas()
//     .then(planetas =>
//         planetas.forEach(planetax => {
//
//             if(planetax.orbitas.tipo === 5 && planetax.id !== modelo.id){
//
//
//             chain.then(response => {
//
//                 if(!response.includes(planetax.singular)){
//
//                 documento.write(`
// import { `+ _.capitalize(planetax.singular) +` } from '../modelos/`+ _.capitalize(planetax.singular) +`.model';`)
//
//                 }
//
//                 resolve(_.concat(response, planeta.singular, planetax.singular   ))
//
//                 })
//
//             }
//         })
//     )
//
// }


})


function diferenciar(modelo){

    switch (modelo.orbitas.tipo) {
        case 1 || 3:
            return modelo.singular
            break;
        case 2 || 5 || 6 || 7:
            return modelo.plural
            break;
        case 4 :
            return modelo.plural
            break;
        default:

    }

}
