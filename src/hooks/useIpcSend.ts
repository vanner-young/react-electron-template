import { WindowAction } from '@/type';
import { isClientEnv } from '@/common';

const env = isClientEnv();
const ipcRender = window.sendToMain;
export default function useIpcSend() {
    return (type: WindowAction, args: unknown = false) => {
        if (!env) return;

        return ipcRender.action(type, args);
    };
}
