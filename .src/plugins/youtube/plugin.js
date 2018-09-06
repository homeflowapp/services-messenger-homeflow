import {ipcRenderer} from 'electron';

let count = 0;
let temp = 0;
document.addEventListener('DOMContentLoaded', () => {
	setInterval(() => {
		count = document.querySelectorAll('#notification-count').length;

		if (count !== temp) {
			if (count === 0) {
				ipcRenderer.sendToHost('count-message', '');
				temp = 0;
			} else {
				ipcRenderer.sendToHost('count-message', count);
				ipcRenderer.sendToHost('notification', 'Youtube', 'Tienes notificaciones nuevas');
				temp = count;
			}
		}
	}, 1000);

}, false);

