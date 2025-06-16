import ReactDOM from 'react-dom/client';
import RouterProvider from '@/router';
import BaseLayout from '@/layout/Base';

// 初始化请求
import request from '@/request';

request.initRequest({
    timeout: 60000,
    server: import.meta.env.VITE_PROXY_SERVER,
    prefix: '/api/v1',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

// 初始化 mobx
import store from '@/store';
store.initStore({ enforceActions: 'observed' });

import '@/common/antdConfig';
import './style/global.css';

ReactDOM.createRoot(document.getElementById('wrap') as HTMLElement).render(
    <BaseLayout>
        <RouterProvider></RouterProvider>
    </BaseLayout>
);
