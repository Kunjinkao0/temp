<template>
    <div class="drawer-padding">
        <a-space :size="10" direction="vertical" fill>
            <div v-for="item in data" :key="item.n">
                <div class="cu-fy-between-center-lr">
                    <div class="cu-font12">{{ item.n }}</div>
                    <div class="cu-font10"
                        ><span
                            class="cu-font14 cu-font-nexa-bold cu-fontWeight600"
                            >{{ item.v }}</span
                        >{{ $t('workplace.part') }}</div
                    >
                </div>

                <div>
                    <a-progress
                        :percent="item.percent"
                        :color="{
                            '0.95%': 'rgb(30, 231, 255)',
                            '50.44%': 'rgb(36, 154, 255)',
                            '99.92%': 'rgb(111, 66, 251)'
                        }"
                        :stroke-width="8"
                        :show-text="false"
                    />
                </div>
            </div>
        </a-space>
    </div>
</template>

<script lang="ts" setup>
    import { defineProps, toRefs } from 'vue';

    const props = defineProps(['data']);
    const { data } = toRefs(props);
</script>

<style lang="less" scoped>
    .drawer-padding {
        padding: 15px 25px;
    }
</style>
