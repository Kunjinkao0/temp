import type { Router, RouteRecordRaw } from 'vue-router';
import useMenuTree from '../../components/menu/use-menu-tree';

export default function setupRefreshRoute(router: any) {
    router.beforeEach(async (to, from, next) => {
        if (from.path === '/' && to.path && to.name === 'notFound') {
            const { menuRoute } = useMenuTree();
            router.addRoute(menuRoute.value);

            next({ path: to.path, query: to.query });
            return;
        }
        next();
    });
}
