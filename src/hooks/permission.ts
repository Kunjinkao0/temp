import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/store';
import { ref } from 'vue';

export default function usePermission() {
  const userStore = useUserStore();
  return {
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) {
      if(!route.meta?.requiresAuth){
        return true;
      }
      if(!route.meta?.roles){
        return true;
      }
      if(route.meta?.roles?.includes('*')){
        return true;
      }
      const isHaveRole = ref(false);
      if(userStore.role !== '' && userStore.role !== null){
        const userRoles = userStore.role.split(',');
        userRoles.forEach(val => {
          if(route.meta?.roles?.includes(val)){
            isHaveRole.value = true;
          }
        });
      }
      return isHaveRole.value;
    },
    findFirstPermissionRoute(_routers: any, role = 'admin') {
      const cloneRouters = [..._routers];
      while (cloneRouters.length) {
        const firstElement = cloneRouters.shift();
        if (
          firstElement?.meta?.roles?.find((el: string[]) => {
            return el.includes('*') || el.includes(role);
          })
        )
          return { name: firstElement.name };
        if (firstElement?.children) {
          cloneRouters.push(...firstElement.children);
        }
      }
      return null;
    },
    // You can add any rules you want
  };
}
