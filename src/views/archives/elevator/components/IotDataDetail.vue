<template>
    <div class="cu-marlr24 cu-marb16">
        <!-- 故障信息 -->
        <div class="cu-mart28">
            <div class="cu-link-vertical"></div>
            <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.archives.fault.title')
            }}</span>
        </div>
        <a-table :columns="columns" :data="runData" :pagination="false" :show-header="false" :bordered="{ cell: true }"
            :hoverable="false" class="cu-mart16">
            <template #content="{ record }">
                <div v-if="record.title === $t('menu.archives.faultState')">
                    {{ $t(`menu.archives.state.${record.content}`) }}
                </div>
                <div v-else>
                    <div>{{ record.content }}</div>
                </div>
            </template>
        </a-table>
        <!-- 视频 -->
        <div class="cu-mart28">
            <div class="cu-link-vertical"></div>
            <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.archives.video')
            }}</span>
        </div>
        <video v-if="props.videoUrl" controls width="352" height="198" class="cu-mart12">
            <source ref="videoRef" type="video/mp4">
        </video>
        <!-- 图片 -->
        <div class="cu-mart28">
            <div class="cu-link-vertical"></div>
            <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.archives.image')
            }}</span>
        </div>
        <a-image v-if="props.photoUrl" :src="props.photoUrl" width="352" height="198" class="cu-mart12" />
        <!-- 波形 -->
        <div class="cu-mart28">
            <div class="cu-link-vertical"></div>
            <span class="cu-font14 cu-fontWeight600 cu-marl4">X{{ $t('menu.archives.wave')
            }}</span>
        </div>
        <div style="text-align: center;">
            <!-- x波形 -->
            <!-- <a-button type="primary">{{ $t('menu.archives.x.wave') }}</a-button> -->
            <IotDataDetailEchars :xEchartData="xXData" :yEchartData="xYData" />
        </div>
		<div class="cu-mart28">
		    <div class="cu-link-vertical"></div>
		    <span class="cu-font14 cu-fontWeight600 cu-marl4">Y{{ $t('menu.archives.wave')
		    }}</span>
		</div>
        <div style="text-align: center;" class="cu-martb16">
            <!-- y波形 -->
            <!-- <a-button type="primary">{{ $t('menu.archives.y.wave') }}</a-button> -->
            <IotDataDetailEchars :xEchartData="yXData" :yEchartData="yYData" />
        </div>
		<div class="cu-mart28">
		    <div class="cu-link-vertical"></div>
		    <span class="cu-font14 cu-fontWeight600 cu-marl4">Z{{ $t('menu.archives.wave')
		    }}</span>
		</div>
        <div style="text-align: center;">
            <!-- z波形 -->
            <!-- <a-button type="primary">{{ $t('menu.archives.z.wave') }}</a-button> -->
            <IotDataDetailEchars :xEchartData="zXData" :yEchartData="zYData" />
        </div>
        <!-- <a-table :columns="columns" :data="detailData" :pagination="false" :show-header="false"
            :bordered="{ cell: true }" :hoverable="false" class="cu-mart16" /> -->
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, computed, onMounted } from 'vue';
import { getFaultResource,getFaultReasion,getFaultAnalysis } from '@/utils/common';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import { getEleFaultDetail } from '@/api/fault/fault';
import { getEleFaultWaveByArchives } from '@/api/archives/elevator';
import { useI18n } from 'vue-i18n';
import IotDataDetailEchars from './IotDataDetailEchars.vue'

// 国际化
const { t } = useI18n();

const videoRef = ref();
const props = defineProps({
    faultId: {
        type: String,
        default() {
            return "";
        },
    },
    faultCode: {
        type: String,
        default() {
            return "";
        },
    },
    devCode: {
        type: String,
        default() {
            return "";
        },
    },
    createTime: {
        type: String,
        default() {
            return "";
        },
    },
    photoUrl: {
        type: String,
        default() {
            return "";
        },
    },
    videoUrl: {
        type: String,
        default() {
            return "";
        },
    }
});

onMounted(() => {
    getDetail();
    getWaveInfo();

    if (props.videoUrl) {
        videoRef.value.src = props.videoUrl;
    }
})

const xXData = reactive([]);
const xYData = reactive([]);
const yXData = reactive([]);
const yYData = reactive([]);
const zXData = reactive([]);
const zYData = reactive([]);
let xResult = ref("");
let yResult = ref("");
let zResult = ref("");
// 加载波形数据
const getWaveInfo = async () => {
	const waveParams = {
        "devCode": props.devCode,
        "createTime": props.createTime,
        "faultCode": props.faultCode
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
    loadWave("1", xResult.value);
    loadWave("2", yResult.value);
    loadWave("3", zResult.value);
}

const loadWave = (type, data) => {
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

    if (type === "1") { // x波形
        xXData.length = 0;
        xYData.length = 0;
        xXData.push(...listName);
        xYData.push(...listValue);
    } else if (type === "2") { // y波形
        yXData.length = 0;
        yYData.length = 0;
        yXData.push(...listName);
        yYData.push(...listValue);
    } else if (type === "3") { // z波形
        zXData.length = 0;
        zYData.length = 0;
        zXData.push(...listName);
        zYData.push(...listValue);
    }
}


// 获取电梯故障详情
const getDetail = async () => {
    const params = {
        faultId: props.faultId
    }

    const { data } = await getEleFaultDetail(params);
    buildRunInfo(data);
}


// 运行信息
const runData = reactive([]);
const buildRunInfo = (data) => {
	let resourceContent =getFaultResource(data.resource);
	let faultReasonContent =getFaultReasion(data.faultReason);
	
	let reasonAnalysis =data.reasonAnalysis;
	let reasonAnalysisContent =getFaultAnalysis(Number(reasonAnalysis.slice(1)));
    runData.length = 0;
    runData.push(...[{
        title: t('menu.archives.elevatorName'), // 电梯名称
        content: data.elevatorName,
    }, {
        title: t('menu.archives.faultName'), // 故障名称
        content: data.faultName,
    }, {
        title: t('menu.archives.clientCode'), // 终端编号
        content: data.clientCode,
    }, {
        title: t('menu.archives.happenTime'), // 发生时间
        content: data.createTime,
    }, {
        title: t('menu.archives.endTime'), // 恢复时间
        content: data.recoverTime,
    }, {
        title: t('menu.archives.elevatorFloor'), // 故障楼层
        content: data.elevatorFloor,
    }, {
        title: t('menu.archives.faultState'), // 故障状态
        content: data.state,
    }, {
        title: t('menu.archives.confirmUserName'), // 确认人
        content: data.confirmUserName,
    }, {
        title: t('menu.archives.resource'), // 任务来源
        content: resourceContent,
    }, {
        title: t('menu.archives.faultReason'), // 故障原因
        content: faultReasonContent,
    }, {
        title: t('menu.archives.reasonAnalysis'), // 原因分析
        content: reasonAnalysisContent,
    }]);
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

// 详细信息 onenet时间 数据上报时间 创建时间等
const detailData = computed<TableColumnData[]>(() => [
    {
        title: t('menu.archives.onenetTime'), // onenet时间 
        content: '2022-11-7 16:39:30',
    }, {
        title: t('menu.archives.reportTime'), // 数据上报时间
        content: '2022-11-7 16:39:30',
    }, {
        title: t('menu.archives.createTime'), // 创建时间
        content: '2022-11-7 16:39:30',
    }
]);

</script>

<style scoped lang='less'>

</style>
