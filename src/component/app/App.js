import React, {Component} from 'react'
import Intenert from "../ui/statusbar/Intenert";
import ChannelsContainer from "../container/channels/ChannelsContainer";
import Update from "../ui/statusbar/Update";
import {version} from '../../../package'
import ServerUpdate from "../../api/ServerUpdate";

export default class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			update: ''
		};
	}

	componentDidMount() {
		setInterval(() => {
			const app = ServerUpdate.Version();
			Promise.resolve(app.then((v) => {
				if (version !== v.version) {
					this.setState({update: v.version});
				}
			}));
		}, 10000);
	}

	render() {
		return (
			<span>
				<Intenert/>
				{ this.state.update && <Update version={this.state.update}/>}
				<ChannelsContainer/>
			</span>
		)
	}

}

