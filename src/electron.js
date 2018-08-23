import { app, BrowserWindow, shell } from 'electron';
import fs from 'fs-extra';
import path from 'path';
import windowStateKeeper from 'electron-window-state';
import {dev_mode, linux, macOS, windows} from "./config/environment";

let mainWindow;
let willQuitApp = false;

fs.emptyDirSync(path.join(app.getPath('userData'), 'plugins', 'temp'));
fs.ensureFileSync(path.join(app.getPath('userData'), 'window-state.json'));


const instance = app.makeSingleInstance((argv) => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) mainWindow.restore();
		mainWindow.focus();
	}
});

if (instance) {
	console.log('Thunder is already running. Exiting...');
	app.exit();
}

if (linux && ['Pantheon', 'Unity:Unity7'].indexOf(process.env.XDG_CURRENT_DESKTOP) !== -1) {
	process.env.XDG_CURRENT_DESKTOP = 'Unity';
}

const createWindow = () => {
	const mainWindowState = windowStateKeeper({
		defaultWidth: 1024,
		defaultHeight: 600,
	});

	mainWindow = new BrowserWindow({
		x: mainWindowState.x,
		y: mainWindowState.y,
		width: mainWindowState.width,
		height: mainWindowState.height,
		minWidth: 1024,
		minHeight: 600,
		titleBarStyle: macOS ? 'hidden' : '',
		frame: linux,
		backgroundColor: '#ffffff',
	});

	mainWindowState.manage(mainWindow);
	mainWindow.loadURL(`file://${__dirname}/index.html`);

	if (dev_mode) {
		//mainWindow.webContents.openDevTools();
	}

	mainWindow.on('close', (e) => {
		if (!willQuitApp) {
			e.preventDefault();
			if (windows || linux) {
				mainWindow.minimize();
			}
			/*else {
				mainWindow.hide();
			}*/
		} else {
			app.quit();
		}
	});

	mainWindow.on('minimize', () => {
		app.wasMaximized = app.isMaximized;
	});

	mainWindow.on('maximize', () => {
		app.isMaximized = true;
	});

	mainWindow.on('unmaximize', () => {
		app.isMaximized = false;
	});

	mainWindow.on('restore', () => {
		if (app.wasMaximized) {
			mainWindow.maximize();
		}
	});

	app.mainWindow = mainWindow;
	app.isMaximized = mainWindow.isMaximized();

	mainWindow.webContents.on('new-window', (e, url) => {
		e.preventDefault();
		shell.openExternal(url);
	});
};

app.on('ready', createWindow);
app.on('before-quit', () => {
	willQuitApp = true;
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	} else {
		mainWindow.show();
	}
});

app.setAsDefaultProtocolClient('thunder');

