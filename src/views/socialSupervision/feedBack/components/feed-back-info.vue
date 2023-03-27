<template>
    <div class="cu-flex cu-padb24 root_heigt">
        <div class="cu-flex1">
            <a-card>
                <!-- 电梯信息 -->
                <div>
                    <div class="cu-link-vertical"></div>
                    <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.archives.elevator.title')
                    }}</span>
                </div>
				<a-descriptions :data="elevatorData" :bordered="true" :column="2"/>
                <div id="map" style="width: 100%;height: 213px" class="cu-mart16"></div>
            </a-card>
			<a-card class="cu-mart16">
				<!-- 详细信息 -->
				<div>
					<div class="cu-link-vertical"></div>
					<span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.archives.detail.title')
					}}</span>
				</div>
				<a-descriptions :data="detailData" :bordered="true" :column="2"/>
			</a-card>
            <a-card class="cu-mart16">
                <!-- 维保单位 -->
                <div>
                    <div class="cu-link-vertical"></div>
                    <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.archives.maintainUnit')
                    }}</span>
                </div>
			    <a-table :columns="columns" :data="maintainData" :pagination="false" :show-header="false"
			        :bordered="{ cell: true }" :hoverable="false" class="cu-mart16" :column-resizable="true">
			        <template #content="{ record }">
			            <!-- 维保人员、维保负责人 -->
			            <div v-if="record.title === $t('menu.archives.maintainPerson')" >
			                <div v-for="item in mainEmpl" :key="item.person" class="cu-fx-n-center">
			    				<img :src="ipcamera" v-if="item.person!==''"/>
			    				<div class="cu-marlr4">{{item.person}}</div>
								<img :src="phonePic" />
								<div class="cu-marl4">{{ item.telephone }}</div>
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
								<img :src="phonePic" />
								<div class="cu-marl4">{{ record.telephone }}</div>
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
			<a-card class="cu-mart16">
			    <!-- 乘客反馈内容 -->
			    <div>
			        <div class="cu-link-vertical"></div>
			        <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.archives.feedBack') }}</span>
			    </div>
			   <a-descriptions :data="feedBackData" :bordered="true" :column="1"/>
			</a-card>
			<a-card class="cu-mart16">
			    <!-- 客服回复内容 -->
			    <div>
			        <div class="cu-link-vertical"></div>
			        <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.archives.replay') }}</span>
			    </div>
			    <a-descriptions :column="2" bordered>
			      <a-descriptions-item :label="t('menu.archives.replayStatus')">
					  <div v-if="replayData.status !== undefined && replayData.status !== ''">
						  <div v-if="replayData.status===1">
							  <img :src="redPointImage" class="point" />
							  <span>待回复</span>
						  </div>
					    <div v-else-if="replayData.status===2">
							  <img :src="greenPointImage" class="point" />
							  <span>已回复</span>
					    </div>
					  </div>
			      </a-descriptions-item>
			      <a-descriptions-item :label="t('menu.archives.replayTime')">
			        <span>{{ replayData.dealDateTime }}</span>
			      </a-descriptions-item>
			      <a-descriptions-item :label="t('menu.archives.replayContent')" span=2>
			        <span>{{ replayData.dealSuggestion }}</span>
			      </a-descriptions-item>
			    </a-descriptions>
			</a-card>
        </div>
    </div>
</template>

<script setup lang='ts'>
import phonePic from '@/assets/images/rescue/phone.png';
import ipcamera from '@/assets/images/archives/ipcamera.png';
import eleAddrPic from '@/assets/images/archives/ele-addr.png';
import redPointImage from '@/assets/images/social/redPoint.png'
import greenPointImage from '@/assets/images/social/greenPoint.png'
import { ref, reactive, onMounted } from 'vue'
import { getControlType, getFaultReasion } from '@/utils/common';
import { getEleArchivesDetail,getEleAdvocateDetail } from '@/api/archives/elevator';
import { useI18n } from 'vue-i18n';
import { getWorkerManageList } from '@/api/archives/company';
 
const id = ref();
const eleId = ref();
// 国际化
const { t } = useI18n();

const AMap = (window as any).AMap;

// 地图路线规划起始图标
const iconStart = new AMap.Icon({image: eleAddrPic,imageOffset: new AMap.Pixel(0, 0)});

let lng=116.397428;
let lat=39.90923;

const init = (id1,id2) =>{
	id.value =id1;
	eleId.value=id2;
	getDetail();

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
        eleId: eleId.value
    }
	
    const { data } = await getEleArchivesDetail(params);
	lng =data.gd_longitude;
	lat =data.gd_latitude;
	initMap();
	getAdvocateDetail();
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

const getAdvocateDetail = async () => {
    const params1 = {
        id: id.value
    }
	const { data } = await getEleAdvocateDetail(params1);
    bindFeedBackData(data);
    bindReplayData(data);
}

// 电梯信息数据
const elevatorData = reactive([]);
// 绑定电梯信息数据
const bindElevatorData = (data) => {
    elevatorData.length = 0;
    elevatorData.push(...[
        {
            label: t('menu.archives.elevatorName'), // 电梯名称
            value: data.elevatorName,
			span:2
        }, {
            label: t('menu.archives.address'), // 电梯地址
            value: data.address,
			span:2
        }, {
            label: t('menu.archives.area'), // 所在小区
            value: data.communityName,
        }, {
            label: t('menu.archives.building'), // 所在楼宇
            value: data.areaName
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
            content: data.maintainName
        }, {
            title: t('menu.archives.maintainPerson'), // 维保人员
            content: '',
            phone: ''
        }, {
            title: t('menu.archives.maintainMain'), // 维保负责人
            content: data.mainPerson
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

// 乘客反馈数据
const feedBackData = reactive([]);
// 乘客反馈数据
const bindFeedBackData = (data) => {
    feedBackData.length = 0;
	
    feedBackData.push(...[
        {
            label: t('menu.archives.feedBackTime'), // 反馈时间
            value: data.createTime,
        }, {
            label: t('menu.archives.feedBackContent'), // 反馈内容
            value: data.note,
        }
    ])
}

// 乘客回复数据
const replayData = ref({});;
// 乘客回复数据
const bindReplayData = (data) => {
    replayData.value = data;

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
		    label: t('menu.archives.elevator.regist'), // 注册代码
		    value: data.registCode,
		},
		{
		    label: t('menu.archives.elevator.eleCode'), // 电梯编号
		    value: data.elevatorCode,
		},
		{
		    label: t('menu.archives.elevator.devCode'), // 设备编号
		    value: data.devCode,
		},
		{
		    label: t('menu.archives.elevator.qrcoe'), // 二维码编号
		    value: data.qrCode,
		},
        {
            label: t('menu.archives.elevator.brand'), // 电梯品牌
            value: data.brandName,
        }, {
            label: t('menu.archives.elevator.model'), // 电梯型号
            value: data.model,
        }, {
            label: t('menu.archives.elevator.type'), // 电梯类型
            value: data.liftType,
        },
        {
            label: t('menu.archives.elevator.controller'), // 控制方式
            value: controlTypeContent,
        }, {
            label: t('menu.archives.elevator.age'), // 电梯梯龄
            value: data.age,
        }, {
            label: t('menu.archives.elevator.place'), // 使用场所
            value: data.typeName,
        },
        {
            label: t('menu.archives.elevator.energy'), // 节能类型
            value: energyTypeContent,
        }, {
            label: t('menu.archives.elevator.weight'), // 额定载重
            value: data.loadLimit,
        }, {
            label: t('menu.archives.elevator.speed'), // 额定速度
            value: data.speed,
        }, {
            label: t('menu.archives.elevator.floor'), // 基站楼层
            value: data.baseStationFloor,
        }, {
            label: t('menu.archives.elevator.doors'), // 层站门数
            value: data.floorNum,
        }, {
            label: t('menu.archives.elevator.code'), // 设备代码
            value: data.eleDeviceCode,
        }, {
            label: t('menu.archives.elevator.overdueCheck'), // 超期未检
            value: checkStateContent,
        }, {
            label: t('menu.archives.elevator.overdueMain'), // 超期未保
            value: mainStateContent,
        }, {
            label: t('menu.archives.elevator.productDate'), // 出厂日期
            value: data.productDate,
        }, {
            label: t('menu.archives.elevator.checkDate'), // 年检日期
            value: data.checkDate,
        }, {
            label: t('menu.archives.elevator.useData'), // 投用日期
            value: data.installDate,
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
defineExpose({ init })
const columns: any = [
    {
        dataIndex: 'title',
        width: 13,
        align: 'left',
        cellStyle: {
            background: '#F7F8FA',
            color: '#86909C'
			
        },
		ellipsis: true,
		headerCellClass: 'table-header-cell',
    },
    {
        dataIndex: 'content',
        width: 80,
        slotName: 'content'
    }
];

</script>

<style scoped lang='less'>
/deep/ .arco-table .arco-table-cell{
  padding: 6px 16px!important;
}
.root_heigt{
	height:85vh;
}
.tdt-bottom .tdt-left {
    display: none !important;
}
.icon_and_text{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.icon_size{
  width: 15px;
  height: 15px;
}
.icon_right_text{
  padding-left: 5px;
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
