<template>
    <div class="container">
      <a-row>
          <a-col :flex="5">
            <a-form
              :model="formModel"
              :label-col-props="{ span: 6 }"
              :wrapper-col-props="{ span: 18 }"
              label-align="left"
            >
              <a-row :gutter="24">
                <a-col :span="12">
                  <a-form-item
                    field="code"
                    :label="$t('roleManage.model.form.userCode')"
                  >
                    <a-input
                      v-model="formModel.code"
                      class="input-search"
                      :placeholder="$t('roleManage.model.form.userCode.placeholder')"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                <a-form-item
                  field="name"
                  :label="$t('roleManage.model.form.userName')"
                >
                  <a-input
                    v-model="formModel.name"
                    class="input-search"
                    :placeholder="$t('roleManage.model.form.userName.placeholder')"
                  />
                </a-form-item>
              </a-col>
              </a-row>
            </a-form>
          </a-col>
          <a-divider style="height: 34px" direction="vertical" />
          <a-col :flex="1" style="text-align: right">
            <a-space :size="18">
              <a-button type="primary" @click="search">
                <template #icon>
                  <icon-search />
                </template>
                {{ $t('roleManage.form.search') }}
              </a-button>
              <a-button @click="reset">
                <template #icon>
                  <icon-refresh />
                </template>
                {{ $t('roleManage.form.reset') }}
              </a-button>
            </a-space>
          </a-col>
        </a-row>
        <a-divider style="margin-top: 0" />
        <a-table
          row-key="id"
          :columns="(cloneColumns as TableColumnData[])"
          :pagination="pagination"
          :data="renderData"
          :bordered="false"
          :hoverable="form.hover"
          :stripe="form.stripe"
          :loading="form.loading"
          :show-header="form.tableHeader"
          :row-selection="rowSelection"
          @page-change="onPageChange"
          v-model:selectedKeys="selectedKeys"
        >
            <template #index="{ rowIndex }">
              {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
            </template>
            
            <!-- table空数据样式插槽 -->
            <template #empty>
              <div class="table-nodata">
                  <a-image :src="nodataPic" :preview="false"></a-image>
              </div>
            </template>
        </a-table>

    </div>
  </template>
  
  <script lang="ts" setup>
    import form from '@arco-design/web-vue/es/form';
    import nodataPic from '@/assets/images/no-data.png';
    import { ref,reactive,computed,watch } from 'vue';
    import { useI18n } from 'vue-i18n';
    import useLoading from '@/hooks/loading';
    import type {TableColumnData, TableRowSelection} from '@arco-design/web-vue/es/table/interface';
    import { Message } from '@arco-design/web-vue';
    import { Pagination } from '@/types/global';
    import cloneDeep from 'lodash/cloneDeep';
    import { RoleRecord, RoleParams,queryUserNotInRole,addRoleAndUser } from '@/api/roleManage';
  
    const generateFormModel = () => {
      return {
        name: '',
        code: ''
      };
    };
  
    const { t } = useI18n();
    const props = defineProps(['refresh'])
    type Column = TableColumnData & { checked?: true };
    const cloneColumns = ref<Column[]>([]);
    const showColumns = ref<Column[]>([]);
    const formModel = ref(generateFormModel());
    const renderData = ref<RoleRecord[]>([]);
    const { loading, setLoading } = useLoading(true);
    const roleId = ref()
    const selectedKeys = ref([]);

    const init = (id: string) =>{
      selectedKeys.value=[]
      roleId.value = id
      search()
    }

    const basePagination: Pagination = {
      current: 1,
      pageSize: 10,
    };
    const pagination = reactive({
      ...basePagination,
    });
  
    const reset = () => {
      formModel.value = generateFormModel();
    };
  
    const rowSelection = reactive({
      type: 'checkbox',
      showCheckedAll: true
    } as TableRowSelection);
  
    const columns = computed<TableColumnData[]>(() => [
      {
        title: t('roleManage.model.roleAndUser.index'),
        dataIndex: 'index',
        slotName: 'index',
        align:'center',
      },
      {
        title: t('roleManage.model.roleAndUser.userCode'),
        dataIndex: 'code',
        align:'center',
      },
      {
        title: t('roleManage.model.roleAndUser.userName'),
        dataIndex: 'name',
        align:'center',
      },
    ]);
  
    const fetchData = async (params) => {
      setLoading(true);
      try {
        params.id = roleId.value
        const { data } = await queryUserNotInRole(params);
        renderData.value = data.records;
        pagination.current = params.current;
        pagination.total = data.total;
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false);
      }
    };
  
    const search = () => {
      fetchData({
        ...basePagination,
        ...formModel.value,
      } as unknown as RoleParams);
    };
  
    fetchData({
        ...basePagination,
      } as unknown as RoleParams);
  
    const onPageChange = (current: number) => {
      fetchData({
          ...formModel.value,
          'current': current,
          'pageSize': pagination.pageSize
      });
    };

    const onSubmitClick = async () => {
      setLoading(true);

      const result: any = await addRoleAndUser(selectedKeys.value,roleId.value);
      if (result.code === 200) {
        Message.success(result.message)
        props.refresh()
      } else {
        Message.error(result.message)
      }
      setLoading(false);
    };
  
    watch(
      () => columns.value,
      (val) => {
        cloneColumns.value = cloneDeep(val);
        cloneColumns.value.forEach((item, index) => {
          item.checked = true;
        });
        showColumns.value = cloneDeep(cloneColumns.value);
      },
      { deep: true, immediate: true }
    );

    defineExpose({ init,onSubmitClick })
  
  </script>
