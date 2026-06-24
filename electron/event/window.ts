import { showTopApplication } from '@vite-electron-simple/common';
import {
    app,
    shell,
    IpcMainInvokeEvent,
    BrowserWindow,
    ipcMain
} from 'electron';

import { IpcEvent } from '../types/IpcEvent';
import Notification from '../core/Notification';

class WindowEvent implements IpcEvent {
    constructor() {
        this.handler = this.handler.bind(this);
    }

    get NotificationInstance() {
        return Notification.getInstance();
    }

    _listenerEventList: IpcEvent['_listenerEventList'] = [
        { name: 'min', handler: this.onMin },
        { name: 'close', handler: this.onQuit },
        { name: 'hidden', handler: this.backgroundRun },
        { name: 'toggle', handler: this.toggle },
        { name: 'window:top', handler: this.windowTop },
        { name: 'open:url', handler: this.openUrl }
    ];

    public async windowTop(mainWindow: BrowserWindow) {
        return await showTopApplication(mainWindow);
    }

    public async onMin(mainWindow: BrowserWindow) {
        mainWindow.minimize();
    }

    public async onQuit() {
        app.quit();
    }

    public async toggle(mainWindow: BrowserWindow) {
        if (mainWindow.isMaximized()) {
            mainWindow.restore();
        } else {
            mainWindow.maximize();
        }
    }

    public async backgroundRun(mainWindow: BrowserWindow) {
        this.onHide(mainWindow);
        this.NotificationInstance.show({
            title: app.getName(),
            subtitle: '提示',
            body: '在托盘中可以找到我哦！'
        });
    }

    public async onHide(mainWindow: BrowserWindow) {
        mainWindow.hide();
    }

    public async openUrl(
        _: BrowserWindow,
        _$: IpcMainInvokeEvent,
        targetPath: unknown
    ) {
        shell.openPath(targetPath as string);
    }

    public handler(baseName: string, mainWindow: BrowserWindow) {
        this._listenerEventList.forEach(({ name, handler }) => {
            ipcMain.handle(`${baseName}:${name}`, (...args) => {
                return handler.call(this, mainWindow, ...args);
            });
        });
    }

    public removeHandler(eventName: string, name: string) {
        ipcMain.removeHandler(`${eventName}:${name}`);
    }
}

export const WindowEventInstance = new WindowEvent();
