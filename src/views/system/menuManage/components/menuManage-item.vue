<template>
    <a-space direction="vertical" size="large" :style="{ width: '600px' }">
        <a-radio-group v-model="type" type="button" :disabled="menuForm.id ? true : false" @change="radioChange">
            <a-radio value='1'>一级菜单</a-radio>
            <a-radio value='2'>子菜单</a-radio>
            <a-radio value='3'>按钮权限</a-radio>
        </a-radio-group>
        <a-form ref="formRef" :model="menuForm" style="padding-left: 50px;" label-align="left">
            <a-form-item field="code" :label="type === '3' ? $t('menuManage.model.roleLogo') : $t('menuManage.model.code')"
                :rules="[
                    {
                        required: true,
                        message: type === '3' ? $t('menuManage.model.roleLogo.required') : $t('menuManage.model.code.required'),
                    },
                ]" :validate-trigger="['change', 'input', 'blur']">
                <a-input v-model="menuForm.code"
                    :placeholder="type === '3' ? $t('menuManage.model.roleLogo.placeholder') : $t('menuManage.model.code.placeholder')" />
            </a-form-item>
            <a-form-item field="name" :label="type === '3' ? $t('menuManage.model.roleName') : $t('menuManage.model.name')"
                :rules="[
                    {
                        required: true,
                        message: type === '3' ? $t('menuManage.model.roleName.required') : $t('menuManage.model.name.required'),
                    },
                ]" :validate-trigger="['change', 'input', 'blur']">
                <a-input v-model="menuForm.name"
                    :placeholder="type === '3' ? $t('menuManage.model.roleName.placeholder') : $t('menuManage.model.name.placeholder')" />
            </a-form-item>
            <a-form-item field="parentId" :label="$t('menuManage.model.parentName')" :rules="[
                {
                    required: true,
                    message: $t('menuManage.model.parentName.required'),
                },
            ]" v-if="type === '2' || type === '3'" :validate-trigger="['change', 'input', 'blur']">
                <a-tree-select :placeholder="$t('menuManage.model.parentName.placeholder')" :data="parentMenuDate"
                    v-model="menuForm.parentId"></a-tree-select>
            </a-form-item>
            <a-form-item field="accessPath" :label="$t('menuManage.model.accessPath')" :rules="[
                {
                    required: true,
                    message: $t('menuManage.model.accessPath.required'),
                },
            ]" v-if="type === '1' || type === '2'">
                <a-input v-model="menuForm.accessPath" :placeholder="$t('menuManage.model.accessPath.placeholder')" />
            </a-form-item>
            <a-form-item field="modulePath" :label="$t('menuManage.model.modulePath')" v-if="type === '2'" :rules="[
                {
                    required: true,
                    message: $t('menuManage.model.modulePath.placeholder'),
                },
            ]">
                <a-input v-model="menuForm.modulePath" :placeholder="$t('menuManage.model.modulePath.placeholder')" />
            </a-form-item>
            <a-form-item field="icon" :label="$t('menuManage.model.icon')" v-if="type === '1' || type === '2'">
                <a-input v-model="menuForm.icon" :placeholder="$t('menuManage.model.icon.placeholder')" />
            </a-form-item>
            <a-form-item field="orderId" :label="$t('menuManage.model.order')" :rules="[
                {
                    required: true,
                    message: $t('menuManage.model.order.required'),
                },
            ]" :validate-trigger="['change', 'input', 'blur']">
                <a-input-number v-model="menuForm.orderId" :placeholder="$t('menuManage.model.order.placeholder')" />
            </a-form-item>
            <a-form-item field="hideInMenu" :label="$t('menuManage.model.hideInMenu')"
                v-if="type === '1' || type === '2'">
                <a-switch v-model="menuForm.hideInMenu">
                    <template #checked>
                        开
                    </template>
                    <template #unchecked>
                        关
                    </template>
                </a-switch>
            </a-form-item>
            <a-form-item field="ignoreCache" :label="$t('menuManage.model.ignoreCache')"
                v-if="type === '1' || type === '2'">
                <a-switch v-model="menuForm.ignoreCache" :default-checked="true">
                    <template #checked>
                        是
                    </template>
                    <template #unchecked>
                        否
                    </template>
                </a-switch>
            </a-form-item>
        </a-form>
    </a-space>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import useLoading from '@/hooks/loading';
import { insert, MenuRecord, update, queryMenuSelect } from '@/api/menuManage';
import {Message, TreeNodeData} from '@arco-design/web-vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const parentMenuDate = ref<TreeNodeData[]>([]);
const type = ref('1');
const formRef = ref<FormInstance>();
const { loading, setLoading } = useLoading();

const init = (sort: string) => {
    formRef.value?.clearValidate()
    type.value = sort
}

const getMenuSelect = async (
    params: MenuRecord = {
        id: '',
        parentId: '',
        name: '',
        code: '',
        accessPath: '',
        modulePath: '',
        icon: '',
        hideInMenu: '',
        ignoreCache: ''
    }) => {
    const { data } = await queryMenuSelect(params);
    parentMenuDate.value = data;
  }
getMenuSelect();

const props = defineProps(['refresh', 'renderData'])
const menuForm = computed(() => {
    return props.renderData;
})
const onSubmitClick = async () => {
  const res = await formRef.value?.validate();
  if (!res) {
    setLoading(true);
    let result: any;
    menuForm.value.type = type.value
    if (menuForm.value.id) {
      result = await update(menuForm.value);
    } else {
      result = await insert(menuForm.value);
    }

    if (result.code === 200) {
      if (result.data === 'code_repeat') {
        Message.error(t('menuManage.msg.codeRepeat'))
        return false;
      }
      Message.success(result.message)
      getMenuSelect()
      props.refresh()
    } else {
      Message.error(result.message)
    }
    setLoading(false);
    return true
  }
  return false;
};
const radioChange = async () => {
    const res = await formRef.value?.validate();
    return false;
};

defineExpose({ init, onSubmitClick })
</script>
