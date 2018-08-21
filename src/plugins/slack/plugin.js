import {ipcRenderer} from 'electron';

let count = 0;
let temp = 0;
document.addEventListener('DOMContentLoaded', () => {
	setInterval(() => {
		const SELECTOR_CHANNELS_UNREAD = '.p-channel_sidebar__channel--unread:not(.p-channel_sidebar__channel--muted), .p-channel_sidebar__channel--unread:not(.p-channel_sidebar__channel--muted).p-channel_sidebar__name, .p-channel_sidebar__badge';
		count = document.querySelectorAll(SELECTOR_CHANNELS_UNREAD).length;

		if (count !== temp) {
			if (count === 0) {
				ipcRenderer.sendToHost('');
				temp = 0;
			} else {
				ipcRenderer.sendToHost('•');
				temp = count;
			}
		}
	}, 1000);

}, false);


