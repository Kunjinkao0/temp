<template>
  <div class="cu-flex cu-padb24 root-height">
    <div class="cu-flex1">
      <div class="cu-pad20">
        <!-- 电梯信息 -->
        <div>
          <div class="cu-link-vertical"></div>
          <span class="cu-font14 cu-fontWeight600 cu-marl4">{{
              $t('menu.archives.elevator.title')
            }}</span>
        </div>
        <a-descriptions class="cu-mart12" :data="elevatorData" size="medium" column="2" bordered/>
        <!--                <a-table :columns="columns" :data="elevatorData" :pagination="false" :show-header="false"-->
        <!--                    :bordered="{ cell: true }" :hoverable="false" class="cu-mart16" />-->
                        <div id="map" style="width: 100%;height: 213px" class="cu-mart16"></div>
      </div>
      <div class="cu-pad20">
        <!-- 详细信息 -->
        <div>
          <div class="cu-link-vertical"></div>
          <span class="cu-font14 cu-fontWeight600 cu-marl4">{{
              $t('menu.archives.detail.title')
            }}</span>
        </div>
        <a-descriptions class="cu-mart12" :data="detailData" size="medium" column="2" bordered/>
<!--        <a-table :columns="columns" :data="detailData" :pagination="false" :show-header="false"-->
<!--                 :bordered="{ cell: true }" :hoverable="false" class="cu-mart16">-->
<!--          <template #faultReason="{ record }">-->
<!--            &lt;!&ndash; 故障原因 &ndash;&gt;-->
<!--            <div> {{ getFaultReasion(record.faultReason) }}</div>-->
<!--          </template>-->
<!--          <template #content="{ record }">-->
<!--            <div>-->
<!--              {{ record.content }}-->
<!--            </div>-->
<!--          </template>-->
<!--        </a-table>-->
      </div>
      <div class="cu-pad20">
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
      </div>
      <div class="cu-pad20">
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
      </div>
      <div class="cu-pad20">
        <!-- 故障详情 -->
        <div>
          <div class="cu-link-vertical"></div>
          <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.archives.fault.title') }}</span>
        </div>
        <a-descriptions class="cu-mart12" size="medium" :column="2" bordered>
          <a-descriptions-item :label="t('politeTakeElevator.deviceCode')">
            <span>{{ faultInfo.clientCode }}</span>
          </a-descriptions-item>
          <a-descriptions-item :label="t('politeTakeElevator.faultCode')">
            <span>{{ faultInfo.faultCode }}</span>
          </a-descriptions-item>
          <a-descriptions-item :label="t('politeTakeElevator.faultName')">
            <span>{{ faultInfo.faultName }}</span>
          </a-descriptions-item>
          <a-descriptions-item :label="t('politeTakeElevator.faultResource')">
            <span>{{ getFaultResourceV2(faultInfo.resource) }}</span>
          </a-descriptions-item>
          <a-descriptions-item :label="t('politeTakeElevator.occurTime')">
            <span>{{ faultInfo.createTime }}</span>
          </a-descriptions-item>
          <a-descriptions-item :label="t('politeTakeElevator.recoveryTime')">
            <span>{{ faultInfo.recoverTime }}</span>
          </a-descriptions-item>
          <a-descriptions-item :label="t('politeTakeElevator.faultReason')" span=2>
            <span>{{ getFaultReasion(faultInfo.faultReason) }}</span>
          </a-descriptions-item>
          <a-descriptions-item :label="t('politeTakeElevator.faultFloor')">
            <span v-if="faultInfo.elevatorFloor !== undefined && faultInfo.elevatorFloor !== ''">{{ faultInfo.elevatorFloor }}层</span>
          </a-descriptions-item>
          <a-descriptions-item :label="t('politeTakeElevator.reasonAnalysis')">
            <span>{{ faultInfo.reasonAnalysis }}</span>
          </a-descriptions-item>
          <a-descriptions-item :label="t('politeTakeElevator.faultStatus')">
            <a-space size="mini" v-if="faultInfo.state !== undefined && faultInfo.state !== ''">
              <div :class="faultInfo.state === 1?'fault_state_confirm':'fault_state_unconfirm'"/>
              <span>{{ getFaultState(faultInfo.state) }}</span>
            </a-space>
          </a-descriptions-item>
          <a-descriptions-item :label="t('politeTakeElevator.confirmPerson')">
            <div class="icon_and_text" v-if="faultInfo.confirmUserName !== undefined && faultInfo.confirmUserName !== ''">
              <img class="icon_size" :src="personIcon" />
              <span class="icon_right_text">{{ faultInfo.confirmUserName }}</span>
            </div>
          </a-descriptions-item>
          <a-descriptions-item :label="t('politeTakeElevator.faultNote')" span=2>
            <span>{{ faultInfo.note }}</span>
          </a-descriptions-item>
          <a-descriptions-item :label="t('politeTakeElevator.modifyTime')">
            <span>{{ faultInfo.lastModifyTime }}</span>
          </a-descriptions-item>
          <a-descriptions-item :label="t('politeTakeElevator.createTime')">
            <span>{{ faultInfo.uploadTime }}</span>
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import phonePic from '@/assets/images/rescue/phone.png';
import ipcamera from '@/assets/images/archives/ipcamera.png';
import eleAddrPic from '@/assets/images/archives/ele-addr.png';
import personIcon from '@/assets/images/statistical/person_icon.png';
import personPhoneIcon from '@/assets/images/statistical/person_phone_icon.png';
import {ref, reactive, onMounted} from 'vue'
import {getControlType, getFaultReasion, getFaultResourceV2, getFaultState} from '@/utils/common';
import {getEleArchivesDetail} from '@/api/archives/elevator';
import {useI18n} from 'vue-i18n';
import {getWorkerManageList} from '@/api/archives/company';
import {getEleFaultDetail} from '@/api/fault/fault';
import useLoading from '@/hooks/loading';

// 国际化
const {t} = useI18n();

const id = ref();
const eleId = ref();
const faultIdRef = ref();

const {loading, setLoading} = useLoading();

const AMap = (window as any).AMap;

// 地图路线规划起始图标
const iconStart = new AMap.Icon({image: eleAddrPic,imageOffset: new AMap.Pixel(0, 0)});

let lng=116.397428;
let lat=39.90923;
// onMounted(() => {
//     // 初始化地图
//     initMap();
// 	console.log(props.id)
//     if (props.id) {
//         getDetail();
//     }
// })

const init = (idTemp, eleIdTemp) => {
  id.value = idTemp;
  eleId.value = eleIdTemp;
  faultIdRef.value = idTemp;
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
  console.log(params)
  const {data} = await getEleArchivesDetail(params);
  console.log(data);
  lng = data.gd_longitude;
  lat = data.gd_latitude;
  initMap();
  bindElevatorData(data);
  bindMaintainData(data);
  bindUseData(data);
  bindDetailData(data);
  bindFaultDetail(faultIdRef.value);
  // if (data.mainId !== '') {
  //   initWorkerManageList(data.mainId, 1);
  // }
  //
  // if (data.propId !== '') {
  //   initWorkerManageList(data.propId, 2);
  // }
}

// 电梯信息数据
const elevatorData = reactive([]);
// 绑定电梯信息数据
const bindElevatorData = (data) => {
  console.log(data);
  elevatorData.length = 0;
  elevatorData.push(...[
    {
      label: t('menu.archives.elevatorName'), // 电梯名称
      value: data.elevatorName,
      span: 2
    }, {
      label: t('menu.archives.address'), // 电梯地址
      value: data.address,
      span: 2
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
const mainUnitData = ref({});
// 绑定维保单位数据
const bindMaintainData = (data) => {
  mainUnitData.value = data;
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
const useDataInfo = ref({});
// 绑定使用单位数据
const bindUseData = (data) => {
  useDataInfo.value = data;
  useData.length = 0;
  useData.push(...[{
    title: t('menu.archives.unitName'), // 单位名称
    content: data.propertyName,
  }, {
    title: t('menu.archives.usePerson'), // 物业人员
    content: '',
    phone: ''
  }, {
    title: t('politeTakeElevator.useMain'), // 电梯安全管理员
    content: data.propAdminPerson,
    phone: data.propAdminPhone
  }])
}

// 详细信息数据
const detailData = reactive([]);
// 绑定详细信息数据
const bindDetailData = (data) => {
  console.log(data);

  let controlTypeContent = getControlType(data.controlType);


  let energyTypeContent = "";
  let energyType = data.energyType;
  if (energyType === 1) {
    energyTypeContent = "非节能";
  } else if (energyType === 2) {
    energyTypeContent = "节能";
  }

  let mainStateContent = "";
  let mainState = data.mainState;
  if (mainState === 2) {
    mainStateContent = "是";
  } else {
    mainStateContent = "否";
  }

  let checkStateContent = "";
  let checkState = data.checkState;
  if (checkState === 2) {
    checkStateContent = "是";
  } else {
    checkStateContent = "否";
  }
  detailData.length = 0;
  detailData.push(...[
    {
      label: t('menu.archives.elevator.regist'), // 注册代码
      value: data.registCode,
    },
    {
      label: t('politeTakeElevator.elevatorCode'), // 电梯编号
      value: data.elevatorCode,
    },
    {
      label: t('exceptionWarning.detail.deviceCode'), // 设备编号
      value: data.devCode,
    },
    {
      label: t('menu.archives.elevator.code'), // 设备代码
      value: data.eleDeviceCode,
    },
    {
      label: t('menu.archives.elevator.brand'), // 电梯品牌
      value: data.brandName,
    }, {
      label: t('menu.archives.elevator.qrcoe'), // 二维码编号
      value: data.qrCode,
    }, {
      label: t('menu.archives.elevator.type'), // 电梯类型
      value: data.liftType,
    },{
      label: t('menu.archives.elevator.model'), // 电梯型号
      value: data.model,
    },{
      label: t('menu.archives.elevator.age'), // 电梯梯龄
      value: data.age,
    }, {
      label: t('menu.archives.elevator.place'), // 使用场所
      value: data.typeName,
    },{
      label: t('menu.archives.elevator.energy'), // 节能类型
      value: energyTypeContent,
    },
    {
      label: t('menu.archives.elevator.controller'), // 控制方式
      value: controlTypeContent,
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
    },
    {
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

const faultInfo = ref({})
const bindFaultDetail = async (paramId) => {
  const params = {faultId: paramId};
  const { data } = await getEleFaultDetail(params)
  faultInfo.value = data;
  console.log(data);
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
defineExpose({init})
const columns: any = [
  {
    dataIndex: 'title',
    width: 15,
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
.root-height {
  height: 85vh;
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

.fault_state_confirm{
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: #07C160;
}

.fault_state_unconfirm{
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: rgba(12, 0, 51, 0.1);
}
</style>
