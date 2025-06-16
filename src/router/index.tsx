import { RouterProvider, createHashRouter } from 'react-router-dom';
import NotFound from '@/component/NotFound';
import GlobalLoadElementError from '@/component/GlobalElementError';

const router = createHashRouter([
    {
        path: '/',
        errorElement: <GlobalLoadElementError />,
        async lazy() {
            const module = await import('@/view/home');
            return { Component: module.Home };
        }
    },
    {
        path: '*',
        element: <NotFound />
    }
]);

export default () => <RouterProvider router={router} />;
