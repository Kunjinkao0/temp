<template>
    <a-spin :loading="loading" style="width: 100%">
      <a-card
        class="general-card"
        :header-style="{ paddingBottom: '0' }"
        :body-style="{ padding: '17px 20px 21px 20px',height:'600px' }"
      >
        <template #title>
          <span class="cu-fontWeight700 cu-font16"> {{$t('menu.maintenance.statistics.under.maintenance.title')}} </span>
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
                @page-change="onPageChange"
            >
                <template #scoreSolt="{ record }">
                    <span class="score-style">{{record.score}}</span>
                </template>
                <template #index="{ rowIndex }">
                  <a-avatar :style="{
                            marginRight: '8px',
                            background:
                                rowIndex + 1 +(pagination.current - 1) * pagination.pageSize === 1
                                    ? 'radial-gradient(63.11% 63.11% at 31.97% 19.67%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%), #F53F3F'
                                    : rowIndex +1 +(pagination.current - 1) *pagination.pageSize ===2
                                    ? 'radial-gradient(63.11% 63.11% at 31.97% 19.67%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%), #FF7D00'
                                    : rowIndex + 1 +(pagination.current - 1) *pagination.pageSize ===3
                                    ? 'radial-gradient(63.11% 63.11% at 31.97% 19.67%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%), #3491FA'
                                    : '#F4F4F4'
                        }"
                        :size="20"
                        >
                        <span class="cu-color-1D2129" v-if="rowIndex + 1 +(pagination.current - 1) * pagination.pageSize > 3">{{rowIndex + 1 + (pagination.current - 1) * pagination.pageSize}}</span>
                        <span v-else>{{rowIndex + 1 + (pagination.current - 1) * pagination.pageSize}}</span>
                    </a-avatar>
                </template>
                <template #optional ="{ record }">
                  <a-button type="text" size="small" @click="viewInfo({record})">
                      {{ $t('menu.maintenance.statistics.operations.view') }}
                  </a-button>
                </template>
                <template #empty>
                  <div class="table-nodata" style="height:452px">
                    <a-image :src="nodataPic" :preview="false"></a-image>
                  </div>
                </template>
            </a-table>
        </a-space>
      </a-card>
    </a-spin>

    <a-modal width="560px" class="maintenantice-ststistics" v-model:visible="visible" @ok="handleOk" @cancel="handleCancel" :simple="true" style="padding:0">
      <template #title>
        <div class="title-totle-div">
          <div class="title-div">
            <div class="info-title" style="width:350px;padding-left: 16px;line-height: 64px;">{{titleObj.title}}</div>
            <div class="info-title" style="width:150px;text-align: center;;padding-top: 4px;">
              <div style="font-size:14px;font-weight:400;"><span class="score">{{titleObj.score}}</span>{{$t('menu.maintenance.statistics.work.score')}}</div>
              <div style="font-size:12px;font-weight:200">{{$t('menu.maintenance.statistics.standard.score')}}</div>
            </div>
          </div>
        </div>
      </template>
      <div>
        <UnderMaintenanceOrderInfo ref="underMaintenanceOrderInfo" :loading="loading" />
      </div>
    </a-modal>
  </template>

  <script lang="ts" setup>
    import nodataPic from '@/assets/images/no-data.png';
    import { ref,reactive,computed, watch } from 'vue';
    import useLoading from '@/hooks/loading';
    import { useI18n } from 'vue-i18n';
    import cloneDeep from 'lodash/cloneDeep';
    import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
    import { Pagination } from '@/types/global';
    import { getMainStandardRanking } from '@/api/maintenance/maintenanceStatistics';
    import UnderMaintenanceOrderInfo from './under-maintenance-order-info.vue'

    const props = defineProps(['parentParams'])
    const visible = ref(false)
    const { loading, setLoading } = useLoading(true);

    type Column = TableColumnData & { checked?: true };
    const { t } = useI18n();

    const cloneColumns = ref<Column[]>([]);
    const showColumns = ref<Column[]>([]);
    const renderData = ref([]);

    const underMaintenanceOrderInfo = ref();
    const titleObj = ref({
      title:undefined,
      score:undefined,
    });


    const basePagination: Pagination = {
        current: 1,
        pageSize: 10,
        showTotal: true
    };
    const pagination = reactive({
        ...basePagination,
    });

    const columns = computed<TableColumnData[]>(() => [
        {
        title: t('menu.maintenance.statistics.ranking'),
        dataIndex: 'index',
        slotName: 'index',
        width:80,
        ellipsis: true,
        align:'center',
        headerCellClass: 'body-cell-class',
		tooltip: true,
        },
        {
        title: t('menu.maintenance.statistics.mainName'),
        dataIndex: 'name',
        align:'left',
        headerCellClass: 'body-cell-class',
        ellipsis: true,
        tooltip: true,
        },
        {
        title: t('menu.maintenance.statistics.score'),
        dataIndex: 'score',
        align:'center',
        ellipsis: true,
        slotName: 'scoreSolt',
        headerCellClass: 'body-cell-class',
		tooltip: true,
        },
        {
        title: t('menu.maintenance.statistics.operations'),
        dataIndex: 'operations',
        slotName: 'optional',
        ellipsis: true,
        align:'center',
        width: 80,
        headerCellClass: 'body-cell-class'
        },
    ]);

    const fetchData = async (
        params = { page: 1, size: 20 }
    ) => {
        setLoading(true);
        try {
        const { data } = await getMainStandardRanking(params);
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
        ...props.parentParams,
        'page':page,
        'size':pagination.pageSize
      });
    };

    fetchData();

    const parentSearch = () => {
        fetchData({
          ...props.parentParams,
          'page': 1,
          'size': pagination.pageSize
        });
    };

    const viewInfo = (record) => {
        titleObj.value.title = record.record.name
        titleObj.value.score = record.record.score
        underMaintenanceOrderInfo.value.init(record.record)
        visible.value = true;
    };

    const handleOk = () => {
        visible.value = false;
    };

    const handleCancel = () => {
        visible.value = false;
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

    :deep(.score-style){
        font-family: 'OPPOSans';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
    }

    :deep(.body-cell-class){
      background:#E5E6EB;
      border-bottom: 1px solid rgb(235 230 230);
      font-weight: 600;
    }

    .title-totle-div{
      width: 100%;
    }

    .title-div{
      width: 100%;
      display: flex;
      justify-content: space-between;
      background: url(@/assets/images/maintenantics/modle-title.png);
      height: 128px;
      align-items: center;
      padding: 0px 30px 0 30px;
      font-weight: 600;
    }

    .info-title{
      background: rgba(255, 255, 255, 0.3);
      height: 64px;
      font-size: 22px;
    }

    .score{
      font-size: 22px;
      color: #165DFF;
    }

    :deep(.arco-modal-wrapper.arco-modal-wrapper-align-center .arco-modal){
      padding: 0;
    }
  </style>
