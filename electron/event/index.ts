import type { BrowserWindow } from 'electron';

import { WindowEventInstance } from './window';
import { EventBaseName, BrowserEvent } from '../types/IpcEvent';

class EventCenter {
    events = new Map([[EventBaseName.mainWindow, WindowEventInstance]]);

    handler(window: BrowserWindow) {
        this.events.forEach((instance, name) => {
            instance.handler(name, window);
        });
    }
    removeHandler(baseName: EventBaseName, name: string) {
        const instance = this.events.get(baseName);
        if (!instance) return;

        instance.removeHandler(baseName, name);
    }
    sendToRender(window: BrowserWindow, name: BrowserEvent, value?: unknown) {
        window.webContents.send(name, value);
    }
}

export const EventCenterInstance = new EventCenter();
