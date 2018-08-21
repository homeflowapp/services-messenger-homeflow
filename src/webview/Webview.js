import React, {Component} from 'react'
import path from 'path';

let temp = 0;
export default class Webview extends Component {
	constructor(props) {
		super(props);

		this._tabSelected = this._tabSelected.bind(this);
	}

	_tabSelected(serviceId) {
		this.setState({active: serviceId}, () => {
			if (serviceId !== temp) {
				const tabs_moved = document.querySelector('#tabs_moved');
				const tabs_moved_li = document.querySelectorAll('.tabs_moved_li');
				const size = tabs_moved_li[serviceId].style.width.replace('calc(', '');

				if (serviceId === 0) {
					tabs_moved.style.transform = "translateX(-0%)";
				} else {
					const value = size.replace('%)', '') * serviceId;
					tabs_moved.style.transform = "translateX(-" + value + "%)";
				}
				temp = serviceId;
			}
		});
	}

	render() {
		const width_tabs = {
			width: `calc(100% * ${this.props.items.length})`,
			display: "block"
		};

		const width_li = {
			WebkitTransition: 'all  0.5s ease',
			width: `calc(100% / ${this.props.items.length})`,
			display: "block"
		};
		return (
			<ul id={'tabs_moved'} style={width_tabs}>
				{
					this.props.items.map((channel, index) => {
						return (
							<li style={width_li} className={'tabs_moved_li'} key={index}>
								<webview
									key={index}
									id={channel.partition}
									src={channel.url}
									partition={'persist:' + channel.partition}
									preload={`file://${path.join(__dirname, '../plugins/' + channel.channel, 'plugin.js')}`}
									autosize={'on'}/>
							</li>
						)
					})
				}
			</ul>
		)
	}
}


