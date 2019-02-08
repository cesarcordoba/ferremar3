
import { Component, ViewChild, Input, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import * as _ from 'lodash'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CambiarstatusComponent } from './../cambiarstatus/cambiarstatus.component';
declare var $: any;
import { AccionService, MargenService, InventarioService, VersionService, ProductoService, MarcaService, VariacionmargenService } from '../../../../../../servicios';
@Component({
  selector: 'margen',
  templateUrl: './margen.component.pug',
  styleUrls: ['./margen.component.styl']
})
export class MargenComponent implements OnInit {

        borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    	@Input() chips: any[] = [];
    	@Input() id: number;



        @Input() version
        @Input() sucursal
        @Input() producto? : any
        @Input() usuario? : any

    	visible = true;
    	selectable = true;
    	removable = true;
    	addOnBlur = true;
    	separatorKeysCodes: number[] = [ENTER, COMMA];

    	fruitCtrl = new FormControl();
    	filtered: Observable<string[]>;



    	allTags: any[] = [];

    	@ViewChild('input') input: ElementRef<HTMLInputElement>;
    	@ViewChild('auto') matAutocomplete: MatAutocomplete;


    	constructor(
            private dialog: MatDialog,
            public snackBar: MatSnackBar
        ) {
    		this.filtered = this.fruitCtrl.valueChanges.pipe(
    			startWith(null),
    			map((cantidad: string | null) => cantidad ? this._filter(cantidad) : this.allTags.slice()));
    	}

    	private _filter(value: string): string[] {
    		const filterValue = value.toLowerCase();
    		return this.allTags.filter(fruit => fruit.nombre.toLowerCase().indexOf(filterValue) === 0);
    	}

    	remove(item): void {
    		const index = this.chips.indexOf(item);

    		if (index >= 0) {
    			InventarioService.desligarmargenes(this.id, item.id).then(algo => {
    				this.chips.splice(index, 1);
    			})
    		}
    	}

    	selected(event: MatAutocompleteSelectedEvent): void {

            console.log(event)

            console.log(this.chips)

    		let item_ = this.chips.find(item => {

                console.log(item.cantidad)
                console.log(event.option.value)

                return item.cantidad == event.option.value

            })

    		if (!item_) {

    			let item = this.allTags.find(item => item.cantidad == event.option.value)

    			InventarioService.ligarmargenes(this.id, item.id, {status : 1}).then(ligado => {

    				this.chips.push(Object.assign(item, {Variacion: {status : 1}}));
    				this.input.nativeElement.value = '';
    				this.fruitCtrl.setValue(null);
    			})
    				;
    		} else {
    			this.input.nativeElement.value = '';
    			this.fruitCtrl.setValue(null);
    		}
    	}

        ngOnInit() {

            // MarcaService.margenes(this.id)
            // .then(productos => this.allTags = productos)
            // .then(algo => console.log(this.allTags))
        }
        ngAfterViewInit(){

            this.sucursal.Inventario.obtenerMargenes()
            .then(response => this.chips = response)

            MarcaService.margenes(this.producto.IdMarca)
            .then(items => this.allTags = items)


            // this.nuevoProducto.subscribe((value) => {
            //     if(!_.isUndefined(value) && value.IdMarca)
            //         ProductoService.margenes(value.id)
            //         .then(productos => this.allTags = productos)
            //         .then(algo => console.log(this.allTags))
            // })
        }

        abrir(item : any){
            this.dialog.open(CambiarstatusComponent, {
                data :  {}
            }).afterClosed().subscribe(respuesta => {

                VariacionmargenService.editar({
                    id : item.Variacionmargen.id,
                    status : respuesta === true ? 1 : 0})
                .then(response => {

                    AccionService.crear({
                        seccion : 'margen',
                        contenido : 'cambiar',
                        objeto : item.id,
                        IdUsuario : this.usuario.id
                    })


                    this.snackBar.open('Se edito el margen', 'Listo', {
                        duration: 5000,
                        verticalPosition: 'bottom',
                        horizontalPosition: 'center',
                    });

                    item.Variacionmargen.status = respuesta === true ? 1 : 0
                })


            });
        }
}
