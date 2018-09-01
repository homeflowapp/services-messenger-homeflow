import React, {Component} from 'react'
import path from 'path';
import swal from 'sweetalert'
import '@babel/polyfill'

import UserApi from "../../../api/UserApi";
import {ChannelsWebView} from "../../channels-webview/ChannelsWebView";
import LinearProgress from "../../ui/linear-progress/LinearProgress";
import Navbar from "../../ui/navbar/Navbar";
import Webview from "../../../webview/Webview";
import ChannelApi from "../../../api/ChannelApi";

let url;
let name;
export default class ChannelsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			channel_users: [],
			channel_api: [],
		};

		this.webview = null;
		this.connection = this.connection.bind(this);
		this.create_channel = this.create_channel.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.hideSlack = this.hideSlack.bind(this);
		this.channels_user = this.channels_user.bind(this);
		this.channels_api = this.channels_api.bind(this);
	}

	async componentDidMount() {
		document.querySelector('body').classList.remove('welcome-bg');
		document.querySelector('body').classList.add('welcome-service');

		this.channels_user();
	}

	channels_user() {
		let clear = setInterval(() => {
			const channels_user = UserApi.channels();
			Promise.resolve(channels_user.then((channels) => this.setState({channel_users: channels})));
			this.channels_api();

			if (this.state.channel_users.length > 0 && this.state.channel_api.length > 0) {
				clearInterval(clear);
				this.connection();
			}
		}, 2000);
	}

	channels_api() {
		const channels_api = ChannelApi.channels();
		Promise.resolve(channels_api.then((channels) => this.setState({channel_api: channels})));
	}

	connection() {
		let clear = setTimeout(() => {
			const webview = document.querySelectorAll('webview');
			if (webview.length > 0) {
				this.webview = webview;
				ChannelsWebView.ChannelsWebview(webview);
				clearInterval(clear)
			}
		}, 1000);
	}

	create_channel(channelId) {
		if (channelId === 'slack') {
			this.hideModal();
			document.querySelector('.is-slack').classList.remove('hide-slack');
			document.querySelector('.is-slack').classList.add('show-slack');

			if (this.refs.name.value !== '' && this.refs.url.value !== '') {
				swal({
					title: "Por favor espere",
					text: "El servicio se esta agregando...",
					button: false,
				});

				const channel = ChannelApi.create(channelId, this.refs.url.value, this.refs.name.value);
				Promise.resolve(channel.then((channel) => {
					this.refs.name.value = '';
					this.refs.url.value = '';

					this.new_channel(channel.channel, channel.name, channel.url, channel.uuid, channel.partition);
					this.connection();
				}));
			}
			this._verifyText();
		}
		else  {
			swal({
				title: "Por favor espere",
				text: "El servicio se esta agregando...",
				button: false,
			});

			const channel = ChannelApi.create(channelId, url, name);
			Promise.resolve(channel.then((channel) => {
				this.new_channel(channel.channel, channel.name, channel.url, channel.uuid, channel.partition);
				this.connection();
			}));
		}
	}

	new_channel(channel, name, url, uuid, partition) {
		const newItem = {
			channel: channel,
			name: name,
			url: url,
			uuid: uuid,
			partition: partition
		};

		this.setState(prevState => ({
			channel_users: prevState.channel_users.concat(newItem)
		}));
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

	hideModal() {
		document.querySelector('.services-list').classList.remove('show-services');
		document.querySelector('.services-list').classList.add('hide-services');
	}

	hideSlack() {
		document.querySelector('.is-slack').classList.remove('show-slack');
		document.querySelector('.is-slack').classList.add('hide-slack');
	}

	render() {
		return (
			<span>
				<span>
				<div className={'mx-auto is-slack hide-slack'}>
					<div className={'slack'}>
						<div className={'slack-title bg-thunder'}>
							Agregar Slack
						</div>

						<div className={'slack-close'}>
							<span className={'close'} onClick={this.hideSlack}><i className="fas fa-times"/></span>
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
									<a className={'btn btn-thunder-secundary-white text-center'} onClick={() => this.create_channel('slack')}>Agregar</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</span>

				<span>
				<div className={'mx-auto services-list hide-services'}>
					<div className={'services-box'}>
						<div className={'services-title bg-thunder'}>
							Canales
						</div>

						<div className={'services-close'}>
							<span className={'close'} onClick={this.hideModal}><i className="fas fa-times"/></span>
						</div>

						<div className={'col-12 service-container'}>
							<div className="card-deck mb-3 text-center">

								{
									this.state.channel_api.map((channel, index) => {
										return (
											<div
												key={index}
												className="card mb-3 shadow-sm items"
												onClick={() => this.create_channel(channel.id)}>
												<div className="card-body">
													<ul className="list-unstyled">
														<img src={`file://${path.join(__dirname, '../../../plugins/' + channel.id, 'icon.png')}`}/>
													</ul>
													<h4 className="card-title pricing-card-title"><small className="text-muted">{ channel.name }</small></h4>
												</div>
											</div>
										)
									})
								}
							</div>
						</div>
					</div>
				</div>
			</span>

				<div className={'thunder-app'}>
					<span className={'thunder-progress thunder-progress-hide'}>
						<LinearProgress/>
					</span>

					<div className={'thunder-content'}>
						<Webview items={this.state.channel_users}/>
					</div>

					<div className={'thunder-navigation'}>
						<Navbar items={this.state.channel_users}/>
					</div>
				</div>
			</span>
		)
	}
}

