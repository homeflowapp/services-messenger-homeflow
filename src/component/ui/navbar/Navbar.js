import React, {Component} from 'react'
import { Link } from 'react-router'
import path from 'path'
import UserApi from "../../../api/UserApi";
import classnames from "classnames";
import NavbarRigth from "./NavbarRigth";

let temp = 0;
export default class Navbar extends Component {
	constructor(props) {
		super(props);
		this._tabSelected = this._tabSelected.bind(this);
	}

	componentDidMount() {
		this.setState({active: 0});
	}

	_tabSelected(channelId) {
		this.setState({active: channelId}, () => {
			if (channelId !== temp) {
				const tabs_moved = document.querySelector('#tabs_moved');
				const tabs_moved_li = document.querySelectorAll('.tabs_moved_li');
				const size = tabs_moved_li[channelId].style.width.replace('calc(', '');

				if (channelId === 0) {
					tabs_moved.style.transform = "translateX(-0%)";
				} else {
					const value = size.replace('%)', '') * channelId;
					tabs_moved.style.transform = "translateX(-" + value + "%)";
				}
				temp = channelId;
			}
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
									<li
										className={classnames({
											'nav-item ': true,
											'nav-service ': true,
											'thunder-active': this.state.active === index,
										})}
										key={index}>
										<a className="nav-link" onClick={() => this._tabSelected(index)}>
											<img src={`file://${path.join(__dirname, '../../../plugins/' + channel.channel, 'icon.png')}`}/>
											<span id={channel.partition + '-app'}/>
											<span className={'name'}>{channel.name}</span>
										</a>
										<div className={'thunder-tabs'}/>
									</li>
								)
							})
						}
					</ul>

					<NavbarRigth/>
				</div>
			</nav>
		);
	}
}

