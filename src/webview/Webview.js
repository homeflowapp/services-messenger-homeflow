import React, {Component} from 'react'
import path from 'path';
import classnames from "classnames";

let temp = 0;
export default class Webview extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<span>
				{
					this.props.items.map((channel, index) => {
						return (
							<webview
								key={index}
								id={channel.partition}
								className={classnames({
									'is-active': index === 0,
								})}
								title={channel.channel}
								src={channel.url}
								partition={'persist:' + channel.partition}
								preload={`file://${path.join(__dirname, '../plugins/' + channel.channel, 'plugin.js')}`}
								autosize={'on'}
								plugins={'true'}/>
						)
					})
				}
			</span>
		)
	}
}


