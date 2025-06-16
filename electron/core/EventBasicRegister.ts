import type { BrowserWindow, IpcMainInvokeEvent } from 'electron';
import { ipcMain } from 'electron';

type EventHandler =
    | ((
          mainWindow: BrowserWindow,
          event: IpcMainInvokeEvent,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...args: Array<any>
      ) => Promise<unknown>)
    | ((
          mainWindow: BrowserWindow,
          event: IpcMainInvokeEvent,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...args: Array<any>
      ) => unknown);

class EventBasicRegister {
    #mainWindow!: BrowserWindow;

    public listenerEventList: Array<{
        name: string;
        handler: EventHandler;
    }> = [];

    public register() {
        if (!this.#mainWindow)
            throw new Error(
                'register event is fail... missing parameter mainWindow'
            );
        this.listenerEventList.forEach((item) => {
            ipcMain.handle(item.name, (...rest) => {
                return item.handler(this.#mainWindow, ...rest);
            });
        });
    }

    setMainWindow(mainWindow: BrowserWindow) {
        this.#mainWindow = mainWindow;
    }

    public sendEvent(type = '', ...args: Array<unknown>): unknown {
        if (!this.#mainWindow)
            throw new Error(
                'send event is fail... missing parameter mainWindow'
            );
        return this.#mainWindow.webContents.send(type, ...args);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public load(_: BrowserWindow) {}
}

export default EventBasicRegister;
