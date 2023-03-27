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
        				维修工单
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
					<!-- 查看维保日志 -->
					<div class="daily_record" @click="drawerClick">
						{{ $t('menu.mainWork.detail.view') }}
					</div>
				</div>
			</a-card>
			<a-card :body-style="{padding:'14px 1px'}" class="cu-mart1 card-list">
				<div style="padding:9px;">
					<!-- 步骤条 -->
					<Steps :current="checkStep" style="height: 115px;">
						<Step v-for="(item, index) in steps" :key="index">
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
						</Step>
					</Steps>
				</div>
			</a-card>
        </div>
        <div>
            <div class="cu-flex">
                <div class="cu-flex1">
                    <a-card class="cu-mart0 card-list">
                        <!-- 维保信息 -->
                        <div>
                            <div class="cu-link-vertical"></div>
                            <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.mainWork.detail.maintain')
                            }}</span>
                        </div>
                        <!-- <div style="position: relative"> -->
                        <img :src="donePic" class="done-image" v-if="workState >= 4" />
                        <!-- </div> -->
                        <a-table :columns="alarmcolumns" :data="alarmData" :pagination="false" :show-header="false"
                            :bordered="{ cell: true }" :hoverable="false" class="cu-mart16">
                            <template #planTime = "{ record }">
                                <span>{{record.content}}</span><span class="cu-color-F53F3F cu-marl16" v-if="$t('menu.mainWork.detail.planTime') === record.title">{{isOvertime}}</span>
                            </template>
                        </a-table>
                    </a-card>
                    <a-card class="cu-mart0 card-list">
                        <!-- 电梯信息 -->
                        <div>
                            <div class="cu-link-vertical"></div>
                            <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.mainWork.detail.elevator')
                            }}</span>
                        </div>
                        <a-table :columns="columns" :data="elevatorData" :pagination="false" :show-header="false"
                            :bordered="{ cell: true }" :hoverable="false" class="cu-mart16" />
                    </a-card>
                    <a-card class="cu-mart0 card-list">
                        <!-- 维保单位 -->
                        <div>
                            <div class="cu-link-vertical"></div>
                            <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.mainWork.maintainUnit')
                            }}</span>
                        </div>
                        <a-table :columns="columns" :data="maintainData" :pagination="false" :show-header="false"
                            :bordered="{ cell: true }" :hoverable="false" class="cu-mart16">
                            <template #content="{ record }">
                                <!-- 维保人员、维保负责人 -->
                                <div v-if="record.title === $t('menu.archives.maintainPerson')">
                                    <div v-for="item in mainEmpl" :key="item.person" class="cu-fx-n-center">
                                		<img :src="ipcameraPic" v-if="item.person!==''"/>
                                		<div class="cu-marlr4">{{item.person}}</div>
                                	</div>
                                </div>
                                <div v-if="record.title === $t('menu.archives.maintainMain')" class="cu-fx-n-center">
                                    <img :src="ipcameraPic" />
                                    <div class="cu-marlr4">{{ record.content }}</div>
                                    <img :src="telphonePic" />
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
                            <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.mainWork.useUnit') }}</span>
                        </div>
                        <a-table :columns="columns" :data="useData" :pagination="false" :show-header="false"
                            :bordered="{ cell: true }" :hoverable="false" class="cu-mart16">
                            <template #content="{ record }">
                                <!-- 物业人员、电梯安全管理员 -->
                                <div v-if="record.title === $t('menu.archives.usePerson')">
                                    <div v-for="item in propEmpl" :key="item.person" class="cu-fx-n-center">
                                    	<img :src="ipcameraPic" v-if="item.person!==''"/>
                                    	<div class="cu-marlr4">{{item.person}}</div>
                                    </div>
                                </div>
                                <div v-if="record.title === $t('menu.archives.useMain')" class="cu-fx-n-center">
                                    <img :src="ipcameraPic" />
                                    <div class="cu-marlr4">{{ record.content }}</div>
                                    <img :src="telphonePic" />
                                    <div class="cu-marl4">{{ record.phone }}</div>
                                </div>
                                <div v-else>
                                    {{ record.content }}
                                </div>
                            </template>
                        </a-table>
                    </a-card>
                    <a-card class="cu-mart16">
                        <!-- 百度地图key UOn9mWvyo838rynWSWrG2RYn32LGGNNe -->
                        <div>
                            <div class="cu-link-vertical"></div>
                            <span class="cu-font14 cu-fontWeight600 cu-marl4">维保地图</span>
                        </div>
                        <div id="map" style="width: 100%;height: 298px" class="cu-mart16"></div>
                    </a-card>
                </div>
                <div class="cu-flex1" :justify="true" style="margin-left: 8px;">
                    <a-card>
                      <!-- 物联检测维保过程 -->
					  <div>
					      <div class="cu-link-vertical"></div>
					      <span class="cu-font14 cu-fontWeight600 cu-marl4">物联检测维保过程</span>
					  </div>
                      <a-space direction="vertical" fill style="margin-top: 16px;">
                        <!-- 正常 -->
                        <div class="main-process1" v-if="isFinish">
                            <div class="cu-fx cu-flex1">
                                <a-space direction="vertical" fill>
                                    <div class="cu-font10 cu-color-86909c">服务模式</div>
                                    <div class="cu-font12 cu-color-1D2129">正常</div>
                                </a-space>
                            </div>
                            <div class="cu-fx cu-flex3 cu-font10 cu-color-86909c">
                               <div>结束时间：{{wangongTime}}</div>
                            </div>
                            <div class="cu-fx cu-flex1">
                                <a-space direction="vertical" fill>
                                    <div class="cu-font10 cu-color-86909c">维保总用时</div>
                                    <div class="cu-font12 cu-color-1D2129">{{finishUseTime}}</div>
                                </a-space>
                            </div>
                        </div>
                        <div v-for="item in processData" :key="item.key">
                            <div class="main-process2">
                                <div class="cu-fx cu-flex1">
                                    <a-space direction="vertical" fill>
                                        <img :src="kengdiPic" v-if="item.key === 'position1'"/>
                                        <img :src="jiaodingPic" v-if="item.key === 'position2'"/>
                                        <img :src="jiaoxiangPic" v-if="item.key === 'position3'"/>
                                        <img :src="jifangPic" v-if="item.key === 'position4'"/>
                                        <div class="cu-font12 cu-color-1D2129">{{item.processName}}</div>
                                    </a-space>
                                </div>
                                <div class="cu-fx cu-flex3 cu-font10 cu-color-86909c">
                                    <a-space direction="vertical" fill>
                                        <div>开始时间：{{item.startTime}}</div>
                                        <div>结束时间：{{item.endTime}}</div>
                                    </a-space>
                                </div>
                                <div class="cu-fx cu-flex1">
                                    <a-space direction="vertical" fill>
                                        <div class="cu-font10 cu-color-86909c">维保总用时</div>
                                        <div class="cu-font12 cu-color-1D2129">{{item.useTime}}</div>
                                    </a-space>
                                </div>
                            </div>
                            <div class="main-process2 cu-padlr15" v-for="faultInfo in item.faultList" :key="faultInfo.excType">
                                <div class="main-process2 cu-flex1 cu-padlr20 cu-bgcolor-FFFFFF">
                                    <div class="cu-fx cu-flex1">
                                        <a-space>
                                            <img :src="warningPic"/>
                                            <div class="cu-font12 cu-color-1D2129">{{faultInfo.excType}}</div>
                                        </a-space>
                                    </div>
                                    <div class="cu-fx cu-flex3 cu-font10 cu-color-86909c">
                                        <a-space direction="vertical" fill>
                                            <div>发生时间：{{faultInfo.happenTime}}</div>
                                            <div>恢复时间：{{faultInfo.overTime}}</div>
                                        </a-space>
                                    </div>
                                    <div class="cu-fx cu-flex1">
                                    </div>
                                </div>
                            </div>
                            <div class="main-process2 cu-padlr15" v-if="item.key === 'position1'">
                                <div style="padding:16px 0px" v-if="videoUrl!==''">
                                    <video controls style="width:708px;height: 490px;">
                                    <source :src="videoUrl" :type="videoType">
                                    </video>
                                </div>

                                <div class="no-video" v-else>
                                    <img :src="noVideoPic"/>
                                </div>
                            </div>
                        </div>
                        <div class="main-process1">
                            <div class="cu-fx cu-flex1">
                                <a-space direction="vertical" fill>
                                    <div class="cu-font10 cu-color-86909c">服务模式</div>
                                    <div class="cu-font12 cu-color-1D2129">检修</div>
                                </a-space>
                            </div>
                            <div class="cu-fx cu-flex3 cu-font10 cu-color-86909c">
                               <div>开始时间：{{daochangTime}}</div>
                            </div>
                            <div class="cu-fx cu-flex1">
                            </div>
                        </div>
                      </a-space>
                    </a-card>
                </div>
            </div>
        </div>
        <!-- 维保日志抽屉 -->
        <a-drawer :width="400" :visible="visible" @cancel="cancelDrawer" :footer="false" draggable>
            <template #title>
                {{ $t('menu.mainWork.detail.log') }}
            </template>
            <div>
                <MaintainDetailLog ref="maintainDetailLogRef" :work-data="workData" />
            </div>
        </a-drawer>
    </div>
</template>

<script setup lang='ts'>
import floorPic from '@/assets/images/maintenantics/floor.png'
import eleDoorPic from '@/assets/images/maintenantics/eleDoor.png'
import CheckPic from '@/assets/images/maintenantics/Check.png'
import donePic from '@/assets/images/rescue/done.png'
import kengdiPic from '@/assets/images/maintenantics/kengdi.png'
import jiaodingPic from '@/assets/images/maintenantics/jiaoding.png'
import jiaoxiangPic from '@/assets/images/maintenantics/jiaoxiang.png'
import jifangPic from '@/assets/images/maintenantics/jifang.png'
import warningPic from '@/assets/images/maintenantics/warning.png'
import alarmClockPic from '@/assets/images/maintenantics/alarmClock.png';
import ipcameraPic from '@/assets/images/archives/ipcamera.png';
import telphonePic from '@/assets/images/archives/telphone.png';
import mapStartPic from '@/assets/images/map/map-start.png';
import mapEndPic from '@/assets/images/map/map-end.png';
import icon1 from '@/assets/images/maintenantics/icon-1.png';
import noVideoPic from '@/assets/images/no-video.png';
import menuImage from '@/assets/images/social/icon_menu.png'
import { ref, onMounted } from 'vue';
import router from "@/router/index";
import { useI18n } from 'vue-i18n';
import { Steps } from '@arco-design/web-vue';
import { getEleArchivesDetail, getEleWorkDetail } from '@/api/rescue/workOrder';
import { getWorkerManageList } from '@/api/archives/company';
import { getDevFaultList } from '@/api/maintenance/workOrder'
import { getWorkSource } from '@/utils/common';
import { differenceTime,differenceMinute,differenceDay } from '@/utils/dateuUils'
import MaintainDetailLog from '../../archives/elevator/components/MaintainDetailLog.vue';

const Step = Steps.Step;
// 路由接收参数
const idParam: any = router.currentRoute.value.query.id;

// 国际化
const { t } = useI18n();

// 视频监控宽度
const videoWidth = ref(0);

let lng=116.397428;
let lat=39.90923;
// 有问题
const isOvertime = ref('');
const maintainDetailLogRef = ref()

const AMap = (window as any).AMap;

// 地图路线规划起始图标
const iconStart = new AMap.Icon({image: mapStartPic,imageOffset: new AMap.Pixel(0, 0)});
const iconEnd = new AMap.Icon({image: mapEndPic,imageOffset: new AMap.Pixel(0, 0)});

// 终点坐标
const positions = ref([])
// 起点坐标
const elePositions = ref([])

onMounted(() => {
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
        content: '半月维保',
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

const alarmcolumns: any = [
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
        slotName: 'planTime'
    }
];

// 维保信息数据
const alarmData = ref([]);

// 电梯信息数据
const elevatorData = ref([]);

// 维保单位数据
const maintainData = ref([]);

// 使用单位数据
const useData = ref([]);

// 工单数据
const workData = ref({})

// 电梯名称
const eleName = ref('')

// 工单开始时间
const createTime = ref('')

// 工单完成用时
const finishUseTime = ref('')

// 设备编码
const devCode = ref('')

// 到场时间
const daochangTime = ref('')

// 完工时间
const wangongTime = ref ('')

// 是否完工
const isFinish = ref(false)

// 视频
const videoUrl = ref('')
const videoType = ref('video/mp4')


const workState = ref(0)
const lastMaintainTime: any = ref('')


const initElevatorInfo = async (eleId) => {
    const { data:eleInfo } = await getEleArchivesDetail({eleId})
    if(eleInfo){
        devCode.value = eleInfo.devCode
		lng =eleInfo.longitude;
		lat =eleInfo.latitude;
        lastMaintainTime.value = eleInfo.maintainFinishTime;
        // 电梯数据
        elevatorData.value = [
            {
                title: t('menu.mainWork.detail.elevatorName'), // 电梯名称
                content: eleInfo.elevatorName,
            }, {
                title: t('menu.mainWork.detail.elevatorAddress'), // 电梯地址
                content: eleInfo.address,
            }, {
                title: t('menu.mainWork.detail.area'), // 所在小区
                content: eleInfo.communityName,
            }, {
                title: t('menu.mainWork.detail.building'), // 所在楼宇
                content: eleInfo.areaName,
            }, {
                title: t('menu.mainWork.detail.qrCode'), // 二维码编号
                content: eleInfo.qrCode,
            }, {
                title: t('menu.mainWork.detail.registerCode'), // 注册代码
                content: eleInfo.registCode,
            },
        ]

        if(eleInfo.gd_longitude && eleInfo.gd_latitude){
          elePositions.value.push(eleInfo.gd_longitude)
          elePositions.value.push(eleInfo.gd_latitude)
        }else{
          elePositions.value.push(116.397428)
          elePositions.value.push(39.90923)
        }
		initMap();
    }

    // 维保单位
    maintainData.value = [
        {
            title: t('menu.mainWork.detail.unitName'), // 单位名称
            content: eleInfo.maintainName,
        }, {
            title: t('menu.mainWork.detail.maintainPerson'), // 维保人员
            content: '',
            phone: ''
        }, {
            title: t('menu.mainWork.detail.maintainMain'), // 维保负责人
            content: eleInfo.mainPerson,
            phone: eleInfo.mainPhone
        }
    ]

    // 物业单位
    useData.value = [
        {
            title: t('menu.mainWork.detail.unitName'), // 单位名称
            content: eleInfo.propertyName,
        }, {
            title: t('menu.mainWork.detail.usePerson'), // 物业人员
            content: '',
            phone: ''
        }, {
            title: t('menu.mainWork.detail.useMain'), // 电梯安全管理员
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
        if(workDetailData.workInfo.state >= 4){
            isFinish.value = true
        }
        checkStep.value = workDetailData.workInfo.state
        workState.value = workDetailData.workInfo.state;
        // 创建是必须要有
        steps.value[0].time = workDetailData.workInfo.createTime;
        steps.value[0].description = getWorkSource(workDetailData.workInfo.eventChannel);
        
        // 计算超期维保时间
        if(workDetailData.workInfo.completeTime !== ''){
            lastMaintainTime.value = differenceDay(`${workDetailData.workInfo.planDate} 00:00:00`, workDetailData.workInfo.completeTime);
        }else{
            lastMaintainTime.value = differenceDay(`${workDetailData.workInfo.planDate} 00:00:00`, new Date().getTime());
        }
        if(lastMaintainTime.value > 0){
            isOvertime.value = `已超期${lastMaintainTime.value}天`
        }else{
            isOvertime.value = ''
        }
        

        const operateInfo = workDetailData.operateInfo;
        if(operateInfo.length > 0){
            operateInfo.forEach(item => {
                if(item.operateType === '2'){
                    steps.value[1].time = item.operateTime;
                    steps.value[1].description = `${item.operater}  用时${differenceMinute(createTime.value,item.operateTime)}分钟`;
                    // 接单经纬度作为终点
                    if(item.gd_longitude && item.gd_latitude){
                      positions.value.push(item.gd_longitude)
                      positions.value.push(item.gd_latitude)
                    }
                }else if(item.operateType === '3'){
                    daochangTime.value =  item.operateTime;
                    steps.value[2].time = item.operateTime;
                    steps.value[2].description = `${item.operater}  用时${differenceMinute(createTime.value,item.operateTime)}分钟`;
                }else if(item.operateType === '4'){
                    wangongTime.value = item.operateTime
                    finishUseTime.value = differenceTime(daochangTime.value,wangongTime.value)
                    steps.value[3].time = item.operateTime;
                    steps.value[3].description = `${item.operater}  用时${differenceMinute(createTime.value,item.operateTime)}分钟`;
                }else if(item.operateType === '7'){
                    steps.value[4].time = item.operateTime;
                    steps.value[4].description = `${item.operater}  用时${differenceMinute(createTime.value,item.operateTime)}分钟`;
                    // 分数暂时不知道去哪取
                    steps.value[4].score = item.score;                }
            });
        }

        await initElevatorInfo(workDetailData.workInfo.eleId)
		alarmData.value = [
            {
                title: t('menu.mainWork.detail.alarmElevator'), // 维保电梯
                content: workDetailData.workInfo.eleName,
            }, {
                title: t('menu.mainWork.detail.maintainTime'), // 生成工单时间
                content: workDetailData.workInfo.createTime
            }, {
                title: t('menu.mainWork.detail.alarmSource'), // 任务来源
                content: getWorkSource(workDetailData.workInfo.eventChannel)
            }, {
                title: t('menu.mainWork.detail.planTime'), // 计划维保时间
                content: workDetailData.workInfo.planDate
            }, {
                title: t('menu.mainWork.detail.lasttimeTime'), // 上次维保时间
                content: lastMaintainTime.value
            }
        ]
        const handleRecordInfo = workDetailData.handleInfo;
        if(handleRecordInfo.length > 0){
            handleRecordInfo.forEach(item => {
                // 视频
                if(item.handleType === 3){
                    videoUrl.value = item.ext
                }
            })
        }
        
        if(workDetailData.workInfo.ext){
            getMainProcess(workDetailData.workInfo.ext)
        }
    }
}

const processData = ref([]) 

const getMainProcess = async (ext) => {
    if(ext.position4){
        processData.value.push({
            key:'position4',
            processName: "底坑检测",
            startTime: ext.position4,
            endTime: wangongTime,
            useTime: differenceTime(ext.position4,wangongTime.value)
        })
    }

    if(ext.position3){
        let faultList=[]
        // 获取故障列表
        if(devCode.value !== ''){
            const { data:faultDataList } = await getDevFaultList({devCode,type:'1,16,21',startTime:createTime})
            faultList = faultDataList.rows
        }

        processData.value.push({
            key:'position3',
            processName: "轿顶检测",
            startTime: ext.position3,
            endTime: ext.position4?ext.position4:'',
            useTime: differenceTime(ext.position3,ext.position4?ext.position4:''),
            faultList
        })
    }

    if(ext.position2){
        if(ext.position3){
            processData.value.push({
                key:'position2',
                processName: "轿厢检测",
                startTime: ext.position2,
                endTime: ext.position3?ext.position3:'',
                useTime: differenceTime(ext.position2,ext.position3?ext.position3:''),
                
            })
        }
    }

    if(ext.position1){
        let endTime = ''
        if(isFinish.value && !ext.position2){
            endTime = wangongTime.value
        }else {
            endTime = ext.position2
        }

        processData.value.push({
            key:'position1',
            processName: "机房检测",
            startTime: ext.position1,
            endTime,
            useTime: differenceTime(ext.position1,endTime),
        })
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

// 维保日志
const visible = ref(false);
const drawerClick = () => {
    maintainDetailLogRef.value.getWorkOrderDetail()
    visible.value = true;
};
const cancelDrawer = () => {
    visible.value = false;
}
</script>

<script lang="ts">
  export default {
    name: 'MaintenanceWorksDetail',
  };
</script>

<style scoped lang='less'>
.container {
    padding: 0 20px 20px 20px;
    height: 100%;
}

.header-image {
    background: #FFFFFF url(@/assets/images/rescue/header.png) no-repeat;
    height: 178px;
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

.speed-box {
    background: linear-gradient(180deg, #F7F7FF 0%, #ECECFF 100%);
    ;
    .video-common();
}

.image1 {
  margin:16px;
}

.card1 {
  padding:16px;
  width: 100%;
  margin-right:16px;
  background: linear-gradient(180deg, #F2F9FE 0%, #E6F4FE 100%);
  border-radius: 4px;
}

.card1:nth-child(6) {
  margin-right:0;
}
.parent1 {
  width: 100%;
  justify-content: space-around;
}
.maintainAllInfo {
  margin-top: 20px;
  text-align: center;
  flex-direction: column;
}
.line1 {
  width: 1px;
  height: 64px;
  margin-right:16px;
  background: rgba(0, 0, 0, 0.06);
}
.maintainTime {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.time1 {
  padding-left: 11px;
}
.realTime1 {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.maintainBegin {
  padding:16px;
  display: flex;
  background: #F8F8F8;
  justify-content: space-between
}
.checkName {
  color: rgba(0, 0, 0, 0.38);
  size: 12px;
  font-weight: 400;
  line-height: 20px;
}
.numberStyle {
  size: 16px;
  font-weight: 400;
  font-family: 'OPPOSans';
  color: rgba(0, 0, 0, 0.87);
  line-height: 21px;
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
