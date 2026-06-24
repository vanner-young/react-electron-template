import {
    Protocol,
    AwakeApp,
    Logger,
    SingleAppLock,
    showTopApplication
} from '@vite-electron-simple/common';

import path from 'path';
import { app, BrowserWindow } from 'electron';

import { TrayApplication } from './core/Tray';
import { EventCenterInstance } from './event';

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

    // 可根据条件开启, 默认在非 build 模式下开启控制台
    if (!app.isPackaged) win.webContents.openDevTools();
    return win;
};

app.whenReady().then(() => {
    app.setName(process.env.APP_NAME || ''); // 设置应用名称
    mainWindow = createWindow();

    // event 事件注册, 监听渲染进程的消息
    EventCenterInstance.handler(mainWindow);

    // 启动app系统托盘
    new TrayApplication({
        icon: iconPath,
        window: mainWindow
    }).start();

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
