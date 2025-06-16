import axios, {
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
    CreateAxiosDefaults
} from 'axios';

import { message } from 'antd';

class Request {
    static instance: Request;
    static getInstance(): Request {
        if (!Request.instance) Request.instance = new Request();
        return Request.instance;
    }

    // 初始化请求实例，非全局初始化w
    public requestsInstance: AxiosInstance | undefined;
    public requestMiddleWear: number = 0;
    public responseMiddleWear: number = 0;

    // 获取请求实例
    public get instance() {
        if (!this.requestsInstance) {
            console.error('invalid axios instance... you axios instance init?');
            return axios.create();
        }
        return this.requestsInstance;
    }

    /**
     * 请求初始化
     * **/
    public initRequest(
        options?: CreateAxiosDefaults & { server?: string; prefix?: string }
    ): void {
        // server 字段权重大于 baseURL
        if (options?.server) options.baseURL = options.server;
        if (options?.prefix) options.baseURL += options.prefix;

        this.requestsInstance = axios.create(options);
        this.requestMiddleWear = this.requestsInstance.interceptors.request.use(
            this.requestMiddleWearFn
        );
        this.responseMiddleWear =
            this.requestsInstance.interceptors.response.use(
                this.responseMiddleWearFn
            );
    }

    /**
     * 请求前置拦截
     * **/
    public requestMiddleWearFn(config: InternalAxiosRequestConfig) {
        return config;
    }

    /**
     * 请求响应拦截
     * **/
    public responseMiddleWearFn(response: AxiosResponse) {
        if (response.data.code !== 200) {
            message.error('请求操作失败：' + response.data.result);
        }
        return response;
    }
}

export default Request.getInstance();
