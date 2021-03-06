import React, {Component} from "react";
import swal from 'sweetalert'
import ContextMenu from "react-contextmenu/modules/ContextMenu";
import MenuItem from "react-contextmenu/modules/MenuItem";
import ChannelApi from "../../../api/ChannelApi";

export default class ContextMenuChannel extends Component {
	constructor(props) {
		super(props);

		this.delete_channel = this.delete_channel.bind(this);
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
					document.querySelector('webview#'+partition).remove();
					document.querySelector('#channel_menu-'+partition).remove();
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
					this.props.items.map((channel, index) => {
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
