import React from 'react'
import {shell, remote} from 'electron'
import url from 'url'
import path from 'path'

const Menu = remote.Menu;
const app = remote.app;

export class ChannelsWebView {

	static ChannelsWebview(webview) {
		for (let i = 0; i < webview.length; i += 1) {
			webview[i].addEventListener('ipc-message', (event) => {
				const badge = document.getElementById(event.target.id + '-app');
				const icon = document.getElementById(event.target.id + '-img');

				if (event.channel === 'count-message') {
					if (event.args[0]) {
						badge.classList.add('thunder-badge');
						badge.innerHTML = event.args[0];
					}
					else {
						badge.classList.remove('thunder-badge');
						badge.innerHTML = event.args[0];
					}
				}

				else if (event.channel === 'icon') {
					icon.setAttribute('src', event.args[0]);
				}

				else if (event.channel === 'notification') {
					Notification.requestPermission().then((result) => {
						let Notify = new Notification(event.args[0], {
							icon: path.join(__dirname, '../../plugins/' + event.target.title, 'icon.png'),
							body: event.args[1]
						});

						Notify.onclick = () => {
							const tabs_moved = document.querySelector('#tabs_moved');
							const tabs_moved_li = document.querySelectorAll('.tabs_moved_li');
							const size = tabs_moved_li[i].style.width.replace('calc(', '');

							let navs = document.querySelectorAll('li.nav-service');
							for (let j = 0; j < navs.length; j += 1) {
								navs[j].classList.remove('thunder-active');
							}

							if (i === 0) {
								tabs_moved.style.transform = "translateX(-0%)";
								navs[i].classList.add('thunder-active');
							} else {
								const value = size.replace('%)', '') * i;
								tabs_moved.style.transform = "translateX(-" + value + "%)";
								navs[i].classList.add('thunder-active');
							}
						}
					});
				}
			});

			webview[i].getWebContents().on('context-menu', (e, params) => {

				console.log(params);
				const WebviewMenu = Menu.buildFromTemplate([
					{
						label: 'Recargar página',
						accelerator: 'CmdOrCtrl+Alt+R',
						click: function () {
							webview[i].reload();
						}
					},
					{type: 'separator'},
					{
						label: 'Atrás',
						click: function () {
							webview[i].goBack();
						}
					},
					{
						label: 'Adelante',
						click: function () {
							webview[i].goForward();
						}
					},
					{type: 'separator'},
					{
						label: 'Cortar',
						accelerator: 'CmdOrCtrl+X',
						click: function () {
							webview[i].cut();
						}
					},
					{
						label: 'Copiar',
						accelerator: 'CmdOrCtrl+C',
						click: function () {
							webview[i].copy();
						}
					},
					{
						label: 'Pegar',
						accelerator: 'CmdOrCtrl+V',
						click: function () {
							webview[i].paste();
						}
					},
					{
						label: 'Seleccionar todo',
						accelerator: 'CmdOrCtrl+A',
						click: function () {
							webview[i].selectAll();
						}
					},
					{type: 'separator'},
					{
						label: 'Inspeccionar',
						accelerator: 'CmdOrCtrl+A',
						click: function () {
							webview[i].openDevTools();
						}
					},
					{type: 'separator'},
					{
						label: 'Salir de la aplicacion',
						accelerator: 'CmdOrCtrl+Q',
						click: function () {
							app.quit();
						}
					},
				]);

				WebviewMenu.popup(remote.getCurrentWindow());

			});

			webview[i].addEventListener('dom-ready', () => {
				webview[i].send('ping', webview[i].getAttribute('id'));
			});

			webview[i].addEventListener('did-start-loading', () => {
				document.querySelector('.thunder-progress').classList.remove('thunder-progress-hide');
				document.querySelector('.thunder-progress').classList.add('thunder-progress-show');
			});

			webview[i].addEventListener('did-stop-loading', () => {
				document.querySelector('.thunder-progress').classList.remove('thunder-progress-show');
				document.querySelector('.thunder-progress').classList.add('thunder-progress-hide');
			});

			webview[i].addEventListener('crashed', () => {
				webview[i].reload();
			});

			webview[i].addEventListener('gpu-crashed', () => {
				remote.app.exit(0);
			});

			webview[i].addEventListener('new-window', (e) => {
				const protocol = url.parse(e.url).protocol;
				if (protocol === 'http:' || protocol === 'https:') {
					shell.openExternal(e.url);
				}
			});
		}
	}

	static openDevTools(webview, serviceId) {
		webview[serviceId].addEventListener('dom-ready', () => {
			webview[serviceId].openDevTools();
		});
	}

	static delete(index) {
		document.querySelectorAll('webview')[index].remove();
		document.querySelectorAll('react-contextmenu-wrapper')[index].remove();
	}

}