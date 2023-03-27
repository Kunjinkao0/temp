<template>
    <a-grid
        :cols="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 24 }"
        class="panel statistical"
    >
        <a-grid-item class="panel-col" :span="3">
            <a-space>
                <a-avatar :size="54" class="col-avatar">
                    <img
                        alt="avatar"
                        :src="elePic"
                    />
                </a-avatar>
                <a-statistic
                    :title="$t('workplace.manageElevators')"
                    :value="data.eleNum"
                    :value-from="0"
                    animation
                    show-group-separator
                    :value-style="{ fontFamily: 'NEXA BOLD' }"
                >
                    <template #title>
                        <span class="cu-font12">{{
                            $t('workplace.manageElevators')
                        }}</span>
                    </template>
                    <template #suffix>
                        <span class="unit">{{ $t('workplace.part') }}</span>
                    </template>
                </a-statistic>
            </a-space>
        </a-grid-item>
        <a-grid-item class="panel-col" :span="3">
            <a-space>
                <a-avatar :size="54" class="col-avatar">
                    <img
                        alt="avatar"
                        :src="mainUnitPic"
                    />
                </a-avatar>
                <a-statistic
                    :title="$t('workplace.mainUnit')"
                    :value="data.maiNum"
                    :value-from="0"
                    animation
                    show-group-separator
                    :value-style="{ fontFamily: 'NEXA BOLD' }"
                >
                    <template #title>
                        <span class="cu-font12">{{
                            $t('workplace.mainUnit')
                        }}</span>
                    </template>
                    <template #suffix>
                        <span class="unit">{{ $t('workplace.pecs') }}</span>
                    </template>
                </a-statistic>
            </a-space>
        </a-grid-item>
        <a-grid-item class="panel-col" :span="3">
            <a-space>
                <a-avatar :size="54" class="col-avatar">
                    <img
                        alt="avatar"
                        :src="useUnitPic"
                    />
                </a-avatar>
                <a-statistic
                    :title="$t('workplace.propertyUnit')"
                    :value="data.proNum"
                    :value-from="0"
                    animation
                    show-group-separator
                    :value-style="{ fontFamily: 'NEXA BOLD' }"
                >
                    <template #title>
                        <span class="cu-font12">{{
                            $t('workplace.propertyUnit')
                        }}</span>
                    </template>
                    <template #suffix>
                        <span class="unit">{{ $t('workplace.pecs') }}</span>
                    </template>
                </a-statistic>
            </a-space>
        </a-grid-item>
        <a-grid-item class="panel-col" :span="3">
            <a-space>
                <a-avatar :size="54" class="col-avatar">
                    <img
                        alt="avatar"
                        :src="eleAge10Pic"
                    />
                </a-avatar>
                <a-statistic
                    :title="$t('workplace.ladderAge10-15')"
                    :value="data.gt6Num"
                    :value-from="0"
                    animation
                    :value-style="{ fontFamily: 'NEXA BOLD' }"
                >
                    <template #title>
                        <span class="cu-font12">{{
                            $t('workplace.ladderAge6-15')
                        }}</span>
                    </template>
                    <template #suffix>
                        <span class="unit">{{ $t('workplace.part') }}</span>
                    </template>
                </a-statistic>
            </a-space>
        </a-grid-item>
        <a-grid-item class="panel-col" :span="3">
            <a-space>
                <a-avatar :size="54" class="col-avatar">
                    <img
                        alt="avatar"
                        :src="eleAge15Pic"
                    />
                </a-avatar>
                <a-statistic
                    :title="$t('workplace.ladderAge15')"
                    :value="data.gt15Num"
                    :value-from="0"
                    animation
                    show-group-separator
                    :value-style="{ fontFamily: 'NEXA BOLD' }"
                >
                    <template #title>
                        <span class="cu-font12">{{
                            $t('workplace.ladderAge15')
                        }}</span>
                    </template>
                    <template #suffix>
                        <span class="unit">{{ $t('workplace.part') }}</span>
                    </template>
                </a-statistic>
            </a-space>
        </a-grid-item>
        <a-grid-item class="panel-col" :span="3">
            <a-space>
                <a-avatar :size="54" class="col-avatar">
                    <img
                        alt="avatar"
                        :src="noCheckTiamePic"
                    />
                </a-avatar>
                <a-statistic
                    :title="$t('workplace.noAnnualInspectionElevator')"
                    :value="data.unCheckNum"
                    :value-from="0"
                    animation
                    show-group-separator
                    :value-style="{ fontFamily: 'NEXA BOLD' }"
                >
                    <template #title>
                        <span class="cu-font12">{{
                            $t('workplace.noAnnualInspectionElevator')
                        }}</span>
                    </template>
                    <template #suffix>
                        <span class="unit">{{ $t('workplace.part') }}</span>
                    </template>
                </a-statistic>
            </a-space>
        </a-grid-item>
        <a-grid-item class="panel-col" :span="3">
            <a-space>
                <a-avatar :size="54" class="col-avatar">
                    <img
                        alt="avatar"
                        :src="noCodePic"
                    />
                </a-avatar>
                <a-statistic
                    :value="data.unRegNum"
                    :value-from="0"
                    animation
                    show-group-separator
                    :value-style="{ fontFamily: 'NEXA BOLD' }"
                >
                    <template #title>
                        <span class="cu-font12">{{
                            $t('workplace.noRegistCodeElevator')
                        }}</span>
                    </template>
                    <template #suffix>
                        <span class="unit">{{ $t('workplace.part') }}</span>
                    </template>
                </a-statistic>
            </a-space>
        </a-grid-item>
        <a-grid-item class="panel-col" :span="3">
            <a-space>
                <a-avatar :size="54" class="col-avatar">
                    <img
                        alt="avatar"
                        :src="warningEle"
                    />
                </a-avatar>
                <a-statistic
                    :value="data.warnNum"
                    :value-from="0"
                    animation
                    show-group-separator
                    :value-style="{ fontFamily: 'NEXA BOLD' }"
                >
                    <template #title>
                        <span class="cu-font12">{{
                            $t('workplace.warningElevator')
                        }}</span>
                    </template>
                    <template #suffix>
                        <span class="unit">{{ $t('workplace.part') }}</span>
                    </template>
                </a-statistic>
            </a-space>
        </a-grid-item>
    </a-grid>
</template>

<script lang="ts" setup>
    import useUnitPic from '@/assets/images/statistical/use-unit.png'
    import noCodePic from '@/assets/images/statistical/no-code.png'
    import noCheckTiamePic from '@/assets/images/statistical/no-check-time.png'
    import mainUnitPic from '@/assets/images/statistical/main-unit.png'
    import eleAge15Pic from '@/assets/images/statistical/ele-age15.png'
    import eleAge10Pic from '@/assets/images/statistical/ele-age10.png'
    import elePic from '@/assets/images/statistical/ele.png'
    import warningEle from '@/assets/images/statistical/warning-ele.png'
    import { defineProps, toRefs } from 'vue';

    const props = defineProps(['data']);
    const { data } = toRefs(props);
</script>

<style lang="less" scoped>
    .arco-grid.panel {
        margin-bottom: 0;
        padding: 16px 20px 16px 20px;
    }

    .panel-col {
        padding-left: 5px;
    }

    .col-avatar {
        margin-right: 12px;
        background-color: var(--color-fill-2);
    }

    .up-icon {
        color: rgb(var(--red-6));
    }

    .unit {
        margin-left: 8px;
        color: rgb(var(--gray-8));
        font-size: 12px;
    }

    :deep(.panel-border) {
        margin: 4px 0 0 0;
    }
</style>
