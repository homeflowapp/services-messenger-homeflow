import {remote} from 'electron'
const Menu = remote.Menu;
const app= remote.app;


export const default_menu = Menu.buildFromTemplate([
	{
		label: 'Volver a cargar la aplicacion',
		accelerator: 'CmdOrCtrl+R',
		role: 'reload'
	},
	{type: 'separator'},
	{
		label: 'Salir de la aplicacion',
		accelerator: 'CmdOrCtrl+Q',
		click: function() {
			app.quit();
		}
	},
]);

export const selectionTextMenu = Menu.buildFromTemplate([
	{
		label: 'Volver a cargar la aplicacion',
		accelerator: 'CmdOrCtrl+R',
		role: 'reload'
	},
	{type: 'separator'},
	{
		label: 'Copiar',
		accelerator: 'CmdOrCtrl+C',
		role: 'copy'
	},
	{
		label: 'Seleccionar todo',
		accelerator: 'CmdOrCtrl+A',
		role: 'selectall'
	},
	{type: 'separator'},
	{
		label: 'Salir de la aplicacion',
		accelerator: 'CmdOrCtrl+Q',
		click: function() {
			app.quit();
		}
	},
]);

export const inputMenu = Menu.buildFromTemplate([
	{
		label: 'Volver a cargar la aplicacion',
		role: 'reload'
	},
	{type: 'separator'},
	{
		label: 'Deshacer',
		accelerator: 'CmdOrCtrl+Z',
		role: 'undo'
	},
	{
		label: 'Rehacer',
		accelerator: 'Shift+CmdOrCtrl+Alt+Z',
		role: 'redo'
	},
	{type: 'separator'},
	{
		label: 'Cortar',
		accelerator: 'CmdOrCtrl+X',
		role: 'cut'
	},
	{
		label: 'Copiar',
		accelerator: 'CmdOrCtrl+C',
		role: 'copy'
	},
	{
		label: 'Pegar',
		accelerator: 'CmdOrCtrl+V',
		role: 'paste'
	},
	{
		label: 'Seleccionar todo',
		accelerator: 'CmdOrCtrl+A',
		role: 'selectall'
	},
	{type: 'separator'},
	{
		label: 'Salir de la aplicacion',
		accelerator: 'CmdOrCtrl+Q',
		click: function() {
			app.quit();
		}
	},
]);

remote.getCurrentWindow().webContents.on('context-menu', (e, params) => {
	console.log(params);
	const { selectionText, isEditable, mediaType } = params;

	if (isEditable) {
		inputMenu.popup(remote.getCurrentWindow());
	}
	else if (selectionText && selectionText.trim() !== '') {
		selectionTextMenu.popup(remote.getCurrentWindow());
	}
	/*else if (mediaType) {
		selectionMenu.popup(remote.getCurrentWindow());
	}*/
	else {
		default_menu.popup(remote.getCurrentWindow());
	}
});
