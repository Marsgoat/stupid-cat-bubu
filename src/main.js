const { app, BrowserWindow } = require('electron');
const path = require('path');
const { createTray } = require('./icon');

function createWindow() {
  const win = new BrowserWindow({
    width: 250,
    height: 250,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    frame: false, // 不顯示標題列
    transparent: true, // 背景透明
    autoHideMenuBar: true, // 不顯示工具列
    resizable: false, // 不可改變視窗大小
    center: true, // 目前視窗置中
  });

  win.setAlwaysOnTop(true, 'screen-saver'); // 畫面置頂
  win.loadFile('./src/index.html');
  createTray(win);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
