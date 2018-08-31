import React, {Component} from 'react'
import ContextMenuTrigger from "react-contextmenu/modules/ContextMenuTrigger";
import path from 'path'
import classnames from "classnames";
import NavbarRigth from "./NavbarRigth";
import ContextMenuChannel from "../channel-menu/ContextMenuChannel";

let webview;
export default class Navbar extends Component {
	constructor(props) {
		super(props);
		this._tabSelected = this._tabSelected.bind(this);
	}

	componentDidMount() {
		this.setState({active: 0});
	}

	_tabSelected(channelId, channelPartition) {
		this.setState({active: channelId}, () => {
			webview = document.querySelectorAll('webview');
			for (let i = 0; i < webview.length; i += 1) {
				webview[i].classList.remove('is-active');
			}
			document.querySelector('webview#'+channelPartition).classList.add('is-active');
		});
	}

	render() {
		return (
			<nav className="navbar navbar-expand-md navbar-light thunder-menu">
				<div className="collapse navbar-collapse" id="thunder">
					<ul className="navbar-nav mr-auto menu-scroll">
						{
							this.props.items.map((channel, index) => {
								return (
									<ContextMenuTrigger id={channel.channel+'-'+channel.partition+'-'+index} key={index}>
									<li
										id={'channel_menu-'+channel.partition}
										className={classnames({
											'nav-item ': true,
											'nav-service ': true,
											'thunder-active': this.state.active === index,
										})}
										key={index}>
										<a className="nav-link" onClick={() => this._tabSelected(index, channel.partition)}>
											<img id={channel.partition + '-img'} src={`file://${path.join(__dirname, '../../../plugins/' + channel.channel, 'icon.png')}`}/>
											<span id={channel.partition + '-app'}/>
											<span className={'name'}>{channel.name}</span>
										</a>
										<div className={'thunder-tabs'}/>
									</li>
									</ContextMenuTrigger>
								)
							})
						}
					</ul>

					<ContextMenuChannel items={this.props.items}/>
					<NavbarRigth/>
				</div>
			</nav>
		);
	}
}


