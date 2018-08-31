import React from 'react';
import '@babel/polyfill';
import {remote} from 'electron';
//import * as firebase from 'firebase';
import tar from 'tar';
import fs from 'fs-extra';
import fetch from 'node-fetch';
import path from 'path';
import swal from 'sweetalert';
import {version} from '../../package';
import {server_api} from "../config/environment";
import {version_api} from "../config/config";
import {sleep} from "../utils/timer";

const {app} = remote;

export default class ServerUpdate {

	static async Version() {
		const request = await window.fetch(`${server_api}/${version_api}/app/version`, this._Request({
			method: 'GET',
		}));

		if (!request.ok) {
			throw request;
		}

		return await request.json();
	}


	static async UpdateApp(versionApp) {
		try {
			swal({
				title: 'Actualizando...',
				text: '',
				icon: 'error',
				button: false
			});

			const updateDirectory = path.join(app.getPath('userData'), 'version');
			const archivePath = path.join(updateDirectory, 'version.tar.gz');
			const packageUrl = `${server_api}/${version_api}/update/${versionApp}/download`;

			fs.ensureDirSync(updateDirectory);
			const res = await fetch(packageUrl);
			console.log('Update downloaded', versionApp);
			const buffer = await res.buffer();
			fs.writeFileSync(archivePath, buffer);

			await sleep(10);

			await tar.x({
				file: archivePath,
				cwd: updateDirectory,
				preservePaths: true,
				unlink: true,
				preserveOwner: false,
				onwarn: x => console.log('warn', versionApp, x),
			});

			await sleep(10);

			fs.copySync(path.join(updateDirectory, versionApp, 'package.json'), path.join(__dirname, '../../package.json'));
			fs.remove(archivePath);

			swal({
				title: 'Buen Trabajo!',
				text: 'La Aplicación ha sido actualizada!',
				icon: 'success',
				button: 'Reiniciar Aplicación',
			}).then(() => {
				remote.app.relaunch();
				remote.app.exit(0);
			});

			return 1;
		} catch (err) {
			console.error(err);

			return false;
		}
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