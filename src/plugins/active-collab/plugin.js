import {ipcRenderer} from 'electron';

document.addEventListener('DOMContentLoaded', () => {
	let count = 0;
	let temp = 0;
	let quatity;

	setInterval(() => {
		if (quatity = document.querySelector('.counter')) {
			count = parseInt(quatity.innerHTML);
			console.log(count);

			if (count !== temp) {
				if (count === 0) {
					ipcRenderer.sendToHost('');
				} else {
					ipcRenderer.sendToHost(count);
					temp = count;
				}
			}
		}
	}, 1000);

}, false);
