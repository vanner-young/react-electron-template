import path from 'node:path';
import { defineMvConfig } from '@vite-electron-simple/core';

import viteConfig from './vite.config';

export default defineMvConfig({
    privateConfig: {
        appName: 'react-electron-template',
        needElectron: true,
        tsMainConfigPath: path.resolve(__dirname, './tsconfig.main.json')
    },
    viteConfig: viteConfig,
    electronBuilder: {
        appId: 'com.vx.ai',
        productName: 'react-electron-template',
        directories: {
            output: 'bundle'
        },
        extraResources: {
            from: 'electron/static',
            to: 'static'
        },
        files: ['public', 'dist_electron'],
        win: {
            target: 'nsis',
            icon: 'public/logo.png'
        },
        nsis: {
            oneClick: false,
            allowToChangeInstallationDirectory: true,
            createDesktopShortcut: true,
            deleteAppDataOnUninstall: true,
            include: './install.nsh'
        },
        protocols: [
            {
                name: 'react-electron-template',
                schemes: ['react-electron-template']
            }
        ]
    }
});
