<template>
  <div class="container">
    <Breadcrumb :items="['menu.sys', 'menu.sys.userManage']" />
    <a-grid :cols="24">
        <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }">
            <div class="right-aside">
                <a-card class="card-list" :body-style="{padding:'20px 20px 4px 20px'}">
                  <!-- 搜索部分 -->
                  <a-row>
                    <a-col :flex="11">
                      <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }" label-align="left">
                        <a-row :gutter="16">
                          <a-col :span="8">
                            <a-form-item field="name" :label="$t('userManage.form.name')">
                              <a-input class="input-search" v-model="formModel.name" :placeholder="$t('userManage.form.name.placeholder')"/>
                            </a-form-item>
                          </a-col>
                          <a-col :span="8">
                            <a-form-item field="phone" :label="$t('userManage.form.phone')">
                              <a-input class="input-search" v-model="formModel.phone" :placeholder="$t('userManage.form.phone.placeholder')"/>
                            </a-form-item>
                          </a-col>
                          <a-col :span="8">
                            <a-form-item field="code" :label="$t('userManage.form.code')">
                              <a-input class="input-search" v-model="formModel.code" :placeholder="$t('userManage.form.code.placeholder')"/>
                            </a-form-item>
                          </a-col>
                        </a-row>
                      </a-form>
                    </a-col>
                    <a-divider :flex="5" style="height: 32px" direction="vertical" />
                    <a-col :flex="1">
                      <a-space size="small">
                        <a-button @click="reset">
                          <template #icon>
                            <icon-refresh />
                          </template>
                          {{ $t('userManage.form.reset') }}
                        </a-button>
                        <!-- 重置按钮 -->
                        <a-button type="primary" @click="search">
                          <template #icon>
                            <icon-search />
                          </template>
                          {{ $t('userManage.form.search') }}
                        </a-button>
                      </a-space>
                    </a-col>
                  </a-row>
                </a-card>
                <a-card :body-style="{padding:'20px 20px 27px 20px'}" class="cu-mart16 card-list">
                  <a-row style="margin-bottom: 16px">
                    <a-col :span="12">
                      <a-space>
                        <a-button type="primary" @click="synchronizationUser" v-permission="synchronizationRoles" >
                          <template #icon>
                            <icon-refresh />
                          </template>
                          {{ $t('userManage.operation.create') }}
                        </a-button>
                      </a-space>
                    </a-col>
                  </a-row>
                  <a-table
                    row-key="id"
                    :loading="loading"
                    :pagination="pagination"
                    :columns="(cloneColumns as TableColumnData[])"
                    :data="renderData"
                    :bordered="false"
                    :size="size"
                    :stripe="true"
                    @page-change="onPageChange"
                    @page-size-change="onPageSizeChange"
                  >
                    <template #index="{ rowIndex }">
                      {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
                    </template>
                    <template #optional ="{ record }">
                      <a-button v-permission="viewRoles" type="text" size="small" @click="userInfo({record})">
                        {{ $t('userManage.columns.operations.view') }}
                      </a-button>
                    </template>

                    <!-- table空数据样式插槽 -->
                    <template #empty>
                      <div class="table-nodata">
                          <a-image :src="nodataPic" :preview="false"></a-image>
                      </div>
                    </template>
                  </a-table>
                </a-card>
            </div>
        </a-grid-item>
    </a-grid>
    <a-modal width="30%" v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
      <template #title>
        {{ $t('userManage.model.title') }}
      </template>
      <div>
        <UserManageItem :loading="loading" :render-data="currentData" />
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch, nextTick } from 'vue';
  import nodataPic from '@/assets/images/no-data.png';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { queryUserList, UserRecord, UserParams,synchronization } from '@/api/userManage';
  import { Pagination } from '@/types/global';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import Sortable from 'sortablejs';
  import { useBtnStore } from '@/store';
  import UserManageItem from './components/userManage-item.vue';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };
  const visible = ref(false);
  const synchronizationRoles = useBtnStore().getBtnRole('userCode','synchronization')
  const viewRoles = useBtnStore().getBtnRole('userCode','view')

  const generateFormModel = () => {
    return {
      name: '',
      phone: '',
      code: '',
    };
  };
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData = ref<UserRecord[]>([]);
  const formModel = ref(generateFormModel());
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);
  const currentData = ref({})

  const size = ref<SizeProps>('medium');

  const basePagination: Pagination = {
    current: 1,
    pageSize: 10,
    showTotal: true,
    showPageSize: true
  };
  const pagination = reactive({
    ...basePagination,
  });
  const densityList = computed(() => [
    {
      name: t('userManage.size.mini'),
      value: 'mini',
    },
    {
      name: t('userManage.size.small'),
      value: 'small',
    },
    {
      name: t('userManage.size.medium'),
      value: 'medium',
    },
    {
      name: t('userManage.size.large'),
      value: 'large',
    },
  ]);
  const columns = computed<TableColumnData[]>(() => [
    {
        title: t('userManage.columns.index'),
        dataIndex: 'index',
        width:80,
        slotName: 'index',
        align:'center',
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('userManage.columns.code'),
        dataIndex: 'code',
        ellipsis: true,
        tooltip: true,
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('userManage.columns.name'),
        dataIndex: 'name',
        slotName: 'name',
        ellipsis: true,
        tooltip: true,
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('userManage.columns.phone'),
        dataIndex: 'phone',
        ellipsis: true,
        tooltip: true,
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('userManage.columns.operations'),
        dataIndex: 'operations',
        slotName: 'optional',
        align:'center',
        headerCellClass: 'table-header-cell',
        width:100,
    },
  ]);
  const fetchData = async (
    params: UserParams = { current: 1, pageSize: 10 }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryUserList(params);
      renderData.value = data.records;
      pagination.current = params.current;
      pagination.total = data.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const synchronizationUser = async ()=>{
    setLoading(true);
    try {
      await synchronization();
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }

    search()
  };

  const search = () => {
    fetchData({
      ...basePagination,
      ...formModel.value,
    } as unknown as UserParams);
  };
  const onPageChange = (current: number) => {
    // basePagination.current = current
    // search()
	fetchData({
	    ...formModel.value,
	    'current': current,
	    'pageSize': pagination.pageSize
	});
  };

  fetchData();
  const reset = () => {
    formModel.value = generateFormModel();
  };

  const handleSelectDensity = (
    val: string | number | Record<string, any> | undefined,
    e: Event
  ) => {
    size.value = val as SizeProps;
  };

  const handleChange = (
    checked: boolean | (string | boolean | number)[],
    column: Column,
    index: number
  ) => {
    if (!checked) {
      cloneColumns.value = showColumns.value.filter(
        (item) => item.dataIndex !== column.dataIndex
      );
    } else {
      cloneColumns.value.splice(index, 0, column);
    }
  };

  const exchangeArray = <T extends Array<any>>(
    array: T,
    beforeIdx: number,
    newIdx: number,
    isDeep = false
  ): T => {
    const newArray = isDeep ? cloneDeep(array) : array;
    if (beforeIdx > -1 && newIdx > -1) {
      // 先替换后面的，然后拿到替换的结果替换前面的
      newArray.splice(
        beforeIdx,
        1,
        newArray.splice(newIdx, 1, newArray[beforeIdx]).pop()
      );
    }
    return newArray;
  };

  const popupVisibleChange = (val: boolean) => {
    if (val) {
      nextTick(() => {
        const el = document.getElementById('tableSetting') as HTMLElement;
        const sortable = new Sortable(el, {
          onEnd(e: any) {
            const { oldIndex, newIndex } = e;
            exchangeArray(cloneColumns.value, oldIndex, newIndex);
            exchangeArray(showColumns.value, oldIndex, newIndex);
          },
        });
      });
    }
  };

  const userInfo = (record: any) =>{
    currentData.value = record
    visible.value = true
  }

  const handleOk = () => {
    visible.value = false;
  };
  const handleCancel = () => {
    visible.value = false;
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

  // pageSize改变
  const onPageSizeChange = (pageSize: number) => {
    pagination.pageSize=pageSize;
    basePagination.pageSize=pageSize;
    search();
  };
</script>

<script lang="ts">
  export default {
    name: 'UserManage',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
  .action-icon {
    margin-left: 12px;
    cursor: pointer;
  }
  .active {
    color: #0960bd;
    background-color: #e3f4fc;
  }
  .setting {
    display: flex;
    align-items: center;
    width: 200px;
    .title {
      margin-left: 12px;
      cursor: pointer;
    }
  }
</style>
