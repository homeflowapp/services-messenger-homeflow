import React, {Component} from 'react'
import * as EmailValidator from 'email-validator';
import UserApi from "../../../api/UserApi";

export default class Slack extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: false,
			url: false,
		};

		this.hideSlack = this.hideSlack.bind(this);
		this.add = this.add.bind(this);
	}

	hideSlack() {
		document.querySelector('.is-slack').classList.remove('show-slack');
		document.querySelector('.is-slack').classList.add('hide-slack');
	}

	add() {
		this._verifyText();
		if (this.refs.name.value !== '' && this.refs.url.value !== '') {
			/*if (UserApi.login(this.refs.email.value,  this.refs.password.value)) {
				this.refs.email.value = '';
				this.refs.password.value = '';
			}*/
		}
	}

	_verifyText() {

		if (this.refs.name.value === '') {
			this.setState({name: this.state.name = true});
		} else {
			this.setState({name: this.state.name = false});
		}

		if (this.refs.url.value === '') {
			this.setState({url: this.state.url = true});
		} else {
			this.setState({url: this.state.url = false});
		}
	}

	render() {
		return (
			<span>
				<div className={'mx-auto is-slack hide-slac'}>
					<div className={'slack'}>
						<div className={'slack-title bg-thunder'}>
							Agregar Slack
						</div>

						<div className={'slack-close'}>
							<span className={'close'} onClick={this.hideModal}><i className="fas fa-times"/></span>
						</div>

						<div className={'col-12 slack-container'}>
							<div className={'col-12 field-slack'}>
								<label htmlFor="basic-url">Nombre de tu espacio de trabajo</label>
							<div className="input-group">
								<input type="text" ref={'name'} className="form-control" placeholder="Nombre de tu espacio"/>
							</div>
								{this.state.name && <span className={'small'}>Nombre es requerido.</span>}
							</div>

							<div className={'col-12 field-slack'}>
							<label htmlFor="basic-url">Introduce la URL Slack de tu espacio de trabajo</label>
							<div className="input-group">
								<input type="text" ref={'url'} className="form-control text-right" placeholder="url-de-tu-espacio"/>
								<div className="input-group-append">
									<span className="input-group-text">.slack.com</span>
								</div>
							</div>
								{this.state.url && <span className={'small'}>URL es requerida.</span>}
								</div>

							<div className="input-group mb-3">
								<div className={'slack-btn mx-auto'}>
									<a className={'btn btn-thunder-secundary-white text-center'} onClick={this.add}>Agregar</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</span>
		)
	}
}