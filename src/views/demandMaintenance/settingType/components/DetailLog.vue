<template>
    <div>
        <div class="header-image cu-flex">
            <div class="cu-fy cu-flex1">
                <!-- 接单用时 -->
                <img :src="logIcon1Pic" alt="">
                <div class="cu-mart12 cu-font12">{{ t('menu.mainWork.detail.log.receiveTime') }}</div>
                <div class="cu-fontWeight700 cu-font16">00:02:00</div>
            </div>
            <div class="cu-fy cu-flex1">
                <!-- 到场用时 -->
                <img :src="logIcon2Pic" alt="">
                <div class="cu-mart12 cu-font12">{{ t('menu.mainWork.detail.log.arrivalTime') }}</div>
                <div class="cu-fontWeight700 cu-font16">00:02:00</div>
            </div>
            <div class="cu-fy cu-flex1">
                <!-- 维保用时 -->
                <img :src="logIcon3Pic" alt="">
                <div class="cu-mart12 cu-font12">{{ t('menu.mainWork.detail.log.rescueTime') }}</div>
                <div class="cu-fontWeight700 cu-font16">00:02:00</div>
            </div>
        </div>
        <div class="cu-padlr24 cu-mart28 ">
            <div class="cu-fx-between-center">
                <!-- 维保时间 -->
                <div>
                    <div class="cu-link-vertical"></div>
                    <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ t('menu.mainWork.detail.log.alarmTime') }}</span>
                </div>
                <div class="cu-color-86909c">
                    2022-11-7 13:37:56
                </div>
            </div>
            <div class="cu-mart28">
                <!-- 接单时间 -->
                <div class="cu-fx-between-center">
                    <div>
                        <div class="cu-link-vertical"></div>
                        <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ t('menu.mainWork.detail.log.receiveMoment') }}</span>
                    </div>
                    <div class="cu-color-86909c">
                        2022-11-7 13:37:56
                    </div>
                </div>
            </div>
            <a-table :columns="columns" :data="receiveData" :pagination="false" :show-header="false"
                :bordered="{ cell: true }" :hoverable="false" class="cu-mart16">
                <template #content="{ record }">
                    <div class="cu-fx-n-center">
                        <!-- 救援人员 -->
                        <img v-if="record.title === $t('menu.mainWork.detail.log.rescuePerson')"
                            :src="phonePic" />
                        <!-- 救援电话 -->
                        <img v-else-if="record.title === $t('menu.mainWork.detail.log.rescuePhone')"
                            :src="phonePic" />
                        <!-- 接单用时 -->
                        <img v-else :src="phonePic" />
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                </template>
            </a-table>
            <div class="cu-mart28">
                <!-- 到场时间 -->
                <div class="cu-fx-between-center">
                    <div>
                        <div class="cu-link-vertical"></div>
                        <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.mainWork.detail.log.arrivalMoment') }}</span>
                    </div>
                    <div class="cu-color-86909c">
                        2022-11-7 13:37:56
                    </div>
                </div>
            </div>
            <a-table :columns="columns" :data="arrivalData" :pagination="false" :show-header="false"
                :bordered="{ cell: true }" :hoverable="false" class="cu-mart16">
                <template #content="{ record }">
                    <div v-if="record.title === $t('menu.mainWork.detail.log.arrivalTime')" class="cu-fx-n-center">
                        <!-- 到场用时 -->
                        <img :src="phonePic" />
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                    <div v-else-if="record.title === $t('menu.mainWork.detail.log.arrivalImage')"
                        class="cu-fx-n-center">
                        <!-- 现场图片 -->
                        <img :src="phonePic" />
                        <div class="cu-marlr4 cu-pointer cu-color-165DFF" @click="arrivalImageClick">{{ t('menu.mainWork.detail.log.view.image') }}</div>
                        <a-image-preview :src="record.content" v-model:visible="arrivalImageVisible" />
                    </div>
                    <div v-else-if="record.title === $t('menu.mainWork.detail.log.arrivalVideo')"
                        class="cu-fx-n-center">
                        <!-- 查看视频 -->
                        <img :src="phonePic" />
                        <!-- TODO:: 查看视频 -->
                        <div class="cu-marlr4">{{ t('menu.mainWork.detail.log.view.video') }}</div>
                    </div>
                    <div v-else class="cu-fx-n-center">
                        <!-- 备注 -->
                        <img :src="phonePic" />
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                </template>
            </a-table>
            <div class="cu-mart28">
                <!-- 使用单位评价 -->
                <div class="cu-fx-between-center">
                    <div>
                        <div class="cu-link-vertical"></div>
                        <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ t('menu.mainWork.detail.log.unit') }}</span>
                    </div>
                    <div class="cu-color-86909c">
                        2022-11-7 13:37:56
                    </div>
                </div>
            </div>
            <a-table :columns="columns" :data="unitData" :pagination="false" :show-header="false"
                :bordered="{ cell: true }" :hoverable="false" class="cu-mart16">
                <template #content="{ record }">
                    <div v-if="record.title === $t('menu.mainWork.detail.log.evaluator')" class="cu-fx-n-center">
                        <!-- 评价人员 -->
                        <img :src="phonePic" />
                        <div class="cu-marlr4">{{ record.content }}</div>
                    </div>
                    <div v-else-if="record.title === $t('menu.mainWork.detail.log.score')" class="cu-fx-n-center">
                        <!-- 评分 -->
                        <a-rate :model-value="record.content" readonly :allow-half="true" />
                    </div>
                    <div v-else-if="record.title === $t('menu.mainWork.detail.log.comments')" class="cu-fx-n-center">
                        <!-- 评语 -->
                        <img :src="phonePic" />
                        <div class="cu-marlr4">{{ t('menu.mainWork.detail.log.view.video') }}</div>
                    </div>
                    <div v-else class="cu-fx-n-center">
                        <!-- 签名 -->
                        <img :src="phonePic" />
                        <div class="cu-marlr4 cu-pointer cu-color-165DFF" @click="unitImageClick">{{ t('menu.mainWork.detail.log.view.image') }}</div>
                        <a-image-preview :src="record.content" v-model:visible="unitImageVisible" />
                    </div>
                </template>
            </a-table>
        </div>
    </div>
</template>

<script setup lang='ts'>
import phonePic from '@/assets/images/rescue/phone.png'
import logIcon3Pic from '@/assets/images/rescue/log-icon-3.png'
import logIcon2Pic from '@/assets/images/rescue/log-icon-2.png'
import logIcon1Pic from '@/assets/images/rescue/log-icon-1.png'
import { ref, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';

// 国际化
const { t } = useI18n();

const props = defineProps({
    id: {
        type: String,
        default() {
            return "";
        },
    }
});

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

// 接单时间数据
const receiveData = computed<TableColumnData[]>(() => [
    {
        title: t('menu.mainWork.detail.log.rescuePerson'), // 救援人员
        content: '周慧零',
    }, {
        title: t('menu.mainWork.detail.log.rescuePhone'), // 联系电话
        content: '184 9031 6877',
    }, {
        title: t('menu.mainWork.detail.log.receiveTime'), // 接单用时
        content: '2分钟',
    }
]);

// 到场时间数据
const arrivalData = computed<TableColumnData[]>(() => [
    {
        title: t('menu.mainWork.detail.log.arrivalTime'), // 到场用时
        content: '10分钟',
    }, {
        title: t('menu.mainWork.detail.log.arrivalImage'), // 到场图片
        content: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    }, {
        title: t('menu.mainWork.detail.log.arrivalVideo'), // 现场视频
        content: '查看视频',
    }, {
        title: t('menu.mainWork.detail.log.note'), // 备注
        content: '无',
    }
]);

// 到场时间 图片放缩
const arrivalImageVisible = ref(false)
const arrivalImageClick = () => {
    arrivalImageVisible.value = true;
};

// 使用单位评价数据
const unitData = computed<TableColumnData[]>(() => [
    {
        title: t('menu.mainWork.detail.log.evaluator'), // 评价人员
        content: '李利英',
    }, {
        title: t('menu.mainWork.detail.log.score'), // 评分
        content: 3.2,
    }, {
        title: t('menu.mainWork.detail.log.comments'), // 评语
        content: '啦啦啦啦',
    }, {
        title: t('menu.mainWork.detail.log.sign'), // 签名
        content: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    }
]);

// 使用单位 图片放缩
const unitImageVisible = ref(false)
const unitImageClick = () => {
    unitImageVisible.value = true;
};

</script>

<style scoped lang='less'>
.header-image {
    background: #FFFFFF url(@/assets/images/rescue/log_header.png) no-repeat;
    height: 189px;
    background-size: 100% 100%;
    padding: 0 20px;
}
</style>
