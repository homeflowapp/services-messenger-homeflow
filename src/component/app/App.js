import React, {Component} from 'react'
import Intenert from "../ui/statusbar/Intenert";
import ChannelsContainer from "../container/services/ChannelsContainer";
import Update from "../ui/statusbar/Update";
import {version} from '../../../package'
import ServerUpdate from "../../api/ServerUpdate";

export default class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			update: null
		};
	}

	componentDidMount() {
		const version = ServerUpdate.Version();
		Promise.resolve(version.then((version) => {
			if (localStorage.getItem('version') !== version.version) {
				this.setState({ update: version.version });
			}
		}));
	}

	render() {
		return (
			<span>
				<Intenert/>
				{ this.state.update && <Update/>}
				<ChannelsContainer/>
			</span>
		)
	}

}

