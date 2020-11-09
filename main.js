const { app, BrowserWindow, screen } = require('electron');

app.whenReady().then(() => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const win = new BrowserWindow({
    width: width * 0.85,
    height: height * 0.75,
    webPreferences: {
      nodeIntegration: true,
      zoomFactor: 1.5,
    },
  });

  win.loadFile('public/index.html');
  win.webContents.openDevTools();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
