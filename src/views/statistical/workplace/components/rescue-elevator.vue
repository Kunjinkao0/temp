<template>
    <a-card
        class="general-card"
        :header-style="{ paddingBottom: '0' }"
        :body-style="{ padding: '20px' }"
    >
        <template #title>
            <span class="cu-font16 cu-fontWeight600">{{
                $t('workplace.rescueElevator')
            }}</span>
        </template>
        <template #extra>
            <a-space size="medium">
                <span class="cu-font12 cu-color-1D2129-26">{{
                    $t('workplace.growth')
                }}</span>
                <a-space>
                    <div v-if="(data.currResNum >= data.lastResNum)" class="cu-font12 cu-color-F53F3F cu-bgcolor-F98981-01 cu-radius50 cu-div-padding5">
                        <icon-caret-up class="up-icon" />
                        <span>{{(data.currResNum-data.lastResNum)}}</span>
                    </div>
                    <div v-else class="cu-font12 cu-color-00B42A cu-bgcolor-00B42A-01 cu-radius50 cu-div-padding5">
                        <icon-caret-down class="down-icon" />
                        <span>{{(data.lastResNum-data.currResNum)}}</span>
                    </div>
                </a-space>
            </a-space>
        </template>
        <a-grid :cols="24" :row-gap="16" class="panel statistical">
            <a-grid-item
                class="panel-col"
                :span="{ xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 }"
            >
                <a-space>
                    <a-statistic
                        :extra="$t('workplace.rescueingNum')"
                        :value="data.resingNum"
                        :value-from="0"
                        animation
                        show-group-separator
                        :value-style="{ fontFamily: 'NEXA BOLD',color:'#FFFFFF' }"
                    >
                        <template #extra>
                            <span class="cu-font12 font-color-FFFFFF">{{
                                $t('workplace.rescueingNum')
                            }}</span>
                        </template>
                        <template #suffix>
                            <span class="unit font-color-FFFFFF">{{ $t('workplace.nums') }}</span>
                        </template>
                    </a-statistic>
                </a-space>
            </a-grid-item>
            <a-grid-item
                class="panel-col"
                :span="{ xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 }"
            >
                <a-space>
                    <a-statistic
                        :extra="$t('workplace.rescueTodayNum')"
                        :value="data.todayResNum"
                        :value-from="0"
                        animation
                        show-group-separator
                        :value-style="{ fontFamily: 'NEXA BOLD',color:'#FFFFFF' }"
                    >
                        <template #extra>
                            <span class="cu-font12 font-color-FFFFFF">{{
                                $t('workplace.rescueTodayNum')
                            }}</span>
                        </template>
                        <template #suffix>
                            <span class="unit font-color-FFFFFF">{{ $t('workplace.nums') }}</span>
                        </template>
                    </a-statistic>
                </a-space>
            </a-grid-item>
            <a-grid-item
                class="panel-col"
                :span="{ xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 }"
            >
                <a-space>
                    <a-statistic
                        :extra="$t('workplace.rescueMonthNum')"
                        :value="data.monthResNum"
                        :value-from="0"
                        animation
                        show-group-separator
                        :value-style="{ fontFamily: 'NEXA BOLD',color:'#FFFFFF' }"
                    >
                        <template #extra>
                            <span class="cu-font12 font-color-FFFFFF">{{
                                $t('workplace.rescueMonthNum')
                            }}</span>
                        </template>
                        <template #suffix>
                            <span class="unit font-color-FFFFFF">{{ $t('workplace.nums') }}</span>
                        </template>
                    </a-statistic>
                </a-space>
            </a-grid-item>
            <a-grid-item
                class="panel-col"
                :span="{ xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 }"
                style="border-right: none"
            >
                <a-space>
                    <a-statistic
                        :extra="$t('workplace.rescueTotalNum')"
                        :value="data.resNum"
                        :value-from="0"
                        animation
                        :value-style="{ fontFamily: 'NEXA BOLD',color:'#FFFFFF' }"
                    >
                        <template #extra>
                            <span class="cu-font12 font-color-FFFFFF">{{
                                $t('workplace.rescueTotalNum')
                            }}</span>
                        </template>
                        <template #suffix>
                            <span class="unit font-color-FFFFFF">{{ $t('workplace.nums') }}</span>
                        </template>
                    </a-statistic>
                </a-space>
            </a-grid-item>
            <a-grid-item :span="24">
                <!-- <a-divider class="panel-border" /> -->
            </a-grid-item>
        </a-grid>
    </a-card>
</template>

<script lang="ts" setup>
    import { defineProps, toRefs } from 'vue';

    const props = defineProps(['data']);
    const { data } = toRefs(props);
</script>

<style lang="less" scoped>
    .arco-grid.panel {
        margin-bottom: 0;
        padding: 16px 20px 0 20px;
    }
    .panel-col {
        padding-left: 0px;
    }
    .col-avatar {
        margin-right: 12px;
        background-color: var(--color-fill-2);
    }
    .unit {
        margin-left: 8px;
        font-size: 12px;
    }
    :deep(.panel-border) {
        margin: 4px 0 0 0;
    }
    .statistical {
        background: url(@/assets/images/statistical/back-main.png) no-repeat 0 40px,linear-gradient(90deg, #7BC0FC 0%, #6AA1FF 99.76%), linear-gradient(180deg, #A0D3F8 0%, #6CBEF9 100%);
        background-size: 100%;
        border-radius: 5px;
        text-align: center;
    }

    :deep(.arco-statistic-extra){
        margin-top: 0;
    }
</style>
