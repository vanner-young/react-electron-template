import { useEffect } from 'react';
import { WindowListener } from '@/type';
import { isClientEnv } from '@/common';

const env = isClientEnv();
const ipcRender = window.listenMain;

export default function useIpcListen() {
    return function <T>(
        type: WindowListener,
        cb: (_: unknown, value: T) => unknown
    ) {
        if (!env) return;

        const cleanEffect = () => {
            ipcRender.remove(type, cb);
        };

        useEffect(() => {
            ipcRender.listen(type, cb);
            return cleanEffect;
        }, []);

        return cleanEffect;
    };
}
