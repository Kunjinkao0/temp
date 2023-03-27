<template>
    <div class="cu-marb16">
        <a-card class="general-card" :title="$t('menu.archives.repairWorkOrder.search')"
        :header-style="{padding:'20px 0 20px 0'}"
        :body-style="{padding:'0px 0 20px 0'}"
        >
            <!-- 搜索部分 -->
            <a-row>
                <a-col :flex="11">
                    <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }"
                        label-align="left">
                        <a-row :gutter="16">
                            <a-col :span="10">
                                <!-- 故障类型 -->
                                <a-form-item field="faultName" :label="$t('menu.archives.workOrder.faultType')"
                                    label-col-flex="60px">
                                    <a-input v-model="formModel.faultName" class="input-search"
                                        :placeholder="$t('menu.archives.workOrder.faultType.placeholder')" allow-clear/>
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
        <a-table row-key="id" :loading="loading" :pagination="pagination" :columns="cloneColumns" :data="renderData" :bordered="false" :stripe="true"
            @page-change="onPageChange">
            <template #index="{ rowIndex }">
                {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
            </template>
            <template #eventChannel="{ record }">
                <!-- 任务来源 -->
                <div> {{ getWorkSource(record.eventChannel) }}</div>
            </template>
            <template #faultType="{ record }">
                <!-- 故障类型 -->
                <div style="color: red">假数据 {{ record.faultType }}</div>
            </template>
            <template #operate="{ record }">
                <!-- 查看维修日志 -->
                <div class="cu-color-165DFF cu-pointer" @click="drawerClick(record.id)">
                    {{ $t('menu.archives.repairOrder.logs') }}
                </div>
            </template>
            <!-- table空数据样式插槽 -->
            <template #empty>
                <div class="table-nodata">
                    <a-image :src="nodataPic" :preview="false"></a-image>
                </div>
            </template>
        </a-table>
    </div>
    <!-- 维保日志抽屉 -->
    <a-drawer :width="400" :visible="visible" @cancel="cancelDrawer" :footer="false">
        <template #title>
            {{ $t('menu.repair.detail.log') }}
        </template>
        <div>
            <RepairLog ref="repairLogRef" :work-data="workData" />
        </div>
    </a-drawer>
</template>

<script setup lang='ts'>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import nodataPic from '@/assets/images/no-data.png';
import { queryWorkOrderListByArchives } from '@/api/archives/elevator';
import { ArchivesWorkOrder, ArchivesWorkOrderListPage } from '@/api/archives/types/elevatorType';
import { getEleWorkDetail } from '@/api/rescue/workOrder';
import { getWorkSource } from '@/utils/common';
import { useI18n } from 'vue-i18n';
import { Pagination } from '@/types/global';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import useLoading from '@/hooks/loading';
import cloneDeep from 'lodash/cloneDeep';
import RepairLog from '../../../repair/repairOrders/components/DetailLog.vue';

const props = defineProps(['id']);
// 国际化
const { t } = useI18n();

// 定义分页
const pagination: Pagination = reactive({
    current: 1,
    pageSize: 10,
});


/**
 * 搜索框部分
 */
// 搜索框结构定义
const generateFormModel = () => {
    return {
        faultName: '',
    };
};
const formModel = ref(generateFormModel());

// 搜索方法
const search = () => {
    fetchData({
        'page': 1,
        'size': pagination.pageSize,
        'eleId': props.id,
        'workType': '2',
        ...formModel.value
    } as any);
};

// 重置方法
const reset = () => {
    formModel.value = generateFormModel();
};

onMounted(() => {
    fetchData({
        'page': pagination.current,
        'size': pagination.pageSize,
        'eleId': props.id,
        'workType': '2' // 1.救援、2.维修、3.维保
    });
});

const { loading, setLoading } = useLoading(true);
// 定义表格结构
const renderData = ref<ArchivesWorkOrder[]>([]);
type Column = TableColumnData & { checked?: true };
const cloneColumns = ref<Column[]>([]);
const showColumns = ref<Column[]>([]);

// 定义表格列
const columns = computed<TableColumnData[]>(() => [
    {
        title: t('menu.archives.number'),
        dataIndex: 'index',
        slotName: 'index',
        align: "center",
        headerCellClass: 'table-header-cell',
    },
    {
		title: t('menu.archives.workOrder.faultType'), // 故障类型
        dataIndex: 'faultName',
        slotName: 'faultName',
        align: "center",
        headerCellClass: 'table-header-cell',
   },
   {        
        title: t('menu.archives.maintain.createtime'), // 工单生成时间
        dataIndex: 'createTime',
        align: "center",
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.archives.repairOrder.planTime'), // 计划维修时间
        dataIndex: 'planDate',
        align: "center",
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.archives.maintain.taskSource'), // 任务来源
        dataIndex: 'eventChannel',
        slotName: 'eventChannel',
        align: "center",
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.archives.faultReason'), // 故障原因
        dataIndex: 'faultReason',
        align: "center",
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.archives.operate'), // 操作
        dataIndex: 'operate',
        slotName: 'operate',
        align: "center",
        headerCellClass: 'table-header-cell',
    }
]);

// 工单数据
const workData = ref({})

// 查询表格数据
const fetchData = async (
    params: ArchivesWorkOrderListPage = { page: 1, size: 20 }
) => {
    setLoading(true);
    try {
        const { data } = await queryWorkOrderListByArchives(params);
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
    fetchData({
        'page': page, 'size': pagination.pageSize,
        'eleId': props.id,
        'workType': '2' // 1.救援、2.维修、3.维保
    });
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

// 维保日志
const repairLogRef = ref()
const visible = ref(false);
const drawerClick = async (id: string) => {
    const params = {workId:id}
    const { data:workDetailData } = await getEleWorkDetail(params);
    if(workDetailData){
        workData.value = workDetailData
    }
    setTimeout(() => {
        repairLogRef.value.getWorkOrderDetail();
        visible.value = true;
    },100)
};

const cancelDrawer = () => {
    visible.value = false;
}
</script>

<style scoped lang='scss'>

</style>
