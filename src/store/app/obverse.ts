import { observable, computed } from 'mobx';

export default class App {
    // 程序名称
    @observable appName = '';

    // 代理程序名称
    @computed
    public get proxyAppName() {
        return !this.appName + 'proxy';
    }
}
