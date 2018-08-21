import React, {Component} from 'react'
import {ChannelsWebView} from "../services/ChannelsWebView";
import ChannelsContainer from "../container/services/ChannelsContainer";
import Intenert from "../ui/statusbar/Intenert";

export default class App extends Component {

	constructor(props) {
		super(props);
		this.webview = null;
	}

	componentDidMount() {

	}

	render() {
		return (
			<span>
				<Intenert/>
				<ChannelsContainer/>
			</span>
		)
	}

}

