<template>
    <a-card
        class="general-card"
        :header-style="{ paddingBottom: '0' }"
        :body-style="{ padding: '20px',height:'431px' }"
    >
        <template #title>
            <span class="cu-font16 cu-fontWeight600">{{
                $t('workplace.brand.statistical')
            }}</span>
        </template>

        <template #extra>
            <a-link @click="brandMore">{{ $t('workplace.viewMore') }}</a-link>
        </template>

        <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
            <a-grid-item
                v-for="item in brandData"
                :key="item.n"
                :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }"
            >
                <a-space :size="8" direction="vertical" fill>
                    <div class="cu-fy-between-center-lr">
                        <div class="cu-font12">{{ item.n }}</div>
                        <div>
                            <span class="cu-font12 cu-fontWeight600"
                                >{{ item.v }}
                            </span>
                            <span class="cu-font10 cu-color-1D2129-54">{{
                                $t('workplace.part')
                            }}</span>
                        </div>
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
                </a-space>
            </a-grid-item>
            <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }" v-if="!ishavaData">
                <div class="no-data" style="height: 341px;">
                  <a-image :src="nodataPic" :preview="false"></a-image>
                </div>
            </a-grid-item>
        </a-grid>
    </a-card>
    <a-drawer
        width="20%"
        :visible="visible"
        :footer="false"
        unmount-on-close
        @cancel="cancelDrawer"
    >
        <template #title>
            <span class="cu-font16 cu-fontWeight600">{{
                $t('workplace.brand.statistical')
            }}</span>
        </template>
        <div>
            <BrandMore :data="brandMoreData" />
        </div>
    </a-drawer>
</template>

<script lang="ts" setup>
    import nodataPic from '@/assets/images/no-data.png';
    import { ref } from 'vue';
    import { getEleBrandStat } from '@/api/statistical';
    import BrandMore from './brand-more.vue';

    const ishavaData = ref(false)
    const maxNum = ref(0);
    const brandData = ref([]);
    const brandMoreData = ref([]);

    const init = async () => {
        const { data } = await getEleBrandStat();
        if (data.length > 0) {
            maxNum.value = data[0].v;
            data.forEach((item) => {
                if (maxNum.value !== 0) {
                    item.percent = item.v / maxNum.value;
                } else {
                    item.percent = 0;
                }
            });

            if (data.length > 14) {
                brandData.value = data.slice(0, 14);
            } else {
                brandData.value = data;
            }
            brandMoreData.value = data;
            ishavaData.value = true
        }else {
            ishavaData.value = false
        }
    };

    init();

    const visible = ref(false);

    const brandMore = () => {
        visible.value = true;
    };

    const cancelDrawer = () => {
        visible.value = false;
    };
</script>
