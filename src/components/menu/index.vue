<script lang="tsx">
import { defineComponent, ref, h, compile, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter, RouteRecordRaw } from 'vue-router';
import type { RouteMeta } from 'vue-router';
import { useAppStore } from '@/store';
import { listenerRouteChange } from '@/utils/route-listener';
import { openWindow, regexUrl } from '@/utils';
import useMenuTree from './use-menu-tree';

export default defineComponent({
    emit: ['collapse'],
    setup() {
        const { t } = useI18n();
        const appStore = useAppStore();
        const router: any = useRouter();
        const route = useRoute();
        const { menuTree, menuRoute } = useMenuTree();
        let title = '电梯安全监管平台'
        const collapsed = computed({
            get() {
                if (appStore.device === 'desktop') return appStore.menuCollapse;
                return false;
            },
            set(value: boolean) {
                appStore.updateSettings({ menuCollapse: value });
            },
        });

        // 感谢天感谢地累死我了！！！
        router.addRoute(menuRoute.value);

        const openKeys = ref<string[]>([]);
        const selectedKey = ref<string[]>([]);

        const goto = (item: RouteRecordRaw) => {
            if (regexUrl.test(item.path)) {
                openWindow(item.path);
                selectedKey.value = [item.name as string];
                return;
            }
            // Eliminate external link side effects
            const { hideInMenu, activeMenu } = item.meta as RouteMeta;
            if (route.name === item.name && !hideInMenu && !activeMenu) {
                selectedKey.value = [item.name as string];
                return;
            }
            // Trigger router change
            router.push({
                name: item.name,
            });
        };
        const findMenuOpenKeys = (name: string) => {
            const result: string[] = [];
            let isFind = false;
            const backtrack = (
                item: RouteRecordRaw,
                keys: string[],
                target: string
            ) => {
                if (item.name === target) {
                    isFind = true;
                    result.push(...keys, item.name as string);
                    return;
                }
                if (item.children?.length) {
                    item.children.forEach((el) => {
                        backtrack(el, [...keys], target);
                    });
                }
            };

            menuTree.value.forEach((el: RouteRecordRaw) => {
                if (isFind) return; // Performance optimization
                backtrack(el, [el.name as string], name);
            });
            return result;
        };
        listenerRouteChange((newRoute) => {
            const { requiresAuth, activeMenu, hideInMenu } = newRoute.meta;
            if (requiresAuth && (!hideInMenu || activeMenu)) {
                const menuOpenKeys = findMenuOpenKeys(
                    (activeMenu || newRoute.name) as string
                );

                const keySet = new Set([...menuOpenKeys, ...openKeys.value]);
                openKeys.value = [...keySet];

                selectedKey.value = [
                    activeMenu || menuOpenKeys[menuOpenKeys.length - 1],
                ];
            }
        }, true);
        const setCollapse = (val: boolean) => {
            if (appStore.device === 'desktop')
                appStore.updateSettings({ menuCollapse: val });
            if(val)
                title = ''
            else
                title = '电梯安全监管平台'
        };

        const renderSubMenu = () => {
            function travel(_route: RouteRecordRaw[], nodes = []) {
                if (_route) {
                    _route.forEach((element) => {
                        // This is demo, modify nodes as needed
                        const icon = element?.meta?.icon
                            ? () => h(compile(`<${element?.meta?.icon}/>`))
                            : null;
                        const node =
                            element?.children && element?.children.length !== 0 ? (
                                <a-sub-menu
                                    style="background:#001529;"
                                    key={element?.name}
                                    v-slots={{
                                        icon,
                                        title: () => h(compile(t(element?.meta?.locale || ''))),
                                    }}
                                >
                                    {travel(element?.children)}
                                </a-sub-menu>
                            ) : (
                                <a-menu-item
                                    key={element?.name}
                                    v-slots={{ icon }}
                                    onClick={() => goto(element)}
                                    style="background:#001529;"
                                >
                                    {t(element?.meta?.locale || '')}
                                </a-menu-item>
                            );
                        nodes.push(node as never);
                    });
                }
                return nodes;
            }
            return travel(menuTree.value);
        };

        return () => (
            <div style="height: 100%;display: flex;flex-direction: column;">
                <div class="title">{title}</div>
                <a-menu
                    v-model:collapsed={collapsed.value}
                    v-model:open-keys={openKeys.value}
                    show-collapse-button={appStore.device !== 'mobile'}
                    auto-open={false}
                    selected-keys={selectedKey.value}
                    auto-open-selected={true}
                    level-indent={34}
                    theme="dark"
                    style="flex:1;background:#001529;overflow: auto;"
                    onCollapse={setCollapse}
                >
                    {renderSubMenu()}
                </a-menu>
            </div>
        );
    },
});
</script>

<style lang="less" scoped>
:deep(.arco-menu-inner) {

    .arco-menu-inline-header {
        display: flex;
        align-items: center;
        background: #001529;
        color: #FFFFFF;
    }

    .arco-menu-inline-header:hover{
        background: linear-gradient(90deg, #165DFF 0.09%, rgba(22, 93, 255, 0) 100.09%);
    }

    .arco-menu-inline-content .arco-menu-selected{
        background: linear-gradient(90deg, #165DFF 0.09%, rgba(22, 93, 255, 0) 100.09%) !important;
        color: #FFFFFF;
    }


    .arco-icon {
        &:not(.arco-icon-down) {
            font-size: 18px;
        }
    }

}
</style>
