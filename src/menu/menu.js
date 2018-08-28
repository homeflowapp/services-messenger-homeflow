import {remote} from 'electron'

const app = remote.app;
const Menu = remote.Menu;
const shell = remote.shell;
const BrowserWindow = remote.BrowserWindow;

const template = [
	{
		label: 'Archivo',
		submenu: [
			{
				label: 'Salir',
				accelerator: 'CmdOrCtrl+Q',
				click: function() {
					app.quit();
				}
			}
		]
	},
	{
		label: 'Editar',
		submenu: [
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
			}
		]
	},
	{
		label: 'Ver',
		submenu: [
			{role: 'reload'},
			{role: 'forcereload'},
			{role: 'toggledevtools'},
			{type: 'separator'},
			{role: 'resetzoom'},
			{role: 'zoomin'},
			{role: 'zoomout'},
			{type: 'separator'},
			{role: 'togglefullscreen'}
		]
	},
	{
		role: 'Ventana',
		submenu: [
			{role: 'minimize'},
			{role: 'close'}
		]
	},
	{
		label: 'Ayuda',
		role: 'help',
		submenu: [
			{
				label: 'Learn More',
				click () { require('electron').shell.openExternal('https://electronjs.org') }
			}
		]
	}
];

if (process.platform === 'darwin') {
	template.unshift({
		label: app.getName(),
		submenu: [
			{role: 'about'},
			{type: 'separator'},
			{role: 'services', submenu: []},
			{type: 'separator'},
			{role: 'hide'},
			{role: 'hideothers'},
			{role: 'unhide'},
			{type: 'separator'},
			{role: 'quit'}
		]
	});

	// Edit menu
	template[1].submenu.push(
		{type: 'separator'},
		{
			label: 'Speech',
			submenu: [
				{role: 'startspeaking'},
				{role: 'stopspeaking'}
			]
		}
	);

	// Window menu
	template[3].submenu = [
		{role: 'close'},
		{role: 'minimize'},
		{role: 'zoom'},
		{type: 'separator'},
		{role: 'front'}
	]
}

Menu.setApplicationMenu(Menu.buildFromTemplate(template));
