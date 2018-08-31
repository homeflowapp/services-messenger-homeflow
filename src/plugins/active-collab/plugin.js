import {ipcRenderer, remote} from 'electron';

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
					ipcRenderer.sendToHost('count-message', count);
					ipcRenderer.sendToHost('notification', 'Active Collab', 'Tienes Nuevas tareas asignadas');
					temp = count;
				}
			}
		}
	}, 1000);

    /*const originalWindowOpen = window.open;

    window.open = (url, frameName, features) => {

        if (/(app|my)\.activecollab\.com/.test(url) || /(my|app)\.activecollab\.com/.test(url)) {
        	alert('Luis');
            return remote.getCurrentWebContents().loadURL(url);
        }
        else {
        	alert('luis');
            return originalWindowOpen(url, frameName, features);
        }
    };
*/

}, false);

