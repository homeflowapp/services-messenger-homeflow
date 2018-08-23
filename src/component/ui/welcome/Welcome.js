import React, {Component} from 'react'
import {Link} from 'react-router'
import Login from "./Login";
import Register from "./Register";
import Intenert from "../statusbar/Intenert";

export default class Welcome extends Component {
	constructor(props) {
		super(props);

		this.show_login = this.show_login.bind(this);
		this.register = this.register.bind(this);

		if (localStorage.getItem('uuid') !== null) {
			window.location = '#/services';
		}
	}

	componentDidMount() {
		document.querySelector('body').classList.remove('welcome-service');
		document.querySelector('body').classList.add('welcome-bg');
	}

	show_login() {
		document.querySelector('.auth').classList.remove('hide');
		document.querySelector('.is-login').classList.remove('hide');
		document.querySelector('.is-login').classList.remove('hide-modal');
		document.querySelector('.is-login').classList.add('show-modal');
	}

	register() {
		document.querySelector('.auth').classList.remove('hide');
		document.querySelector('.is-register').classList.remove('hide');
		document.querySelector('.is-register').classList.remove('hide-modal');
		document.querySelector('.is-register').classList.add('show-modal');
	}

	render() {
		return (
			<span>
				<Intenert/>
				<span className={'hide auth'}>
					<Login/>
					<Register/>
				</span>
				<div className={'welcome'}>
					<div className={'welcome-app'}>
						<div className={'display-3 thunder text-center'}>Thunder</div>
						<div
							className="text-center description">Servicios de trabajo, chat y mensajería en una sola aplicación.</div>

						<div className="col-12 mx-auto login">
							<Link className="btn btn-thunder-primary-welcome text-center"
							      onClick={this.show_login}>Iniciar sesión</Link>
							<Link className="btn btn-thunder-secundary-white text-center"
							      onClick={this.register}>Crear una cuenta</Link>
						</div>

						<div className={'col-12 welcome-services'}>
							<a className={'image'}>
								<img src={'./assets/images/services/slack.png'}/>
							</a>

							<a className={'image'}>
								<img src={'./assets/images/services/active.png'}/>
							</a>

							<a className={'image'}>
								<img src={'./assets/images/services/github.png'}/>
							</a>

							<a className={'image'}>
								<img src={'./assets/images/services/gitlab.png'}/>
							</a>

							{/*	<a className={'image'}>
								<img src={'./assets/images/services/messenger.png'}/>
							</a>*/}

							<a className={'image'}>
								<img src={'./assets/images/services/whatsapp.png'}/>
							</a>

							<a className={'image'}>
								<img src={'./assets/images/services/youtube.png'}/>
							</a>
						</div>
					</div>

					<div className={'powered'}>
						<span>
							<strong>Thunder <i
								className="fas fa-copyright"/> 2018</strong> | Powered by <strong>Luis Solórzano</strong>
						</span>
					</div>
				</div>
			</span>
		)
	}

}