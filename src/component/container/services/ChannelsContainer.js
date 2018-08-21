import React, {Component} from 'react'
import path from 'path';
import swal from 'sweetalert'
import '@babel/polyfill'
import UserApi from "../../../api/UserApi";
import {ChannelsWebView} from "../../services/ChannelsWebView";
import LinearProgress from "../../ui/linear-progress/LinearProgress";
import Navbar from "../../ui/navbar/Navbar";
import Webview from "../../../webview/Webview";
import ChannelApi from "../../../api/ChannelApi";

let url;
export default class ChannelsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			channel_users: [],
			channel_api: [],
		};

		this.connection = this.connection.bind(this);
		this.create_channel = this.create_channel.bind(this);
		this.hideModal = this.hideModal.bind(this);
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
		swal({
			title: "Por favor espere",
			text: "El servivio se esta agregando...",
			button: false,
		});

		if (channelId === 'slack') {
			swal({
				title: "Servicio Slack",
				text: 'Agregue su canal de slack. Ej: thunder.slack.com',
				content: "input",
				button: {
					text: "Agregar",
					closeModal: false,
				},
			}).then(url => {
				const channel = ChannelApi.create(channelId, url);
				Promise.resolve(channel.then((channel) => {
					this.new_channel(channel.channel, channel.name, channel.url, channel.partition);
				}));
			})
		}
		else  {
			const channel = ChannelApi.create(channelId, url);
			Promise.resolve(channel.then((channel) => {
				this.new_channel(channel.channel, channel.name, channel.url, channel.partition);
			}));
		}
	}

	new_channel(channel, name, url, partition) {
		const newItem = {
			channel: channel,
			name: name,
			url: url,
			partition: partition
		};

		this.setState(prevState => ({
			channel_users: prevState.channel_users.concat(newItem)
		}));
	}

	hideModal() {
		document.querySelector('.services-list').classList.remove('show-services');
		document.querySelector('.services-list').classList.add('hide-services');
	}

	render() {
		return (
			<span>
				<span>
				<div className={'mx-auto services-list hide-services'}>
					<div className={'services-box'}>
						<div className={'services-title bg-thunder'}>
							Servicios
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
