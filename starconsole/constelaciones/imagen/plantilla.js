const _ = require('lodash');


const { planeta } = require('../../ovnis/relaciones.js')

module.exports = (documento, constelacion, nivel) => {
return new Promise(resolve => {
constelacion.getPlaneta()
.then(planeta => {


documento.write(`
.modo
	span Modo de edición
	button(mat-button, (click)="edicion = !edicion", [style.background-color]="edicion ? '#cc0000' : '#9c3'")
		span(*ngIf="edicion === false") Activar
		span(*ngIf="edicion === true") Desactivar

form([formGroup]='formulario', *ngIf="edicion === true")
	mat-form-field(appearance="outline")
		mat-label Tipos de dimensiones
		mat-select((selectionChange)="cambiarEscala($event)")
			mat-option([value]="'cuadrado'") Cuadrado
			mat-option([value]="'horizontal'") Horizontal
			mat-option([value]="'vertical'") Vertical
	.dimensiones

		mat-form-field(appearance="outline")
			mat-label Height
			input(type="number", matInput, placeholder="Busca un nombre", formControlName='height')

		mat-form-field(appearance="outline")
			mat-label Width
			input(type="number", matInput, placeholder="Busca un nombre", formControlName='width')

		mat-form-field(appearance="outline")
			mat-label Escala H
			input(type="number", matInput, placeholder="Busca un nombre", formControlName='escala_h')

		mat-form-field(appearance="outline")
			mat-label Escala W
			input(type="number", matInput, placeholder="Busca un nombre", formControlName='escala_w')
	button(mat-stroked-button, (click)="aceptar()")
		mat-icon done
.dimensionesdisponibles
	mat-form-field(appearance="outline", *ngIf="edicion === true")
		mat-label Dimensiones disponibles ( px )
		mat-chip-list
			mat-chip(*ngFor="let chip of configuracion.escalas") h:{{ chip.height }} - w:{{ chip.width }}
.inputs(*ngIf="edicion === true")
	sweetimage(
		[(ngModel)]="file",
		[width]="configuracion.escalas[0].width",
		[height]="configuracion.escalas[0].height"
		)
	button(mat-icon-button, (click)="guardar()", *ngIf="carga==false")
		mat-icon save
	mat-spinner(*ngIf="carga==true")
.imagenes(*ngIf="edicion === false")
	.item(*ngFor="let item of items")
		.dimensiones
			.dimension(*ngFor="let imagen of item.imagenes") {{imagen.dimension}}
		.imagen
			img([src]="obtenerImagen(item.imagenes)")
		.eliminar
			button(mat-icon-button, color="warn", (click)="borrar()")
				mat-icon delete
	mat-spinner(*ngIf="carga==true")
`
)
})

constelacion.getSubConstelaciones()
.then(constelaciones => {

	constelaciones.forEach(constelacion => {
documento.write(`
	`+ constelacion.nombre)
	})
})
.then(() => resolve(true))

	})
}
