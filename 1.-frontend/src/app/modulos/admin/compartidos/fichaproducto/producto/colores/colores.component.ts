
import { Component, ViewChild, Input, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ColorService } from '../../../../../../servicios';
import { ProductoService } from '../../../../../../servicios';
import * as _ from 'lodash'

@Component({
  selector: 'colores',
  templateUrl: './colores.component.pug',
  styleUrls: ['./colores.component.styl']
})
export class ColoresComponent implements OnInit, AfterViewInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

	@Input() chips: any[] = [];
	@Input() id: number;

    @Input() nuevoProducto


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


	constructor() {
		this.filtered = this.fruitCtrl.valueChanges.pipe(
			startWith(null),
			map((nombre: string | null) => nombre ? this._filter(nombre) : this.allTags.slice()));
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.allTags.filter(fruit => fruit.nombre.toLowerCase().indexOf(filterValue) === 0);
	}



	// add(event: MatChipInputEvent): void {
	// 	// Add fruit only when MatAutocomplete is not open
	// 	// To make sure this does not conflict with OptionSelected Event
	// 	if (!this.matAutocomplete.isOpen) {
	// 		const input = event.input;
	// 		const value = event.value;

	// 		// Add our fruit
	// 		if ((value || '').trim()) {
	// 			this.chips.push(value.trim());
	// 		}

	// 		// Reset the input value
	// 		if (input) {
	// 			input.value = '';
	// 		}

	// 		this.fruitCtrl.setValue(null);
	// 	}
	// }

	remove(item): void {
		const index = this.chips.indexOf(item);

		if (index >= 0) {
			ProductoService.desligarcolor(this.id, item.id).then(algo => {
				this.chips.splice(index, 1);
			})
		}
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		let item_ = this.chips.find(item => item.nombre == event.option.value)

		if (!item_) {
			let item = this.allTags.find(item => item.nombre == event.option.value)
			ProductoService.ligarcolor(this.id, item.id).then(ligado => {
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

    ngOnInit() {
        ColorService.obtener()
        .then(colores => {
            console.log(colores)
            this.allTags = colores
        })
    }

    ngAfterViewInit(){
        this.nuevoProducto.subscribe((value) => {
            if(!_.isUndefined(value) && value.id){
                console.log(value)
                ProductoService.colores(value.id)
                .then(colores => this.allTags = colores)
                .then(algo => console.log(this.allTags))
            }
        })
    }
}
