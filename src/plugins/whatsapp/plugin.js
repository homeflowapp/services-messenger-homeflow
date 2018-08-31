import {ipcRenderer} from 'electron';

let count = 0;
let temp = 0;

document.addEventListener('DOMContentLoaded', () => {
	setInterval(() => {
		count = document.querySelectorAll('.OUeyt').length;

		if (count !== temp) {
			if (count === 0) {
				ipcRenderer.sendToHost('');
				temp = 0;
			} else {
				ipcRenderer.sendToHost('count-message', count);
				temp = count;
			}
		}
	}, 1000);

}, false);


