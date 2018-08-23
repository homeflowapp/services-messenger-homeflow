import { app, BrowserWindow } from 'electron';

let mainWindow;
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1250,
    height: 680
  });

	mainWindow.loadURL(`file://${__dirname}/index.html`);

  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});

