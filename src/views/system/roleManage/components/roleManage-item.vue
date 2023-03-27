<template>
  <div class="container">
    <a-form ref="formRef" layout="vertical" :model="formData">
      <a-space direction="vertical" :size="16">
        <a-card class="general-card">
          <a-row :gutter="80">
            <a-col :span="24">
              <a-form-item
                :label="$t('roleManage.model.form.code')"
                field="code"
                :rules="[
                  {
                    required: true,
                    message: $t('roleManage.model.form.code.required'),
                  },
                ]"
                :validate-trigger="['change','input', 'blur']"
              >
                <a-input
                  v-model="formData.code"
                  :placeholder="
                    $t('roleManage.model.form.code.placeholder')
                  "
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item
                :label="$t('roleManage.model.form.name')"
                field="name"
                :rules="[
                  {
                    required: true,
                    message: $t('roleManage.model.form.name.required'),
                  },
                ]"
                :validate-trigger="['change','input', 'blur']"
              >
                <a-input
                  v-model="formData.name"
                  :placeholder="
                    $t('roleManage.model.form.name.placeholder')
                  "
                >
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <a-col :span="24">
              <a-form-item
                :label="$t('roleManage.model.form.sort')"
                field="sort"
                :rules="[
                  {
                    required: true,
                    message: $t('roleManage.model.form.sort.required'),
                  },
                ]"
                :validate-trigger="['change','input', 'blur']"
              >
                <a-input
                  v-model="formData.sort"
                  :placeholder="
                    $t('roleManage.model.form.sort.placeholder')
                  "
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item
                :label="$t('roleManage.model.form.locked')"
                field="locked"
                :rules="[
                  {
                    required: true,
                    message: $t('roleManage.model.form.locked.required'),
                  },
                ]"
                :validate-trigger="['change','input', 'blur']"
              >
                <a-select v-model="formData.locked" :trigger-props="{ autoFitPopupMinWidth: true }" :placeholder="$t('roleManage.model.form.locked.placeholder')">
                  <a-option value="0">未锁定</a-option>
                  <a-option value="1">已锁定</a-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item field="isDefault" :label="$t('roleManage.columns.isDefault')">
              <a-switch v-model="formData.isDefault">
                  <template #checked>
                      开
                  </template>
                  <template #unchecked>
                      关
                  </template>
              </a-switch>
          </a-form-item>
          <a-row :gutter="80">
            <a-col :span="24">
                <a-form-item
                :label="$t('roleManage.model.form.description')"
                field="description"
                >
                <a-textarea
                  v-model="formData.description"
                  :placeholder="$t('roleManage.model.form.description.placeholder')"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref,computed } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import useLoading from '@/hooks/loading';
  import { insert,update } from '@/api/roleManage';
  import { Message } from '@arco-design/web-vue';

  const props = defineProps(['refresh','renderData'])

  const formRef = ref<FormInstance>();
  const { loading, setLoading } = useLoading();

  const formData = computed(()=>{
      formRef.value?.clearValidate()
      return props.renderData;
  })

  const onSubmitClick = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
      setLoading(true);
      let result :any;
      if (formData.value.id) {
        result = await update(formData.value);
      } else {
        result = await insert(formData.value);
      }

      if (result.code === 200) {
        Message.success(result.message)
        props.refresh()
      } else {
        Message.error(result.message)
      }
      setLoading(false);
      return true
    }

    return false;
  };

  defineExpose({ onSubmitClick })
</script>

<script lang="ts">
  export default {
    name: 'Group',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 40px 20px;
    overflow: hidden;
  }

  .actions {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60px;
    padding: 14px 20px 14px 0;
    background: var(--color-bg-2);
    text-align: right;
  }
</style>
