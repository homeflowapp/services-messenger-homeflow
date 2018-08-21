import React, {Component} from 'react'
import * as EmailValidator from 'email-validator';
import UserApi from "../../../api/UserApi";

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: false,
			validmail: false,
			password: false,
		};

		this.back = this.back.bind(this);
		this.login = this.login.bind(this);
	}

	login(e) {
		this._verifyText(e);
		if (this.refs.email.value !== '' && this.refs.password.value !== '') {
			if (EmailValidator.validate(this.refs.email.value)) {
				if (UserApi.login(this.refs.email.value,  this.refs.password.value)) {
					this.refs.email.value = '';
					this.refs.password.value = '';
				}
			}
		}
	}

	back() {
		document.querySelector('.is-login').classList.remove('show-modal');
		document.querySelector('.is-login').classList.add('hide-modal');
		setTimeout(() => {
			document.querySelector('.is-login').classList.add('hide');
			document.querySelector('.auth').classList.add('hide');
		}, 1500);
	}

	_verifyText(e) {
		e.preventDefault();

		if (this.refs.email.value === '') {
			this.setState({email: this.state.email = true});
		}
		else {
			if (!EmailValidator.validate(this.refs.email.value)) {
				this.setState({validmail: this.state.validmail = true});
				this.setState({email: this.state.email = false});
			} else {
				this.setState({validmail: this.state.validmail = false});
			}
		}

		if (this.refs.password.value === '') {
			this.setState({password: this.state.password = true});
		} else {
			this.setState({password: this.state.password = false});
		}
	}

	render() {
		return (
			<div className={'is-login hide'}>
				<div className={'login'}>
					<div className={'col-12 login-title'}>
						<span className={'arrow-back'} onClick={this.back}><i className="fas fa-arrow-left"/></span>
						<div className={'display-4'}>Iniciar sesión</div>
					</div>

					<div className={'login-field'}>
						<div className={'col-12'}>
							<label htmlFor="email">Correo Electrónico</label>
							<div className="input-group mb-3">
								<input type="text" ref={'email'} className="form-control"/>
							</div>
							{this.state.validmail && <span>Dirección email no es valida.</span>}
							{this.state.email && <span>Dirección email es requerida.</span>}
						</div>

						<div className={'col-12'}>
							<label htmlFor="pwd">Contraseña</label>
							<div className="input-group mb-3">
								<input type="password" ref={'password'} className="form-control"/>
							</div>
							{this.state.password && <span>Contraseña es requerida.</span>}
						</div>
					</div>

					<div className={'login-btn'}>
						<div className={'col-12'}>
							<a className={'btn btn-thunder-secundary-white text-center'} onClick={this.login}>Acceder</a>
						</div>
					</div>
				</div>
			</div>
		)
	}
}