import React, {Component} from 'react'

export default class Download extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<span>
				<div className={'mx-auto is-download hide-download'}>
					<div className={'download'}>
						<div className={'col-12 download-container'}>

							<div className={'col-12 download-animation'}>
							<span><i className={"fas fa-arrow-down fa-3x"}/></span>
						</div>

							<div className={"text-center"}>
								<h1>Descargando...</h1>
							</div>
						</div>
					</div>
				</div>
			</span>
		)
	}
}