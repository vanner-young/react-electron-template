// 系统托盘

import { app, Tray, nativeImage, Menu, BrowserWindow } from 'electron';
import { showTopApplication } from '@vite-electron-simple/common';

import IpcEvent from '../event/window';

export interface TrayProps {
    icon: string;
    mainWindow: BrowserWindow;
}

type Config = {
    menus: Menu;
    icon: string;
};
class TrayApplication {
    #config: Config;
    #Tray!: Tray;
    #mainWindow!: BrowserWindow;

    constructor() {
        this.openApplication = this.openApplication.bind(this);
        this.quickApplication = this.quickApplication.bind(this);

        this.#config = {
            icon: '',
            menus: Menu.buildFromTemplate([
                {
                    label: '打开程序',
                    type: 'normal',
                    click: this.openApplication
                },
                {
                    label: '退出',
                    type: 'normal',
                    click: this.quickApplication
                }
            ])
        };
    }

    public start(props: TrayProps) {
        this.#config.icon = props.icon;
        this.#mainWindow = props.mainWindow;
        this.#Tray = new Tray(nativeImage.createFromPath(this.#config.icon));
        this.#Tray.setToolTip(app.getName());
        this.#Tray.setContextMenu(this.#config.menus);

        this.#Tray.addListener('double-click', this.openApplication);
    }

    public async openApplication() {
        await showTopApplication(this.#mainWindow);
    }

    public quickApplication() {
        IpcEvent.sendEvent('quit:window');
    }

    public destroy() {
        this.#Tray.destroy();
    }
}

export default new TrayApplication();
