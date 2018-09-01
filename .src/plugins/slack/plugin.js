import {ipcRenderer} from 'electron';

let count = 0;
let temp = 0;
let img = 0;
let logo = null;

document.addEventListener('DOMContentLoaded', () => {
	const teamMenu = document.querySelector('#team_menu');

	setInterval(() => {
		if (logo) {
			ipcRenderer.sendToHost('icon', logo);
		}
		else {
			if (teamMenu) {
				teamMenu.click();
				const icon = document.querySelector('.team_icon');
				if (icon) {
					logo = window.getComputedStyle(icon, null).getPropertyValue('background-image');
					logo = /^url\((['"]?)(.*)\1\)$/.exec(logo);
					logo = logo ? logo[2] : '';
				}

				document.querySelector('.team_menu').remove();
				document.querySelector('#msg_input .ql-editor').focus();
			}
		}

		const SELECTOR_CHANNELS_UNREAD = '.p-channel_sidebar__channel--unread:not(.p-channel_sidebar__channel--muted), .p-channel_sidebar__channel--unread:not(.p-channel_sidebar__channel--muted).p-channel_sidebar__name, .p-channel_sidebar__badge';
		count = document.querySelectorAll(SELECTOR_CHANNELS_UNREAD).length;

		if (count !== temp) {
			if (count === 0) {
				ipcRenderer.sendToHost('count-message', '');
				temp = 0;
			} else {
				ipcRenderer.sendToHost('count-message', '•');
				//ipcRenderer.sendToHost('notification');
				temp = count;
			}
		}
	}, 1000);

}, false);


