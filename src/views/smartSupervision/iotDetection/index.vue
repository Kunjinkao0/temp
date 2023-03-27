<template>
    <div class="container cu-flex-y">
      <div style="padding-left: 20px">
        <Breadcrumb :items="['smartSupervision.iotDetection.title']" />
      </div>
        <a-grid :cols="24" :colGap="12" :rowGap="16" class="grid-demo-grid">
            <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }">
                <div class="right-aside">
                    <!-- 根据树菜单选中生成的面包屑 -->
                  <div class="gray-divider-line"/>
                    <a-card class="card-list" :body-style="{padding:'12px 20px'}">
                        <div class="cu-fx-start-center cu-hei24">
                            <a-trigger trigger="click" update-at-scroll>
                                <img :src="treeOpen"
                                class="cu-pointer cu-marr16 cu-font18 cu-color-86909c tree-icon" />
                                <template #content>
                                <div class="org_tree_div">
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
                  <div class="gray-divider-line"/>
                    <a-card class="cu-mart16 card-list" :body-style="{padding:'20px 20px 4px 20px'}">
                        <!-- 搜索部分 -->
                        <a-row>
                            <a-col :flex="5">
                                <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }"
                                    label-align="left">
                                    <a-row :gutter="16">
                                        <a-col :span="8">
                                            <!-- 注册代码 -->
                                            <a-form-item field="registCode" :label="$t('menu.archives.registCode')"
                                                label-col-flex="60px">
                                                <a-input v-model="formModel.registCode"
                                                    :placeholder="$t('menu.archives.registCode.placeholder')" class="input-search" allow-clear/>
                                            </a-form-item>
                                        </a-col>
                                        <a-col :span="8">
                                            <!-- 电梯名称 -->
                                            <a-form-item field="elevatorName" :label="$t('menu.archives.elevatorName')"
                                                label-col-flex="60px">
                                                <a-input v-model="formModel.elevatorName"
                                                    :placeholder="$t('menu.archives.elevatorName.placeholder')" class="input-search" allow-clear/>
                                            </a-form-item>
                                        </a-col>
                                        <a-col :span="8">
                                            <!-- 电梯地址 -->
                                            <a-form-item field="address"
                                                :label="$t('menu.archives.address')" label-col-flex="60px">
                                                <a-input v-model="formModel.address"
                                                    :placeholder="$t('menu.archives.address.placeholder')" class="input-search" allow-clear/>
                                            </a-form-item>
                                        </a-col>

                                        <a-col :span="8" v-if="collapseFlag">
                                            <!-- 使用场所 -->
                                            <a-form-item field="use" :label="$t('menu.archives.use')" label-col-flex="60px">
                                                <a-select class="input-search" v-model="formModel.typeName" :trigger-props="{ autoFitPopupMinWidth: true }"
                                                        :placeholder="$t('menu.archives.select.placeholder')" allow-clear allow-search>
                                                    <a-option v-for="item of useTypeOptions" :value="item.typeName" :label="item.typeName" :key="item.id"/>
                                                </a-select>
                                            </a-form-item>
                                        </a-col>
                                        <a-col :span="8" v-if="collapseFlag">
                                            <!-- 维保单位 -->
                                            <a-form-item field="maintainName" :label="$t('menu.archives.maintainName')"
                                                label-col-flex="60px">
                                                <a-input class="input-search" v-model="formModel.maintainName"
                                                    :placeholder="$t('menu.archives.maintainName.placeholder')" allow-clear/>
                                            </a-form-item>
                                        </a-col>
                                        <a-col :span="8" v-if="collapseFlag">
                                            <!-- 使用单位 -->
                                            <a-form-item field="useName"
                                                :label="$t('menu.archives.useUnit')" label-col-flex="60px">
                                                <a-input class="input-search" v-model="formModel.propertyName"
                                                    :placeholder="$t('menu.mainWork.useUnit.placeholder')" allow-clear/>
                                            </a-form-item>
                                        </a-col>

                                        <a-col :span="8" v-if="collapseFlag">
                                            <!-- 节能类型 -->
                                            <a-form-item field="energyType" :label="$t('menu.archives.energyType')" label-col-flex="60px">
                                                <a-select class="input-search" v-model="formModel.energyType" :options="energyTypeOptions"
                                                    :trigger-props="{ autoFitPopupMinWidth: true }"
                                                    :placeholder="$t('menu.archives.select.placeholder')" allow-clear/>
                                            </a-form-item>
                                        </a-col>
                                        <a-col :span="8" v-if="collapseFlag">
                                            <!-- 楼宇 -->
                                            <a-form-item field="areaName" :label="$t('menu.archives.areaName')"
                                                label-col-flex="60px">
                                                <a-input class="input-search" v-model="formModel.areaName"
                                                    :placeholder="$t('menu.archives.areaName.placeholder')" allow-clear/>
                                            </a-form-item>
                                        </a-col>
                                        <a-col :span="8" v-if="collapseFlag">
                                            <!-- 品牌 -->
                                            <a-form-item field="brandName" :label="$t('menu.archives.brandName')"
                                                label-col-flex="60px">
                                                <a-input class="input-search" v-model="formModel.brandName"
                                                    :placeholder="$t('menu.archives.brandName.placeholder')" allow-clear/>
                                            </a-form-item>
                                        </a-col>

                                        <a-col :span="8" v-if="collapseFlag">
                                            <!-- 超期未检 -->
                                            <a-form-item field="checkState" :label="$t('menu.archives.checkState')" label-col-flex="60px">
                                                <a-select class="input-search" v-model="formModel.checkState" :options="checkStateOptions"
                                                    :trigger-props="{ autoFitPopupMinWidth: true }"
                                                    :placeholder="$t('menu.archives.select.placeholder')" allow-clear/>
                                            </a-form-item>
                                        </a-col>
                                        <a-col :span="8" v-if="collapseFlag">
                                            <!-- 超期未保 -->
                                            <a-form-item field="mainState" :label="$t('menu.archives.mainState')" label-col-flex="60px">
                                                <a-select class="input-search" v-model="formModel.mainState" :options="mainStateOptions"
                                                    :trigger-props="{ autoFitPopupMinWidth: true }"
                                                    :placeholder="$t('menu.archives.select.placeholder')" allow-clear/>
                                            </a-form-item>
                                        </a-col>

                                        <a-col :span="8" v-if="collapseFlag">
                                            <!-- 设备代码 -->
                                            <a-form-item field="eleDeviceCode" :label="$t('menu.archives.eleDeviceCode')"
                                                label-col-flex="60px">
                                                <a-input class="input-search" v-model="formModel.eleDeviceCode"
                                                    :placeholder="$t('menu.archives.eleDeviceCode.placeholder')" allow-clear/>
                                            </a-form-item>
                                        </a-col>
                                        <a-col :span="8" v-if="collapseFlag">
                                            <!-- 二维码编号 -->
                                            <a-form-item field="qrCode" :label="$t('menu.archives.qrCode')"
                                                label-col-flex="70px">
                                                <a-input class="input-search" v-model="formModel.qrCode"
                                                    :placeholder="$t('menu.archives.qrCode.placeholder')" allow-clear/>
                                            </a-form-item>
                                        </a-col>
                                        <a-col :span="12" v-if="collapseFlag">
                                            <!-- 投用日期 -->
                                            <a-form-item field="date" :label="$t('menu.archives.date')"
                                                label-col-flex="60px">
                                                <a-range-picker class="input-search" v-model="formModel.date" style="width: 100%" />
                                            </a-form-item>
                                        </a-col>
                                    </a-row>
                                </a-form>
                            </a-col>
                            <a-col :flex="1">
                                <div class="cu-fx">
                                    <!-- 展开收起 -->
                                    <div class="in-collapse cu-font14 cu-pointer" @click="collapseClick()">{{ collapseTitle
                                    }}
                                        <span>
                                            <icon-up v-if="collapseFlag" class="in-collapse-icon" />
                                        </span>
                                        <span>
                                            <icon-down v-if="!collapseFlag" class="in-collapse-icon" />
                                        </span>
                                    </div>
                                    <a-divider style="height: 32px" direction="vertical" />
                                    <!-- 重置按钮 -->
                                    <a-button @click="reset">
                                        <template #icon>
                                            <icon-refresh />
                                        </template>
                                        {{ $t('searchTable.form.reset') }}
                                    </a-button>
                                    <!-- 查询按钮 -->
                                    <a-button type="primary" class="cu-marl16" @click="search">
                                        <template #icon>
                                            <icon-search />
                                        </template>
                                        {{ $t('searchTable.form.search') }} 
                                    </a-button>
                                </div>
                            </a-col>
                        </a-row>
                    </a-card>
                  <div class="gray-divider-line"/>
                    <a-card :body-style="{padding:'20px'}" class="cu-mart16 card-list">
                        <!-- table部分 -->
                        <a-table :bordered="false" row-key="id" class="table-style" :loading="loading" :pagination="pagination" :columns="cloneColumns" :stripe="true"
                            :data="renderData" @page-change="onPageChange" @page-size-change="onPageSizeChange">
                            <template #index="{ rowIndex }">
                                {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
                            </template>
                            <template #use="{ record }">
                                {{ $t(`menu.archives.use.${record.use}`) }}
                            </template>
                            <template #operate="{ record }">
                                <a-button class="table-operate-btn" type="text" @click="goto(record)">
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
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, reactive, watch, toRaw } from 'vue';
import tree01Pic from '@/assets/images/tree/icon_tree_01.png';
import tree02Pic from '@/assets/images/tree/icon_tree_02.png';
import nodataPic from '@/assets/images/no-data.png';
import treeOpen from '@/assets/images/tree/tree-open.png';
import { QueryTreeParams } from '@/api/tree';
import { getOrgOwnerTree } from '@/utils/auth';
import Tree from '@/components/tree/index.vue';
import { useI18n } from 'vue-i18n';
import { queryElevatorList, getEleTypeIndexList } from '@/api/archives/elevator';
import { Elevator, ElevatorListPage } from '@/api/archives/types/elevatorType';

import { Pagination } from '@/types/global';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import useLoading from '@/hooks/loading';
import cloneDeep from 'lodash/cloneDeep';
import { useRouter } from "vue-router";

// 国际化
const { t } = useI18n();

onMounted(() => {
    const params: QueryTreeParams = {
        fromPage: "web"
    }
    // ajax获取树数据
    getOriginTreeData(params);
	
	eleTypeIndexList();
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
    originTreeData.value = await getOrgOwnerTree()
    treeLoad.value = true;
    search(); // 加载table数据
}

let collapseTitle = ref('展开');
let collapseFlag = ref(false);
const collapseClick = () => {
    collapseFlag.value = !collapseFlag.value;
    collapseTitle.value = "收起";
}

// 获取树组件选中的key值
const onSelect = (select: string) => {
    console.log("输出当前选中的对象");
    console.log(select);
}

// 获取树组件选中的父节点的key值数组
const onSelectParent = (arr = []) => {
    selectedTreeParent.value = arr;
}

// 获取树组件选中的子节点的key值数组
const onSelectChild = (arr = []) => {
    // 获取选中树的key值
    let treeSelectedKey = ""
    for (let item of arr) {
        treeSelectedKey += `${item.realKey},`;
    }
    if (treeSelectedKey) {
        if (treeSelectedKey === '0,') {
            orgId.value = "";
        } else {
            orgId.value = treeSelectedKey.substring(0, treeSelectedKey.length - 1)
        }
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
    if(treeShow.value){
        treeShow.value = false;
    }else{
        treeShow.value = true;
    }
}

/**
 * 搜索框部分
 */
// 使用场所下拉框
const useTypeOptions = ref([]);
const eleTypeIndexList = async () => {
	const { data } = await getEleTypeIndexList()
	useTypeOptions.value = data
}

// 节能类型下拉框
const energyTypeOptions = computed<SelectOptionData[]>(() => [
    {
        label: t('menu.archives.energyType.no'), // 非节能
        value: '1',
    },
    {
        label: t('menu.archives.energyType.yes'), // 节能
        value: '2',
    },
]);

// 超期未检下拉框
const checkStateOptions = computed<SelectOptionData[]>(() => [
    {
        label: t('menu.archives.no'), // 否
        value: '1',
    },
    {
        label: t('menu.archives.yes'), // 是
        value: '2',
    },
]);

// 超期未保下拉框
const mainStateOptions = computed<SelectOptionData[]>(() => [
    {
        label: t('menu.archives.no'), // 否
        value: '1',
    },
    {
        label: t('menu.archives.yes'), // 是
        value: '2',
    },
]);

// 搜索框结构定义
const generateFormModel = () => {
    return {
        registCode: '',
        elevatorName: '',
        address: '',
        typeName: '',
        maintainName: '',
        propertyName: '',
        energyType: '',
        areaName: '',
        brandName: '',
        checkState: '',
        mainState: '',
        eleDeviceCode: '',
        qrCode: '',
        installDateStart: '',
        installDateEnds: '',
        date: [],
    };
};
const formModel = ref(generateFormModel());

// 搜索方法
const search = () => {
    if (formModel.value.date) {
        formModel.value.installDateStart = formModel.value.date[0];
        formModel.value.installDateEnds = formModel.value.date[1];
    }
    pagination.current=1;
    fetchData({
        'page': 1,
        'size': pagination.pageSize,
        'ownerIds': orgId.value,
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
const renderData = ref<Elevator[]>([]);
type Column = TableColumnData & { checked?: true };
const cloneColumns = ref<Column[]>([]);
const showColumns = ref<Column[]>([]);

// 定义分页
const pagination: Pagination = reactive({
    current: 1,
    pageSize: 10,
    showTotal: true,
    showPageSize: true,
    autoAdjust:true
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
        title: t('menu.archives.registCode'),
        dataIndex: 'registCode',
        align: "left",
        ellipsis: true,
        tooltip: true,
        headerCellClass: 'table-header-cell',
        width: 220
    },
    {
        title: t('menu.archives.eleDeviceCode'),
        dataIndex: 'eleDeviceCode',
        align: "left",
        ellipsis: true,
        tooltip: true,
        headerCellClass: 'table-header-cell',
        width: 220
    },
    {
        title: t('menu.archives.qrCode'),
        dataIndex: 'qrCode',
        align: "left",
        ellipsis: true,
        tooltip: true,
        headerCellClass: 'table-header-cell',
        width: 150
    },
    {
        title: t('menu.archives.elevatorName'),
        dataIndex: 'elevatorName',
        align: "left",
        ellipsis: true,
        tooltip: true,
        headerCellClass: 'table-header-cell',
        width: 220
    },
    {
        title: t('menu.archives.address'),
        dataIndex: 'address',
        align: "left",
        ellipsis: true,
        tooltip: true,
        headerCellClass: 'table-header-cell',
        width: 220
    },
    {
        title: t('menu.archives.operate'),
        dataIndex: 'operate',
        slotName: 'operate',
        align: "center",
        fixed: 'right',
        headerCellClass: 'table-header-cell',
        width: 80
    }
]);

const scroll = {
    x: 2000,
}

// 查询表格数据
const fetchData = async (params: ElevatorListPage = { page: 1, size: 20 }) => {
    setLoading(true);
    try {
        const { data } = await queryElevatorList(params);
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
const onPageChange = (current: number) => {
    fetchData({
        ...formModel.value,
        'page': current,
        'size': pagination.pageSize,
        'ownerIds': orgId.value
    });
};
// pageSize改变
const onPageSizeChange = (pageSize: number) => {
  pagination.pageSize=pageSize;
  fetchData({
    ...formModel.value,
    'page': pagination.current,
    'size': pagination.pageSize,
    'ownerIds': orgId.value
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
 * 页面新增、修改部分
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
    // router.push({
    //     path: `/archives/elevator/detail/${record.id}`,
    // })
    // 设置电梯详情缓存
    localStorage.setItem(`elevatorDetail_${record.id}`, JSON.stringify(toRaw(record)));
    //
    router.push({
        name: "IotDetectionDetail",
        query: {
            id: record.id
        }
    })
}

</script>

<script lang="ts">
  export default {
    name: 'Elevator',
  };
</script>

<style scoped lang="less">
.container {
    height: 100%;
  background-color: white;
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

.org_tree_div {
  z-index: 98;
  background: #FFFFFF;
  width: 400px;
  padding: 20px;
  margin-left: 20px;
  margin-top: 10px;
  box-shadow: 0px 8px 16px rgba(12, 0, 51, 0.1);
  border-radius: 4px;
}

.gray-divider-line{
  width: 100%;
  height: 1px;
  background-color: #F2F3F5
}
</style>
