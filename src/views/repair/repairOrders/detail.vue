<template>
  <div class="container cu-flex-y">
    <a-card :body-style="{padding:'0px'}" class="cu-mart0 card-list">
    	<template style="display: flex;">
    	  <a-breadcrumb class="container-breadcrumb">
    		<a-breadcrumb-item> 
    			<img class="menu_image" :src="menuImage"/>
    		</a-breadcrumb-item>
    		<a-breadcrumb-item>
    			<span class="meun_word">
    				维保工单
    			</span>
    		</a-breadcrumb-item>
    		<a-breadcrumb-item>
    			<span class="view_word">
    				查看
    			</span>
    		</a-breadcrumb-item>
    	  </a-breadcrumb>
    	</template>
    </a-card>
    <div>
		<a-card :body-style="{padding:'0px 8px'}" class="cu-mart0 card-list">
			<div class="cu-fx-between-center" style="height: 62px">
				<div class="cu-fx-n-center">
				  <img :src="icon1" alt="" class="icon_img">
				  <div class="title_name">{{ eleName }}</div>
				</div>
				<!-- 查看维修日志 -->
				<div class="daily_record" @click="drawerClick">
				  {{ $t('menu.repair.detail.view') }}
				</div>
			</div>
		</a-card>
		<a-card :body-style="{padding:'14px 1px'}" class="cu-mart1 card-list">
		  <div style="padding:9px;">
			<!-- 步骤条 -->
			<a-steps :current="checkStep" style="height: 115px;">
			  <a-step v-for="(item, index) in steps" :key="index">
				{{ item.content }}
				<template #description>
				  <div>{{ item.time }}</div>
				  <div v-if="item.status === '5'">
					<div class="cu-marr8">{{ item.description }}</div>
					<a-rate :model-value="item.score" readonly :allow-half="true" />
				  </div>
				  <div v-else>
					<div>{{ item.description }}</div>
				  </div>
				</template>
			  </a-step>
			</a-steps>
		  </div>
	  </a-card>
    </div>
    <div>
      <div class="cu-flex">
        <div class="cu-flex1">
          <a-card class="cu-mart0 card-list">
            <!-- 报修信息 -->
            <div>
              <div class="cu-link-vertical"></div>
              <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.repair.detail.repair')
                }}</span>
            </div>
            <!-- <div style="position: relative"> -->
            <img :src="donePic" class="done-image" v-if="workState >= 4"/>
            <!-- </div> -->
            <a-table :columns="columns" :data="repairData" :pagination="false" :show-header="false"
                     :bordered="{ cell: true }" :hoverable="false" class="cu-mart16" />
          </a-card>
          <a-card class="cu-mart0 card-list">
            <!-- 电梯信息 -->
            <div>
              <div class="cu-link-vertical"></div>
              <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.repair.detail.elevator')
                }}</span>
            </div>
            <a-table :columns="columns" :data="elevatorData" :pagination="false" :show-header="false"
                     :bordered="{ cell: true }" :hoverable="false" class="cu-mart16" />
          </a-card>
        </div>
        <div class="cu-flex1 cu-marl16" :justify="true">
          <a-card class="cu-mart0 card-list">
            <!-- 维保单位 -->
            <div>
              <div class="cu-link-vertical"></div>
              <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.repair.maintainUnit')
                }}</span>
            </div>
            <a-table :columns="columns" :data="maintainData" :pagination="false" :show-header="false"
                     :bordered="{ cell: true }" :hoverable="false" class="cu-mart16">
              <template #content="{ record }">
                <!-- 维保人员、维保负责人 -->
                <div v-if="record.title === $t('menu.archives.maintainPerson')">
                    <div v-for="item in mainEmpl" :key="item.person" class="cu-fx-n-center">
                		<img :src="ipcamera" v-if="item.person!==''"/>
                		<div class="cu-marlr4">{{item.person}}</div>
                	</div>
                </div>
                <div v-if="record.title === $t('menu.archives.maintainMain')" class="cu-fx-n-center">
                    <img :src="ipcamera" />
                    <div class="cu-marlr4">{{ record.content }}</div>
                    <img :src="telphone" />
                    <div class="cu-marl4">{{ record.phone }}</div>
                </div>
                <div v-else>
                  {{ record.content }}
                </div>
              </template>
            </a-table>
          </a-card>
          <a-card class="cu-mart0 card-list">
            <!-- 使用单位 -->
            <div>
              <div class="cu-link-vertical"></div>
              <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.repair.useUnit') }}</span>
            </div>
            <a-table :columns="columns" :data="useData" :pagination="false" :show-header="false"
                     :bordered="{ cell: true }" :hoverable="false" class="cu-mart16">
              <template #content="{ record }">
                <!-- 物业人员、电梯安全管理员 -->
                <div v-if="record.title === $t('menu.archives.usePerson')">
                    <div v-for="item in propEmpl" :key="item.person" class="cu-fx-n-center">
                    	<img :src="ipcamera" v-if="item.person!==''"/>
                    	<div class="cu-marlr4">{{item.person}}</div>
                    </div>
                </div>
                <div v-if="record.title === $t('menu.archives.useMain')" class="cu-fx-n-center">
                    <img :src="ipcamera" />
                    <div class="cu-marlr4">{{ record.content }}</div>
                    <img :src="telphone" />
                    <div class="cu-marl4">{{ record.phone }}</div>
                </div>
                <div v-else>
                  {{ record.content }}
                </div>
              </template>
            </a-table>
          </a-card>
          <a-card class="cu-mart0 card-list">
            <!-- 高德地图 -->
            <div>
              <div class="cu-link-vertical"></div>
              <span class="cu-font14 cu-fontWeight600 cu-marl4">维修地图</span>
            </div>
            <div id="map" style="width: 100%;height: 298px" class="cu-mart16"></div>
          </a-card>
        </div>
      </div>
    </div>
    <!-- 维修日志抽屉 -->
    <a-drawer :width="400" :visible="visible" @cancel="cancelDrawer" :footer="false" draggable>
      <template #title>
        {{ $t('menu.repair.detail.log') }}
      </template>
      <div>
        <DetailLog ref="detailLogRef" :work-data="workData" />
      </div>
    </a-drawer>
  </div>
</template>

<script setup lang='ts'>
import donePic from '@/assets/images/rescue/done.png'
import { ref, onMounted } from 'vue'
import telphone from '@/assets/images/repair/telphone.png'
import ipcamera from '@/assets/images/repair/ipcamera.png'
import icon1 from '@/assets/images/maintenantics/icon-1.png';
import mapStartPic from '@/assets/images/map/map-start.png';
import mapEndPic from '@/assets/images/map/map-end.png';
import menuImage from '@/assets/images/social/icon_menu.png'
import router from "@/router/index";
import { useI18n } from 'vue-i18n';
import { getEleArchivesDetail, getEleWorkDetail } from '@/api/rescue/workOrder';
import { getWorkerManageList } from '@/api/archives/company';
import { getWorkSource } from '@/utils/common';
import { differenceMinute } from '@/utils/dateuUils'
import DetailLog from './components/DetailLog.vue';

// 路由接收参数
const idParam: any = router.currentRoute.value.query.id;

const detailLogRef = ref()

// 国际化
const { t } = useI18n();

// 视频监控宽度
const videoWidth = ref(0);

// 高德地图
const AMap = (window as any).AMap;

// 地图路线规划起始图标
const iconStart = new AMap.Icon({image: mapStartPic,imageOffset: new AMap.Pixel(0, 0)});
const iconEnd = new AMap.Icon({image: mapEndPic,imageOffset: new AMap.Pixel(0, 0)});

// 终点坐标
const positions = ref([])
// 起点坐标
const elePositions = ref([])

onMounted(() => {
  // 视频宽度自适应
  videoWidth.value = document.body.clientWidth / 2 - 300;
  window.onresize = () => {
    return (() => {
      videoWidth.value = document.body.clientWidth / 2 - 300;
    })();
  };

  initWorkDetail()
})

const initMap = () => {
  if(elePositions.value.length === 0){
      // 电梯位置为空 直接return不管它了
      return;
    }

    let map = new AMap.Map("map", {
        resizeEnable: true,
        center: elePositions.value,
        zoom: 13
    });

    if(positions.value.length === 0){
        let marker = new AMap.Marker({
            icon: iconEnd,
            position: elePositions.value,
        });

        marker.setMap(map);
        return;
    }

    // 行车导航
    const walking = new AMap.Driving({
        map,
        ferry: 1, // 是否可以使用轮渡
        hideMarkers: true,
    }); 

    // 根据起终点坐标规划行车路线
    walking.search(positions.value, elePositions.value, () => {});

    let facilities = [];
    const markerStart = new AMap.Marker({
        position: new AMap.LngLat(positions.value[0], positions.value[1]),
        icon: iconStart,
    });
    facilities.push(markerStart);
    const markerEnd = new AMap.Marker({
        position: new AMap.LngLat(elePositions.value[0], elePositions.value[1]),
        icon: iconEnd,
    });
    facilities.push(markerEnd);
    map.add(facilities);
}

// 步骤条结构
const checkStep = ref(1)
const steps = ref([
  {
    content: '维修',
    status: '1',
    time: '',
    description: '',
    score: 0
  },
  {
    content: '接单',
    status: '2',
    time: '',
    description: '',
    score: 0
  },
  {
    content: '到场',
    status: '3',
    time: '',
    description: '',
    score: 0
  },
  {
    content: '完成',
    status: '4',
    time: '',
    description: '',
    score: 0
  },
  {
    content: '评价',
    status: '5',
    time: '',
    description: '',
    score: 0
  }
])

const columns: any = [
  {
    dataIndex: 'title',
    width: 100,
    align: 'right',
    cellStyle: {
      background: '#F7F8FA',
      color: '#86909C'
    }
  },
  {
    dataIndex: 'content',
    width: 100,
    slotName: 'content'
  }
];


// 报修信息数据
const repairData = ref([
  {
    title: t('menu.repair.detail.repairElevator'), // 报修电梯
    content: '紫御观邸 1号 3号梯',
  }, {
    title: t('menu.repair.detail.repairOrderTime'), // 生成工单时间
    content: '2022-11-7 10:55:12',
  }, {
    title: t('menu.repair.detail.repairSource'), // 任务来源
    content: '手动创建',
  } , {
    title: t('menu.repair.planRepairTime'), // 计划维修时间
    content: '2022-11-7',
  }
]);

// 电梯信息数据
const elevatorData = ref([]);

// 维保单位数据
const maintainData = ref([]);

// 使用单位数据
const useData = ref([]);

// 工单数据
const workData = ref({})

const eleName = ref('')

// 工单开始时间
const createTime = ref('')

const workState = ref(0)


const initElevatorInfo = async (eleId) => {
    const { data:eleInfo } = await getEleArchivesDetail({eleId})
    if(eleInfo){
        // 电梯数据
        elevatorData.value = [
          {
            title: t('menu.repair.detail.elevatorName'), // 电梯名称
            content: eleInfo.elevatorName,
          }, {
            title: t('menu.repair.detail.elevatorAddress'), // 电梯地址
            content: eleInfo.address,
          }, {
            title: t('menu.repair.detail.area'), // 所在小区
            content: eleInfo.communityName,
          }, {
            title: t('menu.repair.detail.building'), // 所在楼宇
            content: eleInfo.areaName,
          }, {
            title: t('menu.repair.detail.qrCode'), // 二维码编号
            content: eleInfo.qrCode,
          },{
            title: t('menu.repair.detail.registerCode'), // 注册代码
            content: eleInfo.registCode,
          }
        ]

        if(eleInfo.gd_longitude && eleInfo.gd_latitude){
          elePositions.value.push(eleInfo.gd_longitude)
          elePositions.value.push(eleInfo.gd_latitude)
        }else{
          elePositions.value.push(116.397428)
          elePositions.value.push(39.90923)
        }
        initMap()
    }

    // 维保单位
    maintainData.value = [
        {
            title: t('menu.workOrder.detail.unitName'), // 单位名称
            content: eleInfo.maintainName,
        }, {
            title: t('menu.workOrder.detail.maintainPerson'), // 维保人员
            content: '',
            phone: ''
        }, {
            title: t('menu.workOrder.detail.maintainMain'), // 维保负责人
            content: eleInfo.mainPerson,
            phone: eleInfo.mainPhone
        }
    ]

    // 物业单位
    useData.value = [
        {
            title: t('menu.workOrder.detail.unitName'), // 单位名称
            content: eleInfo.propertyName,
        }, {
            title: t('menu.workOrder.detail.usePerson'), // 物业人员
            content: '',
            phone: ''
        }, {
            title: t('menu.workOrder.detail.useMain'), // 电梯安全管理员
            content: eleInfo.propAdminPerson,
            phone: eleInfo.propAdminPhone
        }
    ]
    if(eleInfo.mainId !== null && eleInfo.mainId !== "")
        initWorkerManageList(eleInfo.mainId, 1);

    if(eleInfo.propId !== null && eleInfo.propId !== "")
	    initWorkerManageList(eleInfo.propId, 2);
}

const initWorkDetail = async () => {
    const params = {workId:idParam}
    const { data:workDetailData } = await getEleWorkDetail(params);
    if(workDetailData){
        workData.value = workDetailData
        eleName.value = workDetailData.workInfo.eleName
        createTime.value = workDetailData.workInfo.createTime
        checkStep.value = workDetailData.workInfo.state
        workState.value = workDetailData.workInfo.state
        // 创建是必须要有
        steps.value[0].time = workDetailData.workInfo.createTime;
        steps.value[0].description = getWorkSource(workDetailData.workInfo.eventChannel);

        repairData.value = [
          {
            title: t('menu.repair.detail.repairElevator'), // 报修电梯
            content: workDetailData.workInfo.eleName,
          }, {
            title: t('menu.repair.detail.repairOrderTime'), // 生成工单时间
            content: workDetailData.workInfo.createTime,
          }, {
            title: t('menu.repair.detail.repairSource'), // 任务来源
            content: getWorkSource(workDetailData.workInfo.eventChannel),
          } , {
            title: t('menu.repair.planRepairTime'), // 计划维修时间
            content: workDetailData.workInfo.planDate,
          }
        ]

        const operateInfo = workDetailData.operateInfo;
        if(operateInfo.length > 0){
            operateInfo.forEach(item => {
                if(item.operateType === '2'){
                    steps.value[1].time = item.operateTime;
                    steps.value[1].description = `${item.operater}   用时${differenceMinute(createTime.value,item.operateTime)}分钟`;
                    // 接单经纬度作为终点
                    if(item.gd_longitude && item.gd_latitude){
                      positions.value.push(item.gd_longitude)
                      positions.value.push(item.gd_latitude)
                    }
                }else if(item.operateType === '3'){
                    steps.value[2].time = item.operateTime;
                    steps.value[2].description = `${item.operater}   用时${differenceMinute(createTime.value,item.operateTime)}分钟`;
                }else if(item.operateType === '4'){
                    steps.value[3].time = item.operateTime;
                    steps.value[3].description = `${item.operater}   用时${differenceMinute(createTime.value,item.operateTime)}分钟`;
                }else if(item.operateType === '7'){
                    steps.value[4].time = item.operateTime;
                    steps.value[4].description = `${item.operater}   用时${differenceMinute(createTime.value,item.operateTime)}分钟`;
                    steps.value[4].score = item.score;
                }
            });
        }

        initElevatorInfo(workDetailData.workInfo.eleId)
    }
}

// 维保员工
const mainEmpl = ref([]);
// 物业员工
const propEmpl = ref([]);

const initWorkerManageList = async (unitId : string, unitType : number) => {
    if(unitType === 1){
        mainEmpl.value = [];
    }else if(unitType === 2){
        propEmpl.value = [];
    }
	const { data:unitData } = await getWorkerManageList({unitId,unitType,childType:1})
    if(unitData.rows.length>0){
        unitData.rows.forEach(item => {
            if(unitType === 1){
                mainEmpl.value.push({
                    person: item.name,
                    telephone: item.phone
                })
            }else if(unitType === 2){
                propEmpl.value.push({
                    person: item.name,
                    telephone: item.phone
                })
            }
        })
    }
}

// 维修日志
const visible = ref(false);
const drawerClick = () => {
  detailLogRef.value.getWorkOrderDetail()
  visible.value = true;
};
const cancelDrawer = () => {
  visible.value = false;
}
</script>

<script lang="ts">
  export default {
    name: 'RepairOrdersDetail',
  };
</script>

<style scoped lang='less'>
.container {
  padding: 0 20px 20px 20px;
  height: 100%;
}

.header-image {
  background: #FFFFFF url(@/assets/images/rescue/header.png) no-repeat;
  height: 200px;
  background-size: 100% 100%;
  padding: 0 20px
}

.done-image {
  position: absolute;
  right: 8px;
  bottom: 8px;
  z-index: 9;
  width: 100px;
  height: 84px
}

:deep(.arco-divider-horizontal) {
  margin: 0;
}

:deep(.arco-list) {
  border-radius: 0;
}

:deep(.anchorBL) {
  display: none;
}

// tab 平均分样式及去掉灰色阴影
:deep(.arco-tabs-nav-tab) {
  display: flex;
  flex: 1;
}

:deep(.arco-tabs-nav-tab-list) {
  display: flex;
  flex: 1;
}

:deep(.arco-tabs-tab) {
  display: flex;
  flex: 1;
}

:deep(.arco-tabs-nav-type-line .arco-tabs-tab-title) {
  flex: 1;
  text-align: center;
}

:deep(.arco-tabs-nav-type-line .arco-tabs-tab:hover .arco-tabs-tab-title::before) {
  background-color: white;
}

:deep(.arco-tabs-content) {
  text-align: center;
}

// tab 平均分样式及去掉灰色阴影样式结束

:deep(.arco-rate) {
  font-size: 14px;
  min-height: 17px;
}

.video-common {
  padding: 4px 16px;
  height: 48px;
  border-radius: 4px;
}

.floor-box {
  background: linear-gradient(180deg, #F2F9FE 0%, #E6F4FE 100%);
  .video-common();
}

.stop-box {
  background: linear-gradient(180deg, #F5FEF2 0%, #E6FEEE 100%);
  .video-common();
}

.lineHeight {
  line-height: 20px;
}

.speed-box {
  background: linear-gradient(180deg, #F7F7FF 0%, #ECECFF 100%);
;
  .video-common();
}
.cu-mart0{
	width: 100%;
	margin-bottom: 8px;
}
.cu-mart1{
	width: 100%;
	height: 100px;
	margin-bottom: 8px;
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
	font-weight: 400;
	font-size: 14px;
	line-height: 22px;
	color: #4E5969;
	flex: none;
	order: 1;
	flex-grow: 0;
}
.view_word{
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
.icon_img{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 0px;
	width: 24px;
	height: 24px;
	flex: none;
	order: 0;
	flex-grow: 0;
}
.title_name{
	font-family: 'OPPOSans';
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;
	text-transform: capitalize;
	color: rgba(0, 0, 0, 0.87);
	flex: none;
	order: 1;
	flex-grow: 0;
}
.daily_record{
	font-family: 'OPPOSans';
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 22px;
	text-transform: capitalize;
	color: #072CA6;
	flex: none;
	order: 0;
	flex-grow: 0;
	cursor: pointer;
}
/deep/ .arco-steps-item-description{
	max-width: 175px;
}
</style>
