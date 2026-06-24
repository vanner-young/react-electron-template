import { WindowHandler } from '@/type';
import { isClientEnv } from '@/common';

const env = isClientEnv();
const ipcRender = window.sendToMain;

export function useIpcSend(type: WindowHandler, args: unknown = false) {
    if (!env || !ipcRender) return;
    return ipcRender.action(type, args);
}
