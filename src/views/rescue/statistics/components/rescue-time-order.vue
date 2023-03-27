<template>
    <a-spin :loading="loading" style="width: 100%">
        <a-card
            class="general-card"
            :header-style="{ paddingBottom: '0' }"
            :body-style="{ padding: '20px', height:'711px' }"
        >
            <template #title>
                <span class="cu-fontWeight700 cu-font16">
                    {{ $t('menu.rescue.statistics.rescuetime.title') }}
                </span>
            </template>

            <a-space direction="vertical" :size="10" fill>
                <a-tabs
                    :default-active-key="checkVal"
                    :hide-content="true"
                    @change="changeTags"
                >
                    <a-tab-pane key="1">
                        <template #title>
                            <span>{{
                                $t('menu.rescue.statistics.avgtime1')
                            }}</span>
                        </template>
                    </a-tab-pane>
                    <a-tab-pane key="2">
                        <template #title>
                            <span>{{
                                $t('menu.rescue.statistics.avgtime2')
                            }}</span>
                        </template>
                    </a-tab-pane>
                    <a-tab-pane key="3">
                        <template #title>
                            <span>{{
                                $t('menu.rescue.statistics.avgtime3')
                            }}</span>
                        </template>
                    </a-tab-pane>
                </a-tabs>
                <a-table
                    row-key="id"
                    :pagination="false"
                    :loading="loading"
                    :columns="(cloneColumns as TableColumnData[])"
                    :data="renderData"
                    :bordered="false"
                    :stripe="true"
                    :scroll="{ y: 537 }"
                >
                    <template #avgNumSolt="{ record }">
                        <span class="score-style">{{ record.avgNum===''?0:record.avgNum}}</span>
                    </template>
                    <template #index="{ rowIndex }">
                        <a-avatar
                            :style="{
                                marginRight: '8px',
                                background:
                                        rowIndex===0
                                        ? 'radial-gradient(63.11% 63.11% at 31.97% 19.67%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%), #F53F3F'
                                        : rowIndex===1
                                        ? 'radial-gradient(63.11% 63.11% at 31.97% 19.67%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%), #FF7D00'
                                        : rowIndex===2
                                        ? 'radial-gradient(63.11% 63.11% at 31.97% 19.67%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%), #3491FA'
                                        : '#F4F4F4'
                            }"
                            :size="20"
                            >
                                <span class="cu-color-1D2129" v-if="rowIndex>=3">{{rowIndex +1}}</span>
                                <span v-else>{{rowIndex +1}}</span>
                            </a-avatar>
                    </template>
                    <template #empty>
                        <div class="table-nodata" style="height:510px">
                          <a-image :src="nodataPic" :preview="false"></a-image>
                        </div>
                    </template>
                </a-table>
                <div class="cu-fontCenter cu-padtb4">
                    <a-link v-if="(isMore === true && isHaveData === true)" @click="loadMore">{{
                        $t('menu.rescue.statistics.load')
                    }}</a-link>
                    <span v-if="(isMore === false && isHaveData === true)">{{
                        $t('menu.rescue.statistics.noMore')
                    }}</span>
                </div>
            </a-space>
        </a-card>
    </a-spin>
</template>

<script lang="ts" setup>
    import nodataPic from '@/assets/images/no-data.png';
    import { ref, computed, watch } from 'vue';
    import useLoading from '@/hooks/loading';
    import { useI18n } from 'vue-i18n';
    import cloneDeep from 'lodash/cloneDeep';
    import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
    import { getRescueDurationRanking } from '@/api/rescue/rescueStatistics';

    // 父组件参数
    const props = defineProps(['parentParams'])

    type Column = TableColumnData & { checked?: true };
    const { t } = useI18n();
    const { loading, setLoading } = useLoading();
    const cloneColumns = ref<Column[]>([]);
    const showColumns = ref<Column[]>([]);
    const renderData = ref([]);
    const checkVal = ref(1);
    const isMore = ref(true);
    const isHaveData = ref(true);

    const pagination = ref({
        page: 1,
        size: 12,
        total: 0
    });

    const changeTags = (val) => {
        checkVal.value = val;
        pagination.value = {
            page: 1,
            size: 12,
            total: 0
        };
        fetchData();
    };

    const columns = computed<TableColumnData[]>(() => [
        {
            title: t('menu.maintenance.statistics.ranking'),
            width: 100,
            dataIndex: 'index',
            slotName: 'index',
            align: 'center',
            headerCellClass: 'body-cell-class'
        },
        {
            title: t('menu.rescue.statistics.eleName'),
            dataIndex: 'name',
            ellipsis: true,
            tooltip: true,
            align: 'left',
            headerCellClass: 'body-cell-class',
        },
        {
            title: t('menu.rescue.statistics.time'),
            dataIndex: 'avgNum',
            tooltip: true,
            slotName: 'avgNumSolt',
            ellipsis: true,
            align: 'center',
            headerCellClass: 'body-cell-class'
        }
    ]);

    const fetchData = async (params: any = { page: 1, size: 12 }) => {
        setLoading(true);
        try {
            params.type = checkVal.value;
            
            let objParams: any = {}
            Object.assign(objParams,params,props.parentParams)

            const { data } = await getRescueDurationRanking(objParams);
            if(data.rows.length > 0){
                renderData.value = data.rows;
                pagination.value.page = params.page;
                pagination.value.total = data.total;
                isHaveData.value = true
            }else {
                renderData.value = data.rows;
                isHaveData.value = false
            }
            
            if (data.total < params.page * params.size) {
                isMore.value = false;
            } else {
                isMore.value = true;
            }
        } catch (err) {
            // you can report use errorHandler or other
        } finally {
            setLoading(false);
        }
    };

    fetchData();

    const loadMore = async () => {
        setLoading(true);
        try {
            const { data } = await getRescueDurationRanking({
                page: (pagination.value.page += 1),
                size: 12,
                type: checkVal.value
            });
            renderData.value = renderData.value.concat(data.rows);
            pagination.value.total = data.total;
            if (data.total < pagination.value.page * pagination.value.size) {
                isMore.value = false;
            } else {
                isMore.value = true;
            }
        } catch (err) {
            // you can report use errorHandler or other
        } finally {
            setLoading(false);
        }
    };

    const parentSearch = () => {
        fetchData({ page: 1, size: 12 });
    }

    watch(
        () => columns.value,
        (val) => {
            cloneColumns.value = cloneDeep(val);
            cloneColumns.value.forEach((item, index) => {
                item.checked = true;
            });
            showColumns.value = cloneDeep(cloneColumns.value);
        },
        { deep: true, immediate: true }
    );

    defineExpose({ parentSearch })
</script>

<style scoped lang="less">
    .general-card {
        min-height: 370px;
    }
    :deep(.arco-table-tr) {
        height: 44px;
        .arco-typography {
            margin-bottom: 0;
        }
    }
    .increases-cell {
        display: flex;
        align-items: center;
        span {
            margin-right: 4px;
        }
    }
    :deep(.score-style) {
        font-family: 'OPPOSans';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
    }

    :deep(.body-cell-class) {
        background: #ffffff;
        border-bottom: 1px solid rgb(235 230 230);
        font-weight: 600;
    }

    :deep(.arco-tabs-nav-tab-list) {
        width: 100%;
    }

    :deep(.arco-tabs-nav-type-line .arco-tabs-tab) {
        width: 27%;
        justify-content: center;
    }
</style>
