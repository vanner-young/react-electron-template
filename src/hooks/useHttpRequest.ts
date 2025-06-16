import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export interface UseHttpRequestProps<T, S> {
    requestCb: (...args: Array<unknown>) => Promise<AxiosResponse>;
    filterData?: (data: S) => T;
}

export default function useHttpRequest<T, S>(
    props: UseHttpRequestProps<T, S>
): [T, boolean, () => void] {
    const [data, setData] = useState<T>([] as T);
    const [loading, setLoading] = useState(false);

    const request = () => {
        setLoading(true);
        props
            .requestCb()
            .then((result) => {
                if (result.data.code !== 200)
                    throw new Error(result.data.result);

                if (props.filterData) {
                    setData(props.filterData(result.data.result));
                } else {
                    setData(result.data.result);
                }
            })
            .finally(() => setLoading(false));
    };
    useEffect(request, []);

    return [data, loading, request];
}
