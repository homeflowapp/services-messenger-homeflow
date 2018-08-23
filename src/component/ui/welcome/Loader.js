import React, { Component } from 'react'
import Loading from "../linear-progress/Loading";

export default class Loader extends Component {
	constructor(props) {
		super(props);

		setTimeout(() => {
			if (localStorage.getItem('uuid') !== null) {
				window.location = '#/services';
			} else {
				window.location = '#/welcome';
			}
		}, 8000);
	}

	render() {
		return (
			<div className={'is-loading flex-center'}>
				<div className={'co-md-12 loading'}>
					<div className={'col-md-12 loading-title'}>
						Thunder
					</div>

					<div className={'col-md-12'}>
						<Loading/>
					</div>
				</div>
			</div>
		)
	}

}