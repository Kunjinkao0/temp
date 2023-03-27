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
					<a-card :body-style="{padding:'0px'}" class="cu-mart0 card-list">
						<template style="display: flex;">
						  <a-breadcrumb class="container-breadcrumb">
							<a-breadcrumb-item> 
								<img class="menu_image" :src="menuImage"/>
							</a-breadcrumb-item>
							<a-breadcrumb-item>
								<span class="meun_word">
									电梯地图
								</span>
							</a-breadcrumb-item>
						  </a-breadcrumb>
						</template>
					</a-card>
					<!-- 地图 -->
					<a-card :header-style="{ border: 0 }" class="cu-mart1 card-list">
						<div id="map" class="map_style"></div>
						<div class="container">
						    <a-form ref="formRef" layout="vertical" :model="formModel">
						      <a-space direction="vertical" :size="16" >
						        <a-card class="general-card">
								<div style="display: flex;">
									<div class="cu-link-vertical" style="margin-top: 10px;"></div>
									<span class="cu-font14 cu-fontWeight600 cu-marl4" style="margin-top: 10px;">{{ $t('menu.archives.serchEle') }}</span>
									<div class="in-collapse cu-font14 cu-pointer" @click="collapseClick()" style="margin-top: 10px; margin-left: 130px;">{{ collapseTitle}}
										<span>
											<icon-up v-if="collapseFlag" class="in-collapse-icon" />
										</span>
										<span>
											<icon-down v-if="!collapseFlag" class="in-collapse-icon" />
										</span>
									</div>
								</div>
						          <a-row :gutter="80" v-if="collapseFlag">
						            <a-col :span="24">
						              <a-form-item field="name" :validate-trigger="['change','input', 'blur']">
						                <a-input v-model="formModel.elevatorName" :placeholder=" $t('menu.eleMap.putEleName')"></a-input>
						              </a-form-item>
						            </a-col>
						          </a-row>
						          <a-row :gutter="80" v-if="collapseFlag">
						            <a-col :span="24">
						              <a-form-item field="floorId" :validate-trigger="['change','input', 'blur']">
						                <a-select v-model="formModel.areaName" :placeholder="$t('menu.eleMap.choseFloor')" allow-search allow-clear>
						                  <a-option v-for="item of areaUnitOption" :value="item.areaName" :label="item.areaName" :key="item.id"/>
						                </a-select>
						              </a-form-item>
						            </a-col>
						          </a-row>
								  <a-row :gutter="80" v-if="collapseFlag">
								    <a-col :span="24">
								      <a-form-item field="useUnitId" :validate-trigger="['change','input', 'blur']">
								        <a-select v-model="formModel.propertyName" :placeholder="$t('menu.eleMap.chosePro')" allow-search allow-clear>
								          <a-option v-for="item of useUnitOption" :value="item.propertyName" :label="item.propertyName" :key="item.id"/>
								        </a-select>
								      </a-form-item>
								    </a-col>
								  </a-row>
								  <a-row :gutter="80" v-if="collapseFlag">
								    <a-col :span="24">
								      <a-form-item field="maintainId" :validate-trigger="['change','input', 'blur']">
								        <a-select v-model="formModel.maintainName" :placeholder="$t('menu.eleMap.choseMain')" allow-search allow-clear>
								          <a-option v-for="item of mainUnitOption" :value="item.maintainName" :label="item.maintainName" :key="item.id"/>
								        </a-select>
								      </a-form-item>
								    </a-col>
								  </a-row>
								 <a-row :gutter="80" v-if="collapseFlag">
								    <a-col :span="24">
								      <a-form-item field="checkState" :validate-trigger="['change','input', 'blur']">
								        <a-select v-model="formModel.checkState"  
										:placeholder="$t('menu.eleMap.choseNotCheck')" :options="checkStateOptions"  allow-search allow-clear/>
								      </a-form-item>
								    </a-col>
								  </a-row>
								  <a-row :gutter="80" v-if="collapseFlag">
								    <a-col :span="24">
								      <a-form-item field="mainState" :validate-trigger="['change','input', 'blur']">
								        <a-select v-model="formModel.mainState"
										:placeholder="$t('menu.eleMap.choseNotProtect')" :options="mainStateOptions" allow-search allow-clear/>
								      </a-form-item>
								    </a-col>
								  </a-row>
								  <a-button type="primary" html-type="submit" long @click="search" v-if="collapseFlag">
								    {{ $t('menu.eleMap.search') }}
								  </a-button>
						        </a-card>
						      </a-space>
						    </a-form>
							<div v-if="collapseFlag">
							  <a-space direction="vertical" :size="16"  style="display: block;">
								<a-card class="general-card">
									<div style="display: flex;">
										<div class="cu-link-vertical" style="margin-top: 10px;"></div>
										<span class="cu-font14 cu-fontWeight600 cu-marl4" style="margin-top: 10px;">{{ $t('menu.eleMap.eleList') }}</span>
									</div>
									<div >
										<!-- table部分 -->
										<a-table :bordered="false" row-key="id" class="table-style" :loading="loading" :pagination="paginationProps" 
										:columns="cloneColumns" :stripe="false" :data="renderData" @page-change="onPageChange" @row-click="rowClick"
										:show-header="false" :hoverable="false">
											<template #elevatorName="{ record }">
												<a-avatar shape="square">
													<img alt="avatar" :src="mapList"/>
												</a-avatar>
												<span style="color: #165DFF;cursor: pointer;">{{ $t(`${record.elevatorName}`) }}</span>
											</template>
										    <!-- table空数据样式插槽 -->
										    <template #empty>
										        <div class="table-nodata">
										            <a-image :src="nodataPic" :preview="false"></a-image>
										        </div>
										    </template>
										</a-table>
									</div>
								</a-card>
							  </a-space>
							</div>
						</div>
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
import homeImage from '@/assets/images/statistical/statistical_home_icon.png'
import statisticImage from '@/assets/images/statistical/complex_statistic_icon.png'
import fankuiImage from '@/assets/images/social/people.png'
import menuImage from '@/assets/images/social/icon_menu.png'
import accountImage from '@/assets/images/statistical/account.png'
import accountArrowImage from '@/assets/images/statistical/account_arrow.png'
import mapList from '@/assets/images/map/map_list.png';
import placeImage from '@/assets/images/map/place.png';
import { useI18n } from 'vue-i18n';
import { getEleMaintainIndexList,getElePropertyIndexList } from '@/api/maintenance/maintenanceStatistics';
import { queryElevatorList, getEleTypeIndexList } from '@/api/archives/elevator';
import { getEleAreaIndexList, getEleMapList } from '@/api/map/eleMap';
import { Elevator, ElevatorListPage,ElevatorMap } from '@/api/archives/types/elevatorType';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import useLoading from '@/hooks/loading';
import cloneDeep from 'lodash/cloneDeep';
import { useRouter } from "vue-router";
import { Pagination } from '@/types/global';


// 国际化
const { t } = useI18n();
const router = useRouter();
const { loading, setLoading } = useLoading(true);
const AMap = (window as any).AMap;
let lng=116.397428;
let lat=39.90923;
// 维保单位下拉
const mainUnitOption = ref([]);

// 物业单位下拉
const useUnitOption = ref([]);

// 楼宇下拉
const areaUnitOption = ref([]);

const generateFormModel = () => {
	return {
		elevatorName: '',
		areaName: '',
		maintainName: '',
		propertyName: '',
		checkState: '',
		mainState: '',
	};
};

const formModel = ref(generateFormModel());

onMounted(() => {
	setTimeout(() => {
	 init();
	}, 
	500);
   
});

const init = async () => {
	initMap();
	eleMaintainIndexList();
	elePropertyIndexList();
	eleAreaIndexList();
	search();
	setTimeout(() => {
	 searchElevator({
	     'page': 1,
	     'size': paginationProps.pageSize,
	 });
	}, 
	500);
}
 let map = null;
const initMap = () => {
	map = new AMap.Map("map", {
        zoom: 14,
        center: [lng === undefined?116.397428:lng, lat === undefined?39.90923:lat],
        viewMode: '3D'
    }); 
}

let collapseTitle = ref('展开');
let collapseFlag = ref(false);
const collapseClick = () => {
    collapseFlag.value = !collapseFlag.value;
    collapseTitle.value = "收起";
}

const eleMaintainIndexList = async () => {
	const { data } = await getEleMaintainIndexList()
	mainUnitOption.value = data
}

const elePropertyIndexList = async () => {
	const { data } = await getElePropertyIndexList()
	useUnitOption.value = data
}

const eleAreaIndexList = async () => {
	const { data } = await getEleAreaIndexList()
	areaUnitOption.value = data
}
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

const mapData = ref<ElevatorMap[]>([]);

let content = [];
// 查询表电梯地图
const searchElevator = async (params: ElevatorListPage = { page: 1, size: 20 }) => {
    setLoading(true);
    try {
        const { data } = await getEleMapList(params);
        mapData.value = data.rows;
		// 设置查询第一个电梯坐标为中心点
		if(mapData.value[0].gd_longitude&&mapData.value[0].gd_latitude&&mapData.value[0].gd_longitude!==''&&mapData.value[0].gd_latitude!==''){
			lng = Number(mapData.value[0].gd_longitude);
			lat = Number(mapData.value[0].gd_latitude);
			initMap();
		}
		for (let item of mapData.value) {
			
			makeMaker(Number(item.gd_longitude),Number(item.gd_latitude),item.elevatorName);
		}
		if(mapData.value.length===1){
			content = [];
			content.push(mapData.value[0].elevatorName);
			 content.push('<div style ="display: flex;flex-direction: row;justify-content: center;align-items: center;padding: 2px 12px;gap: 8px;width: 72px;height: 24px;background: #072CA6;border-radius: 2px;flex: none;order: 1;flex-grow: 0;margin: 0 auto;"><span style="font-style: normal;font-weight: 400;font-size: 12px;line-height: 20px;display: flex;align-items: center;color: #FFFFFF;flex: none;order: 1;flex-grow: 0;">查看详情</span></div>');
			const infoWindow = new AMap.InfoWindow({
					  content: content.join("<br>")  // 传入 dom 对象，或者 html 字符串
			});
			const position = new AMap.LngLat(lng, lat);
			infoWindow.open(map,position);
		}
    } catch (err) {
        // you can report use errorHandler or other
    } finally {
        setLoading(false);
    }
}
const iconImg = new AMap.Icon({
    size: new AMap.Size(32, 32),    // 图标尺寸
    image: placeImage,  // Icon的图像
    imageSize: new AMap.Size(32, 32)   // 根据所设置的大小拉伸或压缩图片
});

const makeMaker = (longitude,latitude,eleName) => {
	
    if(lng !== undefined || lat !== undefined){
	   let marker = new AMap.Marker({
		   position: [longitude,latitude],
		   offset: new AMap.Pixel(-10, -10),
		   icon: iconImg, // 添加 Icon 图标 URL
		   
	   });
	   map.add(marker);
	   content = [];
	   marker.content = `${eleName}<div style ="display: flex;flex-direction: row;justify-content: center;align-items: center;padding: 2px 12px;gap: 8px;width: 72px;height: 24px;background: #072CA6;border-radius: 2px;flex: none;order: 1;flex-grow: 0;margin: 0 auto;"><span style="font-style: normal;font-weight: 400;font-size: 12px;line-height: 20px;display: flex;align-items: center;color: #FFFFFF;flex: none;order: 1;flex-grow: 0;">查看详情</span></div>`;
	   marker.on('click', markerClick,{target: marker});
   }
}
const markerClick = (e) =>{
     
     const infoWindow = new AMap.InfoWindow({
     		  content: content.join("<br>")  // 传入 dom 对象，或者 html 字符串
     });
	 infoWindow.setContent(e.target.content);
     infoWindow.open(map, e.target.getPosition());
};

// 列表部分
const renderData = ref<Elevator[]>([]);
type Column = TableColumnData & { checked?: true };
const cloneColumns = ref<Column[]>([]);
const showColumns = ref<Column[]>([]);
const paginationProps: Pagination = reactive({
	current: 1,
	pageSize: 10,
	showTotal:true,
	simple:true
});
// 搜索方法
const search = () => {
    paginationProps.current=1;
    fetchData({
        'page': 1,
        'size': paginationProps.pageSize,
        ...formModel.value,
    });
	searchElevator({
	    'page': 1,
	    'size': paginationProps.pageSize,
		...formModel.value,
	});
};
// 定义表格列
const columns = computed<TableColumnData[]>(() => [ 
    {
        title: t('menu.archives.elevatorName'),
        dataIndex: 'elevatorName',
		slotName: 'elevatorName',
        align: "left",
        ellipsis: true,
        tooltip: true,
        headerCellClass: 'table-header-cell',
        width: 220
    }
]);
// 查询表格数据
const fetchData = async (params: ElevatorListPage = { page: 1, size: 20 }) => {
    setLoading(true);
    try {
        const { data } = await queryElevatorList(params);
        renderData.value = data.rows;
		paginationProps.current = params.page;
		paginationProps.total = data.total;
    } catch (err) {
        // you can report use errorHandler or other
    } finally {
        setLoading(false);
    }
}
// table 行点击事件
const rowClick = (record) => {
searchElevator({
	    'page': 1,
	    'size': paginationProps.pageSize,
		'elevatorName':record.elevatorName,
	});
}
// page改变
const onPageChange = (current: number) => {
    fetchData({
		 ...formModel.value,
        'page': current,
        'size': paginationProps.pageSize
    });
};

const goto = (type: number) => {
    if(type === 1){
		router.push({
		    name: 'socialSupervision'
		});
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
</script>

<script lang="ts">
  export default {
    name: 'ElevatorMap',
  };
</script>

<style scoped lang='less'>
/deep/ .arco-list-medium .arco-list-content-wrapper .arco-list-footer, .arco-list-medium .arco-list-content-wrapper .arco-list-content > .arco-list-item, .arco-list-medium .arco-list-content-wrapper .arco-list-content .arco-list-col > .arco-list-item, .arco-list-medium .arco-list-content-wrapper .arco-list-content.arco-list-virtual .arco-list-item{
  padding: unset;
}
/deep/ .arco-avatar{
	position: relative;
	display: inline-flex;
	align-items: center;
	box-sizing: border-box;
	width: 16px;
	height: 16px;
	color: var(--color-white);
	font-size: unset;
	white-space: nowrap;
	vertical-align: middle;
	background-color: unset;
	margin-right: 5px;
}
/deep/ .arco-table .arco-table-cell{
	padding: 9px 0px;
}
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
	align-items: flex-start;
	padding: 0px;
	
	position: absolute;
	height: 1016px;
	left: 24px;
	right: 24px;
	top: 64px;
	
	background: #FFFFFF;
	border-radius: 2px;
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
.map_style{
	position: absolute;
	width: 1535px;
	height: 960px;
	left: 0px;
	top: 0px;
}
.container {
    padding: 0 20px 40px 20px;
    overflow: hidden;
	width: 330px;
  }

.actions {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60px;
    padding: 14px 20px 14px 0;
    background: var(--color-bg-2);
    text-align: right;
  }
.list-demo-action-layout .image-area {
  width: 183px;
  height: 119px;
  border-radius: 2px;
  overflow: hidden;
}

.list-demo-action-layout .list-demo-item {
  padding: 20px 0;
  border-bottom: 1px solid var(--color-fill-3);
}

.list-demo-action-layout .image-area img {
  width: 100%;
}

.list-demo-action-layout .arco-list-item-action .arco-icon {
  margin: 0 4px;
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
.info-content{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 2px 12px;
	gap: 8px;
	
	width: 72px;
	height: 24px;
	
	/* 主色/primary-8 */
	
	background: #072CA6;
	border-radius: 2px;
	
	/* Inside auto layout */
	
	flex: none;
	order: 1;
	flex-grow: 0;
}
</style>
