import React, {Component} from 'react'
import Intenert from "../ui/statusbar/Intenert";
import ChannelsContainer from "../container/services/ChannelsContainer";

export default class App extends Component {

	constructor(props) {
		super(props);
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

