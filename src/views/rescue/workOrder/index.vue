<template>
    <div class="container cu-flex-y">
        <Breadcrumb :items="['menu.rescue', 'menu.rescue.workOrder']" />
        <a-grid :cols="24" :colGap="12" :rowGap="16" class="grid-demo-grid">
            <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }">
                <div class="right-aside">
                <!-- 根据树菜单选中生成的面包屑 -->
                <a-card class="card-list" :body-style="{padding:'12px 20px'}">
                    <div class="cu-fx-start-center cu-hei24">
                        <a-trigger class="trigger-popup-css" trigger="click" update-at-scroll>
                            <img :src="treeOpen"
                            class="cu-pointer cu-marr16 cu-font18 cu-color-86909c tree-icon" />
                            <template #content>
                            <div class="tree_div">
                                <Tree v-if="treeLoad" :originTreeData=originTreeData :defaultSelectedKeys="defaultSelectedKeys"
                                    @onSelect="onSelect" @onSelectParent="onSelectParent" @onSelectChild="onSelectChild"
                                    @collapseTree="collapseTree" />
                            </div>
                            </template>
                        </a-trigger>
                        <div v-for="(item, index) in selectedTreeParent" :key="item.key">
                            <img class="tree-title-img" :src="tree01Pic" v-if="item.key.split(',')[1] === '1'"/>
                            <img class="tree-title-img" :src="tree02Pic" v-else/>
                            {{ item.title }}
                            <span v-if="index < selectedTreeParent.length - 1" class="cu-marlr4">
                                <icon-right />
                            </span>
                        </div>
                    </div>
                </a-card>
                <a-card :body-style="{padding:'20px 20px 4px 20px'}" class="cu-mart16 card-list">
                    <!-- 搜索部分 -->
                    <a-row>
                        <a-col :flex="5">
                            <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }"
                                label-align="left">
                                <a-row :gutter="16">
                                    <a-col :span="8">
                                        <!-- 电梯名称 -->
                                        <a-form-item field="elevatorName" :label="$t('menu.workOrder.elevatorName')"
                                            label-col-flex="60px">
                                            <a-input v-model="formModel.elevatorName"
                                                :placeholder="$t('menu.workOrder.elevatorName.placeholder')" class="input-search" allow-clear/>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="8">
                                        <!-- 维保单位 -->
                                        <a-form-item field="maintainUnit" :label="$t('menu.workOrder.maintainUnit')"
                                            label-col-flex="60px">
                                            <a-input v-model="formModel.maintainName"
                                                :placeholder="$t('menu.workOrder.maintainUnit.placeholder')" class="input-search" allow-clear/>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="8">
                                        <!-- 使用单位 -->
                                        <a-form-item field="useUnit" :label="$t('menu.workOrder.useUnit')"
                                            label-col-flex="60px">
                                            <a-input v-model="formModel.propertyName"
                                                :placeholder="$t('menu.workOrder.useUnit.placeholder')" class="input-search" allow-clear/>
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                            </a-form>
                        </a-col>
                        <a-col :flex="1">
                            <div class="cu-fx cu-marl16">
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
                <a-card :body-style="{padding:'20px'}" class="cu-mart16 card-list">
                    <a-row class="cu-marb16">
                        <a-col :span="12"></a-col>
                        <a-col :span="12" class="cu-fx-end-center">
                            <a-space>
                                <span v-for="(item, index) in stateList" :key="index">
                                    <a-tag checkable color="arcoblue" :checked="item.checked" size="large"
                                        @check="workOrderStateCheck(item.state, $event)" bordered>{{
                                                $t(`menu.workOrder.state.${item.state}`)
                                        }}</a-tag>
                                </span>
                            </a-space>
                        </a-col>
                    </a-row>
                    <!-- table部分 -->
                    <a-table :bordered="false" row-key="id" :loading="loading" :pagination="pagination" :columns="cloneColumns" :stripe="true"
                        :data="renderData" @page-change="onPageChange"
                        v-model:selectedKeys="selectedKeys"
                        @page-size-change="onPageSizeChange" :sticky-header="100">
                        <template #index="{ rowIndex }">
                            {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
                        </template>
                        <template #state="{ record }">
                            <span v-if="record.isFalse === 2">
                                <!-- 误报 -->
                                <a-tag>{{ $t(`menu.workOrder.state.8`) }}</a-tag>
                            </span>
                            <span v-else-if="record.state === 1">
                                <!-- 待接单 -->
                                <a-badge text="NEW" :offset="[13, 5]" :dot-style="{width:'40px',height:'15px',fontSize:'8px',lineHeight:'12px'}">
                                    <a-tag color="orange">{{ $t(`menu.workOrder.state.${record.state}`) }}</a-tag>
                                </a-badge>
                            </span>
                            <span v-else-if="record.state === 2">
                                <!-- 已接单 -->
                                <a-tag color="cyan">{{ $t(`menu.workOrder.state.${record.state}`) }}</a-tag>
                            </span>
                            <span v-else-if="record.state === 3">
                                <!-- 已到场 -->
                                <a-tag color="blue">{{ $t(`menu.workOrder.state.${record.state}`) }}</a-tag>
                            </span>
                            <span v-else>
                                <!-- 已完成 -->
                                <a-tag>{{ $t(`menu.workOrder.state.4,7`) }}</a-tag>
                            </span>
                        </template>
                        <template #operate="{ record }">
                            <a-button class="table-operate-btn" type="text" @click="goto(record)">
                                {{ $t('menu.workOrder.view') }}
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
    </div>
</template>

<script setup lang='ts'>
import { ref, computed, onMounted, reactive, watch } from 'vue';
import tree01Pic from '@/assets/images/tree/icon_tree_01.png';
import tree02Pic from '@/assets/images/tree/icon_tree_02.png';
import nodataPic from '@/assets/images/no-data.png';
import treeOpen from '@/assets/images/tree/tree-open.png';
import { QueryTreeParams } from '@/api/tree';
import Tree from '@/components/tree/index.vue';
import { useI18n } from 'vue-i18n';
import { getEleWorkList, QueryRecordParams, QueryParams } from '@/api/rescue/workOrder';
import { getOrgOwnerTree } from '@/utils/auth';
import { Pagination } from '@/types/global';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import useLoading from '@/hooks/loading';
import cloneDeep from 'lodash/cloneDeep';
import { useRouter } from "vue-router";
import { Message } from '@arco-design/web-vue';

// 国际化
const { t } = useI18n();

const colsNum = ref(24)

onMounted(() => {
    const params: QueryTreeParams = {
        fromPage: "web"
    }
    // ajax获取树数据
    getOriginTreeData(params);
});

/**
 * 树部分
 */
const treeShow = ref(false);
// 页面初始化设置树默认选中树的key
const defaultSelectedKeys = ref(['0,1']);
// 选中树后生成的面包屑，页面初始化默认选中组织项目树
const selectedTreeParent = ref([{
    title: '组织项目树',
    key: '0,1'
}]);
// 选中树后树的key，string类型，默认选中组织项目树
const orgId = ref('0');
// 树的结构
let originTreeData = ref([]);
// 动态加载树结构，ajax请求会数据后，渲染树。不加v-if的话，树不会展开
let treeLoad = ref(false);

const handleCancel = () => {
    treeShow.value = false;
}

// 获取树数据方法
const getOriginTreeData = async (params: QueryTreeParams) => {
    // 构建树结构
    originTreeData.value = await getOrgOwnerTree();
    treeLoad.value = true;
    onSelectParent();
    search(); // 加载table数据
}

// 获取树组件选中的key值
const onSelect = (select: string) => {
    console.log("输出当前选中的对象");
    console.log(select);
}

// 获取树组件选中的父节点的key值数组
const onSelectParent = (arr = []) => {
    if(arr.length > 0 || (arr.length === 1 && arr[0].key !== '0,1')){
        orgId.value = arr.join(',')
        selectedTreeParent.value = arr;
    }else {
        orgId.value = ''
    }
}

// 获取树组件选中的子节点的key值数组
const onSelectChild = (arr = []) => {
    // 获取选中树的key值
    let treeSelectedKey = ""
    for (let item of arr) {
        treeSelectedKey += `${item.realKey},`;
    }

    if (treeSelectedKey && treeSelectedKey !== '0,') {
        orgId.value = treeSelectedKey.substring(0, treeSelectedKey.length - 1)
    } else {
        orgId.value = ''
    }

    treeShow.value = false
    search();
}

// 获取树组件折叠树的方法
const collapseTree = () => {
    treeShow.value = false;
}

// 展开树
const expandTree = () => {
    treeShow.value = true;
}

/**
 * 搜索框部分
 */
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
        ...checkedStateString.value,
        'ownerIds': orgId.value,
        'page': 1,
        'size': pagination.pageSize,
        ...formModel.value,
    });
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
        title: t('menu.workOrder.elevatorName'),
        dataIndex: 'elevatorName',
        ellipsis: true,
        align: 'left',
        tooltip: true,
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.workOrder.maintainUnit'),
        dataIndex: 'maintainName',
        ellipsis: true,
        align: 'center',
        tooltip: true,
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.workOrder.useUnit'),
        dataIndex: 'propertyName',
        ellipsis: true,
        align: 'left',
        tooltip: true,
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.workOrder.alarmTime'),
        dataIndex: 'createTime',
        width:180,
        ellipsis: true,
        align: 'left',
        tooltip: true,
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.workOrder.state'),
        dataIndex: 'state',
        slotName: 'state',
        ellipsis: true,
        align: 'center',
        tooltip: true,
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.workOrder.operate'),
        dataIndex: 'operate',
        slotName: 'operate',
        align: 'center',
        fixed: 'right',
        headerCellClass: 'table-header-cell',
        width: 100
    }
]);

// 查询表格数据
const fetchData = async (
    params: QueryParams = { page: 1, size: 20 }
) => {
    setLoading(true);
    try {
        params.workType = 1
        if(params.state === '0'){
            params.state = ''
        }
        const { data } = await getEleWorkList(params);
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
        ...checkedStateString.value,
        'ownerIds': orgId.value,
        ...formModel.value,
        'page': page,
        'size': pagination.pageSize
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

// 定义状态列显示
let stateList: any = reactive([
    { 'state': '0', 'checked': true },
    { 'state': '1', 'checked': false },
    { 'state': '2', 'checked': false },
    { 'state': '3', 'checked': false },
    { 'state': '4,7', 'checked': false },
    { 'state': '8', 'checked': false },
]);

// 被选中的状态标签
let checkedStateString = ref({
    state: '0' // 默认全部选中
});

// 状态列的选中及取消选中
const workOrderStateCheck = (state: number, checked: boolean) => {
    let checkIndex = 0;
    let cancelIndex = 0;
    let checkedState = "";
    for (let item of stateList) {
        if (state === 0) {
            if (item.state === state) {
                Object.assign(item, { 'state': state, 'checked': true });
            } else {
                Object.assign(item, { 'state': item.state, 'checked': false });
            }

            // 设置状态的key值
            checkedState = `0,`;
        } else {
            if (state === item.state) {
                Object.assign(item, { 'state': item.state, 'checked': checked });
            }

            // 全选和取消全选
            if (item.state !== '0') {
                if (item.checked) {
                    checkIndex += 1;
                    Object.assign(stateList[0], { 'state': 0, 'checked': false });
                    // 设置状态的key值
                    checkedState += `${item.state},`;
                } else {
                    cancelIndex += 1;
                }

                if ((checkIndex === 0||checkIndex === 4) && cancelIndex === 4) {
                    Object.assign(stateList[0], { 'state': 0, 'checked': true });
                    // // 设置状态的key值
                    checkedState = `0,`;
                }
            }
        }
    }

    if (checkedState) {
        checkedStateString.value = {
            state: checkedState.substring(0, checkedState.length - 1)
        }
        search();
    }
}

/**
 * 跳转到详情页
 */
const router = useRouter()
const goto = (record: any) => {
    router.push({
        name: "WorkOrderDetail",
        query: {
            id: record.workId
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
    name: 'WorkOrder',
  };
</script>

<style scoped lang='less'>
.container {
    padding: 0 20px 20px 20px;
    height: 100%;
}

.left-aside {
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
