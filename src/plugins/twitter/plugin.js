import {ipcRenderer, remote} from 'electron';

document.addEventListener('DOMContentLoaded', () => {
	let count = 0;
	let temp = 0;
	let quatity;

	setInterval(() => {
		if (quatity = document.querySelector('.count-inner')) {
			count = parseInt(quatity.innerHTML);
			console.log(count);

			if (count !== temp) {
				if (count === 0) {
					ipcRenderer.sendToHost('count-message', '');
				} else {
					ipcRenderer.sendToHost('count-message', count);
					ipcRenderer.sendToHost('notification', 'Twitter', 'Tienes nuevas notificaciones');
					temp = count;
				}
			}
		}
	}, 1000);

}, false);

