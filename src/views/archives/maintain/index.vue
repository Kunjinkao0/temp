<template>
    <div class="container">
        <Breadcrumb :items="['menu.archives', 'menu.archives.maintain']" />
        <a-grid :cols="24" :colGap="12" :rowGap="16">
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
                            <img class="tree-title-img" :src="tree01Pic" v-if="item.key === '0'"/>
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
                                        <!-- 单位名称 -->
                                        <a-form-item field="maintainName" :label="$t('menu.archives.maintain.maintainName')"
                                            label-col-flex="60px">
                                            <a-input v-model="formModel.maintainName"
                                                :placeholder="$t('menu.archives.maintain.maintainName.placeholder')" class="input-search" allow-clear/>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="8">
                                        <!-- 负责人 -->
                                        <a-form-item field="person" :label="$t('menu.archives.maintain.person')"
                                            label-col-flex="60px">
                                            <a-input v-model="formModel.person"
                                                :placeholder="$t('menu.archives.maintain.person.placeholder')" class="input-search" allow-clear/>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="8">
                                        <a-form-item field="level" :label="$t('menu.archives.maintain.level')"
                                            label-col-flex="60px">
                                            <a-input v-model="formModel.level"
                                                :placeholder="$t('menu.archives.maintain.level.placeholder')" class="input-search" allow-clear/>
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
                <a-card :body-style="{padding:'20px'}" class="cu-mart16 card-list">
                    <!-- table部分 -->
                    <a-table :bordered="false" row-key="id" :loading="loading" :pagination="pagination" :columns="cloneColumns" :data="renderData" :stripe="true"
                        @page-change="onPageChange" @page-size-change="onPageSizeChange">
                        <template #index="{ rowIndex }">
                            {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
                        </template>
                        <template #use="{ record }">
                            {{ $t(`menu.archives.use.${record.use}`) }}
                        </template>
                        <template #operate="{ record }">
                            <a-button class="table-operate-btn" type="text" @click="gotoDetial(record)">
                                {{ $t('menu.archives.view') }}
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

      <a-modal width="850px" class="maintenantice-ststistics" v-model:visible="detailVisible" :simple="true" unmount-on-close="false"
               :body-style="{border:'1px solid var(--color-neutral-3)', height: '80vh'}">
        <template #title>
          <span style="font-size: medium; font-weight: bold; margin-top: 15px">查看</span>
        </template>
        <template #footer>
          <a-button @click="handleCancel1">关闭</a-button>
        </template>

        <div>
          <DetailModal :loading="loading"/>
        </div>
      </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, reactive, watch, toRaw } from 'vue';
import tree01Pic from '@/assets/images/tree/icon_tree_01.png';
import tree02Pic from '@/assets/images/tree/icon_tree_02.png';
import nodataPic from '@/assets/images/no-data.png';
import treeOpen from '@/assets/images/tree/tree-open.png';
import { useRouter } from "vue-router";
import { QueryTreeParams } from '@/api/tree';
import { toTree } from '@/utils/common';
import Tree from '@/components/tree/index.vue';
import { useI18n } from 'vue-i18n';
import { queryMaintainList, QueryRecordParams, QueryParams } from '@/api/archives/maintain';
import { Pagination } from '@/types/global';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import { getTixinUserExt } from '@/utils/auth';
import useLoading from '@/hooks/loading';
import cloneDeep from 'lodash/cloneDeep';
import DetailModal from './modalDetail.vue';

// 国际化
const { t } = useI18n();

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
const defaultSelectedKeys = ref(['0']);
// 选中树后生成的面包屑，页面初始化默认选中组织项目树
const selectedTreeParent = ref([{
    title: '组织树',
    key: '0'
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
    // const { data } = await queryTreeList(params);
    // 构建树结构
    const usrExt: any = getTixinUserExt();
    const rootOrg = {
        'key' : '0',
        'type' : '1',
        'title' : '组织树',
        'children': []
    }
    rootOrg.children = toTree(usrExt.topOrgs)
    const treeData = [];
    treeData.push(rootOrg);
    originTreeData.value = treeData;
    treeLoad.value = true;
    search(); // 加载table数据
}

// 获取树组件选中的key值
const onSelect = (select: any) => {
    // 获取选中树的key值
    let paramId = select.key;
    if(paramId === '0'){
        paramId = '';
    }
    orgId.value = paramId

    treeShow.value = false
    search();
}

// 获取树组件选中的父节点的key值数组
const onSelectParent = (arr = []) => {
    selectedTreeParent.value = arr;
}

// 获取树组件选中的子节点的key值数组
const onSelectChild = (arr = []) => {
    console.log("输出子节点选中的值");
    console.log(arr)
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
        maintainName: '',
        person: '',
        level: ''
    };
};
const formModel = ref(generateFormModel());

// 搜索方法
const search = () => {
    fetchData({
        'page': 1,
        'size': pagination.pageSize,
        'orgId': orgId.value,
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
        title: t('menu.archives.number'),
        dataIndex: 'index',
        slotName: 'index',
        align: "center",
        headerCellClass: 'table-header-cell',
        width: 80
    },
    {
        title: t('menu.archives.maintain.maintainName'),
        dataIndex: 'maintainName',
        align: "left",
        ellipsis: true,
        tooltip: true,
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.archives.maintain.companyAddress'),
        dataIndex: 'address',
        align: "left",
        ellipsis: true,
        tooltip: true,
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.archives.maintain.person'),
        dataIndex: 'person',
        align: "left",
        ellipsis: true,
        tooltip: true,
        headerCellClass: 'table-header-cell',
        width: 120
    },
    {
        title: t('menu.archives.maintain.level'),
        dataIndex: 'level',
        align: "left",
        ellipsis: true,
        tooltip: true,
        headerCellClass: 'table-header-cell',
        width: 120
    },
    {
        title: t('menu.archives.operate'),
        dataIndex: 'operate',
        slotName: 'operate',
        align: "center",
        headerCellClass: 'table-header-cell',
        width: 100
    }
]);


// 查询表格数据
const fetchData = async (params) => {
    setLoading(true);
    try {
        const { data } = await queryMaintainList(params);
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
const detailVisible = ref(false);
const handleCancel1 = () => {
  detailVisible.value = false;
}
const router = useRouter()
const gotoDetial = (record: any) => {
    localStorage.setItem('maintainDetail', JSON.stringify(toRaw(record)));
    // router.push({
    //     name: 'MaintainDetail',
    //     query: {
    //         id: record.id
    //     }
    // })
  detailVisible.value = true;
}

/**
 * 搜索框部分
 */
// 资质等级下拉框
const useLevelOptions = computed<SelectOptionData[]>(() => [
    {
        label: t('menu.archives.maintain.level.1'),
        value: '1',
    },
    {
        label: t('menu.archives.maintain.level.2'),
        value: '2',
    },
    {
        label: t('menu.archives.maintain.level.3'),
        value: '3',
    }
]);

// pageSize改变
const onPageSizeChange = (pageSize: number) => {
  pagination.pageSize=pageSize;
  search();
};

</script>

<script lang="ts">
  export default {
    name: 'Maintain',
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
