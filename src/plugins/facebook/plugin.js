import {ipcRenderer} from 'electron';

let count = 0;
let temp = 0;
document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
        const notification = document.querySelector("#notificationsCountValue").innerHTML;
        const message = document.querySelector("#mercurymessagesCountValue").innerHTML;
        const friend = document.querySelector("#requestsCountValue").innerHTML;
			  count = (parseInt(notification) + parseInt(message) + parseInt(friend));

        if (count !== temp) {
            if (count === 0) {
                ipcRenderer.sendToHost('count-message', '');
                temp = 0;
            } else {
							ipcRenderer.sendToHost('count-message', count);
							ipcRenderer.sendToHost('notification', 'Facebook', 'Tienes notificaciones nuevas');
                temp = count;
            }
        }
    }, 1000);

}, false);

