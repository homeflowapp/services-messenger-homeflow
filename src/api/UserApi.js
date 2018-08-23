import React from 'react'
import localStorage from 'mobx-localstorage';
import '@babel/polyfill'
import {server_api} from "../config/environment";
import {version_api} from "../config/config";

export default class UserApi {

	// Login
	static async login(email, password) {
		const request = await window.fetch(`${server_api}/${version_api}/user/user_login`, this._prepareAuthRequest({
			method: 'POST',
			body: JSON.stringify(Object.assign({
				email,
				password
			})),
		}, false));

		if (!request.ok) {
			throw request;
		}

		const data = await request.json();
		localStorage.setItem('uuid', data.uuid);
		localStorage.setItem('avatar', data.avatar);
		console.log(data.uuid);
		window.location = '#/services';
	}

	// Register
	static async register(name, email, password) {
		const request = await window.fetch(`${server_api}/${version_api}/user/user_create`, this._prepareAuthRequest({
			method: 'POST',
			body: JSON.stringify(Object.assign({
				name,
				email,
				password
			})),
		}, false));

		if (!request.ok) {
			throw request;
		}

		const data = await request.json();
		localStorage.setItem('uuid', data.uuid);
		localStorage.setItem('avatar', name.substr(0, 1).toUpperCase());
		console.log(data.uuid);
		window.location = '#/services';
	}

	// Services User
	static async channels() {
		const request = await window.fetch(`${server_api}/${version_api}/channels/${localStorage.getItem('uuid')}/channels_users`, this._prepareAuthRequest({
			method: 'GET',
		}));

		if (!request.ok) {
			throw request;
		}

		return await request.json();
	}

	// Header Options
	static _prepareAuthRequest(options) {
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



