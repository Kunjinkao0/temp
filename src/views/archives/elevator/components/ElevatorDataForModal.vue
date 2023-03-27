<template>
    <div class="cu-flex cu-padb24">
        <div class="cu-flex1">
            <a-card>
                <!-- 电梯信息 -->
                <div>
                    <div class="cu-link-vertical"></div>
                    <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.archives.elevator.title')
                    }}</span>
                </div>
                <a-table :columns="columns" :data="elevatorData" :pagination="false" :show-header="false"
                    :bordered="{ cell: true }" :hoverable="false" class="cu-mart16" />
                <div id="map" style="width: 100%;height: 213px" class="cu-mart16"></div>
            </a-card>
          <a-card>
            <!-- 详细信息 -->
            <div>
              <div class="cu-link-vertical"></div>
              <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.archives.detail.title')
                }}</span>
            </div>
            <a-table :columns="columns" :data="detailData" :pagination="false" :show-header="false"
                     :bordered="{ cell: true }" :hoverable="false" class="cu-mart16">
              <template #faultReason="{ record }">
                <!-- 故障原因 -->
                <div> {{ getFaultReasion(record.faultReason) }}</div>
              </template>
              <template #content="{ record }">
                <div>
                  {{ record.content }}
                </div>
              </template>
            </a-table>
          </a-card>
            <a-card class="cu-mart16">
                <!-- 维保单位 -->
                <div>
                    <div class="cu-link-vertical"></div>
                    <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.archives.maintainUnit')
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
						    <img :src="phonePic" />
						    <div class="cu-marl4">{{ record.phone }}</div>
						</div>
                        <div v-else>
                            {{ record.content }}
                        </div>
                    </template>
                </a-table>
            </a-card>
            <a-card class="cu-mart16">
                <!-- 使用单位 -->
                <div>
                    <div class="cu-link-vertical"></div>
                    <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.archives.useUnit') }}</span>
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
						    <img :src="phonePic" />
						    <div class="cu-marl4">{{ record.phone }}</div>
						</div>
                        <div v-else>
                            {{ record.content }}
                        </div>
                    </template>
                </a-table>
            </a-card>
        </div>
    </div>
</template>

<script setup lang='ts'>
import phonePic from '@/assets/images/rescue/phone.png';
import ipcamera from '@/assets/images/archives/ipcamera.png';
import eleAddrPic from '@/assets/images/archives/ele-addr.png';
import {ref, reactive, onMounted, onUpdated} from 'vue'
import { getControlType,getFaultReasion } from '@/utils/common';
import { getEleArchivesDetail } from '@/api/archives/elevator';
import { useI18n } from 'vue-i18n';
import { getWorkerManageList } from '@/api/archives/company';

const props = defineProps(['id']);
// 国际化
const { t } = useI18n();

const AMap = (window as any).AMap;

// 地图路线规划起始图标
const iconStart = new AMap.Icon({image: eleAddrPic,imageOffset: new AMap.Pixel(0, 0)});

let lng=116.397428;
let lat=39.90923;
// onMounted(() => {
//   initData();
// })

onUpdated(() => {
  initData();
})

const initData = () => {
  // 初始化地图
  initMap();
  console.log(props.id);
  if (props.id) {
    getDetail();
  }
}

const initMap = () => {
    const map = new AMap.Map("map", {
        zoom: 11,
        center: [lng === undefined?116.397428:lng, lat === undefined?39.90923:lat],
        viewMode: '3D'
    });

    if(lng !== undefined || lat !== undefined){
        let marker = new AMap.Marker({
            icon: iconStart,
            position: [lng,lat]
        });

        map.add(marker);
    }
    
}

const getDetail = async () => {
    const params = {
        eleId: props.id
    }
    const { data } = await getEleArchivesDetail(params);
	lng =data.gd_longitude;
	lat =data.gd_latitude;
	initMap();
    bindElevatorData(data);
    bindMaintainData(data);
    bindUseData(data);
    bindDetailData(data);
    if(data.mainId !== ''){
        initWorkerManageList(data.mainId, 1);
    }

    if(data.propId !== ''){
	    initWorkerManageList(data.propId, 2);
    }
}

// 电梯信息数据
const elevatorData = reactive([]);
// 绑定电梯信息数据
const bindElevatorData = (data) => {
    elevatorData.length = 0;
    elevatorData.push(...[
        {
            title: t('menu.archives.elevatorName'), // 电梯名称
            content: data.elevatorName,
        }, {
            title: t('menu.archives.address'), // 电梯地址
            content: data.address,
        }, {
            title: t('menu.archives.area'), // 所在小区
            content: data.communityName,
        }, {
            title: t('menu.archives.building'), // 所在楼宇
            content: data.areaName
        }
    ])
}

// 维保单位数据
const maintainData = reactive([]);
// 绑定维保单位数据
const bindMaintainData = (data) => {
    maintainData.length = 0;
    maintainData.push(...[
        {
            title: t('menu.archives.unitName'), // 单位名称
            content: data.maintainName,
        }, {
            title: t('menu.archives.maintainPerson'), // 维保人员
            content: '',
            phone: ''
        }, {
            title: t('menu.archives.maintainMain'), // 维保负责人
            content: data.mainPerson,
            phone: data.mainPhone
        }
    ])
}

// 使用单位数据
const useData = reactive([]);
// 绑定使用单位数据
const bindUseData = (data) => {
    useData.length = 0;
    useData.push(...[{
        title: t('menu.archives.unitName'), // 单位名称
        content: data.propertyName,
    }, {
        title: t('menu.archives.usePerson'), // 物业人员
        content: '',
        phone: ''
    }, {
        title: t('menu.archives.useMain'), // 电梯安全管理员
        content: data.propAdminPerson,
        phone: data.propAdminPhone
    }])
}

// 详细信息数据
const detailData = reactive([]);
// 绑定详细信息数据
const bindDetailData = (data) => {

	let controlTypeContent=getControlType(data.controlType);
	
	
	let energyTypeContent="";
	let energyType=data.energyType;
	if(energyType===1){
		energyTypeContent ="非节能";
	}else if(energyType===2){
		energyTypeContent ="节能";
	}
	
	let mainStateContent="";
	let mainState=data.mainState;
	if(mainState===2){
		mainStateContent ="是";
	}else {
		mainStateContent ="否";
	}
	
	let checkStateContent="";
	let checkState=data.checkState;
	if(checkState===2){
		checkStateContent ="是";
	}else {
		checkStateContent ="否";
	}
    detailData.length = 0;
    detailData.push(...[
        {
            title: t('menu.archives.elevator.brand'), // 电梯品牌
            content: data.brandName,
        }, {
            title: t('menu.archives.elevator.model'), // 电梯型号
            content: data.model,
        }, {
            title: t('menu.archives.elevator.type'), // 电梯类型
            content: data.liftType,
        },
        {
            title: t('menu.archives.elevator.controller'), // 控制方式
            content: controlTypeContent,
        }, {
            title: t('menu.archives.elevator.age'), // 电梯梯龄
            content: data.age,
        }, {
            title: t('menu.archives.elevator.place'), // 使用场所
            content: data.typeName,
        },
        {
            title: t('menu.archives.elevator.energy'), // 节能类型
            content: energyTypeContent,
        }, {
            title: t('menu.archives.elevator.weight'), // 额定载重
            content: data.loadLimit,
        }, {
            title: t('menu.archives.elevator.speed'), // 额定速度
            content: data.speed,
        }, {
            title: t('menu.archives.elevator.floor'), // 基站楼层
            content: data.baseStationFloor,
        }, {
            title: t('menu.archives.elevator.doors'), // 层站门数
            content: data.floorNum,
        }, {
            title: t('menu.archives.elevator.regist'), // 注册代码
            content: data.registCode,
        }, {
            title: t('menu.archives.elevator.code'), // 设备代码
            content: data.eleDeviceCode,
        }, {
            title: t('menu.archives.elevator.qrcoe'), // 二维码编号
            content: data.qrCode,
        }, {
            title: t('menu.archives.elevator.overdueCheck'), // 超期未检
            content: checkStateContent,
        }, {
            title: t('menu.archives.elevator.overdueMain'), // 超期未保
            content: mainStateContent,
        }, {
            title: t('menu.archives.elevator.productDate'), // 出厂日期
            content: data.productDate,
        }, {
            title: t('menu.archives.elevator.checkDate'), // 年检日期
            content: data.checkDate,
        }, {
            title: t('menu.archives.elevator.useData'), // 投用日期
            content: data.installDate,
        }
    ])
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

</script>

<style scoped lang='less'>
.tdt-bottom .tdt-left {
    display: none !important;
}
</style>
