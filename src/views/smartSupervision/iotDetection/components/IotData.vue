<template>
  <div style="height: 100%; display: flex; flex-direction: row">
    <div style="flex: 1; height: 100%; display: flex; flex-direction: column;">
      <div style="flex: 1; overflow-y: auto; background-color: white">
        <div style="padding: 10px;">
          <!-- 实时状态 -->
          <div>
            <div class="cu-link-vertical"></div>
            <span class="cu-font14 cu-fontWeight600 cu-marl4">{{
                $t('menu.archives.real.title')
              }}</span>
          </div>
          <div style="">
            <a-table :columns="columns" :data="realData" :pagination="false" :show-header="false"
                     :bordered="{ cell: true }" :hoverable="false" class="cu-mart16" :scroll="{maxHeight: 50}">
              <template #content="{ record }">
                <div v-if="record.title === $t('menu.archives.updateTime')">
                  <div v-if="record.content">{{ record.content }}</div>
                </div>
                <!-- 当前服务模式 -->
                <div v-else-if="record.title === $t('menu.archives.Service_Mode')">
                  <div v-if="record.content === 1">正常运行</div>
                </div>
                <div v-else-if="record.title === $t('menu.archives.runState')">
                  <div v-if="record.content ===  0">停梯</div>
                  <div v-else>运行</div>
                </div>
                <div v-else-if="record.title === $t('menu.archives.runDirection')">
                  <div v-if="record.content ===  1">上行</div>
                  <div v-else-if="record.content === 2">下行</div>
                  <div v-else>无方向</div>
                </div>
                <div v-else-if="record.title === $t('menu.archives.Door_Zone')">
                  <div v-if="record.content">轿厢再开锁区域</div>
                  <div v-else-if="!record.content">轿厢在非开锁区域</div>
                </div>
                <div v-else-if="record.title === $t('menu.archives.curFloor')">
                  <div v-if="record.content">{{ record.content }}</div>
                </div>
                <div v-else-if="record.title === $t('menu.archives.Door_Close_Status')">
                  <div v-if="record.content">关门到位</div>
                  <div v-else-if="!record.content">无关门到位信号</div>
                </div>
                <div v-else-if="record.title === $t('menu.archives.Passenger_Status')">
                  <div v-if="record.content">有人</div>
                  <div v-else-if="!record.content">无人</div>
                </div>
                <div v-else-if="record.title === $t('menu.archives.Door_Status')">
                  <div> {{ getCardoorState(record.content) }}</div>
                </div>
                <div v-else-if="record.title === $t('menu.archives.Histway_Door')">
                  <div v-if="record.content">门锁所止</div>
                  <div v-else-if="!record.content">无门锁锁止信号</div>
                </div>
                <div v-else-if="record.title === $t('menu.archives.Safety_circuit')">
                  <div v-if="record.content">断开</div>
                  <div v-else-if="!record.content">导通</div>
                </div>
                <div v-else-if="record.title === $t('menu.archives.Lift_Car_Drive_Status')">
                  <div v-if="record.content === 0">待机</div>
                  <div v-else-if="record.content === 1">曳引机制动器提起</div>
                  <div v-else-if="record.content === 2">曳引机制动器释放</div>
                </div>
                <div v-else>
                  {{ record.content }}
                </div>
              </template>
            </a-table>
          </div>

        </div>
      </div>
      <div style="flex: 1; overflow-y: auto; background-color: white">
        <div style="padding: 10px">
          <!-- 运行信息 -->
          <div>
            <div class="cu-link-vertical"></div>
            <span class="cu-font14 cu-fontWeight600 cu-marl4">{{
                $t('menu.archives.run.title')
              }}</span>
          </div>
          <a-table row-key="id" :columns="columns" :data="runData" :pagination="false" :show-header="false"
                   :bordered="{ cell: true }" :hoverable="false" class="cu-mart16">
            <template #content="{ record }">
              <div>{{ record.content }}
                <span v-if="record.id == 1">小时</span>
                <span v-if="record.id == 7">米</span>
              </div>
            </template>
          </a-table>
        </div>
      </div>
    </div>
    <div style="flex: 2; display: flex; flex-direction: column; margin-left: 5px">
      <div style="flex: 1; display: flex; flex-direction: row">
        <!-- 模拟运行 -->
        <div style="flex: 1; display: flex; flex-direction: column; background-color: white; padding: 10px">
          <div>
            <div class="cu-link-vertical"></div>
            <span class="cu-font14 cu-fontWeight600 cu-marl4">{{
                $t('menu.archives.detail.run')
              }}</span>
          </div>
          <div class="cu-fx" style="width: 100%; height: 100%; background-color: #F7F8FA; margin-top: 10px">
            <div>
              <img v-if="door === '0'" :src="doorOpen" style="height: 190px"/>
              <img v-else :src="doorClose" style="height: 190px"/>
            </div>
            <div style="position: relative;" class="cu-marl24">
              <div
                  style="width: 30px;position: absolute; z-index: 1; left: 50%; top: 50%; transform: translate(-50%, -50%);">
                <img :src="doorBack" style="width: 100%"/>
              </div>
              <div
                  style="color: red; position: absolute; z-index: 9; transform: translate(-50%, -60%);">
                {{ floor }}
              </div>
              <div
                  style="width: 20px; position: absolute; z-index: 9; transform: translate(-50%, -150%);">
                <!-- 停梯或下行 -->
                <img v-if="runState === '0' || runState === '2'" :src="doorUpNo"
                     style="width: 100%"/>
                <!-- 上行 -->
                <img v-else :src="doorUp" style="width: 100%"/>
              </div>
              <div
                  style="width: 20px; position: absolute; z-index: 9; transform: translate(-50%, 60%);">
                <!-- 停梯或上行 -->
                <img v-if="runState === '0' || runState === '1'" :src="doorDownNo"
                     style="width: 100%"/>
                <!-- 下行 -->
                <img v-else :src="doorDown" style="width: 100%"/>
                <!-- <img src="/src/assets/images/archives/doorDownNo.png" style="width: 100%" /> -->
              </div>
            </div>
          </div>
          <div class="cu-flex cu-mart16" style="height: 48px">
            <div class="cu-flex1 cu-fx floor-box">
              <!-- 当前楼层 -->
              <img :src="floorPic"/>
              <div class="cu-marl4 " style="text-align: left;">
                <div class="cu-fontWeight600">{{ floor }}</div>
                <div style="font-size: xx-small; color: rgba(0, 0, 0, 0.45)">{{ $t('menu.archives.detail.floor') }}</div>
              </div>
            </div>
            <div class="cu-flex1 cu-fx stop-box cu-marlr16">
              <!-- 轿厢运行方向 -->
              <img :src="stopPic"/>
              <div class="cu-marl4" style="text-align: left;">
                <div class="cu-fontWeight600" v-if="runState === '0'">停梯</div>
                <div class="cu-fontWeight600" v-else-if="runState === '1'">上行</div>
                <div class="cu-fontWeight600" v-else-if="runState === '2'">下行</div>
                <div class="cu-fontWeight600" v-else></div>
                <div style="font-size: xx-small; color: rgba(0, 0, 0, 0.45)">{{ $t('menu.archives.detail.stop') }}</div>
              </div>
            </div>
            <div class="cu-flex1 cu-fx speed-box">
              <!-- 当前速度 -->
              <img :src="speedPic"/>
              <div class="cu-marl4" style="text-align: left;">
                <div class="cu-fontWeight600">{{ speed }}M/S</div>
                <div style="font-size: xx-small; color: rgba(0, 0, 0, 0.45)">{{ $t('menu.archives.detail.speed') }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 轿厢监控画面 -->
        <div style="flex: 1; margin-left: 5px; background-color: white; padding: 10px">
          <div style="height: 100%;">
            <div>
              <div class="cu-link-vertical"></div>
              <span class="cu-font14 cu-fontWeight600 cu-marl4">{{
                  $t('smartSupervision.iotDetection.carMonitortitle')
                }}</span>
            </div>
            <iframe :src="videoMonitorUrl" frameborder="0" scrolling="no"
                    style="height: 90%; width: 100%; background-color: #F7F8FA; margin-top: 10px"></iframe>
          </div>
        </div>
      </div>
      <!-- 机房监控画面 -->
      <div style="flex: 1; margin-top: 5px; background-color: white;">
        <div style="height: 100%;  padding: 10px">
          <div style="">
            <div class="cu-link-vertical"></div>
            <span class="cu-font14 cu-fontWeight600 cu-marl4 cu-marb8">{{
                $t('smartSupervision.iotDetection.carMonitortitle')
              }}</span>
          </div>
          <div style="width: 100%; height: 95%">
            <iframe :src="videoMonitorUrl" frameborder="0" scrolling="no"
                    style="height: 100%; width: 100%; margin-top: 10px"></iframe>
          </div>
        </div>
      </div>
    </div>
    <div style="flex: 1; background-color: white; margin-left: 5px; padding: 10px; height: 100%;">
      <div style="">
        <div class="cu-link-vertical"></div>
        <span class="cu-font14 cu-fontWeight600 cu-marl4 cu-marb8">{{
            $t('smartSupervision.iotDetection.realtimeFaultInfo')
          }}</span>
      </div>
      <div style=" height: 73vh; overflow-y: auto; margin-top: 10px">
        <a-steps direction="vertical">
          <a-step v-for="item in renderData" :key="item" :index="index" status="wait">
            <div style="display: flex; flex-direction: column; width: 100%; color: #86909C; font-size: 0.9em">
              <div>{{ item.createTime }}</div>
            </div>
            <template #icon>
              <div>
                <div v-if="item.state === 0">
                  <img :src="faultUnProcessIcon" style="width: 25px; height: 25px;" />
                </div>
                <div v-else>
                  <img :src="faultProcessedIcon" style="width: 25px; height: 25px;" />
                </div>
              </div>
            </template>
            <template #description>
              <div style="display: flex; flex-direction: column; width: 32vh; background-color: #F2F8FF; padding: 15px; margin-bottom: 10px;">
                <div style="display: flex; flex-direction: row;">
                  <div style="flex: 1; font-weight: bold; font-size: small; color: black">{{item.faultName}}</div>
                  <div class="fault_detail" @click="showFaultDetail(item)">故障详情<icon-right/></div>
                </div>
                <div style="display: flex; flex-direction: row; margin-top: 8px">
                  <div style="min-width: 50px">故障楼层</div>
                  <div class="drawer_description_value">{{item.elevatorFloor}}</div>
                </div>
                <div style="display: flex; flex-direction: row; margin-top: 8px">
                  <div style="min-width: 50px">故障状态</div>
                  <div class="drawer_description_value">
                    <div>{{getFaultState(item.state)}}<div style="margin-left: 20px">{{item.confirmUserName}}</div></div>
                  </div>
                </div>
                <div style="display: flex; flex-direction: row; margin-top: 8px">
                  <div style="min-width: 50px">任务来源</div>
                  <div class="drawer_description_value">{{getFaultResourceV2(item.resource)}}</div>
                </div>
                <div style="display: flex; flex-direction: row; margin-top: 8px">
                  <div style="min-width: 50px">故障原因</div>
                  <div class="drawer_description_value">{{item.faultReason}}</div>
                </div>
                <div style="display: flex; flex-direction: row; margin-top: 8px">
                  <div style="min-width: 50px">原因分析</div>
                  <div class="drawer_description_value">{{item.reasonAnalysis}}</div>
                </div>
                <div style="display: flex; flex-direction: row; margin-top: 8px">
                  <div style="min-width: 50px">恢复时间</div>
                  <div class="drawer_description_value">{{item.recoverTime}}</div>
                </div>
                <div v-show="item.state === 1">
                  <img :src="haveProcessedIcon" style="position: absolute; width: 80px; right: 10px; bottom: 10px"/>
                </div>
              </div>
            </template>
          </a-step>
        </a-steps>
      </div>
    </div>
    <a-drawer :width="400" :visible="drawerVisible" :footer="false" title="详情" @cancel="handleDrawerCancel">
      <div style="display: flex; flex-direction: column; padding: 20px">
        <div style="margin-bottom: 10px">
          <div class="cu-link-vertical"></div>
          <span class="cu-font14 cu-fontWeight600 cu-marl4">{{
              $t('menu.archives.fault.title')
            }}</span>
        </div>
        <a-descriptions bordered column="1" :data="drawerElevatorData">
          <template #label="{label}">
            <div style="width: 150px; text-align: right">{{label}}</div>
          </template>
        </a-descriptions>

        <div v-show="drawerRecord.videoUrl" style="display: flex; flex-direction: column; margin-top: 20px">
          <div>
            <div class="cu-link-vertical"></div>
            <span class="cu-font14 cu-fontWeight600 cu-marl4">{{
                $t('menu.archives.log.video')
              }}</span>
          </div>
          <iframe :src="drawerRecord.videoUrl" frameborder="0" scrolling="no"
                  style="height: 100%; width: 100%; background-color: #F7F8FA; margin-top: 10px"></iframe>
        </div>
        <div v-show="drawerRecord.photoUrl" style="display: flex; flex-direction: column; margin-top: 20px">
          <div>
            <div class="cu-link-vertical"></div>
            <span class="cu-font14 cu-fontWeight600 cu-marl4 cu-marb8">{{
                $t('menu.archives.image')
              }}</span>
          </div>
          <a-image :src="drawerRecord.photoUrl"/>
        </div>
        <div v-show="xResult !== ''" style="display: flex; flex-direction: column; margin-top: 20px">
          <div>
            <div class="cu-link-vertical"></div>
            <span class="cu-font14 cu-fontWeight600 cu-marl4">{{
                $t('menu.archives.x.wave')
              }}</span>
          </div>
          <div class="xyz-wave">
            <Chart height="200px" :option="xChartOption" />
          </div>
        </div>
        <div v-show="yResult !== ''" style="display: flex; flex-direction: column; margin-top: 20px">
          <div>
            <div class="cu-link-vertical"></div>
            <span class="cu-font14 cu-fontWeight600 cu-marl4 cu-marb8">{{
                $t('menu.archives.y.wave')
              }}</span>
          </div>
          <div class="xyz-wave">
            <Chart height="200px" :option="yChartOption" />
          </div>
        </div>
        <div v-show="zResult !== ''" style="display: flex; flex-direction: column; margin-top: 20px">
          <div>
            <div class="cu-link-vertical"></div>
            <span class="cu-font14 cu-fontWeight600 cu-marl4 cu-marb8">{{
                $t('menu.archives.z.wave')
              }}</span>
          </div>
          <div class="xyz-wave">
            <Chart height="200px" :option="zChartOption" />
          </div>
        </div>
        <div style="margin-top: 50px">
          <a-descriptions bordered column="1" :data="faultTimeData">
            <template #label="{label}">
              <div style="width: 130px; text-align: right">{{label}}</div>
            </template>
            <template #value="{value}">
              <div style="font-size: small">{{value}}</div>
            </template>
          </a-descriptions>
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script setup lang='ts'>
import stopPic from '@/assets/images/rescue/stop.png'
import speedPic from '@/assets/images/rescue/speed.png'
import floorPic from '@/assets/images/rescue/floor.png'
import iconWave from '@/assets/images/archives/icon_wave.png'
import iconVideo from '@/assets/images/archives/icon_video.png'
import iconImage from '@/assets/images/archives/icon_image.png'
import doorUpNo from '@/assets/images/archives/doorUpNo.png'
import doorUp from '@/assets/images/archives/doorUp.png'
import doorOpen from '@/assets/images/archives/doorOpen.png'
import doorDownNo from '@/assets/images/archives/doorDownNo.png'
import doorDown from '@/assets/images/archives/doorDown.png';
import doorBack from '@/assets/images/archives/doorBack.png'
import doorClose from '@/assets/images/archives/doorClose.png';
import nodataPic from '@/assets/images/no-data.png';
import faultUnProcessIcon from '@/assets/images/smartSupervision/fault_step_unprocess_icon.png';
import faultProcessedIcon from '@/assets/images/smartSupervision/fault_step_processed_icon.png';
import haveProcessedIcon from '@/assets/images/smartSupervision/have_processed_icon.png';
import {ref, reactive, onMounted, computed, watch, onBeforeUnmount, onDeactivated} from 'vue'
import type {TableColumnData} from '@arco-design/web-vue/es/table/interface';
import {useI18n} from 'vue-i18n';
import {getCardoorState, getFaultState, getFaultResourceV2} from '@/utils/common';
import useLoading from '@/hooks/loading';
import cloneDeep from 'lodash/cloneDeep';
import {queryFaultList} from '@/api/fault/fault';
import {FaultQueryRecord, FaultListPageParams} from '@/api/fault/types/faultType';
import {
  getDevRltDataByArchives,
  getDevRunDataByArchives,
  getEleFaultWaveByArchives,
  getEleFaultStatByArchives
} from '@/api/archives/elevator';
import {DevCode} from '@/api/archives/types/elevatorType';
import {Pagination} from '@/types/global';
import {Message} from '@arco-design/web-vue';
import {getToken, getTixinToken} from '@/utils/auth';

const props = defineProps(['id']);
const devCode = ref(""); // 设备编号

// 国际化
const {t} = useI18n();

const videoRef = ref();
const videoMonitorUrl = ref("");

const drawerVisible = ref(false);
const drawerElevatorData = ref([])
const faultTimeData = ref([])
const drawerRecord = ref({})

// 视频监控宽度
const videoWidth = ref(0);
const tabType = ref(3); // 默认选中困人故障
const monitoringUrl = import.meta.env.VITE_TIXIN_LOGIN_API;
const doorBackWidth = ref("");
const arrowWidth = ref("");

const realData = reactive([]);
// 运行信息
const runData = reactive([]);
onMounted(() => {
  realData.push(...[
    {
      title: t('menu.archives.Service_Mode'), // 当前服务模式
      content: 1,
    }, {
      title: t('menu.archives.Door_Zone'), // 开锁区域
      content: true,
    }, {
      title: t('menu.archives.Door_Close_Status'), // 关门是否到位
      content: true,
    }, {
      title: t('menu.archives.Passenger_Status'), // 轿内是否有人
      content: false,
    }, {
      title: t('menu.archives.Door_Status'), // 轿门状态
      content: 2,
    }, {
      title: t('menu.archives.Histway_Door'), // 厅门状态
      content: true,
    }, {
      title: t('menu.archives.Safety_circuit'), // 安全回路
      content: false,
    }, {
      title: t('menu.archives.Lift_Car_Drive_Status'), // 曳引机状态
      content: 1,
    }
  ])

  runData.push(...[
    {
      title: t('menu.archives.runTime'), // 累计运行时间
      content: '',
      id: 1,
    }, {
      title: t('menu.archives.runTotal'), // 累计运行次数
      content: '',
      id: 2,
    }, {
      title: t('menu.archives.openClose'), // 累计开关门次数
      content: '',
      id: 3,
    }, {
      title: t('menu.archives.stop'), // 累计停站次数
      content: '',
      id: 4,
    }, {
      title: t('menu.archives.runUp'), // 累计上行次数
      content: '',
      id: 5,
    }, {
      title: t('menu.archives.runDown'), // 累计下行次数
      content: '',
      id: 6,
    }, {
      title: t('menu.archives.runDis'), // 累计运行距离
      content: '',
      id: 7,
    }, {
      title: t('menu.archives.rope'), // 钢丝绳(带)折弯次数
      content: '',
      id: 8,
    }
  ])
  const type = tabType.value;

  const elevatorDetail = localStorage.getItem(`elevatorDetail_${props.id}`);
  const elevatorLocal = JSON.parse(elevatorDetail);
  devCode.value = elevatorLocal.devCode;

  if (devCode.value) {
    getRealDataInfo();
    getRunDataInfo();
  } else {
    Message.error("未关联设备");
  }

  const token = getTixinToken();
  videoMonitorUrl.value = `${monitoringUrl}/androidui/CameraInfo.html?html=yes&accessToken=${token}&eleId=${props.id}&fromPage=ruantong&ruantongFlag=1&ptzControl=1&showbutton=hidden`;
  // videoMonitorUrl.value = "https://lifts.secp.com.cn/androidui/CameraInfo.html?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1SWQiOiIxIiwidU5hbWUiOiJhZG1pbiIsImFwcElkIjoiMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIiLCJleHAiOjE2NzI1MzIwOTh9.7NIcGWJfIq_LaQLutnK59Ej5ULE1TtEdjm10CH2nv9w&eleId=33936&ruantongFlag=1#index_section";

  // 电梯故障统计
  getEleFaultStat();
  // 查询困人故障、故障数据、异常数据
  fetchData({
    ...formModel.value,
    'faultType': type,
    'eleId': props.id
  });

  // 视频宽度自适应
  videoWidth.value = document.body.clientWidth / 2 - 300;
  doorBackWidth.value = `${document.body.clientWidth / 70}px`;
  arrowWidth.value = `${document.body.clientWidth / 100}px`;

  window.onresize = () => {
    return (() => {
      videoWidth.value = document.body.clientWidth / 2 - 300;
    })();
  };
})

// 获取运行信息
const getRunDataInfo = async () => {
  try {
    const params = {
      'devCode': devCode.value
    }
    const {data} = await getDevRunDataByArchives(params);

    if (JSON.stringify(data) !== '{}') {
      bindRunData(data);
    }

  } catch (err) {
    // you can report use errorHandler or other
  }
};

const bindRunData = (data) => {
  runData.length = 0;

  const runTime = data === null ? '' : (parseFloat(data.runTime) / 3600).toFixed(2);
  const runTotal = data === null ? '' : parseFloat(data.runUp) + parseFloat(data.runDown);
  const runDis = data === null ? '' : (parseFloat(data.runTime) / 100).toFixed();

  runData.push(...[{
    title: t('menu.archives.runTime'), // 累计运行时间
    content: runTime,
    id: 1,
  }, {
    title: t('menu.archives.runTotal'), // 累计运行次数
    content: runTotal,
    id: 2,
  }, {
    title: t('menu.archives.openClose'), // 累计开关门次数
    content: data === null ? '' : data.openClose,
    id: 3,
  }, {
    title: t('menu.archives.stop'), // 累计停站次数
    content: data === null ? '' : data.stop,
    id: 4,
  }, {
    title: t('menu.archives.runUp'), // 累计上行次数
    content: data === null ? '' : data.runUp,
    id: 5,
  }, {
    title: t('menu.archives.runDown'), // 累计下行次数
    content: data === null ? '' : data.runDown,
    id: 6,
  }, {
    title: t('menu.archives.runDis'), // 累计运行距离
    content: runDis,
    id: 7,
  }, {
    title: t('menu.archives.rope'), // 钢丝绳(带)折弯次数
    content: runTotal,
    id: 8,
  }])
}

let timer: any;
let floor = ref('');
let runState = ref('');
let speed = ref('');
let door = ref('');
// 获取实时数据
const getRealDataInfo = () => {
  const params = {
    'devCode': devCode.value
  }

  getDevRltData(params);

  timer = setInterval(function () {
    getDevRltData(params);
  }, 2000);
}

// 销毁定时器
onBeforeUnmount(() => {
  clearInterval(timer);
});

onDeactivated(() => {
  clearInterval(timer);
});

let serviceMode = 1;
let doorZone = true;
let doorCloseStatus = true;
let passengerStatus = false;
let doorStatus = 5;
let histwayDoor = true;
let circuitState = false;
let liftCarDriveStatus = 1;


const getDevRltData = async (
    params: DevCode
) => {
  try {
    const {data} = await getDevRltDataByArchives(params);
    let result = data.data;
    door.value = result.door;
    floor.value = result.floor;
    if (result.runState === 0 || (result.speed && result.speed < 30)) {
      runState.value = "0"; // 停梯
    } else if (result.runState === 1) { // 上行
      runState.value = "1";
    } else if (result.runState === 2) { // 下行
      runState.value = "2";
    }

    // 转换成m/s
    if (runState.value === "0") {
      speed.value = "0";
    } else {
      speed.value = (parseFloat(result.speed) / 100).toFixed(2);
    }

    const stringValue = result.stringValue;
    const levelState = result.levelState;
    const doorState = result.doorState;
    if (stringValue.indexOf("非平层停梯") !== -1 || stringValue.indexOf("停梯异常") !== -1) {
      circuitState = true; // 断开
    } else {
      circuitState = false; // 导通
    }
    if (levelState === 1) {
      doorZone = true;
    } else {
      doorZone = false;
    }
    if (result.runState === 1 || result.runState === 17) {
      liftCarDriveStatus = 2;
    } else if (result.runState === 2 || result.runState === 18) {
      liftCarDriveStatus = 2;
    } else {
      liftCarDriveStatus = 1;
    }

    if (doorState === 1 || doorState === 3) {
      doorCloseStatus = true;
      histwayDoor = true;
      doorStatus = 5;
    } else {
      doorCloseStatus = false;
      histwayDoor = false;

      if (doorState === 0) {
        doorStatus = 4;
      } else if (doorState === 2) {
        doorStatus = 3;
      }
    }

    const updateTime = result.lastTime;
    const liftcarRunState = result.runState;
    const liftcarRunDirection = result.runState;
    const curFloor = result.floor;

    realData.length = 0;
    realData.push(...[ {
        title: t('menu.archives.Service_Mode'), // 当前服务模式
        content: serviceMode,
      }, {
        title: t('menu.archives.Door_Zone'), // 开锁区域
        content: doorZone,
      },  {
        title: t('menu.archives.Door_Close_Status'), // 关门是否到位
        content: doorCloseStatus,
      }, {
        title: t('menu.archives.Passenger_Status'), // 轿内是否有人
        content: passengerStatus,
      }, {
        title: t('menu.archives.Door_Status'), // 轿门状态
        content: doorStatus,
      }, {
        title: t('menu.archives.Histway_Door'), // 厅门状态
        content: histwayDoor,
      }, {
        title: t('menu.archives.Safety_circuit'), // 安全回路
        content: circuitState,
      }, {
        title: t('menu.archives.Lift_Car_Drive_Status'), // 曳引机状态
        content: liftCarDriveStatus,
      }
    ])

  } catch (err) {
    // you can report use errorHandler or other
  }
};

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

// 点击困人故障、故障数据、异常数据 tab切换
const tabClick = (type: any) => {
  tabType.value = type;
  fetchData({
    ...formModel.value,
    'faultType': type,
    'eleId': props.id
  })
}

// 视频监控、实时数据切换
const videoAndRealTabClick = (type: any) => {

}

/**
 * table 部分
 */
// 图片预览
const imageUrl = ref();
const imageVisible = ref(false)
const imageClick = (url: string) => {
  if (url) {
    imageUrl.value = url;
    imageVisible.value = true;
  } else {
    Message.error("暂无图片");
  }
};

// 视频预览
const videoVisible = ref(false);
const videoClick = (url: string) => {
  if (url) {
    videoVisible.value = true;
    videoRef.value.src = url;
  } else {
    Message.error("暂无视频");
  }
}

// 波形预览
let xChartOption: any = reactive({});
let yChartOption: any = reactive({});
let zChartOption: any = reactive({});

let waveData = reactive({ // 波形数据
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value',
    splitLine: { // 背景网格虚线
      show: true,
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  dataZoom: [ // 滚动条
    {
      type: 'inside',
      start: 0,
      end: 100
    },
    {
      start: 0,
      end: 100
    }
  ],
  series: [
    {
      data: [],
      type: 'line',
      // 节点样式
      symbol: 'image://data:image/png;base64,iVBORw0KGgodoorBackWidthANSUhEUgdoorBackWidthA0doorBackWidthANCAYdoorBackWidthBy6+R8doorBackWidthACXBIWXMdoorBackWidthsTdoorBackWidthLEwEAmpwYdoorBackWidthAAXNSR0IArs4c6QdoorBackWidthARnQU1BAACxjwv8YQUdoorBackWidthE/SURBVHgBdZJPTgIxFMZ/bXFQApHoCoHEuAAlunLlzgu49QiexhN4BLdyAC9gQiLxDwuDfyIbdSE6EJhSOzAMnQl+SdvX1/d9fa+vgjQujaocsa76ZFUW/2nAgH0xckNEbLWNV1ZsKyikdcaGj16bN06FXpAsoSqpCUGWfyAU/nOLTkiUoaNqqCYImkMCTqZrBKPJbdQpTQUqr2ZN/tCIFQ3nBo5jAcMF0o4IL7e05PjLqcGqJwizAs7cG8sHFGUmh+fkXWMZ1CytOWTgM3JU31mO3tz4HaLlZgl/waFpRycRPqFp55v5dmsFf/rkO/emFrj9mdiXg5KtryMk13Fa8NndE91MuFnVdL8Vdev0otOr6GZHh1Fez9KP/Q3b4ATRgVXuh8J30XcS6YD6gykMJ+RDe+ihiwGDx13Rd2P+AHXFYlxBmNkhdoorBackWidthAAElFTkSuQmCC',
      symbolSize: 10,
      itemStyle: {
        color: '#1ED6FF'
      },
    }
  ]
});

let xResult = ref("");
let yResult = ref("");
let zResult = ref("");
// 波形弹窗显示
const showWave = async () => {

  const waveParams = {
    "devCode": drawerRecord.value.clientCode,
    "createTime": drawerRecord.value.createTime,
    "faultCode": drawerRecord.value.faultCode
  }
  const {data} = await getEleFaultWaveByArchives(waveParams);

  // 构建x、y、z波形图数据
  let rows = data.data;
  for (let row of rows) {
    for (let d in row) {
      if (Object.prototype.hasOwnProperty.call(row, d)) {
        if (d.indexOf("X_") > -1) {
          xResult.value += `${row[d]},`;
        }
        if (d.indexOf("Y_") > -1) {
          yResult.value += `${row[d]},`;
        }
        if (d.indexOf("Z_") > -1) {
          zResult.value += `${row[d]},`;
        }
      }
    }
  }

  loadWave(xResult.value, 0);
  // loadWave(yResult.value, 1);
  // loadWave(zResult.value, 2);
}

// 构建波形数据
const loadWave = (data, index) => {
  waveData.xAxis.data.length = 0;
  waveData.series[0].data.length = 0;

  let listName = [];
  let listValue = [];
  let i = 0;
  if (data.length > 0) {
    let wave = data.split(",");
    for (let item of wave) {
      i += 1;
      listName.push(i);
      listValue.push(item);
    }
  }

  waveData.xAxis.data.push(...listName);
  waveData.series[0].data.push(...listValue);
  if(index === 0){
    Object.assign(xChartOption, waveData);
  }else if(index === 1){
    Object.assign(yChartOption, waveData);
  }else if(index === 2){
    Object.assign(zChartOption, waveData);
  }

}

// 切换x y z波形
const waveTabClick = (type: any) => {
  // 动态echarts
  if (type === "1") { // x波形
    loadWave(xResult.value);
  } else if (type === "2") { // y波形
    loadWave(yResult.value);
  } else { // z波形
    loadWave(zResult.value);
  }
}


const trappedNum = ref(0);
const faultNum = ref(0);
const errorNum = ref(0);
// 电梯故障统计
const getEleFaultStat = async () => {
  const params = {
    'eleId': props.id
  }
  const {data} = await getEleFaultStatByArchives(params);
  trappedNum.value = data.trappedNum;
  faultNum.value = data.faultNum;
  errorNum.value = data.errorNum;
}

// 详情抽屉
const detailVisible = ref(false);
const faultIdDrawerParam = ref('');
const createTimeDrawerParam = ref('');
const faultCodeDrawerParam = ref('');
const videoUrlDrawerParam = ref('');
const photoUrlDrawerParam = ref('');
const drawerClick = (record) => {
  detailVisible.value = true;
  faultIdDrawerParam.value = record.id;
  createTimeDrawerParam.value = record.createTime;
  faultCodeDrawerParam.value = record.faultCode;

  videoUrlDrawerParam.value = record.videoUrl;
  photoUrlDrawerParam.value = record.photoUrl;
};
const cancelDrawer = () => {
  detailVisible.value = false;
}

const {loading, setLoading} = useLoading(true);
// 定义表格结构
const renderData = ref<FaultQueryRecord[]>([]);
type Column = TableColumnData & { checked?: true };
const cloneColumns = ref<Column[]>([]);
const showColumns = ref<Column[]>([]);

// 定义分页
const pagination: Pagination = reactive({
  current: 1,
  pageSize: 10,
});

/**
 * 搜索框部分
 */
// 搜索框结构定义
const generateFormModel = () => {
  return {
    faultName: '',
    date: [],
    startTime: '',
    endTime: '',
  };
};
const formModel = ref(generateFormModel());

// 搜索方法
const search = () => {
  if (formModel.value.date) {
    formModel.value.startTime = formModel.value.date[0];
    formModel.value.endTime = formModel.value.date[1];
  }

  fetchData({
    'eleId': props.id,
    ...formModel.value,
    'faultType': tabType.value,
  } as any);
};

// 重置方法
const reset = () => {
  formModel.value = generateFormModel();
};

// page改变
const onPageChange = (page: number) => {
  const type = tabType.value;
  fetchData({...formModel.value, 'eleId': props.id, 'faultType': type});
};

// 查询表格数据
const fetchData = async (
    params: FaultListPageParams
) => {
  setLoading(true);
  try {
    console.log("*****************************")
    const {data} = await queryFaultList(params);
    renderData.value = data.rows;
    console.log(renderData.value);
    pagination.current = params.page;
    pagination.total = data.total;
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false);
  }
};

// 定义表格列
const tableColumns = computed<TableColumnData[]>(() => [
  {
    title: t('menu.archives.number'),
    dataIndex: 'index',
    slotName: 'index',
    headerCellClass: 'table-header-cell',
  },
  {
    title: t('menu.archives.workOrder.faultType'), // 故障名称
    dataIndex: 'faultName',
    headerCellClass: 'table-header-cell',
  },
  {
    title: t('menu.archives.happenTime'), // 发生时间
    dataIndex: 'createTime',
    headerCellClass: 'table-header-cell',
    width: 200
  },
  {
    title: t('menu.archives.endTime'), // 恢复时间
    dataIndex: 'recoverTime',
    headerCellClass: 'table-header-cell',
    width: 200
  },
  {
    title: t('menu.archives.state'), // 状态
    dataIndex: 'state',
    slotName: 'state',
    headerCellClass: 'table-header-cell',
  },
  {
    title: t('menu.archives.video'), // 视频
    dataIndex: 'videoUrl',
    slotName: 'video',
    headerCellClass: 'table-header-cell',
  },
  {
    title: t('menu.archives.image'), // 图片
    dataIndex: 'photoUrl',
    align: "center",
    slotName: 'image',
    headerCellClass: 'table-header-cell',
  },
  {
    title: t('menu.archives.wave'), // 波形
    dataIndex: 'hasWave',
    align: "center",
    slotName: 'wave',
    headerCellClass: 'table-header-cell',
  },
  {
    title: t('menu.archives.operate'), // 操作
    dataIndex: 'operate',
    align: "center",
    slotName: 'operate',
    headerCellClass: 'table-header-cell',
  }
]);

watch(
    () => tableColumns.value,
    (val) => {
      cloneColumns.value = cloneDeep(val);
      cloneColumns.value.forEach((item, index) => {
        item.checked = true;
      });
      showColumns.value = cloneDeep(cloneColumns.value);
    },
    {deep: true, immediate: true}
);

const showFaultDetail = (record) => {
  drawerVisible.value = true;
  drawerRecord.value = record;
  console.log(drawerRecord);
  showWave();
  drawerElevatorData.value = [{
    label: t('menu.archives.elevatorName'),
    value: record.elevatorName,
  }, {
    label: t('menu.archives.workOrder.faultType'),
    value: record.faultName,
  }, {
    label: t('menu.archives.clientCode'),
    value: record.clientCode
  }, {
    label: t('menu.archives.happenTime'),
    value: record.createTime,
  }, {
    label: t('menu.archives.endTime'),
    value: record.recoverTime
  }, {
    label: t('menu.archives.elevatorFloor'),
    value: `${record.elevatorFloor}层`
  }, {
    label: t('menu.archives.faultState'),
    value: getFaultState(record.state)
  }, {
    label: t('menu.archives.confirmUserName'),
    value: record.confirmUserName
  }, {
    label: t('menu.archives.maintain.taskSource'),
    value: getFaultResourceV2(record.resource)
  }, {
    label: t('menu.archives.workOrder.faultCause'),
    value: record.faultReason
  }, {
    label: t('menu.archives.reasonAnalysis'),
    value: record.reasonAnalysis
  }];

  faultTimeData.value = [{
    label: t('menu.archives.onenetTime'),
    value: '2022-11-7 16:39:30'
  }, {
    label: t('menu.archives.reportTime'),
    value: '2022-11-7 16:39:30'
  }, {
    label: t('menu.archives.createTime'),
    value: '2022-11-7 16:39:30'
  }];
}

const handleDrawerCancel = () => {
  drawerVisible.value = false;
}

</script>

<style scoped lang='less'>
// tab 平均分样式及去掉灰色阴影
:deep(.videoTab .arco-tabs-nav-tab) {
  display: flex;
  flex: 1;
}

:deep(.videoTab .arco-tabs-nav-tab-list) {
  display: flex;
  flex: 1;
}

:deep(.videoTab .arco-tabs-tab) {
  display: flex;
  flex: 1;
}

:deep(.videoTab .arco-tabs-nav-type-line .arco-tabs-tab-title) {
  flex: 1;
  text-align: center;
}

:deep(.videoTab .arco-tabs-nav-type-line .arco-tabs-tab:hover .arco-tabs-tab-title::before) {
  background-color: white;
}

:deep(.videoTab .arco-tabs-content) {
  text-align: center;
}

// tab 平均分样式及去掉灰色阴影样式结束

// wave tab 平均分样式及去掉灰色阴影
:deep(.waveTab .arco-tabs-nav-tab) {
  display: flex;
  flex: 1;
}

:deep(.waveTab .arco-tabs-nav-tab-list) {
  display: flex;
  flex: 1;
}

:deep(.waveTab .arco-tabs-tab) {
  display: flex;
  flex: 1;
}

:deep(.waveTab .arco-tabs-nav-type-line .arco-tabs-tab-title) {
  flex: 1;
  text-align: center;
}

:deep(.waveTab .arco-tabs-nav-type-line .arco-tabs-tab:hover .arco-tabs-tab-title::before) {
  background-color: white;
}

:deep(.waveTab .arco-tabs-content) {
  text-align: center;
  padding-top: 0;
}

// wave tab 结束

:deep(.arco-divider-horizontal) {
  margin: 0;
}

:deep(.tableTab .arco-tabs-content) {
  padding: 0;
}

:deep(.arco-tabs-nav::before) {
  height: 0px;
}

.video-common {
  padding: 4px 16px;
  height: 48px;
  border-radius: 4px;
  word-break: break-all;
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
  .video-common();
}

.xyz-wave{
  margin-top: -50px;
}

.fault_detail{
  display: flex;
  flex-direction: row;
  color: #072CA6;
  padding: 5px;
}

.fault_detail:active{
  display: flex;
  flex-direction: row;
  background-color: #E1E9FA;
  color: #072CA6;
  padding: 5px;
}

.fault_detail:hover{
  display: flex;
  flex-direction: row;
  background-color: #E1E9FA;
  color: #072CA6;
  padding: 5px;
}

.drawer_description_value{
  margin-left: 20px;
  color: #072CA6;
  word-break:break-all;
}
</style>
