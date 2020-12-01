import { app, BrowserWindow, screen, ipcMain, Tray, Menu } from 'electron';
import path from 'path';

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

  // Answer from https://stackoverflow.com/questions/35008347/electron-close-w-x-vs-right-click-dock-and-quit
  let forceQuit = false;
  app.on('before-quit', () => {
    forceQuit = true;
  });

  win.on('close', (event: Event) => {
    if (!forceQuit) {
      event.preventDefault();
      win.hide();
    }
  });

  let tray: Tray;
  // Code inspired by https://stackoverflow.com/questions/37828758/electron-js-how-to-minimize-close-window-to-system-tray-and-restore-window-back
  const createTray = () => {
    let imgPath = app.isPackaged
      ? path.join(process.resourcesPath, 'icon.png')
      : path.join(path.resolve(), 'src', 'images', 'icon.png');
    tray = new Tray(imgPath);
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Show',
        click: () => {
          win.show();
        },
      },
      {
        label: 'Quit',
        click: () => {
          app.exit();
        },
      },
    ]);
    tray.on('click', () => {
      win.show();
    });
    tray.setToolTip('Slice');
    tray.setContextMenu(contextMenu);
  };
  createTray();
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

// IPC Handles
import { dialog } from 'electron';
ipcMain.handle('showSaveDialog', async (event, options) => {
  //do something with args
  return dialog.showSaveDialog(options);
});

ipcMain.handle('showOpenDialog', async (event, options) => {
  //do something with args
  return dialog.showOpenDialog(options);
});
