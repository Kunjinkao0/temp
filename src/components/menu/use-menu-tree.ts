import { computed } from 'vue';
import { RouteRecordRaw, RouteRecordNormalized } from 'vue-router';
import usePermission from '@/hooks/permission';
import { useAppStore } from '@/store';
import { cloneDeep } from 'lodash';

export default function useMenuTree() {
    const permission = usePermission();
    const appStore = useAppStore();
    const appRoute = computed(() => {
        return appStore.appAsyncMenus;
    });
    const menuTree = computed(() => {
        // const copyRouter = JSON.parse(JSON.stringify(appRoute.value));

        const cloneRouter = cloneDeep(
            appRoute.value
        ) as RouteRecordNormalized[];

        cloneRouter.sort(
            (a: RouteRecordNormalized, b: RouteRecordNormalized) => {
                return (a.meta.order || 0) - (b.meta.order || 0);
            }
        );

        function travel(_routes: RouteRecordRaw[], layer: number) {
            if (!_routes) return null;
            const collector: any = _routes.map((element) => {
                // no access
                if (!permission.accessRouter(element)) {
                    return null;
                }

                // leaf node
                if (element.meta?.hideChildrenInMenu || !element.children) {
                    element.children = [];
                    return element;
                }

                // route filter hideInMenu true
                element.children = element.children.filter(
                    (x) => x.meta?.hideInMenu !== true
                );

                // Associated child node
                const subItem = travel(element.children, layer + 1);

                if (subItem.length) {
                    element.children = subItem;
                    return element;
                }
                // the else logic
                if (layer > 1) {
                    element.children = subItem;
                    return element;
                }

                if (element.meta?.hideInMenu === false) {
                    return element;
                }

                return null;
            });
            return collector.filter(Boolean);
        }
        return travel(cloneRouter, 0);
    });

    const modules = import.meta.glob('/src/views/*/*/*.vue');

    // 动态路由
    const menuRoute = computed(() => {
        const cloneRouter = cloneDeep(
            appRoute.value
        ) as RouteRecordNormalized[];

        const expandedRouters = expandRouters(cloneRouter, []);
        const filteredRouters = filterRouters(expandedRouters);
        const packageRouters = routerPackage(filteredRouters);

        const copyRouter = {
            name: "defaultLayout",
            component: () => import('@/layout/default-layout.vue'),
            children: packageRouters
        }

        return copyRouter;
    });

    const expandRouters = (routers, result) => {
        routers.forEach((item: any) => {
            result.push(item);
            if (item.children && item.children.length > 0) {
                expandRouters(item.children, result);
            }
        });
        return result;
    };

    const filterRouters = (routers) => {
        let accessedRouters = routers.filter((router) => {
            if (router.modulePath) {
                delete router.children;
                return true;
            }
            return false;
        });
        return accessedRouters;
    };

    const routerPackage = (routers) => {
        let accessedRouters = routers.filter((router) => {
            router.component = modules[`/src/views${router.modulePath}`]
            return true;
        });
        return accessedRouters;
    }

    // const routerPackag = (routers) => {
    //     let accessedRouters = routers.filter((router) => {
    //         router.component = loadView(router.modulePath);

    //         if (router.children && router.children.length) {
    //             router.children = routerPackag(router.children);
    //         }
    //         return true;
    //     });
    //     return accessedRouters;
    // };

    // const loadView = (view) => {
    //     if (view) {
    //         return modules[`/src/views${view}`];
    //     }
    //     return () => import('@/layout/default-layout.vue');
    // };

    return {
        menuTree,
        menuRoute,
    };
}
