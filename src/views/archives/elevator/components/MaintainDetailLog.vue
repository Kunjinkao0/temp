<template>
    <div>
        <div class="header-image cu-flex">
            <div class="cu-fy cu-flex1">
                <!-- 接单用时 -->
                <img :src="logIcon1Pic" alt="" class="log_icon">
                <div class="cu-mart12 cu-font12">{{ t('menu.archives.log.receiveTime') }}</div>
                <div class="cu-fontWeight700 cu-font16">{{receiveUseTimeTop}}</div>
            </div>
            <div class="cu-fy cu-flex1">
                <!-- 到场用时 -->
                <img :src="logIcon2Pic" alt="" class="log_icon">
                <div class="cu-mart12 cu-font12">{{ t('menu.archives.log.arrivalTime') }}</div>
                <div class="cu-fontWeight700 cu-font16">{{arrivalUseTimeTop}}</div>
            </div>
            <div class="cu-fy cu-flex1">
                <!-- 维保用时 -->
                <img :src="logIcon3Pic" alt="" class="log_icon">
                <div class="cu-mart12 cu-font12">{{ t('menu.archives.log.maintainTime') }}</div>
                <div class="cu-fontWeight700 cu-font16">{{ finishUseTimeTop}}</div>
            </div>
        </div>
        <div class="cu-padlr24 cu-mart28 cu-marb16">
            <div class="cu-mart28">
                <!-- 接单时间 -->
                <div class="cu-fx-between-center">
                    <div>
                        <div class="cu-link-vertical"></div>
                        <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ t('menu.archives.log.receiveMoment')
                        }}</span>
                    </div>
                    <div class="cu-color-86909c">
                        {{receiveMoment }}
                    </div>
                </div>
            </div>
            <a-table :columns="columns" :data="receiveData" :pagination="false" :show-header="false"
                :bordered="{ cell: true }" :hoverable="false" class="cu-mart16">
                <template #content="{ record }">
                    <div v-if="record.title === $t('menu.archives.log.maintain.person.1') || record.title === $t('menu.archives.log.maintain.person.2')" class="cu-fx-n-center">
                        <!-- 维保员1 维保员2 -->
                        <img :src="ipcameraPic" />
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                    <div v-if="record.title === $t('menu.archives.log.maintain.phone')" class="cu-fx-n-center">
                        <!-- 联系电话 -->
                        <img :src="telphonePic" />
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                    <div v-if="record.title === $t('menu.mainWork.detail.log.peoAddress')" class="cu-fx-n-center">
                        <!-- 人员坐标 -->
                        <img :src="addressPic" />
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                    <div v-if="record.title === $t('menu.mainWork.detail.log.distance')" class="cu-fx-n-center">
                        <!-- 距离电梯 -->
                        <img :src="distancePic" />
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                    <div v-if="record.title === $t('menu.archives.log.receiveTime')" class="cu-fx-n-center">
                        <!-- 接单用时 -->
                        <img :src="timePic" />
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                </template>
            </a-table>
            <div class="cu-mart28">
                <!-- 到场时间 -->
                <div class="cu-fx-between-center">
                    <div>
                        <div class="cu-link-vertical"></div>
                        <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ t('menu.archives.log.arrivalMoment')
                        }}</span>
                    </div>
                    <div class="cu-color-86909c">
                        {{arrivalMoment}}
                    </div>
                </div>
            </div>
            <a-table :columns="columns" :data="arrivalData" :pagination="false" :show-header="false"
                :bordered="{ cell: true }" :hoverable="false" class="cu-mart16">
                <template #content="{ record }">
                    <div v-if="record.title === $t('menu.mainWork.detail.log.peoAddress')" class="cu-fx-n-center">
                        <!-- 人员坐标 -->
                        <img :src="addressPic" />
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                    <div v-if="record.title === $t('menu.mainWork.detail.log.distance')" class="cu-fx-n-center">
                        <!-- 距离电梯 -->
                        <img :src="distancePic" />
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                    <div v-if="record.title === $t('menu.archives.log.arrivalTime')" class="cu-fx-n-center">
                        <!-- 到场用时 -->
                        <img :src="timePic" />
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                    <div v-else-if="record.title === $t('menu.archives.log.arrival.image')" class="cu-fx-n-center">
						<!-- 现场图片 -->
						<div v-if="arrivalImages.length===1">
							<div v-for="image in arrivalImages" :key="image">
								<img :src="image" style="width: 200px;height: 284px;" />
							</div>
						</div>
						<div v-else-if="arrivalImages.length>1">
							<a-carousel :style="{ width: '200px',height: '240px',}" :default-current="2">
								<a-carousel-item v-for="image in arrivalImages" :key="image">
								  <img :src="image" :style="{ width: '100%',}"/>
								</a-carousel-item>
							</a-carousel>
						</div>
					</div>
                    <div v-else-if="record.title === $t('menu.archives.log.arrival.video')" class="cu-fx-n-center">
                        <!-- 查看视频 -->
						<div v-if="arrivalVideos.length===1">
							<div v-for="video in arrivalVideos" :key="video">
								<video controls :src="video" style="width: 200px;height: 133px;"><source type="video/mp4"></video>
							</div>
						</div>
						<div v-else-if="arrivalVideos.length>1">
							<a-carousel :style="{ width: '200px',height: '140px',}" :default-current="2">
								<a-carousel-item v-for="video in arrivalVideos" :key="video">
									<video controls :src="video" style="width: 200px;height: 133px;"><source type="video/mp4"></video>
								</a-carousel-item>
							</a-carousel>
						</div>
                    </div>
                    <div v-else-if="record.title === $t('menu.mainWork.detail.log.workRecord')" class="cu-fx-n-center">
                        <!-- 工作记录 -->
                        <img :src="recordPic" />
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                </template>
            </a-table>
            <div class="cu-mart28">
                <!-- 维保工作表 -->
                <div class="cu-fx-between-center">
                    <div>
                        <div class="cu-link-vertical"></div>
                        <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.archives.log.maintain.worksheet')
                        }}</span>
                    </div>
                    <div class="cu-color-86909c">
                        {{sheetTime}}
                    </div>
                </div>
            </div>
            <a-table :columns="columns" :data="workSheetData" :pagination="false" :show-header="false"
                :bordered="{ cell: true }" :hoverable="false" class="cu-mart16">
                <template #content="{ record }">
                    <div class="cu-fx-n-center">
                        <img :src="sheetPic" />
                        <div class="cu-marlr4 cu-pointer cu-color-165DFF" @click="workSheetClick">{{ record.content }}
                        </div>
                    </div>
                </template>
            </a-table>
            <div class="cu-mart28">
                <!-- 完成时间 -->
                <div class="cu-fx-between-center">
                    <div>
                        <div class="cu-link-vertical"></div>
                        <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ t('menu.archives.log.completeMoment')
                        }}</span>
                    </div>
                    <div class="cu-color-86909c">
                        {{finishTime}}
                    </div>
                </div>
            </div>
            <a-table :columns="columns" :data="completeData" :pagination="false" :show-header="false"
                :bordered="{ cell: true }" :hoverable="false" class="cu-mart16">
                <template #content="{ record }">
                    <div v-if="record.title === $t('menu.archives.log.completeTime')" class="cu-fx-n-center">
                        <!-- 完成用时 -->
                        <img :src="timePic" />
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                    <div v-else-if="record.title === $t('menu.archives.log.maintain.person.1')" class="cu-fx-n-center">
                        <!-- 维保员1 -->
                        <img :src="mainSign1" style="width: 200px;height: 108px;"/>
                    </div>
                    <div v-else class="cu-fx-n-center">
                        <!-- 维保员2 -->
                        <img :src="mainSign2" style="width: 200px;height: 108px;"/>
                    </div>
                </template>
            </a-table>
            <div class="cu-mart28">
                <!-- 使用单位评价 -->
                <div class="cu-fx-between-center">
                    <div>
                        <div class="cu-link-vertical"></div>
                        <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ t('menu.workOrder.detail.log.unit') }}</span>
                    </div>
                    <div class="cu-color-86909c">
                        {{unitTime}}
                    </div>
                </div>
            </div>
            <a-table :columns="columns" :data="unitData" :pagination="false" :show-header="false"
                :bordered="{ cell: true }" :hoverable="false" class="cu-mart16">
                <template #content="{ record }">
                    <div v-if="record.title === $t('menu.workOrder.detail.log.evaluator')" class="cu-fx-n-center">
                        <!-- 评价人员 -->
                        <img :src="ipcameraPic" />
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                    <div v-else-if="record.title === $t('menu.workOrder.detail.log.score')" class="cu-fx-n-center">
                        <!-- 评分 -->
                        <a-rate :model-value="record.content" readonly :allow-half="true" />
                    </div>
                    <div v-else-if="record.title === $t('menu.workOrder.detail.log.comments')" class="cu-fx-n-center">
                        <!-- 评语 -->
                        <img :src="sounRecordPic" />
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                    <div v-else class="cu-fx-n-center">
                        <!-- 签名 -->
                        <img :src="unitSign" style="width: 200px;height: 108px;"/>
                    </div>
                </template>
            </a-table>
        </div>
        <a-modal class="maintainLogModal" width="1080px" v-model:visible="visible" @ok="handleOk" @cancel="handleCancel"
            :closable="false">
            <div style="color: white; background: linear-gradient(87.32deg, #165DFF 0%, #722ED1 100%);">
                <div class="cu-fx-between-n cu-padlr24 cu-padt32 cu-padb16 ">
                    <div class="cu-fx-n-center">
                        <img :src="icon6" />
                        <div class="cu-marl8">{{eleName}}</div>
                    </div>
                    <div>{{ $t('menu.archives.maintain.type') }}：{{workTypeName}}</div>
                </div>
            </div>
            <a-tabs default-active-key="1" @tab-click="tabClick">
                <a-tab-pane v-for="item in tabList"  :key="item.key" :title="item.title" >
                    <a-table  row-key="id" :pagination="false" :columns="cloneColumns" :data="renderData" :scroll="{y:600}" :scrollbar="true" class="cu-mart16">
                        <template #state="{ record }">
                            <a-badge v-if="record.state === 1" status="success" />
                            <a-badge v-else status="warning" />
                            {{ $t(`menu.archives.state.${record.state}`) }}
                        </template>
                        <template #note="{ record }">
                            <a-space size="mini">
                                <img :src="recordPic" />
                                <div :class="record.isNote?'cu-marlr4 cu-pointer cu-color-165DFF':'cu-marlr4 cu-pointer'" @click="recordNoteOpen(record.ext)">{{
                                        $t('menu.archives.log.view.note')
                                }}{{record.note}}</div>
                            </a-space>
                        </template>
                        <template #photo="{ record }">
                            <a-space size="mini">
                            <img :src="photoPic" />
                            <div :class="record.isImages?'cu-marlr4 cu-pointer cu-color-165DFF':'cu-marlr4 cu-pointer'" @click="recordImage(record.ext,record.itemId)">{{
                                    $t('menu.archives.log.view.img')
                            }}{{record.note}}</div>
                            </a-space>
                        </template>
                        <template #video="{ record }">
                            <a-space size="mini">
                                <img :src="videoPic" />
                                <div :class="record.isVideo?'cu-marlr4 cu-pointer cu-color-165DFF':'cu-marlr4 cu-pointer'" @click="recordModelOpen(record.ext,record.itemId)">{{
                                        $t('menu.archives.log.video')
                                }}{{record.note}}</div>
                            </a-space>
                        </template>
                    </a-table>
                    <a-image-preview-group  v-model:visible="recordImageVisible" :srcList="recordImageurls" infinite></a-image-preview-group>
                </a-tab-pane>
            </a-tabs>
        </a-modal>
        <a-modal class="maintainLogModal" width="960px" v-model:visible="recordModelVisible" @cancel="handleCancel2" title="视频"
            :closable="false">
            <div class="cu-fx cu-pad20">
                <video controls :src="recordModelurls[0]" width="200"><source type="video/mp4"></video>
            </div>
        </a-modal>

        <a-modal class="maintainLogModal" width="960px" v-model:visible="recordNoteVisible" @cancel="handleCancel3" title="备注"
            :closable="false">
            <div class="cu-fx cu-pad20">
                {{recordNote}}
            </div>
        </a-modal>
    </div>
</template>

<script setup lang='ts'>
import ipcameraPic from '@/assets/images/repair/ipcamera.png';
import telphonePic from '@/assets/images/repair/telphone.png';
import addressPic from '@/assets/images/repair/address.png';
import distancePic from '@/assets/images/repair/distance.png';
import photoPic from '@/assets/images/repair/photo.png';
import recordPic from '@/assets/images/repair/record.png';
import sounRecordPic from '@/assets/images/repair/soun-record.png';
import timePic from '@/assets/images/repair/time.png';
import videoPic from '@/assets/images/repair/video.png';
import phonePic from '@/assets/images/rescue/phone.png'
import datePic from '@/assets/images/repair/date.png';
import sheetPic from '@/assets/images/repair/sheet.png';
import logIcon3Pic from '@/assets/images/maintenantics/log-icon-3.png'
import logIcon2Pic from '@/assets/images/maintenantics/log-icon-2.png'
import logIcon1Pic from '@/assets/images/maintenantics/log-icon-1.png'
import icon6 from '@/assets/images/archives/icon-6.png'
import { ref, computed, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import cloneDeep from 'lodash/cloneDeep';
import { differenceMinute,differenceTime } from '@/utils/dateuUils';
import { getMainWorkChildType } from '@/utils/common';
import { QueryWorksheetParams } from '@/api/archives/elevator';
import { number } from 'echarts';

// 国际化
const { t } = useI18n();

const props = defineProps(['workData']);

const columns: any = [
    {
        dataIndex: 'title',
        width: 100,
        align: 'center',
        cellStyle: {
            background: '#F7F8FA',
            color: '#86909C'
        }
    },
    {
        dataIndex: 'content',
        slotName: 'content'
    }
];


// 到场图片
const arrivalImages = ref([])

// 到场视频
const arrivalVideos = ref([])

const alarmTime = ref('')
const receiveMoment = ref('')
const arrivalMoment = ref('')
const unitTime = ref('')
const finishTime = ref('')

const receiveUseTime = ref('')
const arrivalUseTime = ref('')
const finishUseTime = ref('')
const receiveUseTimeTop = ref('00:00:00')
const arrivalUseTimeTop = ref('00:00:00')
const finishUseTimeTop = ref('00:00:00')

const vtype = ref(0)

// 电梯名
const eleName = ref('')
// 电梯地址
const workTypeName = ref('')

// 工作表时间
const sheetTime = ref('')

const alarmData = ref([])

// 维保1签名
const mainSign1 = ref('')

// 维保2签名
const mainSign2 = ref('')

// 物业签名
const unitSign = ref('')

// 接单时间数据
const receiveData = ref([]);

// 到场时间数据
const arrivalData = ref([]);

// 完成时间数据
const completeData = ref([]);

// 使用单位评价数据
const unitData = ref([]);

const handleRecord = ref([])

// 维保工作表
const workSheetData = computed<TableColumnData[]>(() => [
    {
        title: t('menu.archives.log.worksheet'), // 工作表
        content: workTypeName.value,
    }
]);

const initColumns = () => {
    receiveData.value = [
        {
            title: t('menu.archives.log.maintain.person.1'), // 维保员1
            content: '',
        }, {
            title: t('menu.archives.log.maintain.phone'), // 联系电话
            content: '',
        }, {
            title: t('menu.archives.log.maintain.person.2'), // 维保员2
            content: '',
        }, {
            title: t('menu.archives.log.maintain.phone'), // 联系电话
            content: '',
        }, {
            title: t('menu.mainWork.detail.log.peoAddress'), // 人员坐标
            content: '',
        }, {
            title: t('menu.mainWork.detail.log.distance'), // 距离电梯
            content: '',
        }, {
            title: t('menu.archives.log.receiveTime'), // 接单用时
            content: '',
        }
    ]

    arrivalData.value = [
        {
            title: t('menu.mainWork.detail.log.peoAddress'), // 人员坐标
            content: '',
        }, 
        {
            title: t('menu.mainWork.detail.log.distance'), // 距离电梯
            content: '',
        },
        {
            title: t('menu.archives.log.arrivalTime'), // 到场用时
            content: '',
        }, {
            title: t('menu.archives.log.arrival.image'), // 现场图片
            content: '',
        }, {
            title: t('menu.archives.log.arrival.video'), // 现场视频
            content: '',
        }, {
            title: t('menu.mainWork.detail.log.workRecord'), // 备注
            content: '无',
        }
    ]

    completeData.value = [
        {
            title: t('menu.archives.log.completeTime'), // 完成用时
            content: '',
        }, {
            title: t('menu.archives.log.maintain.person.1'), // 维保员1
            content: '',
        }, {
            title: t('menu.archives.log.maintain.person.2'), // 维保员2
            content: '',
        }
    ]

    unitData.value = [
        {
            title: t('menu.workOrder.detail.log.evaluator'), // 评价人员
            content: '',
        }, {
            title: t('menu.workOrder.detail.log.score'), // 评分
            content: 0,
        }, {
            title: t('menu.workOrder.detail.log.comments'), // 评语
            content: '',
        }, {
            title: t('menu.workOrder.detail.log.sign'), // 签名
            content: '',
        }
    ]
}

onMounted(() => {
    initColumns()
})

const getWorkOrderDetail = async () => {
    const workInfo = props.workData.workInfo
    const operateInfo = props.workData.operateInfo
    const handleInfo = props.workData.handleInfo

    eleName.value = workInfo.eleName
    vtype.value = workInfo.childType
    workTypeName.value = getMainWorkChildType(workInfo.childType)
    alarmTime.value = workInfo.createTime
    // 没有信息,暂时去掉
    alarmData.value = [
        {
            title: t('menu.archives.detail.log.alarmRemindPeo'), // 通知人员
            content: '',
        },{
            title: t('menu.archives.log.maintain.phone'), // 联系电话
            content: '',
        },{
            title: t('menu.archives.detail.log.mainPlanData'), // 维保计划
            content: workInfo.planDate,
        },
    ]

    if(operateInfo.length > 0){
        operateInfo.forEach(item=>{
            if(item.operateType === '2'){
                receiveUseTimeTop.value = differenceTime(alarmTime.value,item.operateTime)
                receiveUseTime.value = differenceMinute(alarmTime.value,item.operateTime)
                receiveMoment.value = item.operateTime

                let teamworkUsers = workInfo.teamworkUsers
                let names = []
                let phones = []
                if(teamworkUsers.length>0){
                    teamworkUsers.forEach(userInfo=>{
                        names.push(userInfo.name)
                        phones.push(userInfo.code)
                    })
                }

                receiveData.value = [
                    {
                        title: t('menu.archives.log.maintain.person.1'), // 维保员1
                        content: item.operater
                    }, {
                        title: t('menu.archives.log.maintain.phone'), // 联系电话
                        content: workInfo.receiverPhone,
                    }, {
                        title: t('menu.archives.log.maintain.person.2'), // 维保员2
                        content: names.join(','),
                    }, {
                        title: t('menu.archives.log.maintain.phone'), // 联系电话
                        content: phones.join(','),
                    }, {
                        title: t('menu.mainWork.detail.log.peoAddress'), // 人员坐标
                        content: item.address
                    }, {
                        title: t('menu.mainWork.detail.log.distance'), // 距离电梯
                        content: `${(workInfo.receiveDis/1000)}KM`,
                    }, {
                        title: t('menu.archives.log.receiveTime'), // 接单用时
                        content: `${receiveUseTime.value}分钟`,
                    }
                ]
            }else if(item.operateType === '3'){
                arrivalUseTimeTop.value = differenceTime(alarmTime.value,item.operateTime)
                arrivalUseTime.value = differenceMinute(alarmTime.value,item.operateTime)
                arrivalMoment.value = item.operateTime

                let content = ''
                if(handleInfo.length > 0){
                    handleInfo.forEach(handle=>{
                        if(handle.handleType === 2){
                            // 现场图片
                            arrivalImages.value.push(handle.content)
                        }else if(handle.handleType === 3){
                            // 现场视频
                            arrivalVideos.value.push(handle.content)
							
                        }else if(handle.handleType === 4){
                            content = handle.content
                        }else if(handle.handleType === 5){
                            // 工作表时间
                            sheetTime.value = handle.dealTime
                            const handleRecordData = handle.handleRecord
                            if(handleRecordData.length>0){
                                handleRecord.value = handleRecordData
                                renderData.value = handleRecordData.filter(handleRecordInfo => { 
                                    handleRecordInfo.isNote = false;
                                    handleRecordInfo.isImages = false;
                                    handleRecordInfo.isVideo = false;
                                    if(handleRecordInfo.ext.note && handleRecordInfo.ext.note !== ''){
                                        handleRecordInfo.isNote = true;
                                    }
                                    if(handleRecordInfo.ext.content && handleRecordInfo.ext.content !== ''){
                                        let ext = handleRecordInfo.ext.content
                                        ext.forEach(element => {
                                            if(element.type === 1 || element.type === '1'){
                                                handleRecordInfo.isImages = true;
                                            }

                                            if(element.type === 2 || element.type === '2'){
                                                handleRecordInfo.isVideo = true;
                                            }
                                        });

                                    }
                                    return handleRecordInfo.position === 1
                                })
                            }
                        }
                    })
                }

                arrivalData.value = [
                    {
                        title: t('menu.mainWork.detail.log.peoAddress'), // 人员坐标
                        content: item.address===""?"无":item.address,
                    }, 
                    {
                        title: t('menu.mainWork.detail.log.distance'), // 距离电梯
                        content: workInfo.arrivalDis===""?"无":`${(workInfo.arrivalDis/1000)}KM`,
                    },
                    {
                        title: t('menu.archives.log.arrivalTime'), // 到场用时
                        content: `${arrivalUseTime.value}分钟`,
                    }, {
                        title: t('menu.archives.log.arrival.image'), // 现场图片
                        content: '',
                    }, {
                        title: t('menu.archives.log.arrival.video'), // 现场视频
                        content: '查看视频',
                    }, {
                        title: t('menu.mainWork.detail.log.workRecord'), // 工作记录
                        content: content===''?'无':content,
                    }
                ]

                
            }else if(item.operateType === '4'){
                finishUseTimeTop.value = differenceTime(alarmTime.value,item.operateTime)
                finishUseTime.value = differenceMinute(alarmTime.value,item.operateTime)
                finishTime.value = item.operateTime

                if(handleInfo.length > 0){
                    handleInfo.forEach(handle=>{
                        if(handle.handleType === 6){
                            if(handle.content){
                                const content = JSON.parse(handle.content)
                                if(content.signUrls.length === 2){
                                    mainSign1.value = content.signUrls[0].path
                                    mainSign2.value = content.signUrls[1].path
                                }
                            }
                        }
                    })
                }

                completeData.value = [
                    {
                        title: t('menu.archives.log.completeTime'), // 完成用时
                        content: `${finishUseTime.value}分钟`,
                    }, {
                        title: t('menu.archives.log.maintain.person.1'), // 维保员1
                        content: '',
                    }, {
                        title: t('menu.archives.log.maintain.person.2'), // 维保员2
                        content: '',
                    }
                ]
            }else if(item.operateType === '7'){
                unitTime.value = item.operateTime

                if(handleInfo.length > 0){
                    handleInfo.forEach(handle=>{
                        if(handle.handleType === 6){
                            if(handle.content){
                                const content = JSON.parse(handle.content)
                                if(content.signUrls.length === 1){
                                    unitSign.value = content.signUrls[0].path
                                }
                            }
                        }
                    })
                }

                unitData.value = [
                    {
                        title: t('menu.workOrder.detail.log.evaluator'), // 评价人员
                        content: item.operater,
                    }, {
                        title: t('menu.workOrder.detail.log.score'), // 评分
                        content: item.score,
                    }, {
                        title: t('menu.workOrder.detail.log.comments'), // 评语
                        content: item.operateContent,
                    }, {
                        title: t('menu.workOrder.detail.log.sign'), // 签名
                        content: '',
                    }
                ]
            }
        })
    }else {
        initColumns()
    }
}

const visible = ref(false);
// 维保工作表打开modal
const workSheetClick = () => {
    visible.value = true;
}

// 点击确定事件
const handleOk = () => {
    visible.value = false;
}

// 点击取消事件
const handleCancel = () => {
    visible.value = false;
}

interface TabItem {
    key: string;
    title: string;
}
const tabList = computed<TabItem[]>(() => {
	if(vtype.value===1){
		return [
		    {
		        key: '1',
		        title: t('menu.archives.log.view.tab.1'), // 轿厢
		    },
		    {
		        key: '2',
		        title: t('menu.archives.log.view.tab.2'), // 轿顶
		    },
		    {
		        key: '3',
		        title: t('menu.archives.log.view.tab.3'), // 机房
		    },
		    {
		        key: '4',
		        title: t('menu.archives.log.view.tab.4'), // 底坑
		    },
		]
	}
	return [
		{
			key: '1',
			title: t('menu.archives.log.view.tab.1'), // 轿厢
		},
		{
			key: '2',
			title: t('menu.archives.log.view.tab.2'), // 轿顶
		},
		{
			key: '3',
			title: t('menu.archives.log.view.tab.3'), // 机房
		},
		{
			key: '4',
			title: t('menu.archives.log.view.tab.4'), // 坑底
		},
		{
			key: '5',
			title: t('menu.archives.log.view.tab.5'), // 井道
		},
	]
	
});

const tabType = ref(1);
// 点击tab时触发
const tabClick = (type: any) => {
    if(handleRecord.value.length>0){
        renderData.value = handleRecord.value.filter(handleRecordInfo => { 
            handleRecordInfo.isNote = false;
            handleRecordInfo.isImages = false;
            handleRecordInfo.isVideo = false;
            if(handleRecordInfo.ext.note && handleRecordInfo.ext.note !== ''){
                handleRecordInfo.isNote = true;
            }
            if(handleRecordInfo.ext.content && handleRecordInfo.ext.content !== ''){
                let ext = handleRecordInfo.ext.content
                ext.forEach(element => {
                    if(element.type === 1 || element.type === '1'){
                        handleRecordInfo.isImages = true;
                    }

                    if(element.type === 2 || element.type === '2'){
                        handleRecordInfo.isVideo = true;
                    }
                });

            }
            return handleRecordInfo.position === type * 1
        })
    }
}

// 定义表格结构
const renderData = ref<QueryWorksheetParams[]>([]);
type Column = TableColumnData & { checked?: true };
const cloneColumns = ref<Column[]>([]);
const showColumns = ref<Column[]>([]);

// 定义表格列
const tableColumns = computed<TableColumnData[]>(() => [
    {
        title: t('menu.archives.log.view.content'), // 内容
        dataIndex: 'name',
        ellipsis: true,
        width:200
    },
    {
        title: t('menu.archives.log.view.require'), // 要求
        dataIndex: 'content',
        ellipsis: true,
        width:200
    },
    {
        title: t('menu.archives.log.view.state'), // 状态
        dataIndex: 'state',
        slotName: 'state',
        width:100
    },
    {
        title: t('menu.archives.log.view.note'), // 备注
        dataIndex: 'note',
        slotName: 'note',
        align: 'center',
        width:100
    },
    {
        title: t('menu.archives.log.view.photo'), // 照片
        dataIndex: 'photo',
        slotName: 'photo',
        align: 'center',
        width:100
    },
    {
        title: t('menu.archives.log.video'), // 视频
        dataIndex: 'video',
        slotName: 'video',
        align: 'center',
        width:100
    },
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

// 工作表图片预览
const recordImageVisible = ref(false)
const recordImageurls = ref([])
const xid = ref('')
const recordImage = (ext,itmeId) => {
    if(ext.content && ext.content !== ''){
        const content = ext.content
		if(content.length>0){
			if(xid.value !== itmeId){
				recordImageurls.value=[];
				content.forEach(info => {
				    if(info.type === 1 || info.type === '1'){
						xid.value =itmeId;
						recordImageurls.value.push(info.path)
				    }
				})
			}
			if(recordImageurls.value.length>0){
			    recordImageVisible.value = true
			}
		}
    }
}

// 工作表视频预览
const recordModelVisible = ref(false)
const recordModelurls = ref([])
const sid = ref('')
const recordModelOpen = (ext,itmeId) => {
    if(ext.content && ext.content !== ''){
        const content = ext.content
		if(content.length>0){
			if(sid.value !== itmeId){
				recordModelurls.value=[];
				content.forEach(info => {
				    if(info.type === 2 || info.type === '2'){
						sid.value =itmeId;
				        recordModelurls.value.push(info.path)
				    }
				})
			}
			if(recordModelurls.value.length>0){
			    recordModelVisible.value = true
			}
		}
    }
}
const handleCancel2 = () => {
    recordModelVisible.value = false;
}

// 工作表备注预览
const recordNoteVisible = ref(false)
const recordNote = ref('')
const recordNoteOpen = (ext) => {
    if(ext.note){
        if(ext.note !== ''){
            recordNote.value = ext.note
            recordNoteVisible.value = true
        }
    }else{
		recordNote.value =''
	}
}
const handleCancel3 = () => {
    recordNoteVisible.value = false;
}

defineExpose({ getWorkOrderDetail })
</script>

<style scoped lang='less'>
.header-image {
    background: #FFFFFF url(@/assets/images/rescue/log_header.png) no-repeat;
    height: 189px;
    background-size: 100% 100%;
    padding: 0 20px;
}
.log_icon{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 0px;
	width: 56px;
	height: 56px;
	background: rgba(246, 247, 251, 0.6);
	border: 1px solid #FFFFFF;
	border-radius: 100px;
	flex: none;
	order: 0;
	flex-grow: 0;
}
</style>
