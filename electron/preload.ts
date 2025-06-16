import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('sendToMain', {
    action: (type: string, args: unknown) => {
        return ipcRenderer.invoke(type, args);
    }
});

contextBridge.exposeInMainWorld('listenMain', {
    listen(type: string, cb: () => unknown) {
        ipcRenderer.on(type, cb);
    },
    remove(type: string, cb: () => unknown) {
        ipcRenderer.off(type, cb);
    }
});
