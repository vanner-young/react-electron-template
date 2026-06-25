import { showTopApplication } from "@vite-electron-simple/common";
import { app, Tray, nativeImage, Menu, BrowserWindow } from "electron";

import { EventCenterInstance } from "../event";
import { BrowserEvent } from "../types/IpcEvent";

export interface TrayProps {
    icon: string;
    window: BrowserWindow;
}

export class TrayApplication {
    _config = {
        icon: "",
        menus: Menu.buildFromTemplate([
            {
                label: "打开程序",
                type: "normal",
                click: () => this.openApplication(),
            },
            {
                label: "退出",
                type: "normal",
                click: () => this.quickApplication(),
            },
        ]),
    };
    _window!: BrowserWindow;
    #Tray!: Tray;

    constructor(props: TrayProps) {
        this._window = props.window;
        this._config.icon = props.icon;
    }

    public start() {
        this.#Tray = new Tray(nativeImage.createFromPath(this._config.icon));
        this.#Tray.setToolTip(app.getName());
        this.#Tray.setContextMenu(this._config.menus);

        this.#Tray.addListener("double-click", this.openApplication);
    }

    public async openApplication() {
        await showTopApplication(this._window);
    }

    public destroy() {
        this.#Tray.destroy();
    }

    public quickApplication() {
        EventCenterInstance.sendToRender(this._window, BrowserEvent.quitApp);
    }
}
