<template>
    <div>
        <a-modal width="600" v-model:visible="visible" :okText="$t('menu.archives.save')" @ok="handleSave"
            @cancel="handleCancel" :on-before-ok="handleBeforeOk">
            <template #title>
                {{ title }}
            </template>
            <div>
                <a-form :model="form" :disabled="disabled">
                    <a-form-item field="registCode" :label="$t('menu.archives.registCode')">
                        <a-input v-model="form.registCode" />
                    </a-form-item>
                    <a-form-item field="elevatorName" :label="$t('menu.archives.elevatorName')">
                        <a-input v-model="form.elevatorName" />
                    </a-form-item>
                    <a-form-item field="address" :label="$t('menu.archives.address')">
                        <a-input v-model="form.address" />
                    </a-form-item>
                    <!-- <a-form-item field="use" :label="$t('menu.archives.use')">
                        <a-select v-model="form.use" :options="useTypeOptions"
                            :placeholder="$t('menu.archives.select.placeholder')" />
                    </a-form-item> -->
                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import { Message } from '@arco-design/web-vue';

const { t } = useI18n();

const title = ref("");
const visible = ref(false);
const form = reactive({
    id: '',
    registCode: '',
    elevatorName: '',
    address: '',
    use: '',
    ownerIds: '',
    typeName: '',
    maintainName: '',
    propertyName: '',
});

const disabled = ref(false);

// 使用场所下拉框
const useTypeOptions = computed<SelectOptionData[]>(() => [
    {
        label: t('menu.archives.use.1'),
        value: '1',
    },
    {
        label: t('menu.archives.use.2'),
        value: '2',
    },
    {
        label: t('menu.archives.use.3'),
        value: '3',
    }
]);

// 打开Modal
const openModal = (record, type) => {
    visible.value = true;
    if (type === "add") { // 新增
        form.id = '';
        form.registCode = '';
        form.elevatorName = '';
        form.address = '';
        form.use = '';
        disabled.value = false;
        title.value = t('menu.archives.add');
    } else { // 修改、查看
        if (record) {
            form.id = record.id;
            form.registCode = record.registCode;
            form.elevatorName = record.elevatorName;
            form.address = record.address;
            form.use = `${record.use}`;
        }
        if (type === "edit") {
            disabled.value = false;
            title.value = t('menu.archives.edit');
        } else {
            disabled.value = true;
            title.value = t('menu.archives.view');
        }
    }

};

// 保存前验证
const handleBeforeOk = () => {
    if (!form.registCode) {
        Message.error(t('menu.archives.registCode.placeholder'));
        return false;
    }

    return true;
}

// 保存
const handleSave = async () => {
    visible.value = false;
    emits("reload"); // 重新加载父组件table数据
    Message.success(t('menu.archives.success'));
};

const handleCancel = () => {
    visible.value = false;
}

const emits = defineEmits<{
	(event: 'reload'): void // 标签值改变
}>()

defineExpose({ openModal }); // 暴露方法

</script>

<style scoped lang='scss'>

</style>
