<template>
    <div class="container">
        <Breadcrumb :items="['menu.demand.maintenance', 'menu.unitEvaluation']" />
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
                    <a-card class="cu-mart16 card-list" :body-style="{padding:'20px 20px 4px 20px'}">
                        <!-- 搜索部分 -->
                        <a-row>
                            <a-col :flex="5">
                                <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }"
                                    label-align="left">
                                    <a-row :gutter="16">
                                        <a-col :span="8">
                                            <!-- 姓名 -->
                                            <a-form-item field="name" :label="$t('menu.evaluation.name')" label-col-flex="60px">
                                                <a-input class="input-search" v-model="formModel.person"
                                                    :placeholder="$t('menu.evaluation.name.placeholder')" allow-clear/>
                                            </a-form-item>
                                        </a-col>
                                        <a-col :span="8">
                                            <!-- 维保单位 -->
                                            <a-form-item field="maintainUnit" :label="$t('menu.evaluation.maintainUnit')"
                                                label-col-flex="60px">
                                                <a-input class="input-search" v-model="formModel.name"
                                                    :placeholder="$t('menu.evaluation.maintainUnit.placeholder')" allow-clear/>
                                            </a-form-item>
                                        </a-col>
                                    </a-row>
                                </a-form>
                            </a-col>
                            <a-col :flex="1">
                                <div class="cu-fx">
                                    <a-divider :flex="5" style="height: 32px" direction="vertical" />
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
                    <a-card :body-style="{padding:'20px 20px 27px 20px'}" class="cu-mart16 card-list">
                        <!-- table部分 -->
                        <a-table :bordered="false" row-key="id" :loading="loading" :pagination="pagination" :columns="cloneColumns" :data="renderData" :stripe="true"
                            @page-change="onPageChange" @page-size-change="onPageSizeChange" :sticky-header="100">
                            <template #index="{ rowIndex }">
                                {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
                            </template>
                            <template #empty>
                                <div class="table-nodata" style="height:280px">
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

<script lang="ts" setup>
import nodataPic from '@/assets/images/no-data.png';
import tree01Pic from '@/assets/images/tree/icon_tree_01.png';
import tree02Pic from '@/assets/images/tree/icon_tree_02.png';
import treeOpen from '@/assets/images/tree/tree-open.png';
import { ref, computed, onMounted, reactive, watch } from 'vue';
import { useRouter } from "vue-router";
import { QueryTreeParams } from '@/api/tree';
import Tree from '@/components/tree/index.vue';
import { useI18n } from 'vue-i18n';
import { getMainCreditEval, QueryRecordParams, QueryParams } from '@/api/demandMaintenance/maintainEvaluation';
import { Pagination } from '@/types/global';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import useLoading from '@/hooks/loading';
import cloneDeep from 'lodash/cloneDeep';
import { getOrgOwnerTree } from '@/utils/auth';

// 国际化
const { t } = useI18n();

onMounted(() => {
    // ajax获取树数据
    search();
});

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
const orgId = ref('');
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

// 搜索框结构定义
const generateFormModel = () => {
    return {
        person: '',
        name: ''
    };
};
const formModel = ref(generateFormModel());

// 搜索方法
const search = () => {
    fetchData({
        'page': 1,
        'size': pagination.pageSize,
        'ownerIds': orgId.value,
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
        title: t('roleManage.columns.index'),
        dataIndex: 'index',
        slotName: 'index',
        align:'center',
        width:60,
		ellipsis: true,
        headerCellClass: 'table-header-cell',
        cellStyle: {height:'44px'},
    },
    {
        title: t('menu.evaluation.companyName'),
        dataIndex: 'name',
        align:'left',
        ellipsis: true,
        tooltip: true,
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.evaluation.person'),
        dataIndex: 'person',
        align:'center',
        ellipsis: true,
        tooltip: true,
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.evaluation.contactInformation'),
        dataIndex: 'phone',
        align:'center',
        ellipsis: true,
        tooltip: true,
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.evaluation.unitRanking'),
        dataIndex: 'ranking',
		slotName: 'index',
        align:'center',
		ellipsis: true,
		tooltip: true,
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.evaluation.maintainEleNumbers'),
        dataIndex: 'workEle',
        align:'center',
        ellipsis: true,
		tooltip: true,
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.evaluation.onTimeMaintainRate'),
        dataIndex: 'mainOnTimeRate',
        align:'center',
        ellipsis: true,
		tooltip: true,
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.evaluation.norMalizedMaintainRate'),
        dataIndex: 'mainStandardRate',
        align:'center',
        ellipsis: true,
		tooltip: true,
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.evaluation.complaintRate'),
        dataIndex: 'complaintRate',
        align:'center',
		ellipsis: true,
		tooltip: true,
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.evaluation.score'),
        dataIndex: 'score',
        align:'center',
        ellipsis: true,
		tooltip: true,
        headerCellClass: 'table-header-cell',
    }
]);


// 查询表格数据
const fetchData = async (
    params: QueryParams = { page: 1, size: 20 }
) => {
    setLoading(true);
    try {
        const { data } = await getMainCreditEval(params);
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

// 供子组件调用，重新加载数据
const reload = () => {
    search();
}

/**
 * 页面新增、修改、查看部分
 */
const operateModalRef = ref();
const openEditModal = (record: any, type: string) => {
    operateModalRef.value.openModal(record, type);
}
/**
 * 跳转到详情页
 */
const router = useRouter()
const goto = (record: any) => {
    router.push({
        path: `/archives/maintain/detail/${record.id}`,
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
    name: 'MaintainEvaluation',
  };
</script>

<style scoped lang="less">
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
