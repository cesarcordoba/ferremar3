import { AuthService } from './../../servicios/auth.service';
import { Usuario } from './../../modelos/Usuario.model';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.pug',
	styleUrls: ['./usuario.component.styl'],
	providers: [MediaMatcher]
})
export class UsuarioComponent implements OnInit, OnDestroy {
	mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;
	navLinks = [];
	usuario: Usuario;
	constructor(public route : Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,  private us: AuthService) {
		this.mobileQuery = media.matchMedia('(max-width: 900px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);

		this.navLinks = [
			{ path: '/usuario', label: 'Inicio', icon: 'home' },
			{ path: '/usuario/perfil', label: 'Perfil', icon: 'account_box' },
			{ path: '/usuario/direcciones', label: 'Direcciónes', icon: 'location_on' },
			{ path: '/usuario/metodos', label: 'Metodos de pago', icon: 'credit_card' },
			{ path: '/usuario/pedidos', label: 'Pedidos', icon: 'history' }
		];
	}

	salir() {
		this.us.salir()
	}

	ngOnInit() {
		this.us.obtenerUsuario().subscribe(usuario => {
			this.usuario = usuario
			//user && user.getTipo() == 'admin'? this.navLinks.push({ path: '/admin/usuarios', label: 'Usuarios', icon: 'supervised_user_circle' }) : null;
		})
	}

	ir(x){
        this.route.navigate([ x ])
    }

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}


}
