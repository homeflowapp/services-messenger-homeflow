import React, {Component} from 'react'
import * as EmailValidator from 'email-validator';
import UserApi from "../../../api/UserApi";

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: false,
			email: false,
			validmail: false,
			password: false,
			error: false
		};

		this.back = this.back.bind(this);
		this.register = this.register.bind(this);
	}

	register(e) {
		this._verifyText(e);
		if (this.refs.email.value !== '' && this.refs.name.value !== '' && this.refs.password.value !== '') {
			const data = JSON.stringify({
				email: this.refs.email.value,
				password: this.refs.password.value
			});
			if (EmailValidator.validate(this.refs.email.value)) {
				if (UserApi.register(this.refs.name.value, this.refs.email.value,  this.refs.password.value)) {
					this.refs.name.value = '';
					this.refs.email.value = '';
					this.refs.password.value = '';
				}
			}
		}
	}

	back() {
		document.querySelector('.is-register').classList.remove('show-modal');
		document.querySelector('.is-register').classList.add('hide-modal');
		setTimeout(() => {
			document.querySelector('.is-register').classList.add('hide');
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

		if (this.refs.name.value === '') {
			this.setState({name: this.state.name = true});
		} else {
			this.setState({name: this.state.name = false});
		}
	}

	render() {
		return (
			<div className={'is-register hide'}>
				<div className={'register'}>
					<div className={'col-12 register-title'}>
						<span className={'arrow-back'} onClick={this.back}><i className="fas fa-arrow-left"/></span>
						<div className={'display-4'}>Crear cuenta</div>
					</div>

					<div className={'register-field'}>
						<div className={'col-12'}>
							<label htmlFor="email">Nombre y Apellido</label>
							<div className="input-group mb-3">
								<input type="text" ref={'name'} className="form-control"/>
							</div>
							{this.state.name && <span>Nombre es requerido.</span>}
						</div>

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

					<div className={'register-btn'}>
						<div className={'col-12'}>
							<a className={'btn btn-thunder-secundary-white text-center'} onClick={this.register}>Continuar</a>
						</div>
					</div>
				</div>
			</div>
		)
	}
}