import React, {Component} from 'react'
import {Offline} from 'react-detect-offline'

export default class Intenert extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Offline>
				<span>
					<div className={'status-bar bg-white'}>
						<div className={'status'}>
							<i className="fas fa-wifi fa-lg"/>
							<span>Sin conexión a Internet</span>
						</div>
					</div>
				</span>
			</Offline>
		)
	}
}