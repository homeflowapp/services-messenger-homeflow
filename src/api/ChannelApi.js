import React from 'react'
import swal from 'sweetalert'
import '@babel/polyfill'
import {server_api} from "../config/environment";
import {version_api} from "../config/config";

export default class ChannelApi {

	static async channels() {
		const request = await window.fetch(`${server_api}/${version_api}/channels/channels`, this._Request({
			method: 'GET',
		}));

		if (!request.ok) {
			throw request;
		}

		return await request.json();
	}

	// Create Channel
	static async create(channel_id, url) {
		const user_id = localStorage.getItem('uuid');
		const request = await window.fetch(`${server_api}/${version_api}/channels/channels_create`, this._Request({
			method: 'POST',
			body: JSON.stringify(Object.assign({
				channel_id,
				user_id,
				url
			})),
		}, false));

		if (!request.ok) {
			throw request;
		}

		swal({
			title: "Canal agregado!",
			text: "Disfruta del canal.",
			icon: "success",
			button: 'Aceptar',
		});

		return await request.json();
	}

	// Remove Channel
	static async delete(uuid) {
		const user_id = localStorage.getItem('uuid');
		const request = await window.fetch(`${server_api}/${version_api}/channels/channel_delete`, this._Request({
			method: 'POST',
			body: JSON.stringify(Object.assign({
				uuid,
				user_id
			})),
		}));

		if (!request.ok) {
			throw request;
		}

		return await request.json();
	}


	// Header Options
	static _Request(options) {
		const request = Object.assign(options, {
			mode: 'cors',
			headers: Object.assign({
				'Content-Type': 'application/json',
				'X-Thunder-Source': 'desktop',
				'X-Thunder-platform': process.platform,
			}, options.headers),
		});

		return request;
	}
}



