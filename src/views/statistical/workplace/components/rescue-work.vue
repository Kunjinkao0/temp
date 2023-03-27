<template>
    <a-spin :loading="loading" style="width: 100%">
        <a-card
            class="general-card"
            :header-style="{ paddingBottom: '0' }"
            :body-style="{padding: '20px',height:'380px'}">
            <template #title>
                <span class="cu-fontWeight700 cu-font16">
                    {{ $t('workplace.rescueWorkContent') }}
                </span>
            </template>
            <template #extra>
                <a-link @click="more">{{ $t('workplace.viewMore') }}</a-link>
            </template>
            <a-space direction="vertical" :size="10" fill>
                <a-table
                    row-key="id"
                    :loading="loading"
                    :pagination="pagination"
                    :columns="(cloneColumns as TableColumnData[])"
                    :data="renderData"
                    :bordered="false"
                    :stripe="true"
                    size="mini"
                    @page-change="onPageChange"
                    @row-click="gotoDetail"
                >
                    <template #state="{ record }">
                        <span v-if="record.state === 1">
                            <!-- 待接单 -->
                            <a-badge text="NEW" :offset="[10, -2]" :dot-style="{width:'45px',height:'15px',fontSize:'12px',lineHeight:'12px'}">
                                <a-tag color="orange" class=" cu-pointer">{{
                                    $t(
                                        `menu.rescueWorkContent.state.${record.state}`
                                    )
                                }}</a-tag>
                            </a-badge>
                        </span>
                        <span v-else-if="record.state === 2">
                            <!-- 已接单 -->
                            <a-tag color="cyan" class=" cu-pointer">{{
                                $t(
                                    `menu.rescueWorkContent.state.${record.state}`
                                )
                            }}</a-tag>
                        </span>
                        <span v-else-if="record.state === 3">
                            <!-- 已到场 -->
                            <a-tag color="blue" class=" cu-pointer">{{
                                $t(
                                    `menu.rescueWorkContent.state.${record.state}`
                                )
                            }}</a-tag>
                        </span>
                        <span v-else>
                            <!-- 已完成 -->
                            <a-tag class=" cu-pointer">{{
                                $t(
                                    `menu.rescueWorkContent.state.4`
                                )
                            }}</a-tag>
                        </span>
                    </template>
                    <template #address>
                        <img :src="addressPic" class=" cu-pointer"/>
                    </template>
                    <template #empty>
                        <div class="table-nodata" style="height:280px">
                          <a-image :src="nodataPic" :preview="false"></a-image>
                        </div>
                    </template>
                </a-table>
            </a-space>
        </a-card>
    </a-spin>
</template>

<script lang="ts" setup>
    import nodataPic from '@/assets/images/no-data.png';
    import addressPic from '@/assets/images/statistical/address.png';
    import { ref, reactive, computed, watch } from 'vue';
    import { useRouter } from "vue-router";
    import useLoading from '@/hooks/loading';
    import { useI18n } from 'vue-i18n';
    import cloneDeep from 'lodash/cloneDeep';
    import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
    import { Pagination } from '@/types/global';
    import { getEleWorkList, RescueWorkRecord } from '@/api/statistical';

    type Column = TableColumnData & { checked?: true };
    const { t } = useI18n();
    const { loading, setLoading } = useLoading();
    const cloneColumns = ref<Column[]>([]);
    const showColumns = ref<Column[]>([]);
    const renderData = ref<RescueWorkRecord[]>([]);

    const basePagination: Pagination = {
        current: 1,
        pageSize: 6,
        showTotal: true
    };
    const pagination = reactive({
        ...basePagination
    });

    const columns = computed<TableColumnData[]>(() => [
        {
            title: t('workplace.rescueWorkContent.state'),
            dataIndex: 'state',
            slotName: 'state',
            width: 70,
            align: 'left',
            headerCellClass: 'body-cell-class'
        },
        {
            title: t('workplace.rescueWorkContent.address'),
            dataIndex: 'address',
            ellipsis: true,
            tooltip: true,
            width: 130,
            align: 'left',
            headerCellClass: 'body-cell-class'
        },
        {
            title: t('workplace.rescueWorkContent.time'),
            dataIndex: 'createTime',
            ellipsis: true,
            width: 120,
            align: 'left',
            headerCellClass: 'body-cell-class'
        },
        {
            title: '',
            width: 30,
            slotName: 'address',
            align: 'center',
            headerCellClass: 'body-cell-class'
        }
    ]);

    const fetchData = async (params) => {
        setLoading(true);
        try {
            const { data } = await getEleWorkList(params);
            renderData.value = data.rows;
            pagination.current = params.page;
            pagination.total = data.total;
        } catch (err) {
            // you can report use errorHandler or other
        } finally {
            setLoading(false);
        }
    };

    const onPageChange = (page: number) => {
        fetchData({
            'workType': 1,
            'page': page,
            'size': pagination.pageSize});
    };

    fetchData({'workType': 1,'page': 1, 'size': 6});

    const router = useRouter()
    const more = () => {
        router.push({
            name: "WorkOrder",
            query: {}
        })
    }

    const gotoDetail = (record: any) => {
        router.push({
            name: "WorkOrderDetail",
            query: {
                id: record.workId
            }
        })
    }


    const viewInfo = (record) => {};

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
</style>
