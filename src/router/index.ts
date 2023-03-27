import { ref } from 'vue';
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';

// import { appRoutes } from './routes';
import { REDIRECT_MAIN, NOT_FOUND_ROUTE, HOME_ROUTE } from './routes/base';
import createRouteGuard from './guard';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: 'login',
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/login/index.vue'),
            meta: {
                requiresAuth: false,
            },
        },
        {
            path: '/',
            name: 'defaultLayout',
            component: () => import('@/layout/default-layout.vue'),
            children: [
                {
                    path: 'workplace',
                    name: 'Workplace',
                    component: () =>
                        import('@/views/statistical/workplace/index.vue'),
                    meta: {
                        locale: '综合统计',
                        requiresAuth: true,
                        roles: ['*'],
                    },
                },
                {
                    path: 'complexStatistic',
                    name: 'ComplexStatistic',
                    component: () =>
                        import('@/views/complexStatistical/statistical/index.vue'),
                },
                {
                    path: 'iotDetection',
                    name: 'IotDetection',
                    component: () =>
                        import('@/views/smartSupervision/iotDetection/index.vue'),
                },
            ],
        },
        // ...appRoutes,
        REDIRECT_MAIN,
        HOME_ROUTE,
        NOT_FOUND_ROUTE,
    ],
    scrollBehavior() {
        return { top: 0 };
    },
});

createRouteGuard(router);

export default router;
