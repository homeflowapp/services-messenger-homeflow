import React, {Component} from "react";
import ContextMenuTrigger from "react-contextmenu/modules/ContextMenuTrigger";
import ContextMenu from "react-contextmenu/modules/ContextMenu";
import MenuItem from "react-contextmenu/modules/MenuItem";


export default class ContextMenuChannels extends Component {

	handleClick(data) {
		alert(data);
	}

	render() {
		return (
			<div>

				<ContextMenuTrigger id="facebook">
					<button className="btn btn-secondary">
						Dropdown
					</button>
				</ContextMenuTrigger>

				<ContextMenu id="facebook">
					<MenuItem>
						<div className="btn-group dropup show">
						<div className="dropdown-menu show">
							<a className="dropdown-item" onClick={() => this.handleClick('slack')}>Regular link</a>
							<a className="dropdown-item" onClick={() => this.handleClick('twitter')}>Active link</a>
							<a className="dropdown-item"  onClick={() => this.handleClick('facebook')}>Another link</a>
						</div>
						</div>
					</MenuItem>

				</ContextMenu>


				<ContextMenuTrigger id="whatsapp">
					<button className="btn btn-secondary">
						Dropdown2
					</button>
				</ContextMenuTrigger>

				<ContextMenu id="whatsapp">
					<MenuItem>
						<div className="btn-group dropup show">
						<div className="dropdown-menu show">
							<a className="dropdown-item" onClick={() => this.handleClick('slack')}>whatsapp</a>
							<a className="dropdown-item" onClick={() => this.handleClick('twitter')}>whatsapp</a>
							<a className="dropdown-item"  onClick={() => this.handleClick('facebook')}>whatsapp</a>
						</div>
						</div>
					</MenuItem>

				</ContextMenu>









			</div>
		);
	}
}
