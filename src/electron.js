import {app, BrowserWindow, shell} from 'electron';
import fs from 'fs-extra';
import {realpathSync} from 'fs';
import createSymlink from 'create-symlink';
import path from 'path';
import windowStateKeeper from 'electron-window-state';
import {dev_mode, linux, macOS, windows} from "./config/environment";
import {
    DEFAULT_WINDOW_OPTIONS,
} from './config/config';

import widevine from 'electron-widevinecdm'

widevine.load(app);

let mainWindow;
let willQuitApp = false;
let node_modules_path;
let loader_app_node_modules_path;
let version;
let path_version_app = path.join(app.getPath('userData'), 'version');
let path_plugins = path.join(app.getPath('userData'), 'plugins');

if (!fs.existsSync(path_version_app)) {
    fs.emptyDirSync(path.join(path_version_app));
}

if (!fs.existsSync(path_plugins)) {
    fs.emptyDirSync(path.join(path_plugins));
}

fs.ensureFileSync(path.join(app.getPath('userData'), 'window-state.json'));

/*const instance = app.hasSingleInstanceLock((argv) => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) mainWindow.restore();
		mainWindow.focus();
	}
});*/

// Force single window
/*const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', (event, argv) => {
        // Someone tried to run a second instance, we should focus our window.
        if (mainWindow) {
            mainWindow.show();
            if (mainWindow.isMinimized()) {
                mainWindow.restore();
            }
            mainWindow.focus();

            if (mainWindow) {
                // Keep only command line / deep linked arguments
                if (argv.includes('--reset-window')) {
                    // Needs to be delayed to not interfere with mainWindow.restore();
                    setTimeout(() => {
                        debug('Resetting windows via Task');
                        window.setPosition(DEFAULT_WINDOW_OPTIONS.x + 100, DEFAULT_WINDOW_OPTIONS.y + 100);
                        window.setSize(DEFAULT_WINDOW_OPTIONS.width, DEFAULT_WINDOW_OPTIONS.height);
                    }, 1);
                } else if (argv.includes('--quit')) {
                    // Needs to be delayed to not interfere with mainWindow.restore();
                    setTimeout(() => {
                        debug('Quitting Franz via Task');
                        app.quit();
                    }, 1);
                }
            }
        }
    });
}*/

/*
if (instance) {
	console.log('Thunder is already running. Exiting...');
	app.exit();
}
*/

if (linux && ['Pantheon', 'Unity:Unity7'].indexOf(process.env.XDG_CURRENT_DESKTOP) !== -1) {
    process.env.XDG_CURRENT_DESKTOP = 'Unity';
}

//app.commandLine.appendSwitch('widevine-cdm-path', path.join(__dirname, "lib", "widevinecdm.dll"));
//app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866');

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
        icon: path.join(__dirname, 'assets/media/images/logo', 'logo.png'),
        titleBarStyle: macOS ? 'hidden' : '',
        backgroundColor: '#ffffff',
        webPreferences: {
            plugins: true,
            nodeIntegration: true,
        }
    });

    mainWindowState.manage(mainWindow);
    let version_app = path.join(app.getPath('userData'), 'version', 'package.json');

    if (fs.existsSync(version_app)) {
        version = require(path.join(app.getPath('userData'), 'version', 'package.json'));
        const loader_app = path.join(app.getPath('userData'), 'version', version.version, 'src');

        loader_app_node_modules_path = path.join(loader_app, '../node_modules');

        if (fs.existsSync(loader_app)) {
            if (dev_mode) {
                node_modules_path = path.join(__dirname, '../../', 'node_modules');
                console.log('Modules dev')
            } else {
                node_modules_path = path.join(__dirname, '../', 'node_modules');
                console.log('Modules prod')
            }
            createSymlink(path.join(node_modules_path), loader_app_node_modules_path).then(() => {
                realpathSync(loader_app_node_modules_path);
            });

            console.log(loader_app);
            mainWindow.loadURL(`file://${loader_app}/index.html`);
        }

    } else {
        mainWindow.loadURL(`file://${__dirname}/index.html`)
    }

    if (dev_mode) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('close', (e) => {
        app.quit();
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

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});


app.setAsDefaultProtocolClient('thunder');


