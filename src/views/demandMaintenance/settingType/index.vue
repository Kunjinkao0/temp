<template>
    <div class="container">
        <Breadcrumb :items="['menu.demand.maintenance', 'menu.settingType.title']" />
        <a-card class="general-card card-list" :body-style="{padding:'20px 20px 4px 20px'}" >
            <!-- 搜索部分 -->
            <a-row>
                <a-col :flex="11">
                    <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }"
                        label-align="left">
                        <a-row :gutter="16">
                            <a-col :span="8">
                                <!-- 电梯名称 -->
                                <a-form-item field="elevatorName" :label="$t('menu.settingType.typeName')"
                                    label-col-flex="60px">
                                    <a-input v-model="formModel.name" class="input-search"
                                        :placeholder="$t('menu.settingType.typeName.placeholder')" allow-clear/>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-form>
                </a-col>
                <a-divider :flex="5" style="height: 32px" direction="vertical" />
                <a-col :flex="1">
                    <a-space size="small">
                        <!-- 重置按钮 -->
                        <a-button class="cu-marl16" @click="reset">
                            <template #icon>
                                <icon-refresh />
                            </template>
                            {{ $t('form.reset') }}
                        </a-button>
                        <!-- 查询按钮 -->
                        <a-button type="primary" @click="search">
                            <template #icon>
                                <icon-search />
                            </template>
                            {{ $t('form.search') }}
                        </a-button>
                    </a-space>
                </a-col>
            </a-row>
        </a-card>
        <a-card class="cu-mart16 card-list">
            <a-row class="cu-marb16">
                <a-col :span="12">
                    <a-space>
                        <a-button type="primary" @click="gotoAdd">
                            <template #icon>
                                <icon-plus />
                            </template>
                            {{ $t('menu.settingType.set.add') }}
                        </a-button>
                        <a-button type="primary" @click="deleteFunc">
                            <template #icon>
                                <icon-delete />
                            </template>
                            <template #default>{{ $t('menu.settingType.set.delete') }}</template>
                        </a-button>
                    </a-space>
                </a-col>
            </a-row>
            <!-- table部分 -->
            <a-table :bordered="false" row-key="id" :loading="loading" :pagination="pagination" :columns="cloneColumns" :data="renderData" :stripe="true"
                @page-change="onPageChange" :row-selection="rowSelection" v-model:selectedKeys="selectedKeys" @page-size-change="onPageSizeChange">
                <template #index="{ rowIndex }">
                    {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
                </template>
                <template #state="{ record }">
                    <a-switch :default-checked="record.status === 1 ? true : false" checked-value='1' unchecked-value='2'
                        @change="switchChange($event, record)">
                        <template #checked>
                            ON
                        </template>
                        <template #unchecked>
                            OFF
                        </template>
                    </a-switch>
                </template>
                <template #operate="{ record }">
                    <a-button type="text" size="small" @click="goto(record)">
                        {{ $t('table.set') }}
                    </a-button>
                </template>
            </a-table>
        </a-card>
    </div>
</template>

<script setup lang='ts'>
import { ref, computed, onMounted, reactive, watch, onActivated } from 'vue';
import { useI18n } from 'vue-i18n';
import { querySettingTypeList, QueryRecordParams, QueryParams, updateSettingType, deleteSettingType } from '@/api/demandMaintenance/settingType';
import { Pagination } from '@/types/global';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import useLoading from '@/hooks/loading';
import cloneDeep from 'lodash/cloneDeep';
import { useRouter } from "vue-router";
import { Message } from '@arco-design/web-vue';
import { useBtnStore } from '@/store';

const switchVal = ref(0)

// 国际化
const { t } = useI18n();

/**
 * 搜索框部分
 */
// 搜索框结构定义
const generateFormModel = () => {
    return {
        name: '',
    };
};
const formModel = ref(generateFormModel());

// 搜索方法
const search = () => {
    fetchData({
        'page': 1,
        'size': pagination.pageSize,
        ...formModel.value,
    } as any);
};

// 重置方法
const reset = () => {
    formModel.value = generateFormModel();
};

/**
 * table部分
 */
const { loading, setLoading } = useLoading(true);
// 定义表格结构
const renderData = ref<QueryRecordParams[]>([]);
type Column = TableColumnData & { checked?: true };
const cloneColumns = ref<Column[]>([]);
const showColumns = ref<Column[]>([]);

const selectedKeys = ref([]);
// 开启table checkbox
const rowSelection: any = reactive({
    type: 'checkbox',
    showCheckedAll: true,
    onlyCurrent: false,
    checkStrictly: false,
});

// 定义分页
const pagination: Pagination = reactive({
    current: 1,
    pageSize: 10,
    showTotal: true,
    showPageSize: true
});

// 定义表格列
const columns = computed<TableColumnData[]>(() => [
    {
        title: t('table.index'),
        dataIndex: 'index',
        width:80,
        slotName: 'index',
        align: 'center',
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.settingType.table.typeName'),
        dataIndex: 'name',
        align: 'center',
        ellipsis: true,
        tooltip: true,
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.settingType.table.typeNote'),
        dataIndex: 'description',
        align: 'center',
        ellipsis: true,
        tooltip: true,
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.settingType.table.setTime'),
        dataIndex: 'lastModifyTime',
        align: 'center',
        width: 180,
        ellipsis: true,
        tooltip: true,
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.settingType.table.state'),
        dataIndex: 'status',
        slotName: 'state',
        align: 'center',
        headerCellClass: 'table-header-cell',
        width: 120
    },
    {
        title: t('table.operate'),
        dataIndex: 'operate',
        slotName: 'operate',
        align: 'center',
        fixed: 'right',
        headerCellClass: 'table-header-cell',
        width: 80
    }
]);

// 查询表格数据
const fetchData = async (
    params: QueryParams = { page: 1, size: 10 }
) => {
    setLoading(true);
    try {
        const { data } = await querySettingTypeList(params);
        renderData.value = data.rows;
        pagination.current = params.page;
        pagination.total = data.total;
    } catch (err) {
        // you can report use errorHandler or other
    } finally {
        setLoading(false);
    }
};

fetchData()

// page改变
const onPageChange = (page: number) => {
    // fetchData({ ...basePagination, current });
    fetchData({
        ...formModel.value,
        'page': page,
        'size': pagination.pageSize
    });
};

// 批量编辑
const visible = ref(false);
const editFun = () => {
    if (!selectedKeys.value.length) {
        Message.error(t('menu.mainWork.delete.validate1'));
        return;
    }
    visible.value = true;
}

// 列表开关滑动
const switchChange = async (event, record) => {
    setLoading(true);
    try {
        const param = {
            id: record.id,
            status: event
        }
        await updateSettingType(param);
        search()
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

/**
 * 跳转到详情页
 */
const router = useRouter()
const goto = (record: any) => {
    router.push({
        name: 'SettingTypeDetail',
        query: {
            id: record.id
        }
    })
}

const gotoAdd = () => {
    router.push({
        name: 'SettingTypeAdd'
    })
}

const deleteFunc = async () => {
    if (!selectedKeys.value.length) {
        Message.error(t('menu.mainWork.delete.validate1'));
        return;
    }

    setLoading(true);
    try {
        let ids = [];
        selectedKeys.value.forEach(function (item) {
            ids.push(item.toString());
        });
        const param = {
            id: ids
        }
      await deleteSettingType(param);
      Message.success('删除成功')
    } catch (err) {
      // 这得提示用接口返回的文字
      Message.error('删除失败')
    } finally {
      setLoading(false);
      search();
    }
}

onActivated(() => {
    search();
});

// pageSize改变
const onPageSizeChange = (pageSize: number) => {
  pagination.pageSize=pageSize;
  search();
};

</script>

<script lang="ts">
  export default {
    name: 'SettingType',
  };
</script>

<style scoped lang='less'>
.container {
    padding: 0 20px 20px 20px;
    height: 100%;
}

.left-aside {
    width: 260px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: hidden;
    padding: 24px;
    background-color: var(--color-bg-2);
    border-radius: 4px;
    overflow: auto;
}

.right-aside {
    flex: 1;
    border-radius: 4px;
    overflow: auto;
}

:deep(.panel-border) {
    margin-bottom: 0;
    border-bottom: 1px solid rgb(var(--gray-2));
}

.in-collapse {
    width: 44px;
    color: #165DFF;
    margin-left: 16px;
}

.in-collapse-icon {
    color: #165DFF;
    width: 10px
}
</style>
