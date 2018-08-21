import React, {Component} from 'react'
import localStorage from "mobx-localstorage/lib/index";

export default class NavbarRigth extends Component {
	constructor(props) {
		super(props);

		this.logout = this.logout.bind(this);
	}

	logout() {
		localStorage.setItem('uuid', '');
		window.location = '#/#';
	}

	showServices() {
		document.querySelector('.services-list').classList.remove('hide-services');
		document.querySelector('.services-list').classList.add('show-services');
	}

	render () {
		return (
			<ul className="navbar-nav thunder-menu-icons ml-auto">
				<li className="nav-item icons">
					<a className="nav-link icons"
					   title={'Agregar Servicio'}
					   onClick={this.showServices}>
						<i className="fas fa-plus fa-lg"/>
					</a>
				</li>

				<li className="nav-item icons">
					<a className="nav-link icons"
						title={'Bloquear Pantalla'}>
						<i className="fas fa-low-vision fa-lg"/>
					</a>
				</li>

				<li className="nav-item icons">
					<a className="nav-link icons"
					   title={'Modo Navegador Web'}>
						<i className="fas fa-globe-americas fa-lg"/></a>
				</li>

				<li className="nav-item icons">
					<a className="nav-link icons"
					   title={'Configuracion'}>
						<i className="fas fa-cog fa-lg"/>
					</a>
				</li>

				{/*<li className="nav-item icons">
					<a className="nav-link icons"
					   title={'Cerrar sesion'}
					   onClick={NavbarRigth.logout}>
						<i className="fas fa-power-off fa-lg"/>
					</a>
				</li>*/}

				<li className="nav-item icons">
					<a className="nav-link icons avatar"
					   title={'Cerrar sesion'}
					   onClick={this.logout}>
						L
						{/*<i className="fas fa-user-circle fa-3x"/>*/}
					</a>
				</li>
			</ul>
		)
	}

}