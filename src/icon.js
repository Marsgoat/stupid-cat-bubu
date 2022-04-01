const { app, Menu, Tray } = require('electron');
const path = require('path');

function createTray(win) {
  const iconPath = path.join(__dirname, '../img/icon.jpg');
  const tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '最小化',
      click: () => win.hide(),
    },
    {
      label: '結束',
      click: () => app.quit(),
    },
  ]);
  tray.setToolTip('stupid cat');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => win.show());
  return tray;
}

module.exports = { createTray };
