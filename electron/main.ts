import {
    Protocol,
    AwakeApp,
    Logger,
    SingleAppLock,
    showTopApplication
} from '@vite-electron-simple/common';

import path from 'path';
import { app, BrowserWindow } from 'electron';
import IpcEvent from './event';
import TrayApplication from './core/Tray';

Logger.open(); // 日志记录
SingleAppLock(); // 程序单例
AwakeApp.start(); // schemes 协议
Protocol.registerProtocol({ cwd: __dirname }); // protocol 协议

let mainWindow: BrowserWindow | null = null;
const iconPath = path.resolve(__dirname, '../public/logo.png');
const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        frame: false,
        icon: iconPath,
        resizable: false,
        webPreferences: { preload: path.resolve(__dirname, './preload.js') }
    });
    win.loadURL((process.env.ELECTRON_URL as string) || `app://./index.html`);
    if (!app.isPackaged) win.webContents.openDevTools();
    return win;
};

app.whenReady().then(() => {
    app.setName(process.env.APP_NAME || ''); // 设置应用名称

    mainWindow = createWindow();
    IpcEvent.register(mainWindow); // Ipc 注册

    // 托盘功能
    TrayApplication.start({
        icon: iconPath,
        mainWindow: mainWindow
    });

    if (!app.isPackaged) showTopApplication(mainWindow); // 置顶
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('second-instance', () => {
    if (mainWindow) showTopApplication(mainWindow);
});
