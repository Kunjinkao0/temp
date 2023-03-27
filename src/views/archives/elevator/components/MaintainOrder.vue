<template>
    <div class="cu-marb16">
        <a-card class="general-card" :title="$t('menu.archives.mainWorkOrder.search')"
        :header-style="{padding:'20px 0 20px 0'}"
        :body-style="{padding:'0px 0 20px 0'}"
        >
            <!-- 搜索部分 -->
            <a-row>
                <a-col :flex="11">
                    <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }"
                        label-align="left">
                        <a-row :gutter="16">
                            <a-col :span="8">
                                <!-- 维保类型 -->
                                <a-form-item field="mainType" :label="$t('menu.archives.maintain.type')"
                                    label-col-flex="60px">
                                    <a-select class="input-search" v-model="formModel.childType" :trigger-props="{ autoFitPopupMinWidth: true }"
                                            :placeholder="$t('menu.archives.maintain.type.placeholder')" allow-clear allow-search>
                                        <a-option v-for="item of mainTypeOptions" :value="item.id" :label="item.name" :key="item.id"/>
                                    </a-select>
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
            <template #childType="{ record }">
                <div v-if="record.childType">{{ $t(`menu.archives.maintain.type.${record.childType}`) }}</div>
            </template>
            <template #completeTime="{ record }">
                <!-- 上次维保时间 -->
                    {{ record.completeTime }}
            </template>
            <template #overdue="{ record }">
                <!-- 超期维保 -->
                <div v-if="(record.overTime > 0)"> {{ record.overTime }} 天</div>
                <div v-if="(record.overTime <= 0)"> 无</div>
            </template>
            <template #operate="{ record }">
                <!-- 查看维保日志 -->
                <div class="cu-color-165DFF cu-pointer" @click="drawerClick(record.id)">
                    {{ $t('menu.archives.workOrder.logs') }}
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
            {{ $t('menu.mainWork.detail.log') }}
        </template>
        <div>
            <MaintainDetailLog ref="maintainDetailLogRef" :work-data="workData" />
        </div>
    </a-drawer>
</template>

<script setup lang='ts'>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import nodataPic from '@/assets/images/no-data.png';
import { useI18n } from 'vue-i18n';
import { Pagination } from '@/types/global';
import { queryWorkOrderListByArchives } from '@/api/archives/elevator';
import { getEleWorkDetail } from '@/api/rescue/workOrder';
import { getMainTypeOption, getWorkSource } from '@/utils/common';
import { ArchivesWorkOrder, ArchivesWorkOrderListPage } from '@/api/archives/types/elevatorType';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import useLoading from '@/hooks/loading';
import cloneDeep from 'lodash/cloneDeep';
import MaintainDetailLog from './MaintainDetailLog.vue';

// 国际化
const { t } = useI18n();

const props = defineProps(['id']);
// 定义分页
const pagination: Pagination = reactive({
    current: 1,
    pageSize: 10,
});

const mainTypeOptions = getMainTypeOption()

/**
 * 搜索框部分
 */
// 搜索框结构定义
const generateFormModel = () => {
    return {
        childType: '',
    };
};

const formModel = ref(generateFormModel());

// 搜索方法
const search = () => {
    fetchData({
        'page': 1,
        'size': pagination.pageSize,
        'eleId': props.id,
        'workType': '3',
        ...formModel.value,
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
        'workType': '3' // 1.救援、2.维修、3.维保
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
		title: t('menu.archives.maintain.type'), // 维保类型
        dataIndex: 'childType',
        slotName: 'childType',
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
        title: t('menu.archives.maintain.planTime'), // 计划维保时间
        dataIndex: 'planDate',
        align: "center",
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.archives.maintain.finishTime'), // 完成工单时间
        dataIndex: 'completeTime',
        slotName: 'completeTime',
        align: "center",
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.archives.maintain.overdue'), // 超期维保
        dataIndex: 'overdue',
        slotName: 'overdue',
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
        'page': page, 'size': pagination.pageSize, 'eleId': props.id,
        'workType': '1' // 1.救援、2.维修、3.维保 
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
const maintainDetailLogRef = ref()
const visible = ref(false);
const drawerClick = async (id: string) => {
    const params = {workId:id}
    const { data:workDetailData } = await getEleWorkDetail(params);
    if(workDetailData){
        workData.value = workDetailData
    }
    setTimeout(() => {
        maintainDetailLogRef.value.getWorkOrderDetail();
        visible.value = true;
    },100)
};

const cancelDrawer = () => {
    visible.value = false;
}
</script>

<style scoped lang='scss'>

</style>
