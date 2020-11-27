import { app, BrowserWindow, screen, ipcMain } from 'electron';

const createWindow = () => {
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
};

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});


// Other stuff here
import { dialog } from 'electron';
ipcMain.handle('showSaveDialog', async (event, options) => {
  //do something with args
  return dialog.showSaveDialog(options);
});

ipcMain.handle('showOpenDialog', async (event, options) => {
  //do something with args
  return dialog.showOpenDialog(options);
});