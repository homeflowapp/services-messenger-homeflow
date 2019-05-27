import React from 'react'
import '@babel/polyfill'
import {server_api} from "../config/environment";
import {version_api} from "../config/config";
import swal from "sweetalert";

export default class UserApi {

	// Login
	static async login(email, password) {
		swal({
			title: "Por favor espere",
			text: "Validando sus datos...",
			button: false,
		});

		const request = await window.fetch(`${server_api}/${version_api}/user/user_login`, this._Request({
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
		console.log(localStorage.getItem('uuid'));
		swal({
			title: "Buen trabajo!",
			text: "La sesion fue un exito!",
			icon: "success",
			button: "Continuar",
		});

		window.location = '#/services';
	}

	// Register
	static async register(name, email, password) {
		swal({
			title: "Por favor espere",
			text: "Registrando sus datos...",
			button: false,
		});
		const request = await window.fetch(`${server_api}/${version_api}/user/user_create`, this._Request({
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

		swal({
			title: "Buen trabajo!",
			text: "El registro fue un exito!",
			icon: "success",
			button: "Continuar",
		});

		console.log(data.uuid);
		window.location = '#/services';
	}

	// Channels User
	static async channels() {
		const request = await window.fetch(`${server_api}/${version_api}/channels/${localStorage.getItem('uuid')}/channels_users`, this._Request({
			method: 'GET',
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



