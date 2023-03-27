<template>
    <a-spin :loading="loading" style="width: 100%">
      <a-card
        class="general-card"
        :header-style="{ paddingBottom: '0' }"
        :body-style="{ padding: '17px 20px 21px 20px' }"
      >
        <template #title>
          <span class="cu-fontWeight700 cu-font16"> {{$t('menu.rescue.statistics.ele.title')}} </span>
        </template>
        <template #extra>
          <a-space :size="20">
            <span
                    class="cu-font14 cu-fontWeight400 cu-color-1D2129"
                >
                    {{ $t('menu.rescue.statistics.gong')
                    }}<span
                        class="cu-font16 cu-fontWeight600 cu-color-165DFF"
                        >{{eleTotal}}</span
                    >{{ $t('menu.rescue.statistics.elsvator') }}
                </span>
                <span class="cu-font16 cu-fontWeight600 cu-color-D9D9D9">
                  |
                </span>
                <span
                    class="cu-font14 cu-fontWeight400 cu-color-1D2129"
                    style="padding-right: 25px"
                >

                {{ $t('menu.rescue.statistics.kunrenRate') }}  <span class="cu-font16 cu-fontWeight600 cu-color-165DFF">{{kunrenRate}}</span>
                </span>
          </a-space>

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
                @page-size-change="onPageSizeChange"
            >
              <template #index="{ rowIndex }">
                {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
              </template>
              <template #empty>
                  <div class="table-nodata">
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
    import moment from 'moment';
    import { useI18n } from 'vue-i18n';
    import cloneDeep from 'lodash/cloneDeep';
    import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
    import { Pagination } from '@/types/global';
    import { getRescueWarningEleList,getRescueWarningEleStat } from '@/api/rescue/rescueStatistics';

    const props = defineProps(['parentParams'])
    type Column = TableColumnData & { checked?: true };
    const { t } = useI18n();
    const { loading, setLoading } = useLoading();
    const cloneColumns = ref<Column[]>([]);
    const showColumns = ref<Column[]>([]);
    const renderData = ref([]);
    const eleTotal = ref(0);
    const kunrenRate = ref('0%')

    const nowDate = new Date();
    const startTime = `${nowDate.getFullYear()}-01-01`;
    const endTime = moment(nowDate)
            .subtract(0, 'day')
            .format('YYYY-MM-DD');

    const basePagination: Pagination = {
        current: 1,
        pageSize: 10,
        showTotal: true,
        showPageSize: true
    };
    const pagination = reactive({
        ...basePagination,
    });

    const columns = computed<TableColumnData[]>(() => [
      {
        title: t('table.index'),
        dataIndex: 'index',
        slotName: 'index',
        align:'center',
        headerCellClass: 'body-cell-class',
      },
      {
        title: t('menu.rescue.statistics.eleName'),
        dataIndex: 'elevatorName',
        align:'left',
        headerCellClass: 'body-cell-class',
        ellipsis: true,
        tooltip: true,
      },
      {
        title: t('menu.rescue.statistics.eleAddress'),
        dataIndex: 'address',
        align:'left',
        headerCellClass: 'body-cell-class',
        ellipsis: true,
        tooltip: true,
      },
      {
        title: t('menu.rescue.statistics.useUnit'),
        dataIndex: 'propertyName',
        align:'left',
        headerCellClass: 'body-cell-class',
        ellipsis: true,
        tooltip: true,
      },
      {
        title: t('menu.rescue.statistics.mainUnit'),
        dataIndex: 'maintainName',
        align:'left',
        headerCellClass: 'body-cell-class',
        ellipsis: true,
        tooltip: true,
      },
      {
        title: t('menu.rescue.statistics.kunrenNum'),
        dataIndex: 'trappedNum',
        align:'center',
        headerCellClass: 'body-cell-class',
      },
    ]);

    const fetchData = async (
        params = { page: 1, size: 20, startTime, endTime, orgIds:'', ownerIds:''}
    ) => {
        setLoading(true);
        try {
          let objParams: any = {}
          Object.assign(objParams,params,props.parentParams)
          
          const { data } = await getRescueWarningEleList(objParams);
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
        'startTime':startTime,
        'endTime':endTime,
        'page':page,
        'size':pagination.pageSize
      });
    };

    fetchData();

    const parentSearch = () => {
        fetchData({
          ...props.parentParams,
          'startTime':startTime,
          'endTime':endTime,
          'page': 1,
          'size': pagination.pageSize
        });

        gettongji()
    };

    const gettongji = async () => {
      const params: any = {};

      Object.assign(params,props.parentParams)

      // if(params.orgIds !== ''){
      //     if(params.ownerIds !== ''){
      //         params.ownerIds += `,${params.orgIds}`
      //     }else {
      //         params.ownerIds = params.orgIds
      //     }
      // }

      const { data } = await getRescueWarningEleStat({
        ...params,
        'startTime':startTime,
        'endTime':endTime,
      });
      if(data != null){
        eleTotal.value = data.eleNum
        kunrenRate.value = `${data.rateV}%`
      }
    }
    gettongji()


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

    // pageSize改变
const onPageSizeChange = (pageSize: number) => {
  pagination.pageSize=pageSize;
  parentSearch();
};
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
