

const _ = require('lodash');

module.exports = (documento, modelo, planeta) =>
new Promise((resolve, reject) => {

    //BelongsTo, HasMany, HasOne
    if(planeta.orbitas.tipo === 1 || planeta.orbitas.tipo === 2 || planeta.orbitas.tipo === 4 ){
        documento.write(`
    // `+  planeta.singular  +`
    obtener` + _.capitalize( diferenciar(planeta)) + `(){
        return new Promise(resolve => {
            `+ _.capitalize(modelo.singular) +`Service.` + diferenciar(planeta) + `(this.id)
            .then(response => this.` + diferenciar(planeta) + ` = response)
            .then(response => resolve(response))
        })
    }`)
        resolve(true)
    }


    // //BelongsTo, HasMany, HasOne
    // if(planeta.orbitas.tipo === 1 || planeta.orbitas.tipo === 2 || planeta.orbitas.tipo === 3){
    //
    //     documento.write(`
    //
    // @`+ planeta.orbitas.nombre +`(()=> `+ _.capitalize(planeta.singular) +`, 'Id`+ ( planeta.orbitas.tipo === 1 ? _.capitalize(planeta.singular) : _.capitalize(modelo.singular) ) +`')
    // ` + (planeta.orbitas.tipo === 2 ? _.capitalize(planeta.plural) : _.capitalize(planeta.singular) ) + ` : ` +  _.capitalize(planeta.singular) + (planeta.orbitas.tipo === 2 ? `[];` : `;` )
    //     )
    //
    //     if(planeta.orbitas.tipo === 1 ){
    //
    //     documento.write(`
    //
    // @ForeignKey(() => `+ _.capitalize(planeta.singular) +`)
    // @Column
    // Id`+ _.capitalize(planeta.singular) +`: number;
    // `)
    //     }
    //     resolve(true)
    // }
    //
    // //BelongsToMany
    // if(planeta.orbitas.tipo === 4){
    //
    //         let menor = modelo.orden > planeta.orden ? modelo : planeta
    //         let mayor = modelo.orden > planeta.orden ? planeta : modelo
    //
    //     documento.write(`
    //
    // @`+ planeta.orbitas.nombre +`(()=> `+ _.capitalize(planeta.singular) + `,'` +  mayor.plural + '_' + menor.plural + `','Id` +  _.capitalize(modelo.singular) + `', 'Id`+ _.capitalize(planeta.singular) + `')
    // ` +  _.capitalize(planeta.plural) + ` : ` +  _.capitalize(planeta.singular) + `[];`)
    //
    //     resolve(true)
    //
    // }
    //
    // //Especial
    // if(planeta.orbitas.tipo === 5){
    //     resolve(true)
    // }
    //
    // //Recursiva
    // if(planeta.orbitas.tipo === 6){
    //
    //     documento.write(`
    //
    //         @HasMany(()=> `+ _.capitalize(modelo.singular) +`, 'Id`+ _.capitalize(modelo.singular) +`')
    //         Sub`+ _.capitalize(modelo.plural) +` : `+ _.capitalize(modelo.singular) +`[];
    //
    //         @BelongsTo(()=> `+ _.capitalize(modelo.singular) +`, 'Id`+ _.capitalize(modelo.singular) +`')
    //         Pre`+ _.capitalize(modelo.singular) +` : `+ _.capitalize(modelo.singular) +`[];
    //
    //         @ForeignKey(() => `+ _.capitalize(modelo.singular) +`)
    //         @Column
    //         Id`+ _.capitalize(modelo.singular) +`: number;
    //
    //         `)
    //
    //     resolve(true)
    //
    // }
    //
    // //Nodo
    if(planeta.orbitas.tipo === 7){

        // Espacio
        documento.write(`
        `)

        planeta.getSubPlanetas()
        .then(planetas => { planetas.forEach(planetax => {

            if(planetax.orbitas.tipo === 5 && planetax.id !== modelo.id){


            documento.write(`
        // `+  planeta.singular  +`
        obtener` +  _.capitalize(planetax.orbitas.alias) + `(){
            return new Promise(resolve => {
                `+ _.capitalize(modelo.singular) +`Service.` + _.toLower(planetax.orbitas.alias) + `(this.id)
                .then(response => this.` + _.toLower(planetax.orbitas.alias) + ` = response)
                .then(response => resolve(response))
            })
        }`)

    //             documento.write(`
    // @BelongsToMany(()=> ` + _.capitalize(planetax.singular) + `, () => ` + _.capitalize(planeta.singular) + `,'Id` + _.capitalize(modelo.singular) + `', 'Id` + _.capitalize(planetax.singular) + `')
    // ` + _.capitalize(planetax.orbitas.alias) + ` : ` + _.capitalize(planetax.singular) + `[];
    //
    //         `)}

            }

            resolve(true)

            })
        })

    }

    if(planeta.orbitas.tipo === 3 || planeta.orbitas.tipo === 5 || planeta.orbitas.tipo === 6) {
        documento.write(`//` + planeta.orbitas.tipo)
        resolve(true)
    }


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
