import { useEffect, useRef, useState } from 'react';
import { IndexString } from '@/type';

export type Cb = (event: MessageEvent | undefined, error?: Event) => void;
export default function useEventSource(url: string) {
    const sse = useRef<EventSource>();
    const [state, setState] = useState(0); // 0: 初始化阶段、1：连接成功，-1：sse 错误
    const eventCb = useRef<Cb>();

    const close = () => {
        sse.current?.close();
        removeEvent();
        if (state !== -1) setState(0);
    };

    const open = () => {
        setState(1);
    };

    const error = (e: Event) => {
        setState(-1);
        if (typeof eventCb.current === 'function')
            eventCb.current(undefined, e);
        close();
    };

    const message = (event: MessageEvent) => {
        if (typeof eventCb.current === 'function') eventCb.current(event);
    };

    const removeEvent = () => {
        sse.current?.removeEventListener('open', open);
        sse.current?.removeEventListener('error', error);
        sse.current?.removeEventListener('message', message);
        eventCb.current = undefined;
    };

    const registryEvent = () => {
        sse.current?.addEventListener('open', open);
        sse.current?.addEventListener('error', error);
        sse.current?.addEventListener('message', message);
    };

    const connect = (query: IndexString, cb: Cb) => {
        removeEvent();

        if (state !== 0) setState(0);
        const sseUrl = url + `?${new URLSearchParams(query).toString()}`;
        sse.current = new EventSource(sseUrl);
        eventCb.current = cb;
        registryEvent();

        return close;
    };

    // 清除副作用
    useEffect(() => removeEvent, []);

    return connect;
}
