import { app, shell, IpcMainInvokeEvent, BrowserWindow } from 'electron';
import Notification from '../core/Notification';
import { showTopApplication } from '@vite-electron-simple/common';
import EventBasicRegister from '../core/EventBasicRegister';

class WindowEvent extends EventBasicRegister {
    get NotificationInstance() {
        return Notification.getInstance();
    }

    listenerEventList = [
        { name: 'min', handler: this.onMin.bind(this) },
        { name: 'close', handler: this.onQuit.bind(this) },
        { name: 'hidden', handler: this.backgroundRun.bind(this) },
        { name: 'open:url', handler: this.openUrl.bind(this) },
        { name: 'toggle', handler: this.toggle.bind(this) },
        { name: 'window:top', handler: this.windowTop.bind(this) }
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

    public load(mainWindow: BrowserWindow): void {
        mainWindow.webContents.addListener('did-finish-load', () => {
            const timer = setTimeout(() => {
                clearTimeout(timer);
                this.sendEvent('ready', app.getName());
            }, 1000);
        });
    }
}

export default new WindowEvent();
