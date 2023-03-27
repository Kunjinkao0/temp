<template>
    <div class="container">
        <div class="table-div">
          <div>
              <div class="cu-link-vertical"></div>
              <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.maintenance.statistics.mainbefore.score') }}</span>
          </div>
          <a-table :columns="columns" :data="tableDataBf" :pagination="false" :show-header="false"
                        :bordered="{ cell: true }" :hoverable="false" class="cu-mart16" :span-method="spanMethod">
                <template #title="{ record,rowIndex }">
                    <div class="title" v-if="rowIndex!==4">{{record.title}}</div>
                    <div class="total" v-if="rowIndex===4">{{record.title}}</div>
                </template>
          </a-table>

        </div>
        <div class="image-div">
          <a-image :src="vsPic" :preview="false"></a-image>
        </div>
        <div class="table-div">
          <div>
              <div class="cu-link-vertical"></div>
              <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.maintenance.statistics.mainafter.score') }}</span>
          </div>
          <a-table :columns="columns" :data="tableDataAf" :pagination="false" :show-header="false"
                        :bordered="{ cell: true }" :hoverable="false" class="cu-mart16" :span-method="spanMethod">
                <template #title="{ record,rowIndex }">
                    <div class="title" v-if="rowIndex!==4">{{record.title}}</div>
                    <div class="total" v-if="rowIndex===4">{{record.title}}</div>
                </template>
          </a-table>
        </div>
        
    </div>
  </template>
  
  <script lang="ts" setup>
    import vsPic from "@/assets/images/maintenantics/vs.png"
    import { ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import useLoading from '@/hooks/loading';
    
    // 国际化
    const { t } = useI18n();

    const { loading, setLoading } = useLoading(); 


    const tableDataBf = ref([])
    const tableDataAf = ref([])

    const init = (records) =>{
      tableDataBf.value = [{
            title: t('menu.maintenance.statistics.after.falutNum'),
            num: `${records.faultNumBf}次`,
            score: `${records.faultScoreBf}分`,
        },{
            title: t('menu.maintenance.statistics.after.tiringNum'),
            num: `${records.trappedNumBf}次`,
            score: `${records.trappedScoreBf}分`,
        },{
            title: t('menu.maintenance.statistics.after.complaintsNum'),
            num: `${records.complaintNumBf}次`,
            score: `${records.complaintScoreBf}分`,
        },{
            title: t('menu.maintenance.statistics.after.mainNum'),
            num: `${records.repairNumBf}个`,
            score: `${records.repairScoreBf}分`,
        },{
            title: `${records.scoreBf}分`,
        }]

      tableDataAf.value = [{
          title: t('menu.maintenance.statistics.after.falutNum'),
          num: `${records.faultNumAf}次`,
          score: `${records.faultScoreAf}分`,
      },{
          title: t('menu.maintenance.statistics.after.tiringNum'),
          num: `${records.trappedNumAf}次`,
          score: `${records.trappedScoreAf}分`,
      },{
          title: t('menu.maintenance.statistics.after.complaintsNum'),
          num: `${records.complaintNumAf}次`,
          score: `${records.complaintScoreAf}分`,
      },{
          title: t('menu.maintenance.statistics.after.mainNum'),
          num: `${records.repairNumAf}个`,
          score: `${records.repairScoreAf}分`,
      },{
          title: `${records.scoreAf}分`,
      }]
    }

    const columns: any = [
        {
            dataIndex: 'title',
            width: 100,
            slotName: 'title'
        },
        {
            dataIndex: 'num',
            width: 100,
            align: 'center',
        },
        {
            dataIndex: 'score',
            width: 100,
            align: 'center',
        }
    ];

    const spanMethod= ({rowIndex, columnIndex}) => {
      if (rowIndex === 4 && columnIndex === 0) {
        return {
          colspan: 3
        }
      }
      return {};
    };

  
    defineExpose({ init })
  </script>
  
  <script lang="ts">
    export default {
      name: 'Group',
    };
  </script>
  
  <style scoped lang="less">
    .container {
      display: flex;
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

    .image-div{
      display: flex;
      justify-content: center;
      align-items: center;
      width:10%;
    }

    .table-div{
      width:45%;
    }

    :deep(.arco-table-td){
      height: 100%;
    }

    :deep(.arco-table .arco-table-cell){
      height: 100%;
      padding: 0 0;
    }

    .title {
      background: #F7F8FA;
      color: #86909C;
      padding: 11px 14px;
      text-align: right;
    }

    .total{
      padding: 11px 14px;
      text-align: center;
    }
  </style>
  