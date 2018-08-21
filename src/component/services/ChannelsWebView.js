import React from 'react'
import { shell, remote } from 'electron'
import url  from 'url'

export class ChannelsWebView {

	static ChannelsWebview(webview) {
		for (let i = 0; i < webview.length; i += 1) {
			webview[i].addEventListener('ipc-message', (event) => {
				const badge = document.getElementById(event.target.id + '-app');
				if (event.channel !== '') {
					badge.classList.add('thunder-badge');
					badge.innerHTML = event.channel;
				} else {
					badge.classList.remove('thunder-badge');
					badge.innerHTML = event.channel;
				}
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
					if (/(app|my)\.activecollab\.com/.test(e.url) || /(my|app)\.activecollab\.com/.test(e.url)) {
						webview[i].loadURL(e.url);
					} else {
						shell.openExternal(e.url)
					}
				}
			});
		}
	}

	static openDevTools(webview, serviceId) {
		webview[serviceId].addEventListener('dom-ready', () => {
			webview[serviceId].openDevTools();
		});
	}

}