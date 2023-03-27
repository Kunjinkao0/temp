import { DirectiveBinding, ref } from 'vue';
import { useUserStore } from '@/store';

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding;
  const userStore = useUserStore();
  const { role } = userStore;

  if (Array.isArray(value)) {
    // 按钮权限判断--LGD
    if (value.length > 0) {
      const permissionValues = value;
      const isHaveRole = ref(false);
      if(userStore.role !== '' && userStore.role !== null){
        const userRoles = userStore.role.split(',');
        userRoles.forEach(val => {
          if(permissionValues.includes(val)){
            isHaveRole.value = true;
          }
        });
      }

      if (!isHaveRole.value && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','user']"`);
  }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
};
