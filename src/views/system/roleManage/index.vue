<template>
  <div class="container">
    <Breadcrumb :items="['menu.sys', 'menu.sys.roleManage']" />
    <a-grid :cols="24" :colGap="12" :rowGap="16" class="grid-demo-grid">
        <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }">
            <div class="right-aside">
                <a-card class="card-list" :body-style="{padding:'20px 20px 4px 20px'}">
                    <!-- 搜索部分 -->
                    <a-row>
                      <a-col :flex="11">
                        <a-form
                          :model="formModel"
                          :label-col-props="{ span: 6 }"
                          :wrapper-col-props="{ span: 18 }"
                          label-align="left"
                        >
                          <a-row :gutter="16">
                            <a-col :span="8">
                              <a-form-item
                                field="name"
                                :label="$t('roleManage.form.name')"
                              >
                                <a-input
                                  class="input-search" v-model="formModel.name"
                                  :placeholder="$t('roleManage.form.name.placeholder')"
                                />
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
                            {{ $t('roleManage.form.reset') }}
                          </a-button>
                          <a-button type="primary" @click="search">
                            <template #icon>
                              <icon-search />
                            </template>
                            {{ $t('roleManage.form.search') }}
                          </a-button>
                        </a-space>
                      </a-col>
                    </a-row>
                </a-card>
                <a-card :body-style="{padding:'20px 20px 27px 20px'}" class="cu-mart16 card-list">
                  <a-row style="margin-bottom: 16px">
                    <a-col :span="12">
                      <a-space>
                        <a-button type="primary" v-permission="addRoles" @click="updateInfo(null)">
                          <template #icon>
                            <icon-plus />
                          </template>
                          {{ $t('roleManage.operation.create') }}
                        </a-button>
                      </a-space>
                    </a-col>
                    <a-col
                      :span="12"
                      style="display: flex; align-items: center; justify-content: end"
                    >
                      <a-tooltip :content="$t('userManage.actions.refresh')">
                        <div class="action-icon" @click="search"
                          ><icon-refresh size="18"
                        /></div>
                      </a-tooltip>
                      <a-dropdown @select="handleSelectDensity">
                        <a-tooltip :content="$t('roleManage.actions.density')">
                          <div class="action-icon"><icon-line-height size="18" /></div>
                        </a-tooltip>
                        <template #content>
                          <a-doption
                            v-for="item in densityList"
                            :key="item.value"
                            :value="item.value"
                            :class="{ active: item.value === size }"
                          >
                            <span>{{ item.name }}</span>
                          </a-doption>
                        </template>
                      </a-dropdown>
                      <a-tooltip :content="$t('roleManage.actions.columnSetting')">
                        <a-popover
                          trigger="click"
                          position="bl"
                          @popup-visible-change="popupVisibleChange"
                        >
                          <div class="action-icon"><icon-settings size="18" /></div>
                          <template #content>
                            <div id="tableSetting">
                              <div
                                v-for="(item, index) in showColumns"
                                :key="item.dataIndex"
                                class="setting"
                              >
                                <div style="margin-right: 4px; cursor: move">
                                  <icon-drag-arrow />
                                </div>
                                <div>
                                  <a-checkbox
                                    v-model="item.checked"
                                    @change="handleChange($event, item as TableColumnData, index)"
                                  >
                                  </a-checkbox>
                                </div>
                                <div class="title">
                                  {{ item.title === '#' ? '序列号' : item.title }}
                                </div>
                              </div>
                            </div>
                          </template>
                        </a-popover>
                      </a-tooltip>
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
                      <a-button v-permission="updateRoles" type="text" size="small" @click="updateInfo({record})">
                        {{ $t('roleManage.columns.operations.update') }}
                      </a-button>
                      <a-button v-permission="withUserRoles" type="text" size="small" @click="roleAndUserInfo({record})">
                        {{ $t('roleManage.columns.operations.addUser') }}
                      </a-button>
                      <a-button v-permission="withMenuRoles" type="text" size="small" @click="roleManageInfo({record})">
                        {{ $t('roleManage.columns.operations.roleManage') }}
                      </a-button>
                      <a-button v-permission="deleteRoles" type="text" size="small" @click="deleteRole({record})">
                        {{ $t('roleManage.columns.operations.delete') }}
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
    <a-modal width="auto" v-model:visible="visible" :on-before-ok = "okBefore" @ok="handleOk" @cancel="handleCancel" draggable>
      <template #title>
        {{ $t('roleManage.model.update.title') }}
      </template>
      <div>
        <RoleManageItem ref="roleManageItem" :refresh="search" :loading="loading" :render-data="currentData" />
      </div>
    </a-modal>

    <a-modal width="60%" v-model:visible="visible1" @ok="handleOk1" @cancel="handleCancel1" draggable>
      <template #title>
        {{ $t('roleManage.model.roleAndUser.title') }}
      </template>
      <div>
        <RoleAndUserItem ref="roleAndUserItem" :refresh="search" :loading="loading" />
      </div>
    </a-modal>
    <a-drawer width="25%" v-model:visible="visible2" @ok="handleOk2" @cancel="handleCancel1" draggable>
        <template #title>
          {{ $t('roleManage.model.roleManage.title') }}
        </template>
        <div>
          <RoleManage ref="roleManageRef" :refresh="search" :loading="loading"/>
        </div>
    </a-drawer>

  </div>
</template>

<script lang="ts" setup>
  import { computed, unref,ref, reactive, watch, nextTick,toRaw } from 'vue';
  import nodataPic from '@/assets/images/no-data.png';
  import { Message } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { queryRoleList, RoleRecord, RoleParams,deleteById,deleteByIds } from '@/api/roleManage';
  import { Pagination } from '@/types/global';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import Sortable from 'sortablejs';
  import { useBtnStore } from '@/store';
  import RoleManageItem from './components/roleManage-item.vue';
  import RoleAndUserItem from './components/roleAndUser-item.vue';
  import RoleManage from './components/roleManage.vue';

  // 按钮权限
  const deleteRoles = useBtnStore().getBtnRole('menu','delete')
  const updateRoles = useBtnStore().getBtnRole('menu','update')
  const addRoles = useBtnStore().getBtnRole('menu','add')
  const withMenuRoles = useBtnStore().getBtnRole('menu','withMenu')
  const withUserRoles = useBtnStore().getBtnRole('menu','withUser')
  const roleAndUserItem = ref()
  const roleManageItem = ref()
  const roleManageRef = ref()
  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };
  const visible = ref(false);
  const visible1 = ref(false);
  const visible2 = ref(false);

  const generateFormModel = () => {
    return {
      name: '',
    };
  };
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData = ref<RoleRecord[]>([]);
  const formModel = ref(generateFormModel());
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);
  const currentData:any = ref({})
  const currentData1:any = ref({})
  const currentData2:any = ref({})

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
      name: t('roleManage.size.mini'),
      value: 'mini',
    },
    {
      name: t('roleManage.size.small'),
      value: 'small',
    },
    {
      name: t('roleManage.size.medium'),
      value: 'medium',
    },
    {
      name: t('roleManage.size.large'),
      value: 'large',
    },
  ]);
  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('roleManage.columns.index'),
      dataIndex: 'index',
      slotName: 'index',
      align:'center',
      headerCellClass: 'table-header-cell',
      width:80,
    },
    {
      title: t('roleManage.columns.code'),
      dataIndex: 'code',
      width:250,
      ellipsis: true,
      tooltip: true,
      headerCellClass: 'table-header-cell',
    },
    {
      title: t('roleManage.columns.name'),
      dataIndex: 'name',
      ellipsis: true,
      tooltip: true,
      headerCellClass: 'table-header-cell',
    },
    {
      title: t('roleManage.columns.locked'),
      dataIndex: 'locked',
      align:'center',
      headerCellClass: 'table-header-cell',
    },
    {
      title: t('roleManage.columns.description'),
      dataIndex: 'description',
      ellipsis: true,
      tooltip: true,
      headerCellClass: 'table-header-cell',
    },
    {
      title: t('roleManage.columns.operations'),
      dataIndex: 'operations',
      slotName: 'optional',
      align:'center',
      width:350,
      headerCellClass: 'table-header-cell',
    },
  ]);
  const fetchData = async (
    params: RoleParams = { current: 1, pageSize: 10 }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryRoleList(params);
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
  const onPageChange = (current: number) => {
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

  const updateInfo = (record: any) =>{
    if (record) {
      if (record.record.isDefault === "true") {
          record.record.isDefault = true;
      } else {
          record.record.isDefault = false;
      }

      currentData.value = record.record
    }else{
      currentData.value = {
        id: '',
        code: '',
        name: '',
        sort: '',
        locked: '0',
        description: '',
      };
    }
    visible.value = true
  }

  const handleOk = () => {
    visible.value = false;
  };

  const okBefore = () => {
    return roleManageItem.value.onSubmitClick()
  }

  const handleCancel = () => {
    visible.value = false;
  }

  const roleAndUserInfo = (record) =>{
    currentData1.value = unref(record.record)
    visible1.value = true
    roleAndUserItem.value.init(currentData1.value.id)
  }

  const handleOk1 = () => {
    visible1.value = false;
  };
  const handleCancel1 = () => {
    visible1.value = false;
  }

  const roleManageInfo = (record: any) => {
    currentData2.value = record.record
    roleManageRef.value.init(record.record.id)
    visible2.value = true
  }

  const handleOk2 = () => {
    roleManageRef.value.onSubmitClick()
    visible2.value = false;
  };

  const handleCancel2 = () => {
    visible2.value = false;
  }

  const deleteRole = async (params: any) => {
    setLoading(true);
    try {
      const result: any = await deleteById(params.record.id);
      if (result.code === 200) {
        Message.success(result.message)
        search()
      } else {
        Message.error(result.message)
      }
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
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
    name: 'RoleManage',
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
