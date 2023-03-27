<template>
    <div class="container">
        <Breadcrumb :items="['menu.sys', 'menu.sys.menuManage']" />
        <a-grid :cols="24" :colGap="12" :rowGap="16" class="grid-demo-grid">
            <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }">
                <div class="right-aside">
                    <a-card class="card-list" :body-style="{padding:'20px 20px 4px 20px'}">
                        <!-- 搜索部分 -->
                        <a-row>
                            <a-col :flex="11">
                                <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }"
                                    label-align="left">
                                    <a-row :gutter="16">
                                        <a-col :span="8">
                                            <a-form-item field="name" :label="$t('menuManage.form.name')">
                                                <a-input class="input-search" v-model="formModel.name"
                                                    :placeholder="$t('menuManage.form.name.placeholder')" />
                                            </a-form-item>
                                        </a-col>
                                        <a-col :span="8">
                                            <a-form-item field="code" :label="$t('menuManage.form.code')">
                                                <a-input class="input-search" v-model="formModel.code"
                                                    :placeholder="$t('menuManage.form.code.placeholder')" />
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
                                        {{ $t('menuManage.form.reset') }}
                                    </a-button>
                                    <a-button type="primary" @click="search">
                                        <template #icon>
                                            <icon-search />
                                        </template>
                                        {{ $t('menuManage.form.search') }}
                                    </a-button>
                                </a-space>
                            </a-col>
                        </a-row>
                    </a-card>
                    <a-card :body-style="{padding:'20px 20px 27px 20px'}" class="cu-mart16 card-list">
                        <a-row style="margin-bottom: 16px">
                            <a-col :span="12">
                                <a-space>
                                    <a-button type="primary" v-permission="addRoles" @click="addOrUpdateInfo(null)">
                                        <template #icon>
                                            <icon-plus />
                                        </template>
                                        {{ $t('menuManage.operation.create') }}
                                    </a-button>
                                </a-space>
                            </a-col>
                        </a-row>
                        <a-table row-key="id" :loading="loading" :pagination="false" :columns="(cloneColumns as TableColumnData[])"
                            :data="renderData" :bordered="false" :size="size" v-model:expandedKeys="expandedKeys" :stripe="true"
                            :hide-expand-button-on-empty="true" :row-selection="rowSelection">
                            <template #contentType="{ record }">
                                <a-tag
                                    :color="record.type == 1 ? 'cyan' : record.type == 2 ? 'blue' : record.type == 3 ? 'orangered' : ''"
                                    size="small">
                                    {{ record.type == 1 ? '一级菜单' : record.type == 2 ? '子菜单' : record.type == 3 ? '按钮' : '' }}
                                </a-tag>
                            </template>

                            <template #optional="{ record }">
                                <a-button v-permission="updateRoles" type="text" size="small" @click="addOrUpdateInfo({ record })">
                                    {{ $t('menuManage.columns.operations.update') }}
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
        <a-modal width="auto" v-model:visible="visible" :on-before-ok="okBefore" @ok="handleOk" @cancel="handleCancel">
            <template #title>
                {{ $t('menuManage.model.title') }}
            </template>
            <div>
                <MenuManageItem ref="menuManageItem" :refresh="search" :loading="loading" :render-data="currentData" />
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, watch, nextTick } from 'vue';
import nodataPic from '@/assets/images/no-data.png';
import { Message } from '@arco-design/web-vue';
import { useI18n } from 'vue-i18n';
import useLoading from '@/hooks/loading';
import { useBtnStore } from '@/store';
import { queryMenuTableList, MenuRecord, deleteMenuById } from '@/api/menuManage';
import type {TableColumnData, TableRowSelection} from '@arco-design/web-vue/es/table/interface';
import { IconSearch, IconRefresh, IconPlus, IconLineHeight, IconSettings, IconDragArrow } from '@arco-design/web-vue/es/icon';
import cloneDeep from 'lodash/cloneDeep';
import Sortable from 'sortablejs';
import MenuManageItem from './components/menuManage-item.vue';

// 按钮权限
const deleteRoles = useBtnStore().getBtnRole('menu','delete')
const updateRoles = useBtnStore().getBtnRole('menu','update')
const addRoles = useBtnStore().getBtnRole('menu','add')
type SizeProps = 'mini' | 'small' | 'medium' | 'large';
type Column = TableColumnData & { checked?: true };
const visible = ref(false);
const menuManageItem = ref()

const generateFormModel = () => {
  return {
      name: '',
      code: ''
  };
};
const expandedKeys = ref([]);
const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  checkStrictly: true
} as TableRowSelection);
const { loading, setLoading } = useLoading(true);
const { t } = useI18n();
const renderData = ref<MenuRecord[]>([]);
const formModel = ref(generateFormModel());
const cloneColumns = ref<Column[]>([]);
const showColumns = ref<Column[]>([]);
const currentData = ref({})

const size = ref<SizeProps>('medium');

const densityList = computed(() => [
  {
      name: t('menuManage.size.mini'),
      value: 'mini',
  },
  {
      name: t('menuManage.size.small'),
      value: 'small',
  },
  {
      name: t('menuManage.size.medium'),
      value: 'medium',
  },
  {
      name: t('menuManage.size.large'),
      value: 'large',
  },
]);
const columns = computed<TableColumnData[]>(() => [
  {
      title: t('menuManage.columns.name'),
      dataIndex: 'name',
      ellipsis: true, 
      tooltip: true,
      align: 'center',
      headerCellClass: 'table-header-cell',
  },
  {
      title: t('menuManage.columns.code'),
      ellipsis: true, 
      tooltip: true,
      dataIndex: 'code',
      headerCellClass: 'table-header-cell',
  },
  {
      title: t('menuManage.columns.type'),
      dataIndex: 'type',
      align: 'center',
      ellipsis: true, 
      tooltip: true,
      headerCellClass: 'table-header-cell',
      slotName: 'contentType',
  },
  {
      title: t('menuManage.columns.icon'),
      dataIndex: 'icon',
      ellipsis: true, 
      tooltip: true,
      headerCellClass: 'table-header-cell',
  },
  {
      title: t('menuManage.columns.accessPath'),
      dataIndex: 'accessPath',
      ellipsis: true, 
      tooltip: true,
      headerCellClass: 'table-header-cell',
  },
  {
      title: t('menuManage.columns.modulePath'),
      dataIndex: 'modulePath',
      ellipsis: true, 
      tooltip: true,
      align: 'center',
      headerCellClass: 'table-header-cell',
  },
  {
      title: t('menuManage.columns.operations'),
      dataIndex: 'operations',
      slotName: 'optional',
      width:100,
      align: 'center',
      headerCellClass: 'table-header-cell',
  },
]);
const fetchData = async (
  params: MenuRecord = {
      id: '',
      parentId: '',
      name: '',
      code: '',
      accessPath: '',
      modulePath: '',
      icon: '',
      hideInMenu: '',
      ignoreCache: '',
  }
) => {
  setLoading(true);
  try {
      const { data } = await queryMenuTableList(params);
      renderData.value = data;
  } catch (err) {
      // you can report use errorHandler or other
  } finally {
      setLoading(false);
  }
};

const search = () => {
  fetchData({
      ...formModel.value,
  } as unknown as MenuRecord);
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

const addOrUpdateInfo = (record: any) => {
  if (record) {
      if (record.record.hideInMenu === "true") {
          record.record.hideInMenu = true;
      } else {
          record.record.hideInMenu = false;
      }
      if (record.record.ignoreCache === "true") {
          record.record.ignoreCache = true;
      } else {
          record.record.ignoreCache = false;
      }

      currentData.value = record.record;
      menuManageItem.value.init(record.record.type)
  } else {
      currentData.value = {
          code: '',
          name: '',
          parentId: '',
          accessPath: '',
          modulePath: '',
          icon: '',
          orderId: 0,
          type: '1',
          hideInMenu: false,
          ignoreCache: false,
      };
      menuManageItem.value.init('1')
  }
  visible.value = true
}

const handleOk = () => {
  visible.value = false;
};

const okBefore = () => {
  return menuManageItem.value.onSubmitClick()
}

const handleCancel = () => {
  visible.value = false;
}

const deleteMenu = async (params: any) => {
  setLoading(true);
  try {
      const result: any = await deleteMenuById(params.record.id);
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
</script>

<script lang="ts">
export default {
  name: 'MenuManage',
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
