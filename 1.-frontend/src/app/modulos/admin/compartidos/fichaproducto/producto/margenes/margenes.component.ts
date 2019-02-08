
import { Component, ViewChild, Input, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MargenService } from '../../../../../../servicios';
import { ProductoService, MarcaService } from '../../../../../../servicios';

import * as _ from 'lodash'

@Component({
  selector: 'margenes',
  templateUrl: './margenes.component.pug',
  styleUrls: ['./margenes.component.styl']
})
export class MargenesComponent implements OnInit, AfterViewInit {

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
			map((cantidad: string | null) => cantidad ? this._filter(cantidad) : this.allTags.slice()));
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.allTags.filter(fruit => fruit.cantidad.toLowerCase().indexOf(filterValue) === 0);
	}


	remove(item): void {
		const index = this.chips.indexOf(item);

		if (index >= 0) {
			ProductoService.desligarmargen(this.id, item.id).then(algo => {
				this.chips.splice(index, 1);
			})
		}
	}

	selected(event: MatAutocompleteSelectedEvent): void {

        console.log(event)

		let item_ = this.chips.find(item => {

            console.log(item.cantidad)
            console.log(event.option.value)

            return item.cantidad == event.option.value

        })

        console.log(item_)


		if (!item_) {

			let item = this.allTags.find(item => item.cantidad == event.option.value)

            console.log(item)

			ProductoService.ligarmargen(this.id, item.id).then(ligado => {
                console.log(ligado)
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
        // MarcaService.margenes(this.id)
        // .then(productos => this.allTags = productos)
        // .then(algo => console.log(this.allTags))
    }
    ngAfterViewInit(){
        this.nuevoProducto.subscribe((value) => {
            if(!_.isUndefined(value) && value.IdMarca)
                MarcaService.margenes(value.IdMarca)
                .then(productos => this.allTags = productos)
                .then(algo => console.log(this.allTags))
        })
    }
}
