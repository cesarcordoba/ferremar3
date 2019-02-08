const _ = require('lodash');

module.exports = (documento, modelo, nivel) => {
return new Promise(resolve => {
documento.write(`
@import  '../../../`+ _.repeat('../', nivel) + `defaults.styl'`)
documento.write(`

.modo
    @extend .borde
    display flex
    justify-content between-space
    align-items center
    span
        font-family arial
        width 100%

.mat-form-field-wrapper
    padding 0px

.dimensionesdisponibles
    width calc(100% - 10px)
    margin 0 5px
    mat-form-field
        width 100%

.item
    position: relative;
    width 220px
    @extend .borde
    .dimensiones
        position: absolute;
        right 0px
        top 0px
        .dimension
            height 20px
            width 70px
            background-color: rgba(0,0,0,.2)
            color black
            font-family: arial
            border-radius: 20px
            display: flex
            justify-content: center
            align-items: center
            margin 4px 0
            font-size: 13px
    .eliminar
        position: absolute;
        bottom 0px

.imagenes
    display flex
    justify-content center
    align-items center


form
    margin 0 5px
    display flex
    justify-content center
    mat-form-field
        width 100%
        padding 0px
        margin 0px
    .dimensiones
        display flex
        mat-form-field
            margin 0 2px
            width 80px
    button
        height 59px
        margin 5px

    `, (algo) => resolve(true))
    })
}
