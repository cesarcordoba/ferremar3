
import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

import { Usuario } from '../../modelos/Usuario.model';
import { AuthService } from '../../servicios/auth.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from  './login/login.component'
import * as _ from 'lodash'

@Component({
	selector: 'app-main',
	templateUrl: './main.component.pug',
	styleUrls: ['./main.component.styl'],
	encapsulation: ViewEncapsulation.None,
	animations: [
		trigger('fadeInOut', [
			transition(':enter', [   // :enter is alias to 'void => *'
				style({ opacity: 0 }),
				animate(1000, style({ opacity: 1 }))
			]),
			transition(':leave', [   // :leave is alias to '* => void'
				animate(1000, style({ opacity: 0 }))
			])
		])
	]
})
export class MainComponent implements OnInit, OnDestroy {
	mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;
	navLinks = [];
	usuario: Usuario;
	subscription: Subscription;

	constructor(
		private dialog: MatDialog,
		private router: Router,
		private route: ActivatedRoute,
		changeDetectorRef: ChangeDetectorRef,
		media: MediaMatcher,
		private titleService: Title,
		private us: AuthService) {
		this.mobileQuery = media.matchMedia('(max-width: 768px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);

		this.navLinks = [
			{ path: '/', label: 'home', icon: 'airplanemode_active' },
		];

		this.route.params.subscribe(params => {
			console.log(params)
			// params.token ? this.auth.loginFacebook(params.token).then(res => {
			// 	console.log(res)
			// 	res ?
			// 		this.router.navigate(['/']) : this.router.navigate(['/'])
			// }) : null;
		});
	}

	ngOnInit() {
		this.us.obtenerUsuario()
		.subscribe(user => {
			this.usuario = user
			if(!_.isNull(this.usuario)) this.usuario.obtenerAvatares()
		})
	}

	ngOnDestroy() {
		this.mobileQuery.removeListener(this._mobileQueryListener);
		this.subscription = this.us.obtenerUsuario().subscribe(user => this.usuario = user);
	}

	salir(){
		this.us.salir();
	}

	ir(x){
        this.router.navigate([ x ])
    }

	login(){
		this.dialog.open(LoginComponent, {
			position : { top : '100px' },
			width :  '600px',
			height : '700px',
			maxWidth : '600px',
			data :  {}
		}).afterClosed().subscribe(response => {});
	}

}
