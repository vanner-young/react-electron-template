import { useCallback, useEffect, useRef } from "react";
import { WindowListener } from "@/type";
import { isClientEnv } from "@/common";

const env = isClientEnv();
const ipcRender = window.listenMain;

export function useIpcListen<T>(type: WindowListener, cb: (_: unknown, value: T) => unknown) {
    const handler = useRef(cb);

    const eventHandler = useCallback((event: unknown, value: T) => {
        handler.current(event, value);
    }, []);

    const clean = () => {
        ipcRender.remove(type);
    };

    useEffect(() => {
        if (!env || !ipcRender) return;

        ipcRender.listen(type, eventHandler);
        return clean;
    }, [type]);

    return clean;
}
