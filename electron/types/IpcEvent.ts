import type { BrowserWindow } from 'electron';

// 渲染进程监听channel前缀
export enum EventBaseName {
    mainWindow = 'main:window' // main window
}

// 主进程到渲染进程channel定义
export enum BrowserEvent {
    quitApp = 'quit:app'
}

export interface IpcEvent {
    _listenerEventList: Array<{
        name: string;
        handler: (
            window: BrowserWindow,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...args: Array<any>
        ) => void | unknown | Promise<unknown>;
    }>;
    handler: (baseName: string, window: BrowserWindow) => void;
    removeHandler: (eventName: EventBaseName, name: string) => void;
}
