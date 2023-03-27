import type { Router } from 'vue-router';
import { useUserStore, useAppStore } from '@/store';
import { setRouteEmitter } from '@/utils/route-listener';
import setupUserLoginInfoGuard from './userLoginInfo';
import setupPermissionGuard from './permission';
import setupRefreshRoute from './refresh';

function setupPageGuard(router: Router) {
    router.beforeEach(async (to, from) => {
        // emit route change
        setRouteEmitter(to);
    });
}

export default function createRouteGuard(router: Router) {
    setupPageGuard(router);
    setupUserLoginInfoGuard(router);
    setupPermissionGuard(router);
    setupRefreshRoute(router);
}
