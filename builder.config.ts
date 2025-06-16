import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import PluginReact from '@vitejs/plugin-react';
import { defineMvConfig } from '@vite-electron-simple/core';

const APP_NAME = 'react-electron-template';
export default defineMvConfig({
    privateConfig: {
        appName: APP_NAME,
        needElectron: true,
        tsMainConfigPath: path.resolve(__dirname, './tsconfig.main.json')
    },
    viteConfig: {
        base: './',
        server: {
            host: '0.0.0.0',
            proxy: {
                '/api/v1': {
                    changeOrigin: true,
                    target: 'http://127.0.0.1:3012'
                }
            }
        },
        plugins: [PluginReact(), tailwindcss()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        build: {
            assetsInlineLimit: 1,
            rollupOptions: {
                output: {
                    assetFileNames: (assetInfo) => {
                        const name =
                            assetInfo.names?.[0] || assetInfo.name || '';
                        const ext = name.match(/\.([^.]+)$/)?.[1];
                        const assetMap = new Map([
                            [['css'], 'assets/css'],
                            [
                                ['png', 'jpg', 'svg', 'gif', 'webp'],
                                'assets/img'
                            ],
                            [['ttf', 'woff'], 'assets/font'],
                            [['html'], 'assets/template']
                        ]);
                        for (const [key, value] of assetMap) {
                            if (key.includes(ext as string))
                                return value + '/[hash].[ext]';
                        }
                        return 'assets/other' + '/[hash].[ext]';
                    },
                    chunkFileNames() {
                        return 'assets/js/[hash].js';
                    },
                    entryFileNames() {
                        return 'assets/js/index.[hash].js';
                    }
                }
            }
        }
    },
    electronBuilder: {
        appId: 'com.vx.ai',
        productName: APP_NAME,
        directories: {
            output: 'bundle'
        },
        extraResources: {
            from: 'electron/static',
            to: 'static'
        },
        files: [
            '**/*',
            '!**/*.ts',
            '!tsconfig.json',
            '!yarn.lock',
            '!package-lock.json'
        ],
        win: {
            sign: null,
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
