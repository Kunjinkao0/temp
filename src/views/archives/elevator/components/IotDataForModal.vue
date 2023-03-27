<template>
    <div class="">
        <div class="cu-flex cu-padlr24  cu-padb20" style="background:white">
            <div class="cu-flex1">
                <a-card style="overflow-y: auto">
                    <!-- 实时状态 -->
                    <div>
                        <div class="cu-link-vertical"></div>
                        <span class="cu-font14 cu-fontWeight600 cu-marl4">{{
                                $t('menu.archives.real.title')
                        }}</span>
                    </div>
                    <a-table :columns="columns" :data="realData" :pagination="false" :show-header="false"
                        :bordered="{ cell: true }" :hoverable="false" class="cu-mart16">
                        <template #content="{ record }">
                            <div v-if="record.title === $t('menu.archives.updateTime')">
                                <div v-if="record.content">{{record.content}}</div>
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
                                <div v-if="record.content">{{record.content}}</div>
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
								<div> {{getCardoorState(record.content)}}</div>
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
                </a-card>

              <a-card style="height: 400px; overflow-y: auto">
                <a-tabs default-active-key="1" @tab-click="videoAndRealTabClick">
                  <!-- 视频监控 -->
                  <a-tab-pane key="1" :title="$t('menu.archives.detail.video')">
                    <!-- <iframe :width="videoWidth" :src="videoMonitorUrl"
                        style="width: 100%; height: 240px;"></iframe> -->
                    <div style="height: 240px">
                      <iframe :src="videoMonitorUrl" frameborder="0" scrolling="no"
                              style="height: 240px; width: 100%"></iframe>
                    </div>
                  </a-tab-pane>
                  <!-- 模拟运行 -->
                  <a-tab-pane key="2" :title="$t('menu.archives.detail.run')">
                    <div class="cu-fx" style="width: 100%; height: 240px">
                      <div>
                        <img v-if="door === '0'" :src="doorOpen" style="height: 190px" />
                        <img v-else :src="doorClose" style="height: 190px" />
                      </div>
                      <div style="position: relative;" class="cu-marl24">
                        <div
                            style="width: 30px;position: absolute; z-index: 1; left: 50%; top: 50%; transform: translate(-50%, -50%);">
                          <img :src="doorBack" style="width: 100%" />
                        </div>
                        <div
                            style="color: red; position: absolute; z-index: 9; transform: translate(-50%, -60%);">
                          {{ floor }}</div>
                        <div
                            style="width: 20px; position: absolute; z-index: 9; transform: translate(-50%, -150%);">
                          <!-- 停梯或下行 -->
                          <img v-if="runState === '0' || runState === '2'" :src="doorUpNo"
                               style="width: 100%" />
                          <!-- 上行 -->
                          <img v-else :src="doorUp" style="width: 100%" />
                        </div>
                        <div
                            style="width: 20px; position: absolute; z-index: 9; transform: translate(-50%, 60%);">
                          <!-- 停梯或上行 -->
                          <img v-if="runState === '0' || runState === '1'" :src="doorDownNo"
                               style="width: 100%" />
                          <!-- 下行 -->
                          <img v-else :src="doorDown" style="width: 100%" />
                          <!-- <img src="/src/assets/images/archives/doorDownNo.png" style="width: 100%" /> -->
                        </div>
                      </div>
                    </div>
                  </a-tab-pane>
                </a-tabs>
                <div class="cu-flex cu-mart16" style="height: 48px">
                  <div class="cu-flex1 cu-fx floor-box">
                    <!-- 当前楼层 -->
                    <img :src="floorPic" />
                    <div class="cu-marl4 " style="text-align: left;">
                      <div class="cu-fontWeight600">{{ floor }}</div>
                      <div class="cu-font10">{{ $t('menu.archives.detail.floor') }}</div>
                    </div>
                  </div>
                  <div class="cu-flex1 cu-fx stop-box cu-marlr16">
                    <!-- 轿厢运行方向 -->
                    <img :src="stopPic" />
                    <div class="cu-marl4" style="text-align: left;">
                      <div class="cu-fontWeight600" v-if="runState === '0'">停梯</div>
                      <div class="cu-fontWeight600" v-else-if="runState === '1'">上行</div>
                      <div class="cu-fontWeight600" v-else-if="runState === '2'">下行</div>
                      <div class="cu-fontWeight600" v-else></div>
                      <div class="cu-font10">{{ $t('menu.archives.detail.stop') }}</div>
                    </div>
                  </div>
                  <div class="cu-flex1 cu-fx speed-box">
                    <!-- 当前速度 -->
                    <img :src="speedPic" />
                    <div class="cu-marl4" style="text-align: left;">
                      <div class="cu-fontWeight600">{{ speed }}M/S</div>
                      <div class="cu-font10">{{ $t('menu.archives.detail.speed') }}</div>
                    </div>
                  </div>
                </div>
              </a-card>

              <a-card style="overflow-y: auto">
                <!-- 运行信息 -->
                <div>
                  <div class="cu-link-vertical"></div>
                  <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.archives.run.title')
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
              </a-card>
            </div>
        </div>

        <a-card :header-style="{padding:'20px 20px 10px 20px',border:'0px'}" :body-style="{padding:'20px 20px 10px 20px'}" :title="$t('menu.archives.fault.search')">
            <!-- 搜索部分 -->
            <a-row>
                <a-col :flex="6">
                    <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }"
                        label-align="left">
                        <a-row :gutter="16">
                            <a-col :span="10">
                                <!-- 故障类型 -->
                                <a-form-item field="faultType" :label="$t('menu.archives.workOrder.faultType')"
                                    label-col-flex="60px">
                                    <a-input v-model="formModel.faultName" class="input-search"
                                        :placeholder="$t('menu.archives.workOrder.faultType.placeholder')" allow-clear/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="10">
                                <!-- 起止时间 -->
                                <a-form-item field="date" :label="$t('menu.archives.workOrder.search.data')"
                                    label-col-flex="60px">
                                    <a-range-picker class="input-search" v-model="formModel.date" style="width: 100%" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-form>
                </a-col>
                <a-col :flex="1">
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
                </a-col>
            </a-row>
        </a-card>

        <div class="cu-fx-between-center cu-padlr24 cu-padtop24" style="background:white">
            <div class="tableTab">
                <a-tabs default-active-key="3" @tab-click="tabClick">
                    <!-- 困人故障 -->
                    <a-tab-pane key="3" :title="$t('menu.archives.detail.personFault')">
                    </a-tab-pane>
                    <!-- 故障数据 -->
                    <a-tab-pane key="2" :title="$t('menu.archives.detail.fault')">
                    </a-tab-pane>
                    <!-- 异常数据 -->
                    <a-tab-pane key="1" :title="$t('menu.archives.detail.error')">
                    </a-tab-pane>
                </a-tabs>
            </div>
            <div class="cu-fx-n-center">
                <!-- 困人故障共xx次 -->
                <span>{{ $t('menu.archives.detail.personFault') }} {{ $t('menu.archives.total') }}<span
                        class="cu-marlr4 cu-font16 cu-color-165DFF">{{ trappedNum }}</span>{{
                                $t('menu.archives.count')
                        }}</span>
                <!-- 故障数据共xx次 -->
                <span class="cu-marl16">{{ $t('menu.archives.detail.fault') }}{{ $t('menu.archives.total') }}<span
                        class="cu-marlr4 cu-font16 cu-color-165DFF">{{ faultNum }}</span>{{
                                $t('menu.archives.count')
                        }}</span>
                <!-- 异常数据共xx次 -->
                <span class="cu-marl16">{{ $t('menu.archives.detail.error') }}{{ $t('menu.archives.total') }}<span
                        class="cu-marlr4 cu-font16 cu-color-165DFF">{{ errorNum }}</span>{{
                                $t('menu.archives.count')
                        }}</span>
            </div>
        </div>
        <a-divider />
        <a-table row-key="id" :loading="loading" :pagination="pagination" :columns="cloneColumns" :data="renderData" :bordered="false" :stripe="true"
            @page-change="onPageChange" style="background:white" class="cu-padt16 cu-padlr24" :scroll="{x: '100%', y: '20%'}">
            <template #index="{ rowIndex }">
                {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
            </template>
            <template #state="{ record }">
                <a-badge v-if="record.state === 1" status="success" />
                <a-badge v-else status="warning" />
                {{ $t(`menu.archives.state.${record.state}`) }}
            </template>
            <!-- 图片 -->
            <template #image="{ record }">
                <div v-if="record.photoUrl" class="cu-fx" @click="imageClick(record.photoUrl)">
                    <img :src="iconImage" alt="" class="cu-pointer">
                    <div class="cu-marlr4 cu-pointer cu-color-165DFF">{{
                            $t('menu.archives.image')
                    }} </div>
                </div>
                <div v-else>{{ $t('menu.archives.none') }}</div>
            </template>
            <!-- 视频 -->
            <template #video="{ record }">
                <div v-if="record.videoUrl" class="cu-fx" @click="videoClick(record.videoUrl)">
                    <img :src="iconVideo" alt="">
                    <div class="cu-marlr4 cu-pointer cu-color-165DFF">{{
                            $t('menu.archives.video')
                    }} </div>
                </div>
                <div v-else>{{ $t('menu.archives.none') }}</div>
            </template>
            <!-- 波形 -->
            <template #wave="{ record }">
                <div class="cu-fx" @click="waveClick(record)">
                    <img :src="iconWave" alt="" class="cu-pointer" />
                    <div class="cu-marlr4 cu-pointer cu-color-165DFF">{{
                            $t('menu.archives.wave')
                    }} </div>
                </div>
            </template>
            <template #operate="{ record }">
                <div class="cu-marlr4 cu-pointer cu-color-165DFF" @click="drawerClick(record)">{{
                        $t('menu.archives.detail')
                }}</div>
            </template>
            <!-- table空数据样式插槽 -->
            <template #empty>
                <div class="table-nodata">
                    <a-image :src="nodataPic" :preview="false"></a-image>
                </div>
            </template>
        </a-table>
        <!-- 图片预览 -->
        <a-image-preview :src="imageUrl" v-model:visible="imageVisible" />
        <!-- 视频预览 -->
        <a-modal v-model:visible="videoVisible" modal-class="iotVideoModel" :footer="false" title-align="start">
            <template #title>
                <div>
                    <div class="cu-link-vertical"></div>
                    <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.archives.video')
                    }}</span>
                </div>
            </template>
            <div class="cu-marb16">
                <video ref="videoRef" controls style="width: 100%">
                    <source type="video/mp4">
                </video>
            </div>
        </a-modal>
        <!-- 波形预览 -->
        <a-modal v-model:visible="waveVisible" modal-class="iotWaveModel" :footer="false" title-align="start">
            <template #title>
                <div>
                    <div class="cu-link-vertical"></div>
                    <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.archives.wave')
                    }}</span>
                </div>
            </template>
            <div class="cu-marb16" v-if="waveVisible">
                <a-tabs class="waveTab" default-active-key="1" @tab-click="waveTabClick">
                    <!-- x波形 -->
                    <a-tab-pane key="1" :title="$t('menu.archives.x.wave')">
                    </a-tab-pane>
                    <!-- y波形 -->
                    <a-tab-pane key="2" :title="$t('menu.archives.y.wave')">
                    </a-tab-pane>
                    <!-- z波形 -->
                    <a-tab-pane key="3" :title="$t('menu.archives.z.wave')">
                    </a-tab-pane>
                </a-tabs>
                <Chart height="300px" :option="chartOption" />
            </div>
        </a-modal>
        <!-- 详情抽屉 -->
        <a-drawer :width="400" :visible="detailVisible" @cancel="cancelDrawer" :footer="false" unmountOnClose>
            <template #title>
                {{ $t('menu.archives.detail') }}
            </template>
            <div>
                <IotDataDetail ref="iotDataDetailRef" :faultId="faultIdDrawerParam" :createTime="createTimeDrawerParam"
                    :faultCode="faultCodeDrawerParam" :videoUrl="videoUrlDrawerParam" :photoUrl="photoUrlDrawerParam"
                    :devCode="devCode" />
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
import { ref, reactive, onMounted, computed, watch, onBeforeUnmount, onDeactivated } from 'vue'
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import { useI18n } from 'vue-i18n';
import { getCardoorState } from '@/utils/common';
import useLoading from '@/hooks/loading';
import cloneDeep from 'lodash/cloneDeep';
import { queryFaultList } from '@/api/fault/fault';
import { FaultQueryRecord, FaultListPageParams } from '@/api/fault/types/faultType';
import { getDevRltDataByArchives, getDevRunDataByArchives, getEleFaultWaveByArchives, getEleFaultStatByArchives } from '@/api/archives/elevator';
import { DevCode } from '@/api/archives/types/elevatorType';
import { Pagination } from '@/types/global';
import { Message } from '@arco-design/web-vue';
import { getToken, getTixinToken } from '@/utils/auth';
import IotDataDetail from './IotDataDetail.vue';

const props = defineProps(['id']);
const devCode = ref(""); // 设备编号

// 国际化
const { t } = useI18n();

const videoRef = ref();
const videoMonitorUrl = ref("");

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
            title: t('menu.archives.updateTime'), // 更新时间
            content: '',
        }, {
            title: t('menu.archives.Service_Mode'), // 当前服务模式
            content: 1,
        }, {
            title: t('menu.archives.runState'), // 轿厢运行状态
            content: 0,
        }, {
            title: t('menu.archives.runDirection'), // 轿厢运行方向
            content: 0,
        }, {
            title: t('menu.archives.Door_Zone'), // 开锁区域
            content: true,
        }, {
            title: t('menu.archives.curFloor'), // 电梯当前楼层
            content: '',
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
        'page': pagination.current,
        'size': pagination.pageSize,
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
        const { data } = await getDevRunDataByArchives(params);

        if(JSON.stringify(data) !== '{}'){
            bindRunData(data);
        }

    } catch (err) {
        // you can report use errorHandler or other
    }
};

const bindRunData = (data) => {
    runData.length = 0;

    const runTime = data === null?'': (parseFloat(data.runTime) / 3600).toFixed(2);
    const runTotal = data === null?'': parseFloat(data.runUp) + parseFloat(data.runDown);
    const runDis = data === null?'': (parseFloat(data.runTime) / 100).toFixed();

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
        content: data === null?'': data.openClose,
        id: 3,
    }, {
        title: t('menu.archives.stop'), // 累计停站次数
        content: data === null?'': data.stop,
        id: 4,
    }, {
        title: t('menu.archives.runUp'), // 累计上行次数
        content: data === null?'': data.runUp,
        id: 5,
    }, {
        title: t('menu.archives.runDown'), // 累计下行次数
        content: data === null?'': data.runDown,
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
        const { data } = await getDevRltDataByArchives(params);
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
        realData.push(...[
            {
                title: t('menu.archives.updateTime'), // 更新时间
                content: updateTime,
            },{
                title: t('menu.archives.Service_Mode'), // 当前服务模式
                content: serviceMode,
            }, {
                title: t('menu.archives.runState'), // 轿厢运行状态
                content: liftcarRunState,
            }, {
                title: t('menu.archives.runDirection'), // 轿厢运行方向
                content: liftcarRunDirection,
            }, {
                title: t('menu.archives.Door_Zone'), // 开锁区域
                content: doorZone,
            }, {
                title: t('menu.archives.curFloor'), // 电梯当前楼层
                content: curFloor,
            }, {
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
        'page': 1,
        'size': pagination.pageSize,
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
const waveVisible = ref(false);
let chartOption: any = reactive({});

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
const waveClick = async (params) => {
    waveVisible.value = true;

    const waveParams = {
        "devCode": devCode.value,
        "createTime": params.createTime,
        "faultCode": params.faultCode
    }
    const { data } = await getEleFaultWaveByArchives(waveParams);

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

    // 默认显示x波形
    loadWave(xResult.value);
}

// 构建波形数据
const loadWave = (data) => {
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
    Object.assign(chartOption, waveData);
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
    const { data } = await getEleFaultStatByArchives(params);
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

const { loading, setLoading } = useLoading(true);
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
        date:[],
        startTime:'',
        endTime:'',
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
        'page': 1,
        'size': pagination.pageSize,
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
    fetchData({...formModel.value,'page': page, 'size': pagination.pageSize, 'eleId': props.id, 'faultType': type });
};

// 查询表格数据
const fetchData = async (
    params: FaultListPageParams = { page: 1, size: 20 }
) => {
    setLoading(true);
    try {
        const { data } = await queryFaultList(params);
        renderData.value = data.rows;
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
      width: 80
    },
    {
        title: t('menu.archives.workOrder.faultType'), // 故障名称
        dataIndex: 'faultName',
        headerCellClass: 'table-header-cell',
      width: 200
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
      width: 100
    },
    {
        title: t('menu.archives.video'), // 视频
        dataIndex: 'videoUrl',
        slotName: 'video',
        headerCellClass: 'table-header-cell',
      width: 100
    },
    {
        title: t('menu.archives.image'), // 图片
        dataIndex: 'photoUrl',
        align: "center",
        slotName: 'image',
        headerCellClass: 'table-header-cell',
      width: 100
    },
    {
        title: t('menu.archives.wave'), // 波形
        dataIndex: 'hasWave',
        align: "center",
        slotName: 'wave',
        headerCellClass: 'table-header-cell',
      width: 100
    },
    {
        title: t('menu.archives.operate'), // 操作
        dataIndex: 'operate',
        align: "center",
        slotName: 'operate',
        headerCellClass: 'table-header-cell',
      width: 100,
      fixed: 'right'
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
    { deep: true, immediate: true }
);

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
</style>
