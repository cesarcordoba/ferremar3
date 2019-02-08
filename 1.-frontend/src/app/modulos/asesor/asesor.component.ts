import { AuthService } from './../../servicios/auth.service';
import { Usuario } from './../../modelos/Usuario.model';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
	selector: 'app-asesor',
	templateUrl: './asesor.component.pug',
	styleUrls: ['./asesor.component.styl'],
	providers: [
		MediaMatcher
	]
})
export class AsesorComponent implements OnInit, OnDestroy {
	mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;
	navLinks = [];
	usuario: Usuario;
	constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,  private us: AuthService) {
		this.mobileQuery = media.matchMedia('(max-width: 900px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);

		this.navLinks = [
			{ path: '/asesor', label: 'Inicio', icon: 'home' },
			{ path: '/asesor/productos', label: 'Productos', icon: 'folder' },
			{ path: '/asesor/sucursal', label: 'Sucursal', icon: 'store' },
			{ path: '/asesor/pedidos', label: 'Pedidos', icon: 'shopping_cart' }
		];
	}

	salir() {
		this.us.salir()
	}

	ngOnInit() {
		console.log('si')

		this.us.obtenerUsuario().subscribe(user => {

			console.log('si')

			this.usuario = user
			// user && user.getTipo() == 'admin'? this.navLinks.push({ path: '/admin/usuarios', label: 'Usuarios', icon: 'supervised_user_circle' }) : null;
		})
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}


}
