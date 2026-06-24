import { resolve } from 'node:path';
import { defineConfig } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import PluginReact from '@vitejs/plugin-react';

export default defineConfig({
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
            '@': resolve(__dirname, './src')
        }
    },
    build: {
        assetsInlineLimit: 1,
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    const name = assetInfo.names?.[0] || assetInfo.name || '';
                    const ext = name.match(/\.([^.]+)$/)?.[1];
                    const assetMap = new Map([
                        [['css'], 'assets/css'],
                        [['png', 'jpg', 'svg', 'gif', 'webp'], 'assets/img'],
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
});
