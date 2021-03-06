import React, {Component} from 'react'
import {Offline} from 'react-detect-offline'
import ServerUpdate from "../../../api/ServerUpdate";

export default class Update extends Component {
	constructor(props) {
		super(props);
		this.update = this.update.bind(this);
	}

	update(version) {
		document.querySelector('.is-download').classList.remove('hide-download');
		document.querySelector('.is-download').classList.add('show-download');

		ServerUpdate.UpdateApp(version);
	}

	render() {
		return (
			<div className={'is-update'}>
				<span>
					<div className={'status-bar bg-white'}>
						<div className={'status status-download'}>
							<i className="fas fa-info-circle fa-lg"/>
							<span>Thunder tiene una nueva actualizaci&oacute;n ( Thunder-{this.props.version} )</span>
							<span className={'btn btn-outline-light btn-download'} onClick={() => this.update(this.props.version)}>
								Descargar
								<i className="fas fa-cloud-download-alt"/>
							</span>
						</div>
					</div>
				</span>
			</div>
		)
	}
}