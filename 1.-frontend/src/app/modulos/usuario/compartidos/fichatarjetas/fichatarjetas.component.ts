import { OPENPAYKEYS } from "../../../../../environments/environment";
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarjetaService, AuthService, SucursalService } from '../../../../servicios';
import { Tarjeta } from '../../../../modelos';
import { MatSnackBar } from '@angular/material';
import * as _ from 'lodash'

@Component({
  selector: 'fichatarjetas',
  templateUrl: './fichatarjetas.component.pug',
  styleUrls: ['./fichatarjetas.component.styl']
})
export class FichatarjetasComponent implements OnInit {

    private MERCHANT_ID: string = OPENPAYKEYS.MERCHANT_ID;
    private PUBLIC_API_KEY: string = OPENPAYKEYS.PUBLIC_API_KEY;

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() tarjeta

    tarjetas : any = []

    nuevatarjeta : FormGroup;

    status : boolean = false
    usuario : any

    proceso : boolean = false

    constructor(
        private auth : AuthService,
        private fb: FormBuilder,
        public snackBar: MatSnackBar
    ) {


        this.auth.obtenerUsuario()
        .subscribe(response => this.usuario = response)

        this.nuevatarjeta = this.fb.group({
            nombre: ['Ulises Gonzalez Callejas', Validators.required],
            numero: ['4111111111111111', Validators.required],
            mes: ['08', Validators.required],
            ano: ['23', Validators.required],
            codigo: ['885', Validators.required]
        });

        this.obtenerTajetas()


    }

    crearTarjeta(){

        this.proceso = true

        OpenPay.setId(this.MERCHANT_ID);
        ​OpenPay.setApiKey(this.PUBLIC_API_KEY);
        OpenPay.setSandboxMode(true);
        // OpenPay.token.create({
		// 	'holder_name': this.nuevatarjeta.controls.nombre.value,
		// 	'card_number': this.nuevatarjeta.controls.numero.value,
		// 	'expiration_month': this.nuevatarjeta.controls.mes.value,
		// 	'expiration_year': this.nuevatarjeta.controls.ano.value,
		// 	'cvv2': this.nuevatarjeta.controls.codigo.value
        // }, this.SuccessCallback, (response) => console.log(response))

        TarjetaService.validarOpenpay({
            'usuario' : this.usuario.id,
            'tarjeta' : {
                'holder_name': this.nuevatarjeta.controls.nombre.value,
    			'card_number': this.nuevatarjeta.controls.numero.value,
    			'expiration_month': this.nuevatarjeta.controls.mes.value,
    			'expiration_year': this.nuevatarjeta.controls.ano.value,
    			'cvv2': this.nuevatarjeta.controls.codigo.value,
                'device_session_id' : OpenPay.deviceData.setup("payment-form", "divice_id_token")
            }
        }).then(tarjeta => {

            console.log('si')
            console.log(tarjeta)

            this.proceso = false

            if(!_.isUndefined(tarjeta.http_code)){


                this.snackBar.open( tarjeta.description , 'Error', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'center',
                });


            }else{
                TarjetaService.asignarPrincipal(tarjeta.id)
                .then(() => this.obtenerTajetas())
            }


        })


    }

    obtenerTajetas(){
        TarjetaService.xUsuario(this.usuario.id)
        .then(response => this.tarjetas = response)
    }

    ngOnInit() {

        console.log( this  )

    }

    eliminar(id){
        TarjetaService.eliminar(id)
        .then(response => this.obtenerTajetas())
    }


    private SuccessCallback = (res) => {

        console.log(this.usuario.id)

        TarjetaService.crear({
            IdOpenpay : res.data.id,
            marca : res.data.card.brand,
            numero : res.data.card.card_number,
            mes : res.data.card.expiration_month,
            periodo : res.data.card.expiration_year,
            nombre : res.data.card.holder_name,
            IdUsuario : this.usuario.id
        }).then(response => this.status = false )
        .then((tarjeta : any ) => TarjetaService.asignarPrincipal(tarjeta.id))
        .then(() => this.obtenerTajetas())

    }

    asignarPrincipal(id){
        TarjetaService.asignarPrincipal(id)
        .then(response => this.obtenerTajetas())
    }

}
