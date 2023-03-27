<template>
    <div class="container">
        <div class="left-side">
            <div class="panel">
                <Banner />
                <DataPanel :data="eleInfo" />
            </div>
            <a-grid
                :cols="24"
                :col-gap="16"
                :row-gap="16"
                style="margin-top: 16px"
            >
                <a-grid-item
                    :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 8 }"
                >
                    <MainElevator :data="maiInfo" />
                </a-grid-item>
                <a-grid-item
                    :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 4 }"
                >
                    <RepairElevator :data="repInfo" />
                </a-grid-item>
                <a-grid-item
                    :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 4 }"
                >
                    <UrgentElevator :data="urgRepInfo" />
                </a-grid-item>

                <a-grid-item
                    :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 8 }"
                >
                    <RescueElevator :data="resInfo" />
                </a-grid-item>
            </a-grid>

            <a-grid
                :cols="24"
                :col-gap="16"
                :row-gap="16"
                style="margin-top: 16px"
            >
                <a-grid-item
                    :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 8 }"
                >
                    <MainUnitCreditEvaluate />
                </a-grid-item>
                <a-grid-item
                    :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 8 }"
                >
                    <a-grid-item
                        :span="{
                            xs: 24,
                            sm: 24,
                            md: 24,
                            lg: 12,
                            xl: 12,
                            xxl: 24
                        }"
                    >
                        <Brand />
                    </a-grid-item>
                    <a-grid-item
                        :span="{
                            xs: 24,
                            sm: 24,
                            md: 24,
                            lg: 12,
                            xl: 12,
                            xxl: 24
                        }"
                    >
                        <a-grid
                            :cols="24"
                            :col-gap="16"
                            :row-gap="16"
                            style="margin-top: 16px"
                        >
                            <a-grid-item
                                :span="{
                                    xs: 24,
                                    sm: 24,
                                    md: 24,
                                    lg: 12,
                                    xl: 12,
                                    xxl: 12
                                }"
                            >
                                <ElevatorAge />
                            </a-grid-item>
                            <a-grid-item
                                :span="{
                                    xs: 24,
                                    sm: 24,
                                    md: 24,
                                    lg: 12,
                                    xl: 12,
                                    xxl: 12
                                }"
                            >
                                <Place />
                            </a-grid-item>
                        </a-grid>
                    </a-grid-item>
                </a-grid-item>
                <a-grid-item
                    :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 8 }"
                >
                    <a-grid :cols="24" :col-gap="16" :row-gap="16">
                        <a-grid-item
                            :span="{
                                xs: 12,
                                sm: 12,
                                md: 12,
                                lg: 12,
                                xl: 12,
                                xxl: 24
                            }"
                        >
                            <RescueWork />
                        </a-grid-item>
                        <a-grid-item
                            :span="{
                                xs: 12,
                                sm: 12,
                                md: 12,
                                lg: 12,
                                xl: 12,
                                xxl: 24
                            }"
                        >
                            <TrappedPeople />
                        </a-grid-item>
                    </a-grid>
                </a-grid-item>
            </a-grid>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { getComprehensiveStat } from '@/api/statistical';
    import Banner from './components/banner.vue';
    import DataPanel from './components/data-panel.vue';
    import MainElevator from './components/main-elevator.vue';
    import RepairElevator from './components/repair-elevator.vue';
    import UrgentElevator from './components/urgent-repair.vue';
    import RescueElevator from './components/rescue-elevator.vue';
    import RescueWork from './components/rescue-work.vue';
    import TrappedPeople from './components/trapped-people.vue';
    import MainUnitCreditEvaluate from './components/mainUnit-creditEvaluate.vue';
    import Brand from './components/brand.vue';
    import ElevatorAge from './components/elevator-age.vue';
    import Place from './components/place.vue';

    const eleInfo = ref({});
    const maiInfo = ref({});
    const repInfo = ref({});
    const resInfo = ref({});
    const urgRepInfo = ref({});

    const init = async () => {
        const { data } = await getComprehensiveStat();
        if (data !== null) {
            eleInfo.value = data.ele;
            maiInfo.value = data.mai;
            repInfo.value = data.rep;
            resInfo.value = data.res;
            urgRepInfo.value = data.urgRep;
        }
    };

    init();
</script>

<script lang="ts">
  export default {
    name: 'statistical',
  };
</script>


<style lang="less" scoped>
    .container {
        padding: 16px 20px;
        padding-bottom: 0;
        display: flex;
    }

    .left-side {
        flex: 1;
        overflow: auto;
    }

    .right-side {
        width: 280px;
        margin-left: 16px;
    }

    .panel {
        background-color: var(--color-bg-2);
        border-radius: 4px;
        overflow: auto;
    }
    :deep(.panel-border) {
        margin-bottom: 0;
        border-bottom: 1px solid rgb(var(--gray-2));
    }
    .moduler-wrap {
        border-radius: 4px;
        background-color: var(--color-bg-2);
        :deep(.text) {
            font-size: 12px;
            text-align: center;
            color: rgb(var(--gray-8));
        }

        :deep(.wrapper) {
            margin-bottom: 8px;
            text-align: center;
            cursor: pointer;

            &:last-child {
                .text {
                    margin-bottom: 0;
                }
            }
            &:hover {
                .icon {
                    color: rgb(var(--arcoblue-6));
                    background-color: #e8f3ff;
                }
                .text {
                    color: rgb(var(--arcoblue-6));
                }
            }
        }

        :deep(.icon) {
            display: inline-block;
            width: 32px;
            height: 32px;
            margin-bottom: 4px;
            color: rgb(var(--dark-gray-1));
            line-height: 32px;
            font-size: 16px;
            text-align: center;
            background-color: rgb(var(--gray-1));
            border-radius: 4px;
        }
    }
</style>

<style lang="less" scoped>
    // responsive
    .mobile {
        .container {
            display: block;
        }
        .right-side {
            // display: none;
            width: 100%;
            margin-left: 0;
            margin-top: 16px;
        }
    }
</style>
