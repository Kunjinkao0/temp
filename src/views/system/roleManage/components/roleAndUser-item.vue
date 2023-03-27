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
            <a-row :gutter="16">
              <a-col :span="10">
                <a-form-item
                  field="code"
                  :label="$t('roleManage.model.roleAndUser.userCode')"
                >
                  <a-input
                    v-model="formModel.code"
                    class="input-search"
                    :placeholder="$t('roleManage.model.form.userCode.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="10">
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
    <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button type="primary" @click="addUser()">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('roleManage.model.roleAndUser.create') }}
            </a-button>
          </a-space>
        </a-col>
    </a-row>
    <a-table
      row-key="id"
      :columns="(cloneColumns as TableColumnData[])"
      :pagination="pagination"
      :data="renderData"
      :bordered="false"
      :loading="form.loading"
      :show-header="form.tableHeader"
      :row-selection="rowSelection"
      @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #optional ="{ record }">
          <a-button type="text" size="small" @click="deleteUser({record})">
            {{ $t('roleManage.model.roleAndUser.operations.cancle') }}
          </a-button>
        </template>

        <!-- table空数据样式插槽 -->
        <template #empty>
          <div class="table-nodata">
              <a-image :src="nodataPic" :preview="false"></a-image>
          </div>
        </template>
    </a-table>
    <a-modal width="50%" v-model:visible="visible" @ok="handleOk" @cancel="handleCancel" draggable>
      <template #title>
        {{ $t('roleManage.model.userList.title') }}
      </template>
      <div>
        <UserPage ref="userPageRef" :refresh="search" :loading="loading" />
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import form from '@arco-design/web-vue/es/form';
  import nodataPic from '@/assets/images/no-data.png';
  import { IconPlus } from '@arco-design/web-vue/es/icon';
  import { ref,reactive,computed,watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import type {TableColumnData, TableRowSelection} from '@arco-design/web-vue/es/table/interface';
  import { Message } from '@arco-design/web-vue';
  import { Pagination } from '@/types/global';
  import cloneDeep from 'lodash/cloneDeep';
  import { RoleRecord, RoleParams,queryUserByRoleId,deleteRoleAndUserById } from '@/api/roleManage';
  import UserPage from './user_page.vue';

  const generateFormModel = () => {
    return {
      name: '',
      code: ''
    };
  };

  const { t } = useI18n();
  type Column = TableColumnData & { checked?: true };
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);
  const formModel = ref(generateFormModel());
  const renderData = ref<RoleRecord[]>([]);
  const { loading, setLoading } = useLoading(true);
  const visible = ref(false);
  const userPageRef = ref()

  const props = defineProps(['refresh','renderData'])
  const roleId = ref()

  const init = (id: string) => {
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
    showCheckedAll: true,
    onlyCurrent: false,
    checkStrictly: false,
  } as TableRowSelection);

  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('roleManage.model.roleAndUser.index'),
      dataIndex: 'index',
      slotName: 'index',
      align:'center',
    },
    {
      title: '',
      dataIndex: '',
      width: 100
    },
    {
      title: t('roleManage.model.roleAndUser.userCode'),
      dataIndex: 'code',
    },
    {
      title: '',
      dataIndex: '',
      width: 100
    },
    {
      title: t('roleManage.model.roleAndUser.userName'),
      dataIndex: 'name',
    },
    {
      title: t('roleManage.columns.operations'),
      dataIndex: 'operations',
      slotName: 'optional',
      align:'center',
    },
  ]);

  const fetchData = async (params) => {
    setLoading(true);
    try {
      params.id = roleId.value
      const { data } = await queryUserByRoleId(params);
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
    // fetchData({ ...basePagination, current });
  };


  const addUser = async () => {
    visible.value = true;
    userPageRef.value.init(roleId.value)
  }

  const handleOk = () => {
    userPageRef.value.onSubmitClick()
    visible.value = false;
  };
  const handleCancel = () => {
    visible.value = false;
  }

  const deleteUser = async (record: any) => {
    setLoading(true);
    const result: any = await deleteRoleAndUserById(record.record.id)
    if (result.code === 200) {
      Message.success(result.message)
      search()
    } else {
      Message.error(result.message)
    }
    setLoading(false);
  }

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

  defineExpose({ search,init })
</script>
