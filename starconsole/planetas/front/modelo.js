const _ = require('lodash');
const proceso = require('./modelo/proceso.js');
const importaciones = require('./modelo/importaciones.js');
module.exports = (documento, modelo) => {
return new Promise(resolve => {

documento.write(`


import { `+ _.capitalize(modelo.singular) +`Service } from '../servicios/`+ _.capitalize(modelo.singular) +`.service'
import * as _ from 'lodash'

export class `+ _.capitalize(modelo.singular) +` {
    id: number;

`)



modelo.getSubPlanetas()
.then((planetas) => Promise.all(
    planetas.map(async (planeta) => await importaciones(planeta, documento, modelo)),
))
.then(() => {

     modelo.getMeteoros()
     .then(meteoros => {

 meteoros.forEach(meteoro =>
     documento.write(`
    ` + meteoro.nombre + ` : ` +  data(meteoro.tipo) + `;`))

         documento.write(`

    constructor(arg) {
        if(_.isObject(arg))
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }

         `)


     })

})
.then(() => modelo.getSubPlanetas())
.then((planetas) => Promise.all(
    planetas.map(async (planeta) => await proceso(documento, modelo, planeta))
))



//
// modelo.SubPlanetas.forEach(planeta => {
//
//     var tipo = planeta.get({plan : true}).orbitas.tipo
//
//     if(tipo === 1)
//         documento.write(`
//     Obtener` +  _.capitalize(planeta.singular) + `(){
//         ` +  _.capitalize(modelo.singular) + `Service.` +  planeta.singular  + `(this.id)
//         .then(response => this.` +  planeta.singular  +  ` = response)
//     }`)
//
//     if(tipo === 3 || tipo ===  2 || tipo ===  4)
//         documento.write(`
//
//     Obtener` +  _.capitalize(planeta.plural)  + `(){
//         ` +  _.capitalize(modelo.singular) + `Service.` +  planeta.plural  + `(this.id)
//         .then(response => this.` +  planeta.plural  +  ` = response)
//     }`)
// })


.then(() => documento.write(`
    //- Finalizo
}`, (algo) => resolve(true)))
    })
}


function data(tipo){

    switch (tipo) {
        case 'STRING':
            return 'string'
            break;
        case 'INTEGER':
            return 'number'
            break;
        case 'TEXT':
            return 'string'
            break;
        case 'DATE':
            return 'Date'
            break;
        default:

    }

}


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
