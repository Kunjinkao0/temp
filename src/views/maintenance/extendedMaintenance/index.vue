<template>
    <div class="container cu-flex-y">
        <Breadcrumb :items="['menu.maintenance', 'menu.maintenance.extendedMaintenance']" />
        <div class="cu-flex">
            <div class="right-aside">
                <a-card class="card-list" :body-style="{padding:'20px 20px 4px 20px'}">
                    <!-- 搜索部分 -->
                    <a-row>
                        <a-col :flex="5">
                            <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }"
                                label-align="left">
                                <a-row :gutter="16">
                                    <a-col :span="8">
                                        <!-- 电梯名称 -->
                                        <a-form-item field="elevatorName"
                                            :label="$t('menu.maintenance.extendedMaintenance.elevatorName')"
                                            label-col-flex="60px">
                                            <a-input v-model="formModel.elevatorName" class="input-search"
                                                :placeholder="$t('menu.maintenance.extendedMaintenance.elevatorName.placeholder')" allow-clear/>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="8">
                                        <!-- 维保单位 -->
                                        <a-form-item field="maintenanceUnit"
                                            :label="$t('menu.maintenance.extendedMaintenance.maintenanceUnit')"
                                            label-col-flex="60px">
                                            <a-input v-model="formModel.maintainName" class="input-search"
                                                :placeholder="$t('menu.maintenance.extendedMaintenance.maintenanceUnit.placeholder')" allow-clear/>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="8">
                                        <!-- 使用单位 -->
                                        <a-form-item field="maintenanceUnit"
                                            :label="$t('menu.maintenance.extendedMaintenance.useUnit')"
                                            label-col-flex="60px">
                                            <a-input v-model="formModel.propertyName" class="input-search"
                                                :placeholder="$t('menu.maintenance.extendedMaintenance.useUnit.placeholder')" allow-clear/>
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                            </a-form>
                        </a-col>
                        <a-col :flex="1">
                            <div class="cu-fx">
                                <a-divider style="height: 32px" direction="vertical" />
                                <!-- 重置按钮 -->
                                <a-button @click="reset">
                                    <template #icon>
                                        <icon-refresh />
                                    </template>
                                    {{ $t('searchTable.form.reset') }}
                                </a-button>
                                <!-- 查询按钮 -->
                                <a-button class="cu-marl16" type="primary" @click="search">
                                    <template #icon>
                                        <icon-search />
                                    </template>
                                    {{ $t('searchTable.form.search') }}
                                </a-button>
                                
                            </div>
                        </a-col>
                    </a-row>
                </a-card>
                <a-card class="cu-mart16 card-list">
                    <a-row class="cu-marb16">
                    </a-row>
                    <!-- table部分 -->
                    <a-table :bordered="false" row-key="id" :loading="loading" :pagination="pagination" :columns="cloneColumns" :stripe="true"
                        :data="renderData" @page-change="onPageChange" @page-size-change="onPageSizeChange">
                        <template #index="{ rowIndex }">
                            {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
                        </template>
                        <template #extendedMaintenance="{ record }">
                            <div v-if="record.overTime">
                                <a-space size="mini">
                                    <img :src="icon5" alt="" />
                                    <span>{{ record.overTime }} 天</span>
                                </a-space>
                            </div>
                            <div v-else>
                                {{ $t('menu.maintenance.extendedMaintenance.none') }}
                            </div>
                        </template>
                        <template #operate="{ record }">
                            <a-button class="table-operate-btn" type="text" @click="goto(record)">
                                {{ $t('menu.maintenance.extendedMaintenance.view') }}
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
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch,toRaw } from "vue";
import nodataPic from '@/assets/images/no-data.png';
import icon5 from '@/assets/images/archives/icon-5.png'
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n';
import { getMainOverTimeList, QueryRecordParams, QueryParams } from '@/api/maintenance/extendedMaintenance';
import { Pagination } from '@/types/global';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import useLoading from '@/hooks/loading';
import cloneDeep from 'lodash/cloneDeep';

// 国际化
const { t } = useI18n();

onMounted(() => {
    // ajax获取树数据
    search();
});

// 搜索框结构定义
const generateFormModel = () => {
    return {
        elevatorName: '',
        maintainName: '',
        propertyName: '',
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
        width:60,
        slotName: 'index',
		ellipsis: true,
        align: 'center',
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.maintenance.extendedMaintenance.elevatorName'),
        dataIndex: 'elevatorName',
        ellipsis: true,
        align: 'center',
        tooltip: true,
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.maintenance.extendedMaintenance.useUnit'),
        dataIndex: 'propertyName',
        ellipsis: true,
        tooltip: true,
        align: 'center',
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.maintenance.extendedMaintenance.maintenanceUnit'),
        dataIndex: 'maintainName',
        ellipsis: true,
        tooltip: true,
        align: 'center',
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.maintenance.extendedMaintenance.plannedMaintenanceTime'),
        dataIndex: 'planDate',
        ellipsis: true,
        tooltip: true,
        align: 'center',
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.maintenance.extendedMaintenance'),
        dataIndex: 'overTime',
        slotName: 'extendedMaintenance',
        align: 'center',
        ellipsis: true,
        tooltip: true,
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.archives.operate'),
        dataIndex: 'operate',
        slotName: 'operate',
        align: 'center',
        fixed: 'right',
		ellipsis: true,
        headerCellClass: 'table-header-cell',
    }
]);


// 查询表格数据
const fetchData = async (
    params: QueryParams = { page: 1, size: 20 }
) => {
    setLoading(true);
    try {
        const { data } = await getMainOverTimeList(params);
        renderData.value = data.rows;
        pagination.current = params.page;
        pagination.total = data.total;
    } catch (err) {
        // you can report use errorHandler or other
    } finally {
        setLoading(false);
    }
};

// page改变
const onPageChange = (page: number) => {
    fetchData({ 'page': page, 'size': pagination.pageSize });
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

/**
 * 跳转到详情页
 */
const router = useRouter()
const goto = (record: any) => {
    localStorage.setItem('extendedMaintenanceDetail', JSON.stringify(toRaw(record)));
    router.push({
        name: "ExtendedMaintenanceDetail",
        query: {
            id: record.id
        }
    })
}

// pageSize改变
const onPageSizeChange = (pageSize: number) => {
  pagination.pageSize=pageSize;
  search();
};

</script>

<script lang="ts">
  export default {
    name: 'ExtendedMaintenance',
  };
</script>

<style scoped lang="less">
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
