
import { Component, ViewChild, Input, OnInit, ElementRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MargenService } from '../../../../servicios';
import { ProductoService } from '../../../../servicios';
import { TransaccionService } from '../../../../servicios';

import { CrearmargenComponent } from  './crearmargen/crearmargen.component'
declare var $: any;
import * as _ from 'lodash'

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'chipmargenes',
  templateUrl: './chipmargenes.component.pug',
  styleUrls: ['./chipmargenes.component.styl']
})
export class ChipmargenesComponent implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

	@Input() chips: any[] = [];
	@Input() id: number;
    @Input() servicio = {
        ligarmargen : (x, y) => {
            return new Promise(resolve => resolve())
        },
        desligarmargen: (x, y) => {
            return new Promise(resolve => resolve())
        }
    }
	visible = true;
	selectable = true;
	removable = true;
	addOnBlur = true;
	separatorKeysCodes: number[] = [ENTER, COMMA];

	fruitCtrl = new FormControl();
	filtered: Observable<string[]>;

    idioma : any



	allTags: any[] = [];

	@ViewChild('input') input: ElementRef<HTMLInputElement>;
	@ViewChild('auto') matAutocomplete: MatAutocomplete;

    constructor(
        private dialog: MatDialog

    ) {
        this.filtered = this.fruitCtrl.valueChanges.pipe(
            startWith(null),
            map((nombre: string | null) => nombre ? this._filter(nombre) : this.allTags.slice()));
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.allTags.filter(fruit => fruit.nombre.toLowerCase().indexOf(filterValue) === 0);
    }



    add(event: MatChipInputEvent): void {
    	// Add fruit only when MatAutocomplete is not open
    	// To make sure this does not conflict with OptionSelected Event
    	if (!this.matAutocomplete.isOpen) {
    		const input = event.input;
    		const value = event.value;

    		// Add our fruit
    		if ((value || '').trim()) {

                this.dialog.open(CrearmargenComponent, {
                    position : {
                        top : '25px'
                    },
                    width :  $(window).width() + 'px',
                    height :  $(window).height() - 50 + 'px',
                    maxWidth : $(window).width() - 50 + 'px',
                    data :  {
                        value : event.value
                    }
                }).afterClosed().subscribe(margen => {

                    console.log(margen)

                    if(!_.isNull(margen)) MargenService.crear(margen)
                        .then(margen => this.servicio.ligarmargen(this.id, margen.id))
                        .then(response => this.chips.push(margen))

                });
    		}

    		// Reset the input value
    		if (input) {
    			input.value = '';
    		}

    		this.fruitCtrl.setValue(null);
    	}
    }

    ngOnInit() {
        console.log(this.chips)
        MargenService.obtener().then(productos => this.allTags = productos).then(algo => console.log(this.allTags))
    }

//
//
// planeta.SubPlanetas.forEach(subPlaneta => {
// 	if(subPlaneta.orbitas.tipo === 4){



	remove(item): void {


        console.log(item)

		const index = this.chips.indexOf(item);

		if (index >= 0) {

            this.servicio.desligarmargen(this.id, item.id)
            .then(algo => {
				this.chips.splice(index, 1);
			})
		}
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		let item_ = this.chips.find(item => item.nombre == event.option.value)

		if (!item_) {
			let item = this.allTags.find(item => item.nombre == event.option.value)

            this.servicio.ligarmargen(this.id, item.id).then(ligado => {
				this.chips.push(item);
				this.input.nativeElement.value = '';
				this.fruitCtrl.setValue(null);
			})
				;
		} else {
			this.input.nativeElement.value = '';
			this.fruitCtrl.setValue(null);
		}
	}



    imprimir(){ console.log(this) }
}
