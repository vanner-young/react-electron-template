import { configure } from 'mobx';
import React, { useContext, createContext } from 'react';
import AppInstance from '@/store/app';

export type MobxConfigureOptions = Partial<Parameters<typeof configure>[0]>;
export interface RootStoreOption {
    storeInstance: {
        app: typeof AppInstance; // app 模块
    };
}

class ProviderStore {
    static instance: ProviderStore;
    static getInstance(): ProviderStore {
        if (!ProviderStore.instance)
            ProviderStore.instance = new ProviderStore();
        return ProviderStore.instance;
    }
    public storeInstance = {
        app: AppInstance // app 模块
    };
    public context: React.Context<RootStoreOption['storeInstance']> =
        createContext(this.storeInstance);

    public initStore(options: MobxConfigureOptions) {
        return configure(options);
    }

    public useStore() {
        return useContext(this.context);
    }
}

export default ProviderStore.getInstance();
