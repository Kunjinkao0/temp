<template>
    <div class="container">
        <a-table :columns="columns" :data="tableData" :pagination="false" :show-header="false"
                        :bordered="{ cell: true }" :hoverable="false" class="cu-mart16" />
    </div>
  </template>
  
  <script lang="ts" setup>
    import { ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    
    // 国际化
    const { t } = useI18n();

    const tableData = ref([])

    const init = (record) =>{
      tableData.value = [{
            title: t('menu.maintenance.statistics.under.state'),
            score: `${record.stateScore}分`,
        },{
            title: t('menu.maintenance.statistics.under.time'),
            score: `${record.useTimeScore}分`,
        },{
            title: t('menu.maintenance.statistics.under.distance'),
            score: `${record.disScore}分`,
        },{
            title: t('menu.maintenance.statistics.under.star'),
            score: `${record.evaStateScore}分`,
        }]
    }

    const columns: any = [
        {
            dataIndex: 'title',
            width: 100,
            align: 'right',
            cellStyle: {
                background: '#F7F8FA',
                color: '#86909C'
            }
        },
        {
            dataIndex: 'score',
            width: 100,
        }
    ];
    defineExpose({ init })
  </script>
  
  <script lang="ts">
    export default {
      name: 'Group',
    };
  </script>
  
  <style scoped lang="less">
    .container {
      padding: 0 20px 40px 20px;
      overflow: hidden;
    }
  
    .actions {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 60px;
      padding: 14px 20px 14px 0;
      background: var(--color-bg-2);
      text-align: right;
    }

  </style>
  