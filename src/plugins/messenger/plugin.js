import {ipcRenderer} from 'electron';

let count = 0;
let temp = 0;
document.addEventListener('DOMContentLoaded', () => {
	setInterval(() => {
		count = document.querySelectorAll('._5fx8:not(._569x),._1ht3:not(._569x)').length;

		if (count !== temp) {
			if (count === 0) {
				ipcRenderer.sendToHost('count-message', '');
				temp = 0;
			} else {
				ipcRenderer.sendToHost('count-message', count);
				ipcRenderer.sendToHost('notification', 'Messenger', 'Tienes nuevos mensajes');
				temp = count;
			}
		}
	}, 1000);

}, false);


