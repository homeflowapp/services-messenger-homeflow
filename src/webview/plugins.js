import { ipcRenderer } from 'electron';
import path from 'path';

ipcRenderer.on('ping', (event, service) => {
	console.log(pluginsPath);
});

const pluginsPath = path.join(__dirname, '../plugins/whatsapp/', 'plugin.js');
require(pluginsPath);



