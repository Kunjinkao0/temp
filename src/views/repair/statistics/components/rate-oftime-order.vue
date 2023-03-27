<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: '0' }"
      :body-style="{ padding: '17px 20px 21px 20px',height:'575px' }"
    >
      <template #title>
        <span class="cu-fontWeight700 cu-font16"> {{$t('menu.repair.statistics.rateOrder.title')}} </span>
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
              <template #avgTimesSolt="{ record }">
                  <span class="score-style">{{record.avgTimes}}</span>
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
              <template #empty>
                <div class="table-nodata" style="height:452px">
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
  import { ref,reactive,computed, watch } from 'vue';
  import useLoading from '@/hooks/loading';
  import { useI18n } from 'vue-i18n';
  import cloneDeep from 'lodash/cloneDeep';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import { Pagination } from '@/types/global';
  import { getAvgRepairTimesRanking } from '@/api/repair/repairStatistics';

  type Column = TableColumnData & { checked?: true };
  const { t } = useI18n();
  const { loading, setLoading } = useLoading();
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);
  const renderData = ref([]);

  const props = defineProps(['parentParams'])

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
      title: t('menu.repair.statistics.ranking'),
      dataIndex: 'index',
      slotName: 'index',
      width: 100,
      align:'center',
      headerCellClass: 'body-cell-class'
      },
      {
      title: t('menu.repair.statistics.mainName'),
      dataIndex: 'name',
      ellipsis: true,
      tooltip: true,
      align:'left',
      width: 300,
      headerCellClass: 'body-cell-class'
      },
      {
      title: t('menu.repair.statistics.finishTime'),
      dataIndex: 'avgTimes',
      ellipsis: true,
      tooltip: true,
      slotName: 'avgTimesSolt',
      width: 150,
      align:'center',
      headerCellClass: 'body-cell-class'
      },
  ]);

  const fetchData = async (
      params = { page: 1, size: 20 }
  ) => {
      setLoading(true);
      try {
        const { data } = await getAvgRepairTimesRanking(params);
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

  const viewInfo = (record) =>{

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
</style>
