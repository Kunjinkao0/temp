<template>
    <a-card
        class="general-card"
        :header-style="{ paddingBottom: '0' }"
        :body-style="{ padding: '20px' }"
    >
        <template #title>
            <span class="cu-font16 cu-fontWeight600">{{
                $t('workplace.mainElevator')
            }}</span>
        </template>
        <a-grid :cols="24" :row-gap="16" class="panel statistical">
            <a-grid-item
                class="panel-col"
                :span="{ xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 }"
            >
                <a-space>
                    <a-statistic
                        :value="data.monthPlanNum"
                        :value-from="0"
                        animation
                        show-group-separator
                        :value-style="{ fontFamily: 'NEXA BOLD',color:'#FFFFFF' }"
                    >
                        <template #extra>
                            <span class="cu-font12 font-color-FFFFFF">{{
                                $t('workplace.planMonthNum')
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
                        :value="data.monthMaiNum"
                        :value-from="0"
                        animation
                        show-group-separator
                        :value-style="{ fontFamily: 'NEXA BOLD',color:'#FFFFFF' }"
                    >
                        <template #extra>
                            <span class="cu-font12 font-color-FFFFFF">{{
                                $t('workplace.mainMonthNum')
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
                        :value="data.unmaiOverNum"
                        :value-from="0"
                        animation
                        show-group-separator
                        :value-style="{ fontFamily: 'NEXA BOLD',color:'#FFFFFF' }"
                    >
                        <template #extra>
                            <span class="cu-font12 font-color-FFFFFF">{{
                                $t('workplace.unMainOverNum')
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
                        :value="data.maiOverNum"
                        :value-from="0"
                        animation
                        :value-style="{ fontFamily: 'NEXA BOLD',color:'#FFFFFF' }"
                    >
                        <template #extra>
                            <span class="cu-font12 font-color-FFFFFF">{{
                                $t('workplace.mainOverNum')
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
        background: url(@/assets/images/statistical/back-main.png) no-repeat 0 40px,linear-gradient(90deg, #4CD263 0%, #5EDFD6 100%), linear-gradient(180deg, #B7F8A0 0%, #6CF99C 100%);
        background-size: 100%;
        border-radius: 5px;
        text-align: center;
    }

    :deep(.arco-statistic-extra){
        margin-top: 0;
    }
</style>
