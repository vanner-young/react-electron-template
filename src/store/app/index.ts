import { makeObservable, action } from 'mobx';
import Obverse from './obverse';

class App extends Obverse {
    constructor() {
        super();
        makeObservable(this);
    }

    // 获取打印机列表
    @action.bound
    public fetchAppName() {
        this.appName = 'app name';
    }
}

export default new App();
