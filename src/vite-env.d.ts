/* eslint-disable @typescript-eslint/no-explicit-any */

/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_OPEN_ELECTRON: number;
    readonly VITE_PROXY_SERVER: string;
}

interface Window {
    sendToMain: {
        action: (type: string, args: unknown) => unknown;
    };
    listenMain: {
        listen: (type: string, cb: (...args: Array<any>) => unknown) => unknown;
        remove: (type: string, cb: (...args: Array<any>) => unknown) => unknown;
    };
}
