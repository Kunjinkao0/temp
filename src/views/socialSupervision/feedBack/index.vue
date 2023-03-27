<template>
    <div class="background_css">
		<div class="first_line">
			<img class="first_line_image_size" :src="homeImage"/>
			<div class="title">社会监督</div>
			<div class="first_line_tab" @click="goto(1)">
			  <img class="first_line_image_size" :src="statisticImage"/>
			  <text class="complex_statistic_text">综合统计</text>
			</div>
			<div class="first_line_tab2">
			  <img class="first_line_image_size" :src="fankuiImage"/>
			  <text class="complex_statistic_text">公众反馈</text>
			</div>
			<!-- <div style="flex: 1"/> -->
			<div class="first_line_account">
			  <img class="account_image" :src="accountImage"/>
			  <text class="complex_statistic_text">Administrator</text>
			  <img class="account_arrow_image" :src="accountArrowImage"/>
			</div>
		</div>
		<div class="auto_layout">
			<a-grid :cols="24" :colGap="12" :rowGap="16">
				<a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }">
					<div class="right-aside">
					<a-card :body-style="{padding:'0px'}" class="cu-mart0 card-list">
						<template style="display: flex;">
						  <a-breadcrumb class="container-breadcrumb">
							<a-breadcrumb-item> 
								<img class="menu_image" :src="menuImage"/>
							</a-breadcrumb-item>
							<a-breadcrumb-item>
								<span class="meun_word">
									公众反馈
								</span>
							</a-breadcrumb-item>
						  </a-breadcrumb>
						</template>
					</a-card>
					<!-- 根据树菜单选中生成的面包屑 -->
					<a-card class="card-list" :body-style="{padding:'12px 20px'}">
						<div class="cu-fx-start-center cu-hei24">
							<a-trigger trigger="click" update-at-scroll>
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
					<a-card :body-style="{padding:'20px 20px 4px 20px'}" class="cu-mart1 card-list">
					    <!-- 搜索部分 -->
					    <a-row>
					        <a-col :flex="5">
					            <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }"
					                label-align="left">
					                <a-row :gutter="16">
					                    <a-col :span="8">
					                        <!-- 注册代码 -->
					                        <a-form-item field="registerCode" :label="$t('menu.feedBack.registerCode')"
					                            label-col-flex="60px">
					                            <a-input v-model="formModel.registCode" class="input-search"
					                                :placeholder="$t('menu.feedBack.registerCode')" allow-clear/>
					                        </a-form-item>
					                    </a-col>
					                    <a-col :span="8">
					                        <!-- 电梯编号 -->
					                        <a-form-item field="elevatorCode" :label="$t('menu.feedBack.elevatorCode')"
					                            label-col-flex="60px">
					                            <a-input v-model="formModel.elevatorCode" class="input-search"
					                                :placeholder="$t('menu.feedBack.elevatorCode')" allow-clear/>
					                        </a-form-item>
					                    </a-col>
					                    <a-col :span="8">
					                        <!-- 电梯名称 -->
					                        <a-form-item field="elevatorName" :label="$t('menu.feedBack.elevatorName')"
					                            label-col-flex="60px">
					                            <a-input v-model="formModel.elevatorName" class="input-search"
					                                :placeholder="$t('menu.feedBack.elevatorName')" allow-clear/>
					                        </a-form-item>
					                    </a-col>
					                </a-row>
					            </a-form>
					        </a-col>
					        <a-col :flex="1">
					            <div class="cu-fx">
					                <a-divider style="height: 32px" direction="vertical" />
					                <div class="cu-fx cu-marl16">
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
					            </div>
					        </a-col>
					    </a-row>
					</a-card>
					<!-- 公众反馈 -->
					<a-card :header-style="{ border: 0 }"
							class="cu-mart1 card-list">
						<a-table :bordered="false" row-key="id" :loading="loading" :pagination="pagination" :columns="cloneColumns"
							:data="renderData" @page-change="onPageChange"
							v-model:selectedKeys="selectedKeys"
							@page-size-change="onPageSizeChange" :sticky-header="100">
							<template #index="{ rowIndex }">
								{{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
							</template>
							<template #status="{ record }">
							    <span v-if="record.status === 1">
							        <!-- 待回复 -->
									<img class="point" :src="redPointImage"/>
									<span>待回复</span>
							    </span>
							    <span v-else-if="record.status === 2">
							        <!-- 已回复 -->
									<img class="point" :src="greenPointImage"/>
									<span>已回复</span>
							    </span>
							</template>
							<template #operate="{ record }">
							    <a-button class="table-operate-btn" type="text" @click="viewInfo(record)">
							        {{ $t('menu.feedBack.view') }}
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
    </div>
	<a-modal width="720px" class="maintenantice-ststistics" 
	v-model:visible="visible" @ok="handleOk" okText="取消" @cancel="handleCancel1" :hide-cancel="true" :simple="true"
	:body-style="{border:'1px solid var(--color-neutral-3)'}" >
	  <template #title>
	      <div class="title-div">
	       <span>查看</span>
	      </div>
	  </template>
	  <div>
	    <FeedBackInfo ref="feedBackInfo"/>
	  </div>
	</a-modal>
</template>

<script setup lang='ts'>
import { ref, computed, onMounted, reactive, watch } from 'vue';
import nodataPic from '@/assets/images/no-data.png';
import tree01Pic from '@/assets/images/tree/icon_tree_01.png';
import tree02Pic from '@/assets/images/tree/icon_tree_02.png';
import treeOpen from '@/assets/images/tree/tree-open.png';
import iconSiriPic from '@/assets/images/social/icon_siri.png';
import iconSiri1Pic from '@/assets/images/social/icon_siri1.png';
import iconSiri2Pic from '@/assets/images/social/icon_siri2.png';
import iconSiri3Pic from '@/assets/images/social/icon_siri3.png';
import iconSiri4Pic from '@/assets/images/social/icon_siri4.png';
import homeImage from '@/assets/images/statistical/statistical_home_icon.png'
import statisticImage from '@/assets/images/statistical/complex_statistic_icon.png'
import fankuiImage from '@/assets/images/social/people.png'
import menuImage from '@/assets/images/social/icon_menu.png'
import accountImage from '@/assets/images/statistical/account.png'
import accountArrowImage from '@/assets/images/statistical/account_arrow.png'
import redPointImage from '@/assets/images/social/redPoint.png'
import greenPointImage from '@/assets/images/social/greenPoint.png'
import { QueryTreeParams } from '@/api/tree';
import Tree from '@/components/tree/index.vue';
import { useI18n } from 'vue-i18n';
import { getEleAdvocateList, QueryRecordParams, QueryParams } from '@/api/socialSupervision/feedBack';
import { getOrgOwnerTree } from '@/utils/auth'
import { Pagination } from '@/types/global';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import useLoading from '@/hooks/loading';
import cloneDeep from 'lodash/cloneDeep';
import { useRouter } from "vue-router";
import { Message } from '@arco-design/web-vue';
import FeedBackInfo from './components/feed-back-info.vue'

// 国际化
const { t } = useI18n();
const router = useRouter();
const radioType = ref('day');
const visible = ref(false);
const feedBackInfo = ref();


onMounted(() => {
    const params: QueryTreeParams = {
        fromPage: "web"
    }
    // ajax获取树数据
    getOriginTreeData(params);
});

let collapseTitle = ref('展开');
let collapseFlag = ref(false);
const collapseClick = () => {
    collapseFlag.value = !collapseFlag.value;
    collapseTitle.value = "收起";
}

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

// 搜索框结构定义
const generateFormModel = () => {
    return {
        registCode: '',
        elevatorCode: '',
        elevatorName: '',
    };
};
const formModel = ref(generateFormModel());
// 搜索方法
const search = () => {
    fetchData({
        'ownerIds': orgId.value,
        'page': 1,
        'size': pagination.pageSize,
		...formModel.value,
    } as any);
};

// 重置方法
const reset = () => {
    formModel.value = generateFormModel();
};
const typeChange = (contentType: string) => {};

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
        width: 80,
        slotName: 'index',
        align: 'center',
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.feedBack.registerCode'),
        dataIndex: 'registCode',
        ellipsis: true,
        align: 'left',
        tooltip: true,
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.feedBack.elevatorCode'),
        dataIndex: 'elevatorCode',
        ellipsis: true,
        tooltip: true,
        align: 'left',
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.feedBack.qrCode'),
        dataIndex: 'qrCode',
        ellipsis: true,
        tooltip: true,
        align: 'left',
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.feedBack.elevatorName'),
        dataIndex: 'elevatorName',
        ellipsis: true,
        tooltip: true,
        align: 'center',
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.feedBack.backTime'),
        dataIndex: 'createTime',
        align: 'center',
        ellipsis: true,
        tooltip: true,
        headerCellClass: 'table-header-cell',
    },
	{
	    title: t('menu.feedBack.content'),
	    dataIndex: 'note',
	    align: 'center',
	    ellipsis: true,
	    tooltip: true,
	    headerCellClass: 'table-header-cell',
	},
	{
	    title: t('menu.feedBack.state'),
	    dataIndex: 'status',
		slotName: 'status',
	    align: 'center',
	    ellipsis: true,
	    tooltip: true,
	    headerCellClass: 'table-header-cell',
	},
	{
	    title: t('menu.feedBack.replyTime'),
	    dataIndex: 'dealDateTime',
	    align: 'center',
	    ellipsis: true,
	    tooltip: true,
	    headerCellClass: 'table-header-cell',
	},
	{
	    title: t('menu.feedBack.operate'),
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
        const { data } = await getEleAdvocateList(params);
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
    // fetchData({ ...basePagination, current });
    fetchData({
		...formModel.value,
        'ownerIds': orgId.value,
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

// pageSize改变
const onPageSizeChange = (pageSize: number) => {
  pagination.pageSize=pageSize;
  search();
};


const goto = (type: number) => {
    if(type === 1){
		router.push({
		    name: 'socialSupervision'
		});
    }
}

// 跳转页面
const viewInfo = (record) => {
	console.log(record)
	feedBackInfo.value.init(record.id,record.eleId);
	visible.value = true;
};

const handleOk = () => {
	visible.value = false;
};

const handleCancel1 = () => {
	visible.value = false;
}
</script>

<script lang="ts">
  export default {
    name: 'FeedBack',
  };
</script>

<style scoped lang='less'>
	.first_line {
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  padding-top: 10px;
	  padding-bottom: 10px;
	  margin-left: 24px;
	}
	
	.first_line_image_size {
	  width: 25px;
	  height: 25px;
	}
	
	.title {
	  font-size: x-large;
	  color: #FFFFFF;
	  background-color: transparent;
	  margin-left: 10px;
	  margin-right: 15px;
	}
	
	.complex_statistic_text {
	  font-size: medium;
	  color: #FFFFFF;
	  background-color: transparent;
	}
	
	.first_line_tab {
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  cursor: pointer;
	}
	
	.first_line_tab2 {
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  margin-left: 15px;
	}
	.account_image {
	  width: 20px;
	  height: 20px;
	}
	
	.account_arrow_image {
	  width: 15px;
	  height: 15px;
	}
	
	.first_line_account {
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  margin-right: 27px;
	}

.background_css {
    background: linear-gradient(179.41deg, #186FF2 0.49%, rgba(81, 148, 246, 0.37) 14.12%, rgba(244, 249, 255, 0) 36.85%, #F3F8FE 88.16%);
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0px;
	top: 0px;
	mix-blend-mode: normal;
}
.auto_layout{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 8px;
	gap: 8px;
	
	position: absolute;
	height: 1016px;
	left: 24px;
	right: 24px;
	top: 64px;
	
	/* list/背景色 */
	background: #EEF1FB;
}
.title01{
	font-family: 'OPPOSans';
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	display: flex;
	align-items: center;
	text-transform: capitalize;
	color: rgba(0, 0, 0, 0.87);
	flex: none;
	order: 0;
	flex-grow: 1;
}

.con {
    height: 100%;
    width: 100%;
    overflow: hidden;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

}

.top {
    width: 100%;
}

.top>.section {
    display: flex;
    margin-bottom: 16px;
}

.top>.section>.col {
    flex-grow: 1;
    flex-shrink: 1;
    margin-right: 16px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    color: #ffffff;
}

.top>.section>.col>.shuju {
    width: 150px;
}

.top>.section>.col>.shuju p {
   font-family: 'PingFang SC';
   font-style: normal;
   font-weight: 500;
   font-size: 16px;
   line-height: 24px;
   display: flex;
   align-items: center;
   color: #FFFFFF;
   flex: none;
   order: 0;
   flex-grow: 0;
}

.top>.section>.col>.shuju p:last-child {
   font-family: 'Nexa Bold';
   font-style: normal;
   font-weight: 700;
   font-size: 24px;
   line-height: 24px;
   text-transform: capitalize;
   color: #FFFFFF;
   flex: none;
   order: 0;
   flex-grow: 0;
}

.top>.section img {
    width: 56px;
    height: 56px;
}

.top>.section>.col:last-child,
.top>.section:last-child>.col:last-child {
    margin-right: 0;
}

.top>.section>.col:nth-child(1) {
    background:url(@/assets/images/social/vector.png) no-repeat center bottom, linear-gradient(270deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, #7BC0FC 0%, #6AA1FF 99.76%);
    background-size: 100% 82px;
}

.top>.section>.col:nth-child(2) {
    background:linear-gradient(270deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, #4CD263 0%, #5EDFD6 100%);
    background-size: 100% 82px;
}

.top>.section>.col:nth-child(3) {
    background:url(@/assets/images/social/vector.png) no-repeat center bottom,linear-gradient(270deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, #7BC0FC 0%, #6AA1FF 99.76%), linear-gradient(90deg, #6AA1FF 0%, #A871E3 100%);
    background-size: 100% 82px;
}

.top>.section>.col:nth-child(4) {
    background: url(@/assets/images/social/vector.png) no-repeat center bottom, linear-gradient(270deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, #4CD263 0%, #5EDFD6 100%), linear-gradient(90deg, #6AA1FF 0%, #A871E3 100%);
    background-size: 100% 82px;
}

.top>.section>.col:nth-child(5) {
    background:  url(@/assets/images/social/vector.png) no-repeat center bottom,linear-gradient(270deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, #FAAC7B 0%, #F98981 100%), linear-gradient(90deg, #6AA1FF 0%, #A871E3 100%);
    background-size: 100% 82px;
}

.top>.section:last-child>.col:nth-child(1) {
    background:  url(@/assets/images/social/vector.png) no-repeat center bottom, linear-gradient(270deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, #7BC0FC 0%, #6AA1FF 99.76%);
    background-size: 100% 82px;
}

.top>.section:last-child>.col:nth-child(2) {
    background: url(@/assets/images/social/vector.png) no-repeat center bottom,linear-gradient(270deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, #4CD263 0%, #5EDFD6 100%);
    background-size: 100% 82px;
}

.top>.section:last-child>.col:nth-child(3) {
    background:url(@/assets/images/social/vector.png) no-repeat center bottom,linear-gradient(270deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, #7BC0FC 0%, #6AA1FF 99.76%), linear-gradient(90deg, #6AA1FF 0%, #A871E3 100%);
    background-size: 100% 82px;
}

.top>.section:last-child>.col:nth-child(4) {
    background:  url(@/assets/images/social/vector.png) no-repeat center bottom,linear-gradient(270deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, #4CD263 0%, #5EDFD6 100%), linear-gradient(90deg, #6AA1FF 0%, #A871E3 100%);
    background-size: 100% 82px;
}

.top>.section:last-child>.col:nth-child(5) {
    background:  url(@/assets/images/social/vector.png) no-repeat center bottom,linear-gradient(270deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, #FAAC7B 0%, #F98981 100%), linear-gradient(90deg, #6AA1FF 0%, #A871E3 100%);
    background-size: 100% 82px;
}

.bilv{
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0px 8px;
	width: 119px;
	height: 20px;
	background: rgba(255, 255, 255, 0.7);
	backdrop-filter: blur(2px);
	border-radius: 2px;
	flex: none;
	order: 1;
	flex-grow: 0;
}
.bilvzi{
	font-family: 'OPPOSans';
	font-style: normal;
	font-weight: 400;
	font-size: 12px;
	line-height: 20px;
	display: flex;
	align-items: center;
	text-transform: capitalize;
	color: #4E5969;
	flex: none;
	order: 0;
	flex-grow: 0;
}
.cu-mart1{
	margin-top: 1px;
}
.cu-mart0{
	width: 100%;
	margin-bottom: 1px;
}
.container-breadcrumb {
    margin: 16px 0;
    :deep(.arco-breadcrumb-item) {
      color: rgb(var(--gray-6));
      &:last-child {
        color: rgb(var(--gray-8));
      }
    }
  }
.menu_image{
	width: 13.33px;
	height: 12px;
}
.meun_word{
	font-family: 'PingFang SC';
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 22px;
	color: #1D2129;
	flex: none;
	order: 1;
	flex-grow: 0;
}
.point{
	margin-right: 7px;
	flex-direction: row;
	align-items: flex-start;
	padding: 0px;
	width: 6px;
	height: 6px;
	background: #07C160;
	border-radius: 100px;
	flex: none;
	order: 0;
	flex-grow: 0;
}
</style>
