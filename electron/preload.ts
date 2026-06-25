import { contextBridge, ipcRenderer } from "electron";

// 标志，判断当前的环境是不是使用 electron 打开的
contextBridge.exposeInMainWorld("hasElectron", true);

// 渲染进程发消息到主进程
contextBridge.exposeInMainWorld("sendToMain", {
    action: (type: string, args: unknown) => {
        return ipcRenderer.invoke(type, args);
    },
});

// 渲染进程监听主进程的消息
contextBridge.exposeInMainWorld("listenMain", {
    listen(type: string, cb: () => unknown) {
        ipcRenderer.addListener(type, cb);
    },
    remove(type: string) {
        ipcRenderer.removeAllListeners(type);
    },
});
