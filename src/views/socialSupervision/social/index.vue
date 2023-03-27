<template>
    <div class="background_css">
		<div class="first_line">
			<img class="first_line_image_size" :src="homeImage"/>
			<div class="title">社会监督</div>
			<div class="first_line_tab">
			  <img class="first_line_image_size" :src="statisticImage"/>
			  <text class="complex_statistic_text">综合统计</text>
			</div>
			<div class="first_line_tab2" @click="goto(1)">
			  <img class="first_line_image_size" :src="fankuiImage"/>
			  <text class="complex_statistic_text">公众反馈</text>
			</div>
			<div style="flex: 1"/>
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
					<!-- 公众反馈统计 -->
					<a-card :body-style="{padding:'unset'}" 
							:header-style="{ border: 0 }"
							class="cu-mart16 card-list">
						<template #title>
						    <span class="title01">
						        公众反馈统计
						    </span>
						</template>
						<template #extra>
						    <a-radio-group
						        v-model:model-value="radioType0"
						        type="button"
						        size="mini"
						        @change="typeChange0"
						    >
						        <a-radio value="year">
						        	{{ $t('menu.rescue.statistics.year') }}
						        </a-radio>
						        <a-radio value="month">
						            {{ $t('menu.rescue.statistics.month') }}
						        </a-radio>
						        <a-radio value="day">
						            {{ $t('menu.rescue.statistics.day') }}
						        </a-radio>
						    </a-radio-group>
						</template>
						<div class="con">
							<div class="top">
								<div class="section">
									<div class="col">
										<div class="shuju">
											<p>反馈次数</p>
											<p>{{curr.advNum}}次</p>
											<div class="bilv">
												<div class="bilvzi">较去年</div>
												<div v-if="curr.advNum >= last.advNum" class="cu-font12 cu-color-F53F3F cu-bgcolor-F98981-01 cu-radius50 cu-div-padding5" style="padding: 3px 2px;">
												    
													<icon-caret-up class="up-icon" />
													<span>上升</span>
												    <span>{{(curr.advNum-last.advNum)}}</span>
												</div>
												<div v-else class="cu-font12 cu-color-00B42A cu-bgcolor-00B42A-01 cu-radius50 cu-div-padding5" style="padding: 3px 2px;">
												    
													<icon-caret-down class="down-icon" />
													<span>下降</span>
												    <span>{{(last.advNum-curr.advNum)}}</span>
												</div>
											</div>
										</div>
										<img :src="iconSiriPic" />
									</div>
									<div class="col">
										<div class="shuju">
											<p>反馈率</p>
											<p>{{curr.advRate}}%</p>
											<div class="bilv">
												<div class="bilvzi">较去年</div>
												<div v-if="curr.advRate >= last.advRate" class="cu-font12 cu-color-F53F3F cu-bgcolor-F98981-01 cu-radius50 cu-div-padding5" style="padding: 3px 2px;">
												    
													<icon-caret-up class="up-icon" />
													<span>上升</span>
												    <span>{{(curr.advRate-last.advRate)}}%</span>
												</div>
												<div v-else class="cu-font12 cu-color-00B42A cu-bgcolor-00B42A-01 cu-radius50 cu-div-padding5" style="padding: 3px 2px;">
												    
													<icon-caret-down class="down-icon" />
													<span>下降</span>
												    <span>{{(last.advRate-curr.advRate)}}%</span>
												</div>
											</div>
										</div>
										<img :src="iconSiri1Pic" />
									</div>
									<div class="col">
										<div class="shuju">
											<p>回复次数</p>
											<p>{{curr.replyNum}}次</p>
											<div class="bilv">
												<div class="bilvzi">较去年</div>
												<div v-if="curr.replyNum >= last.replyNum" class="cu-font12 cu-color-F53F3F cu-bgcolor-F98981-01 cu-radius50 cu-div-padding5" style="padding: 3px 2px;">
												   
													<icon-caret-up class="up-icon" />
													 <span>上升</span>
												    <span>{{(curr.replyNum-last.replyNum)}}</span>
												</div>
												<div v-else class="cu-font12 cu-color-00B42A cu-bgcolor-00B42A-01 cu-radius50 cu-div-padding5" style="padding: 3px 2px;">
												    
													<icon-caret-down class="down-icon" />
													<span>下降</span>
												    <span>{{(last.replyNum-curr.replyNum)}}</span>
												</div>
											</div>
										</div>
										<img :src="iconSiri2Pic" />
									</div>
									<div class="col">
										<div class="shuju">
											<p>回复率</p>
											<p>{{curr.replyRate}}%</p>
											<div class="bilv">
												<div class="bilvzi">较去年</div>
												<div v-if="curr.replyRate >= last.replyRate" class="cu-font12 cu-color-F53F3F cu-bgcolor-F98981-01 cu-radius50 cu-div-padding5" style="padding: 3px 2px;">
												   
													<icon-caret-up class="up-icon" />
													 <span>上升</span>
												    <span>{{(curr.replyRate-last.replyRate)}}%</span>
												</div>
												<div v-else class="cu-font12 cu-color-00B42A cu-bgcolor-00B42A-01 cu-radius50 cu-div-padding5" style="padding: 3px 2px;">
												    
													<icon-caret-down class="down-icon" />
													<span>下降</span>
												    <span>{{(last.replyRate-curr.replyRate)}}%</span>
												</div>
											</div>
										</div>
										<img :src="iconSiri3Pic" />
									</div>
									<div class="col">
										<div class="shuju">
											<p>平均回复时间</p>
											<p>{{curr.avgReplyTimes}}小时</p>
											<div class="bilv">
												<div class="bilvzi">较去年</div>
												<div v-if="curr.avgReplyTimes >= last.avgReplyTimes" class="cu-font12 cu-color-F53F3F cu-bgcolor-F98981-01 cu-radius50 cu-div-padding5" style="padding: 3px 2px;">								    
													<icon-caret-up class="up-icon" />
													<span>上升</span>
												    <span>{{(curr.avgReplyTimes-last.avgReplyTimes)}}</span>
												</div>
												<div v-else class="cu-font12 cu-color-00B42A cu-bgcolor-00B42A-01 cu-radius50 cu-div-padding5" style="padding: 3px 2px;">
													<icon-caret-down class="down-icon" />
													<span>下降</span>
												    <span>{{(last.avgReplyTimes-curr.avgReplyTimes)}}</span>
												</div>
											</div>
										</div>
										<img :src="iconSiri4Pic" />
									</div>
								</div>
							</div>
						</div>
					</a-card>
					<!-- 项目反馈率排名 -->
					<a-card :body-style="{padding:'unset'}" 
							:header-style="{ border: 0 }"
							class="cu-mart16 card-list">
						<template #title>
						    <span class="title01">
						        项目反馈率排名
						    </span>
						</template>
						<template #extra>
						    <a-radio-group
						        v-model:model-value="radioType"
						        type="button"
						        size="mini"
						        @change="typeChange"
						    >
						        <a-radio value="year">
						        	{{ $t('menu.rescue.statistics.year') }}
						        </a-radio>
						        <a-radio value="month">
						            {{ $t('menu.rescue.statistics.month') }}
						        </a-radio>
						        <a-radio value="day">
						            {{ $t('menu.rescue.statistics.day') }}
						        </a-radio>
						    </a-radio-group>
						</template>
						<a-card :header-style="{ border: 0 }"
								class="cu-mart1 card-list">
						<a-table :bordered="false" row-key="id" :loading="loading" :pagination="pagination" :columns="cloneColumns"
							:data="renderData" @page-change="onPageChange"
							v-model:selectedKeys="selectedKeys"
							@page-size-change="onPageSizeChange" :sticky-header="100">
							<template #index="{ rowIndex }">
							    <a-avatar :style="{
							            marginRight: '8px',
							            background:
							                rowIndex + 1 +(pagination.current - 1) * pagination.pageSize === 1
							                    ? 'radial-gradient(63.11% 63.11% at 31.97% 19.67%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%), #F53F3F'
							                    : rowIndex +1 +(pagination.current - 1) *pagination.pageSize ===2
							                    ? 'radial-gradient(63.11% 63.11% at 31.97% 19.67%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%), #FF7D00'
							                    : rowIndex + 1 +(pagination.current - 1) *pagination.pageSize ===3
							                    ? 'radial-gradient(63.11% 63.11% at 31.97% 19.67%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%), #3491FA'
							                    : '#F4F4F4'
							        }"
							        :size="20"
							        >
							        <span class="cu-color-1D2129" v-if="rowIndex + 1 +(pagination.current - 1) * pagination.pageSize > 3">{{rowIndex + 1 + (pagination.current - 1) * pagination.pageSize}}</span>
							        <span v-else>{{rowIndex + 1 + (pagination.current - 1) * pagination.pageSize}}</span>
							    </a-avatar>
							</template>
							<!-- table空数据样式插槽 -->
							<template #empty>
								<div class="table-nodata">
									<a-image :src="nodataPic" :preview="false"></a-image>
								</div>
							</template>
						</a-table>
						</a-card>
					</a-card>
				</div>
				</a-grid-item>
			</a-grid>
		</div>
    </div>
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
import accountImage from '@/assets/images/statistical/account.png'
import accountArrowImage from '@/assets/images/statistical/account_arrow.png'
import { QueryTreeParams } from '@/api/tree';
import Tree from '@/components/tree/index.vue';
import { useI18n } from 'vue-i18n';
import moment from 'moment';
import { getEleAdvocateRanking, getEleAdvocateStat,QueryRecordParams, QueryParams } from '@/api/socialSupervision/social';
import { getFirstDayOfWeek,getFirstDayOfMonth,getFirstDayOfYear } from '@/utils/dateuUils'
import { getOrgOwnerTree } from '@/utils/auth'
import { Pagination } from '@/types/global';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import useLoading from '@/hooks/loading';
import cloneDeep from 'lodash/cloneDeep';
import { useRouter } from "vue-router";
import { Message } from '@arco-design/web-vue';

// 国际化
const { t } = useI18n();
const router = useRouter();
const radioType = ref('year');
const radioType0 = ref('year');
let startTime0 = ref('');
let endTime0 = ref('');
let startTime = ref('');
let endTime = ref('');
let type = ref('');
const curr = ref({});
const last = ref({});
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
	const nowdate = new Date();
	endTime.value = moment(nowdate).subtract(0, 'day').format('YYYY-MM-DD');
	startTime.value = getFirstDayOfYear(nowdate);
	const nowdate0 = new Date();
	endTime0.value = moment(nowdate0).subtract(0, 'day').format('YYYY-MM-DD');
	startTime0.value = getFirstDayOfYear(nowdate0);
	type.value ='1';
	console.log(endTime0.value);
	console.log(endTime.value);
    search(); // 加载table数据
	searchDate(); // 加载反馈统计数据
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
	searchDate();
}

// 获取树组件折叠树的方法
const collapseTree = () => {
    treeShow.value = false;
}

// 展开树
const expandTree = () => {
    treeShow.value = true;
}

// 搜索方法
const search = () => {
    fetchData({
        'ownerIds': orgId.value,
        'page': 1,
        'size': pagination.pageSize,
		'startTime': startTime.value,
		'endTime': endTime.value,
    } as any);
};

const searchDate = () => {
    fetchOtherData({
		'type':type.value,
        'ownerIds': orgId.value,
		'startTime': startTime0.value,
		'endTime': endTime0.value,
    } as any);
};

const typeChange = (contentType: string) => {
	const nowdate = new Date();
	endTime.value = moment(nowdate).subtract(0, 'day').format('YYYY-MM-DD');
	if (contentType === 'day') {
	    startTime.value = moment(nowdate).subtract(0, 'day').format('YYYY-MM-DD');
		search();
	} else if (contentType === 'month') {
	    startTime.value = getFirstDayOfMonth(nowdate);
	    search();
	} else if (contentType === 'year') {
	    startTime.value = getFirstDayOfYear(nowdate);
	    search();
	}
};

const typeChange0 = (contentType: string) => {
	const nowdate = new Date();
	endTime0.value = moment(nowdate).subtract(0, 'day').format('YYYY-MM-DD');
	if (contentType === 'day') {
	    startTime0.value = moment(nowdate).subtract(0, 'day').format('YYYY-MM-DD');
		type.value ='3';
		searchDate();
	} else if (contentType === 'month') {
	    startTime0.value = getFirstDayOfMonth(nowdate);
		type.value ='2';
	    searchDate();
	} else if (contentType === 'year') {
	    startTime0.value = getFirstDayOfYear(nowdate);
		type.value ='1';
	    searchDate();
	}
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
        title: t('menu.social.ranking'),
        dataIndex: 'index',
        width: 80,
        slotName: 'index',
        align: 'center',
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.social.projectName'),
        dataIndex: 'ownerName',
        ellipsis: true,
        align: 'left',
        tooltip: true,
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.social.mainName'),
        dataIndex: 'maintainName',
        ellipsis: true,
        tooltip: true,
        align: 'left',
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.social.eleNum'),
        dataIndex: 'eleNum',
        ellipsis: true,
        tooltip: true,
        align: 'left',
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.social.feedBackTimes'),
        dataIndex: 'advNum',
        ellipsis: true,
        tooltip: true,
        align: 'center',
        headerCellClass: 'table-header-cell',
    },
    {
        title: t('menu.social.feedBackRate'),
        dataIndex: 'advRate',
        align: 'center',
        ellipsis: true,
        tooltip: true,
        headerCellClass: 'table-header-cell',
    },
    
]);

// 查询表格数据
const fetchData = async (
    params: QueryParams = { page: 1, size: 20 }
) => {
    setLoading(true);
    try {
        const { data } = await getEleAdvocateRanking(params);
        renderData.value = data.rows;
        pagination.current = params.page;
        pagination.total = data.total;
    } catch (err) {
        // you can report use errorHandler or other
    } finally {
        setLoading(false);
    }
};

// 查询公众反馈统计
const fetchOtherData = async (params) => {
    setLoading(true);
    try {
        const { data } = await getEleAdvocateStat(params);
        curr.value =data.curr;
		last.value =data.last;
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
        'ownerIds': orgId.value,
        'page': page,
        'size': pagination.pageSize,
		'startTime': startTime.value,
		'endTime': endTime.value
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

// 跳转页面
const goto = (type: number) => {
    if(type === 1){
		router.push({
		    name: 'socialFeedback'
		});
    }
}

</script>

<script lang="ts">
  export default {
    name: 'Social',
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
	}
	
	.first_line_tab2 {
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  margin-left: 15px;
	  cursor: pointer;
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
</style>
