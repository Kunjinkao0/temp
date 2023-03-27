<template>
    <div>
        <div class="header-image cu-flex">
            <div class="cu-fy cu-flex1">
                <!-- 接单用时 -->
                <img :src="logIcon1Pic" alt="" class="log_icon">
                <div class="cu-mart12 cu-font12">{{ t('menu.workOrder.detail.log.receiveTime') }}</div>
                <div class="cu-fontWeight700 cu-font16"> {{receiveUseTimeTop}} </div>
            </div>
            <div class="cu-fy cu-flex1">
                <!-- 到场用时 -->
                <img :src="logIcon2Pic" alt="" class="log_icon">
                <div class="cu-mart12 cu-font12">{{ t('menu.workOrder.detail.log.arrivalTime') }}</div>
                <div class="cu-fontWeight700 cu-font16"> {{arrivalUseTimeTop}} </div>
            </div>
            <div class="cu-fy cu-flex1">
                <!-- 救援用时 -->
                <img :src="logIcon3Pic" alt="" class="log_icon">
                <div class="cu-mart12 cu-font12">{{ t('menu.workOrder.detail.log.rescueTime') }}</div>
                <div class="cu-fontWeight700 cu-font16"> {{finishUseTimeTop}} </div>
            </div>
        </div>
        <div class="cu-padlr24 cu-mart28 cu-marb16">
            <div class="cu-fx-between-center">
                <!-- 告警时间 -->
                <div>
                    <div class="cu-link-vertical"></div>
                    <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ t('menu.workOrder.detail.log.alarmTime') }}</span>
                </div>
                <div class="cu-color-86909c">
                    {{alarmTime}}
                </div>
            </div>
            <a-table :columns="columns" :data="alarmData" :pagination="false" :show-header="false"
                :bordered="{ cell: true }" :hoverable="false" class="cu-mart16">
                <template #content="{ record }">
                    <div class="cu-fx-n-center">
                        <!-- 报警人员 -->
                        <img v-if="record.title === $t('menu.workOrder.detail.log.alarmPerson')"
                            :src="ipcameraPic" />
                        <!-- 报警电话 -->
                        <img v-else-if="record.title === $t('menu.workOrder.detail.log.alarmPhone')"
                            :src="telphonePic" />
                        <!-- 报警视频 -->
						<div v-else-if="record.title === $t('menu.workOrder.detail.log.alarmVideo')" class="cu-fx-n-center">
							<video controls :src="faultVideoUrl" style="width: 200px;height: 133px;"><source type="video/mp4"></video>
						</div>
                        <!-- 报警录音 -->
                        <div class="cu-marlr4" v-else-if="record.title === $t('menu.workOrder.detail.log.alarmSounRecord')">
                            <a-space direction="vertical" :size="10" fill>
                                <div v-for="audioUrl in faultAudio" :key="audioUrl">
                                    <audio controls class="audio-style" :src="audioUrl"> <source/></audio>
                                </div>
                            </a-space>
                        </div>
                        <div class="cu-marlr4" v-else>{{ record.content }}</div>
                    </div>
                </template>
            </a-table>
            <div class="cu-mart28" v-if="isFalse === 1">
                <!-- 接单时间 -->
                <div class="cu-fx-between-center">
                    <div>
                        <div class="cu-link-vertical"></div>
                        <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ t('menu.workOrder.detail.log.receiveMoment') }}</span>
                    </div>
                    <div class="cu-color-86909c">
                        {{receiveMoment}}
                    </div>
                </div>
            </div>
            <a-table v-if="isFalse === 1" :columns="columns" :data="receiveData" :pagination="false" :show-header="false"
                :bordered="{ cell: true }" :hoverable="false" class="cu-mart16">
                <template #content="{ record }">
                    <div class="cu-fx-n-center">
                        <!-- 救援人员 -->
                        <img v-if="record.title === $t('menu.workOrder.detail.log.rescuePerson')"
                            :src="ipcameraPic" />
                        <!-- 救援电话 -->
                        <img v-else-if="record.title === $t('menu.workOrder.detail.log.rescuePhone')"
                            :src="telphonePic" />
                        <!-- 接单用时 -->
                        <img v-else-if="record.title === $t('menu.workOrder.detail.log.receiveTime')"
                            :src="timePic" />
                        <!-- 人员坐标 -->
                        <img v-else-if="record.title === $t('menu.workOrder.detail.log.peopleAddress')"
                            :src="addressPic" />
                        <!-- 距离电梯 -->
                        <img v-else-if="record.title === $t('menu.workOrder.detail.log.distance')"
                            :src="distancePic"/>
                        <!-- 工作记录 -->
                        <img v-else :src="recordPic" />
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                </template>
            </a-table>
            <div class="cu-mart28" v-if="isFalse === 1">
                <!-- 到场时间 -->
                <div class="cu-fx-between-center">
                    <div>
                        <div class="cu-link-vertical"></div>
                        <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.workOrder.detail.log.arrivalMoment') }}</span>
                    </div>
                    <div class="cu-color-86909c">
                        {{arrivalMoment}}
                    </div>
                </div>
            </div>
            <a-table v-if="isFalse === 1" :columns="columns" :data="arrivalData" :pagination="false" :show-header="false"
                :bordered="{ cell: true }" :hoverable="false" class="cu-mart16">
                <template #content="{ record }">
                    <div v-if="record.title === $t('menu.workOrder.detail.log.arrivalTime')" class="cu-fx-n-center">
                        <!-- 到场用时 -->
                        <img :src="timePic" />
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                    <div v-else-if="record.title === $t('menu.workOrder.detail.log.arrivalImage')" class="cu-fx-n-center">
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
                    <div v-else-if="record.title === $t('menu.workOrder.detail.log.arrivalVideo')"
                        class="cu-fx-n-center">
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
                    <div v-else class="cu-fx-n-center">
                        <!-- 工作记录 -->
                        <img :src="recordPic" />
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                </template>
            </a-table>
            <div class="cu-mart28" v-if="isFalse === 1">
                <!-- 救援记录 -->
                <div class="cu-fx-between-center">
                    <div>
                        <div class="cu-link-vertical"></div>
                        <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ t('menu.workOrder.detail.log.rescueRecord') }}</span>
                    </div>
                    <div class="cu-color-86909c">
                        {{rescueRecordTime}}
                    </div>
                </div>
            </div>
            <a-table v-if="isFalse === 1" :columns="columns" :data="rescueRecord" :pagination="false" :show-header="false"
                :bordered="{ cell: true }" :hoverable="false" class="cu-mart16">
                <template #content="{ record }">
                    <div v-if="record.title === $t('menu.workOrder.detail.log.falutType')" class="cu-fx-n-center">
                        <!-- 故障类型 -->
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                    <div v-else-if="record.title === $t('menu.workOrder.detail.log.falutCause')" class="cu-fx-n-center">
                        <!-- 故障原因 -->
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                    <div v-else-if="record.title === $t('menu.workOrder.detail.log.otherCause')" class="cu-fx-n-center">
                        <!-- 其他原因 -->
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                    <div v-else-if="record.title === $t('menu.workOrder.detail.log.note')" class="cu-fx-n-center">
                        <!-- 备注信息 -->
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                    <div v-else-if="record.title === $t('menu.workOrder.detail.log.trappedPeo')" class="cu-fx-n-center">
                        <!-- 被困人员 -->
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                    <div v-else class="cu-fx-n-center">
                        <!-- 伤亡情况 -->
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                </template>
            </a-table>

            <div class="cu-mart28" v-if="isFalse === 1">
                <!-- 完成时间 -->
                <div class="cu-fx-between-center">
                    <div>
                        <div class="cu-link-vertical"></div>
                        <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ t('menu.workOrder.detail.log.finish') }}</span>
                    </div>
                    <div class="cu-color-86909c">
                        {{finishTime}}
                    </div>
                </div>
            </div>
            <a-table v-if="isFalse === 1" :columns="columns" :data="finishData" :pagination="false" :show-header="false"
                :bordered="{ cell: true }" :hoverable="false" class="cu-mart16">
                <template #content="{ record }">
                    <div v-if="record.title === $t('menu.workOrder.detail.log.finishTime')" class="cu-fx-n-center">
                        <!-- 完成用时 -->
                        <img :src="timePic" />
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                    <div v-else-if="record.title === $t('menu.workOrder.detail.log.finishImage')" class="cu-fx-n-center">
                        <!-- 现场图片 -->
                        <img :src="photoPic" />
                        <div class="cu-marlr4 cu-pointer cu-color-165DFF" @click="unitImageClick">{{ t('menu.workOrder.detail.log.view.image') }}</div>
                        <a-image-preview :src="record.content" v-model:visible="unitImageVisible" />
                    </div>
                    <div v-else-if="record.title === $t('menu.workOrder.detail.log.finishVideo')" class="cu-fx-n-center">
                        <!-- 现场视频 -->
                        <img :src="videoPic" />
                        <div class="cu-marlr4">{{ t('menu.workOrder.detail.log.view.video') }}</div>
                    </div>
                    <div v-else class="cu-fx-n-center">
                        <!-- 工作记录 -->
                        <img :src="recordPic" />
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                </template>
            </a-table>

            <div class="cu-mart28" v-if="isFalse === 2">
                <!-- 误报时间 -->
                <div class="cu-fx-between-center">
                    <div>
                        <div class="cu-link-vertical"></div>
                        <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ t('menu.workOrder.detail.log.falseAlarmTime') }}</span>
                    </div>
                    <div class="cu-color-86909c">
                        {{falseAlarmTime}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref, computed, onMounted } from 'vue';
import ipcameraPic from '@/assets/images/repair/ipcamera.png';
import telphonePic from '@/assets/images/repair/telphone.png';
import addressPic from '@/assets/images/repair/address.png';
import distancePic from '@/assets/images/repair/distance.png';
import photoPic from '@/assets/images/repair/photo.png';
import recordPic from '@/assets/images/repair/record.png';
import sounRecordPic from '@/assets/images/repair/soun-record.png';
import timePic from '@/assets/images/repair/time.png';
import videoPic from '@/assets/images/repair/video.png';
import logIcon3Pic from '@/assets/images/maintenantics/log-icon-3.png'
import logIcon2Pic from '@/assets/images/maintenantics/log-icon-1.png'
import logIcon1Pic from '@/assets/images/maintenantics/log-icon-2.png'
import { getFaultReasion,getFaultAnalysis } from '@/utils/common';
import { getEleWorkCallHistory } from '@/api/rescue/workOrder'
import { differenceMinute,differenceTime } from '@/utils/dateuUils';
import { useI18n } from 'vue-i18n';

// 国际化
const { t } = useI18n();

const props = defineProps(['workData','faultVideo']);

// 故障视频
const faultVideoUrl = ref('')

const audioRef = ref()

// 故障录音
const faultAudio = ref([])

const alarmTime = ref('')
const receiveMoment = ref('')
const arrivalMoment = ref('')
const rescueRecordTime = ref('')
const finishTime = ref('')
const falseAlarmTime = ref('')

// 到场图片
const arrivalImages = ref([])

// 到场视频
const arrivalVideos = ref([])

const isFalse = ref(2) // 是否是误报 1.否 2.是

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



// 告警数据
const alarmData = ref([]);

// 接单时间数据
const receiveData = ref([]);

// 到场时间数据
const arrivalData = ref([]);

// 救援记录数据
const rescueRecord = ref([])


// 使用单位评价数据
const finishData = ref([]);

const receiveUseTime = ref('')
const arrivalUseTime = ref('')
const finishUseTime = ref('')
const receiveUseTimeTop = ref('00:00:00')
const arrivalUseTimeTop = ref('00:00:00')
const finishUseTimeTop = ref('00:00:00')

const initColumns = () => {
    receiveData.value = [{
        title: t('menu.workOrder.detail.log.rescuePerson'), // 救援人员
        content: ''
    }, {
        title: t('menu.workOrder.detail.log.rescuePhone'), // 联系电话
        content: ''
    }, {
        title: t('menu.workOrder.detail.log.peopleAddress'), // 人员坐标
        content: ''
    }, {
        title: t('menu.workOrder.detail.log.distance'), // 距离电梯
        content: ''
    }, {
        title: t('menu.workOrder.detail.log.receiveTime'), // 接单用时
        content: ''
    }]

    arrivalData.value = [{
        title: t('menu.workOrder.detail.log.arrivalTime'), // 到场用时
        content: '',
    }, {
        title: t('menu.workOrder.detail.log.arrivalImage'), // 到场图片
        content: '',
    }, {
        title: t('menu.workOrder.detail.log.arrivalVideo'), // 现场视频
        content: '查看视频',
    }, {
        title: t('menu.workOrder.detail.log.workRecord'), // 备注
        content: ''
    }]

    finishData.value = [{
        title: t('menu.workOrder.detail.log.finishTime'), // 完成用时
        content: '',
    }]
}

onMounted(() => {
    initColumns()
})

// 救援、维修、维保日志详情
const getWorkOrderDetail = async () => {
    const workInfo = props.workData.workInfo
    const operateInfo = props.workData.operateInfo
    const handleInfo = props.workData.handleInfo
    faultVideoUrl.value = props.faultVideo
    isFalse.value = workInfo.isFalse;
	let faultReasonContent =getFaultReasion(workInfo.faultReason);
	
	let reasonAnalysis =workInfo.faultAnalysis;
	let reasonAnalysisContent =getFaultAnalysis(Number(reasonAnalysis.slice(1)));
    if(workInfo.thirdEventId && workInfo.thirdEventId !== ''){
        eleWorkCallHistory(workInfo.thirdEventId)
    }

    alarmTime.value = workInfo.createTime
    alarmData.value = [
        {
            title: t('menu.workOrder.detail.log.alarmPerson'), // 报警人员
            content: workInfo.creator
        }, {
            title: t('menu.workOrder.detail.log.alarmPhone'), // 报警电话
            content: workInfo.creatorPhone
        }, {
            title: t('menu.workOrder.detail.log.alarmVideo'), // 报警视频
            content: ''     // 不知道是啥
        }, {
            title: t('menu.workOrder.detail.log.alarmSounRecord'), // 报警录音
            content: ''    // 不知道是啥
        }
    ]

    if(isFalse.value === 2){
        falseAlarmTime.value = alarmTime.value
    }

    rescueRecord.value = [
        {
            title: t('menu.workOrder.detail.log.falutType'), // 故障类型
            content: faultReasonContent
        }, {
            title: t('menu.workOrder.detail.log.falutCause'), // 故障原因
            content: reasonAnalysisContent
        }, {
            title: t('menu.workOrder.detail.log.otherCause'), // 其他原因
            content: workInfo.note
        }, {
            title: t('menu.workOrder.detail.log.note'), // 备注信息
            content: workInfo.deathNum
        }, {
            title: t('menu.workOrder.detail.log.trappedPeo'), // 被困人员
            content: workInfo.trappedNum
        }, {
            title: t('menu.workOrder.detail.log.casualties'), // 伤亡情况
            content: workInfo.injuredNum
        }
    ]

    if(operateInfo.length > 0){
        operateInfo.forEach(item=>{
            if(item.operateType === '2'){
                receiveUseTimeTop.value = differenceTime(alarmTime.value,item.operateTime)
                receiveUseTime.value = differenceMinute(alarmTime.value,item.operateTime)
                receiveMoment.value = item.operateTime
                receiveData.value = [
                    {
                        title: t('menu.workOrder.detail.log.rescuePerson'), // 救援人员
                        content: item.operater
                    }, {
                        title: t('menu.workOrder.detail.log.rescuePhone'), // 联系电话
                        content: workInfo.receiverPhone
                    }, {
                        title: t('menu.workOrder.detail.log.peopleAddress'), // 人员坐标
                        content: item.address===""?"无":item.address,
                    }, {
                        title: t('menu.workOrder.detail.log.distance'), // 距离电梯
                        content: workInfo.arrivalDis===""?"无":`${(workInfo.arrivalDis/1000)}KM`,
                    }, {
                        title: t('menu.workOrder.detail.log.receiveTime'), // 接单用时
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
                            arrivalImages.value.push(handle.content)
                        }else if(handle.handleType === 3){
                            arrivalVideos.value.push(handle.content)
                        }else if(handle.handleType === 4){
                            content = handle.content
                        }
                    })
                }

                arrivalData.value = [
                    {
                        title: t('menu.workOrder.detail.log.arrivalTime'), // 到场用时
                        content: `${arrivalUseTime.value}分钟`,
                    }, {
                        title: t('menu.workOrder.detail.log.arrivalImage'), // 到场图片
                        content: '',
                    }, {
                        title: t('menu.workOrder.detail.log.arrivalVideo'), // 现场视频
                        content: '查看视频',
                    }, {
                        title: t('menu.workOrder.detail.log.workRecord'), // 备注
                        content: content===''?'无':content,
                    }
                ]

                
            }else if(item.operateType === '4'){
                finishUseTimeTop.value = differenceTime(alarmTime.value,item.operateTime)
                finishUseTime.value = differenceMinute(alarmTime.value,item.operateTime)
                finishTime.value = item.operateTime
                finishData.value = [
                    {
                        title: t('menu.workOrder.detail.log.finishTime'), // 完成用时
                        content: `${finishUseTime.value}分钟`,
                    }, 
                ]
            }
        })
    }else {
        initColumns()
    }
}

const eleWorkCallHistory = async (taskId) => {
    const { data: callHistoryData } = await getEleWorkCallHistory({taskId});
    faultAudio.value = []
    if(callHistoryData.length>0){
        callHistoryData.forEach(info => {
            if(info.type === 3){
                const host = import.meta.env.VITE_DEV_API.replace('/v1.2/api', "")
                faultAudio.value.push(`${host}${info.content}`)
            }
        })
    }

    audioRef.value.src = faultAudio.value[0]
}

// 使用单位 图片放缩
const unitImageVisible = ref(false)
const unitImageClick = () => {
    unitImageVisible.value = true;
};

defineExpose({ getWorkOrderDetail })

</script>

<style scoped lang='less'>
.header-image {
    background: #FFFFFF url(@/assets/images/rescue/log_header.png) no-repeat;
    height: 189px;
    background-size: 100% 100%;
    padding: 0 20px;
}

.audio-style{
    width: 190px;
    height: 30px;
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
