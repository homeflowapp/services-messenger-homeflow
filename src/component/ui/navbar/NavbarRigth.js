import React, {Component} from 'react'

export default class NavbarRigth extends Component {
	constructor(props) {
		super(props);

		this.logout = this.logout.bind(this);
	}

	logout() {
		localStorage.removeItem('uuid');
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

				<li className="nav-item icons">
					<a className="nav-link icons"
					   title={'Cerrar sesion'}
					   onClick={this.logout}>
						<i className="fas fa-power-off fa-lg"/>
					</a>
				</li>

				<li className="nav-item icons">
					<a className="nav-link icons avatar">
						{localStorage.getItem('avatar')}
					</a>
				</li>
			</ul>
		)
	}

}