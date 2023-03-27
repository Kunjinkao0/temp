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
                <!-- 维修用时 -->
                <img :src="logIcon3Pic" alt="" class="log_icon">
                <div class="cu-mart12 cu-font12">{{ t('menu.repair.detail.log.repairDate') }}</div>
                <div class="cu-fontWeight700 cu-font16">{{finishUseTimeTop}}</div>
            </div>
        </div>
        <div class="cu-padlr24 cu-mart28 cu-marb16">
            <div class="cu-fx-between-center">
                <!-- 告警时间 -->
                <div>
                    <div class="cu-link-vertical"></div>
                    <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ t('menu.repair.detail.log.alarmRemind') }}</span>
                </div>
                <div class="cu-color-86909c">
                    {{alarmTime}}
                </div>
            </div>
            <a-table :columns="columns" :data="alarmData" :pagination="false" :show-header="false"
                :bordered="{ cell: true }" :hoverable="false" class="cu-mart16">
                <template #content="{ record }">
                    <div v-if="record.title === $t('menu.archives.detail.log.uploadRepairPeo')" class="cu-fx-n-center">
                        <!-- 通知人员 -->
                        <img :src="ipcameraPic" />
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                    <div v-if="record.title === $t('menu.archives.log.maintain.phone')" class="cu-fx-n-center">
                        <!-- 联系电话 -->
                        <img :src="telphonePic" />
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                    <div v-if="record.title === $t('menu.archives.detail.log.uploadRepairVideo')" class="cu-fx-n-center">
                        <!-- 报修视频 -->
                        <img :src="videoPic" />
                        <!-- TODO:: 查看视频 -->
                        <div class="cu-marlr4 cu-pointer cu-color-165DFF" @click="repairVideoClick">{{ t('menu.archives.log.view.video') }}</div>
                    </div>
                    <div v-if="record.title === $t('menu.archives.detail.log.uploadRepairLuyin')" class="cu-fx-n-center">
                        <!-- 报修录音 -->
                        <img :src="photoPic" />
                        <div class="cu-marlr4 cu-pointer cu-color-165DFF" >{{
                                $t('menu.archives.log.view.luyin')
                        }}</div>
                    </div>
                </template>
            </a-table>
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
                    <div v-if="record.title === $t('menu.archives.detail.log.repairPeo')" class="cu-fx-n-center">
                        <!-- 维修员 -->
                        <img :src="ipcameraPic" />
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                    <div v-if="record.title === $t('menu.archives.log.maintain.phone')" class="cu-fx-n-center">
                        <!-- 联系电话 -->
                        <img :src="telphonePic" />
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                    <div v-if="record.title === $t('menu.archives.log.receiveTime')" class="cu-fx-n-center">
                        <!-- 接单用时 -->
                        <img :src="timePic" />
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
                    <div v-if="record.title === $t('menu.mainWork.detail.log.workRecord')" class="cu-fx-n-center">
                        <!-- 工作记录 -->
                        <img :src="recordPic" />
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
                <!-- 维修信息 -->
                <div class="cu-fx-between-center">
                    <div>
                        <div class="cu-link-vertical"></div>
                        <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ t('menu.archives.detail.log.repairInfo')
                        }}</span>
                    </div>
                    <div class="cu-color-86909c">
                        <!-- 2022-11-7 13:37:56 没有维修信息时间 --LGD -->
                    </div>
                </div>
            </div>
            <a-table :columns="columns" :data="repairData" :pagination="false" :show-header="false"
                :bordered="{ cell: true }" :hoverable="false" class="cu-mart16">
                <template #content="{ record }">
                    <div class="cu-fx-n-center">
                        <div class="cu-marlr4">{{ record.content }}</div>
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
                </template>
            </a-table>
        </div>
        <a-modal class="maintainLogModal" width="960px" v-model:visible="visible" @cancel="handleCancel" title="报修视频"
            :closable="false">
            <div class="cu-fx cu-pad20">
                <video controls width="200"><source type="video/mp4"></video>
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
import logIcon3Pic from '@/assets/images/maintenantics/log-icon-3.png'
import logIcon2Pic from '@/assets/images/maintenantics/log-icon-2.png'
import logIcon1Pic from '@/assets/images/maintenantics/log-icon-1.png'
import icon6 from '@/assets/images/archives/icon-6.png'
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import { differenceMinute,differenceTime } from '@/utils/dateuUils';

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

const alarmData = ref([])

// 接单时间数据
const receiveData = ref([]);

// 到场时间数据
const arrivalData = ref([]);

const repairData = ref([])

// 完成时间数据
const completeData = ref([]);

// 使用单位评价数据
const unitData = ref([]);

// 维保工作表
const workSheetData = computed<TableColumnData[]>(() => [
    {
        title: t('menu.archives.log.worksheet'), // 工作表
        content: '半月维保',
    }
]);

const initColumns = () => {

    receiveData.value = [
        {
            title: t('menu.archives.detail.log.repairPeo'), // 维修人员
            content: '',
        }, 
        {
            title: t('menu.archives.log.maintain.phone'), // 联系电话
            content: '',
        }, 
        {
            title: t('menu.archives.log.receiveTime'), // 接单用时
            content: '',
        },
        {
            title: t('menu.mainWork.detail.log.peoAddress'), // 人员坐标
            content: '',
        }, 
        {
            title: t('menu.mainWork.detail.log.distance'), // 距离电梯
            content: '',
        }
    ]

    arrivalData.value = [
        {
            title: t('menu.archives.log.arrivalTime'), // 到场用时
            content: '',
        }, 
        {
            title: t('menu.archives.log.arrival.image'), // 现场图片
            content: '',
        }, 
        {
            title: t('menu.archives.log.arrival.video'), // 现场视频
            content: '',
        }, 
        {
            title: t('menu.mainWork.detail.log.workRecord'), // 工作记录
            content: '',
        }
    ]

    completeData.value = [
        {
            title: t('menu.archives.log.completeTime'), // 完成用时
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
        }
    ]
}

onMounted(() => {
    initColumns();
})

const getWorkOrderDetail = async () => {
    const workInfo = props.workData.workInfo
    const operateInfo = props.workData.operateInfo
    const handleInfo = props.workData.handleInfo
    const extInfo = workInfo.ext

    alarmTime.value = workInfo.createTime
    alarmData.value = [
        {
            title: t('menu.archives.detail.log.uploadRepairPeo'), // 报修人员
            content: workInfo.creator
        },{
            title: t('menu.archives.log.maintain.phone'), // 联系电话
            content: workInfo.creatorPhone
        }
    ]

    repairData.value = [
        {
            title: t('menu.archives.detail.log.faultType'), // 故障类型
            content: extInfo?extInfo.faultType:'',
        }, 
        {
            title: t('menu.archives.detail.log.faultCase'), // 故障原因
            content: extInfo?extInfo.faultReason:'',
        }, 
        {
            title: t('menu.archives.detail.log.eleState'), // 电梯状态
            content: extInfo?extInfo.eleState:'',
        }, 
    ]

    if(operateInfo.length > 0){
        operateInfo.forEach(item=>{
            if(item.operateType === '2'){
                receiveUseTimeTop.value = differenceTime(alarmTime.value,item.operateTime)
                receiveUseTime.value = differenceMinute(alarmTime.value,item.operateTime)
                receiveMoment.value = item.operateTime
                receiveData.value = [
                    {
                        title: t('menu.archives.detail.log.repairPeo'), // 维修人员
                        content: item.operater,
                    }, 
                    {
                        title: t('menu.archives.log.maintain.phone'), // 联系电话
                        content: workInfo.receiverPhone,
                    }, 
                    {
                        title: t('menu.archives.log.receiveTime'), // 接单用时
                        content: `${receiveUseTime.value}分钟`,
                    },
                    {
                        title: t('menu.mainWork.detail.log.peoAddress'), // 人员坐标
                        content: item.address,
                    }, 
                    {
                        title: t('menu.mainWork.detail.log.distance'), // 距离电梯
                        content: `${(workInfo.receiveDis/1000)}KM`,
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
                        title: t('menu.archives.log.arrivalTime'), // 到场用时
                        content: `${arrivalUseTime.value}分钟`,
                    }, 
                    {
                        title: t('menu.archives.log.arrival.image'), // 现场图片
                        content: '',
                    }, 
                    {
                        title: t('menu.archives.log.arrival.video'), // 现场视频
                        content: '查看视频',
                    }, 
                    {
                        title: t('menu.mainWork.detail.log.workRecord'), // 工作记录
                        content: content===''?'无':content,
                    }
                ]
            }else if(item.operateType === '4'){
                finishUseTimeTop.value = differenceTime(alarmTime.value,item.operateTime)
                finishUseTime.value = differenceMinute(alarmTime.value,item.operateTime)
                finishTime.value = item.operateTime
                completeData.value = [
                    {
                        title: t('menu.archives.log.completeTime'), // 完成用时
                        content: `${finishUseTime.value}分钟`,
                    }
                ]
            }else if(item.operateType === '7'){
                unitTime.value = item.operateTime
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
                    }
                ]
            }
        })
    }else{
        initColumns()
    }
}

const visible = ref(false);
// 报修视频打开modal
const repairVideoClick = () => {
    visible.value = true;
}
// 点击取消事件
const handleCancel = () => {
    visible.value = false;
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
