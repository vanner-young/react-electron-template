import type { BrowserWindow } from 'electron';
import window from './window';

class BasicEvent {
    // 事件按模块注册，每个事件对应的模块
    public moduleEvent = {
        // TODO...
        window // 窗口事件监听
    };

    public register(mainWindow: BrowserWindow): void {
        Object.values(this.moduleEvent).forEach((item) => {
            item.setMainWindow(mainWindow);
            item.register();
            item.load(mainWindow);
        });
    }
}

export default new BasicEvent();
