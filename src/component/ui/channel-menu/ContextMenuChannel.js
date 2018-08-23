import React, {Component} from "react";
import swal from 'sweetalert'
import ContextMenu from "react-contextmenu/modules/ContextMenu";
import MenuItem from "react-contextmenu/modules/MenuItem";
import UserApi from "../../../api/UserApi";
import ChannelApi from "../../../api/ChannelApi";

let index_menu = 0;
export default class ContextMenuChannel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			channels: []
		};

		this.delete_channel = this.delete_channel.bind(this);
	}

	componentDidMount() {
		let clear = setInterval(() => {
			const channels = UserApi.channels();
			Promise.resolve(channels.then((channels) => this.setState({channels: channels})));

			if (this.state.channels.length > 0) {
				clearInterval(clear);
			}
		}, 2000);
	}

	delete_channel(uuid, partition, name) {
		swal({
			title: "Estas seguro de eliminar el canal "+name+"?",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
		.then((willDelete) => {
			if (willDelete) {
				if (ChannelApi.delete(uuid)) {
					document.getElementById('channel_webview-'+partition).remove();
					document.getElementById('channel_menu-'+partition).remove();
					swal("El canal a sido eliminado!", "", {
						icon: "success",
					});
				}
			}
		});
	}

	render() {
		return (
			<span>
				{
					this.state.channels.map((channel, index) => {
						return (
							<ContextMenu id={channel.channel+'-'+channel.partition+'-'+index} key={index}>
								<MenuItem>
									<div className="btn-group dropup show">
										<div className="dropdown-menu show">
											<a className="dropdown-item" onClick={() => this.delete_channel(channel.uuid, channel.partition, channel.name)}>Eliminar servicio</a>
										</div>
									</div>
								</MenuItem>
							</ContextMenu>
						)
					})
				}
			</span>
		);
	}
}
