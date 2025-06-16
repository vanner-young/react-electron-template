import fs from 'node:fs';
import { killProcessName, isActiveProcessByName } from 'mv-common';
import { spawn, ChildProcess } from 'child_process';
import { SpawnOptionsWithoutStdio } from 'node:child_process';

class AwakeChildrenProcess {
    #appPath: string = '';
    #appName: string = '';
    childrenProcess: ChildProcess | null = null;
    public verifyTimeList = [100, 500, 1000, 2000];

    public async run(options: SpawnOptionsWithoutStdio = {}) {
        if (!this.#appPath || !fs.existsSync(this.#appPath))
            throw new Error('exec app path invalid...');

        await this.closeAppServices();
        this.childrenProcess = spawn(this.#appPath, options);
        this.childrenProcess = null;
        return true;
    }

    public async closeAppServices() {
        const isActiveProcess = await isActiveProcessByName(this.#appName);
        if (!isActiveProcess) return true;

        await killProcessName(this.#appName);
        this.childrenProcess = null;
        return true;
    }
}

export default new AwakeChildrenProcess();
