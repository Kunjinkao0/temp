<template>
  <a-card
    class="general-card"
    :header-style="{ paddingBottom: '12px', fontStyle: 'normal',fontWeight: '700',fontSize: '16px',}"
  >
    <template #title>
      <span class="cu-fontWeight700 cu-font16"> {{$t('menu.rescue.statistics.rescuetimesta.title')}} </span>
    </template>
    <template #extra>
      <a-radio-group
        v-model:model-value="radioType"
        type="button"
        @change="(typeChange as any)"
      >
        <a-radio value="day">
          {{ $t('menu.rescue.statistics.day') }}
        </a-radio>
        <a-radio value="week">
          {{ $t('menu.rescue.statistics.week') }}
        </a-radio>
        <a-radio value="month">
          {{ $t('menu.rescue.statistics.month') }}
        </a-radio>
        <a-radio value="year">
          {{ $t('menu.rescue.statistics.year') }}
        </a-radio>
      </a-radio-group>
    </template>
    <div>
      <div class="cu-fy-between-center-lr">
        <div>
          <a-space size="mini">
            <a-image :src="rescueTimePic"></a-image>
            <a-space direction="vertical" fill>
              <span class="cu-font14 cu-fontWeight600">{{$t('menu.rescue.statistics.avgtime1')}}</span>
              <span><span class="cu-font14 cu-fontWeight600 cu-color-165DFF">{{respNum}} </span>{{$t('menu.rescue.statistics.minutes')}}</span>
            </a-space>
          </a-space>
        </div>
        <div>
          <a-space size="medium">
            <EcharsPie :pie-data="pieData1" :title="$t(tip)" :type-name="$t('menu.rescue.statistics.lt15')" :color="['#00B42A','#dbdbdc']"></EcharsPie>
            <EcharsPie :pie-data="pieData2" :title="$t(tip)" :type-name="$t('menu.rescue.statistics.15to30')" :color="['#F77234','#dbdbdc']"></EcharsPie>
            <EcharsPie :pie-data="pieData3" :title="$t(tip)" :type-name="$t('menu.rescue.statistics.gt30')" :color="['#722ED1','#dbdbdc']"></EcharsPie>
        </a-space>
        </div>
      </div>
      <a-divider dashed />
      <div class="cu-fy-between-center-lr">
        <div>
          <a-space size="mini">
            <a-image :src="rescueTimePic"></a-image>
            <a-space direction="vertical" fill>
              <span class="cu-font14 cu-fontWeight600">{{$t('menu.rescue.statistics.avgtime2')}}</span>
              <span><span class="cu-font14 cu-fontWeight600 cu-color-165DFF">{{arriNum}} </span>{{$t('menu.rescue.statistics.minutes')}}</span>
            </a-space>
          </a-space>
        </div>
        <div>
          <a-space size="medium">
            <EcharsPie :pie-data="pieData4" :title="$t(tip1)" :type-name="$t('menu.rescue.statistics.lt15')" :color="['#00B42A','#dbdbdc']"></EcharsPie>
            <EcharsPie :pie-data="pieData5" :title="$t(tip1)" :type-name="$t('menu.rescue.statistics.15to30')" :color="['#F77234','#dbdbdc']"></EcharsPie>
            <EcharsPie :pie-data="pieData6" :title="$t(tip1)" :type-name="$t('menu.rescue.statistics.gt30')" :color="['#722ED1','#dbdbdc']"></EcharsPie>
        </a-space>
        </div>
      </div>
      <a-divider dashed />
      <div class="cu-fy-between-center-lr">
        <div>
          <a-space size="mini">
            <a-image :src="rescueTimePic"></a-image>
            <a-space direction="vertical" fill>
              <span class="cu-font14 cu-fontWeight600">{{$t('menu.rescue.statistics.avgtime3')}}</span>
              <span><span class="cu-font14 cu-fontWeight600 cu-color-165DFF">{{compNum}} </span>{{$t('menu.rescue.statistics.minutes')}}</span>
            </a-space>
          </a-space>
        </div>
        <div>
          <a-space size="medium">
            <EcharsPie :pie-data="pieData7" :title="$t(tip2)" :type-name="$t('menu.rescue.statistics.lt30')" :color="['#00B42A','#dbdbdc']"></EcharsPie>
            <EcharsPie :pie-data="pieData8" :title="$t(tip2)" :type-name="$t('menu.rescue.statistics.30to120')" :color="['#F77234','#dbdbdc']"></EcharsPie>
            <EcharsPie :pie-data="pieData9" :title="$t(tip2)" :type-name="$t('menu.rescue.statistics.gt120')" :color="['#722ED1','#dbdbdc']"></EcharsPie>
        </a-space>
        </div>
      </div>
    </div>
  </a-card>

</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import rescueTimePic from '@/assets/images/rescue/rescueTime.png';  
  import moment from 'moment'
  import { getFirstDayOfWeek,getFirstDayOfMonth,getFirstDayOfYear } from '@/utils/dateuUils'
  import { getRescueDurationStat } from '@/api/rescue/rescueStatistics'
  import useThemes from '@/hooks/themes';
  import useLoading from '@/hooks/loading';
  import EcharsPie from './echarsPie.vue'

  const { loading, setLoading } = useLoading(true);
  const props = defineProps(['parentParams'])

  const radioType = ref('day');

  const compNum = ref(0)
  const arriNum = ref(0)
  const respNum = ref(0)

  const pieData1 = ref([])

  const pieData2 = ref([])

  const pieData3 = ref([])

  const pieData4 = ref([])

  const pieData5 = ref([])

  const pieData6 = ref([])

  const pieData7 = ref([])

  const pieData8 = ref([])

  const pieData9 = ref([])

  let tip =""
  
  let tip1 =""
  
  let tip2 =""
  
  const searchParams:any = ref({})

  const init = async () => {
    const nowdate = new Date();
    searchParams.value.endTime = moment(nowdate).subtract(0, 'day').format('YYYY-MM-DD');
    searchParams.value.startTime = searchParams.value.endTime;
    tip ="menu.rescue.statistics.today.avg.time1";
    tip1 ="menu.rescue.statistics.today.avg.time2";
    tip2 ="menu.rescue.statistics.today.avg.time3";
    searchData(searchParams.value)
  }

  const searchData = async (params) => {
    setLoading(true);
    try {
      compNum.value = 0
      arriNum.value = 0
      respNum.value = 0

      let objParams = {}
      Object.assign(objParams,props.parentParams,params)

      const { data } = await getRescueDurationStat(objParams);
      
      if(data.respNum){
        const respTotalNum:number = data.respNum.lt15 + data.respNum.lt30 + data.respNum.gt30
        if(data.respNum.avgTime){
          respNum.value = data.respNum.avgTime
        }
        
        const lt15Value1: any = (data.respNum.lt15 / respTotalNum);
        const lt15Value2 = 1 - lt15Value1;
        pieData1.value = [
          { value: lt15Value1, name: '<15分钟占比' },
          { value: lt15Value2, name: '非<15分钟占比' },
        ]

        const lt30Value1: any = (data.respNum.lt30 / respTotalNum);
        const lt30Value2 = 1 - lt30Value1;
        pieData2.value = [
          { value: lt30Value1, name: '15-30分钟占比' },
          { value: lt30Value2, name: '非15-30分钟占比' },
        ]

        const gt30Value1: any = (data.respNum.gt30 / respTotalNum);
        const gt30Value2 = 1 - gt30Value1;
        pieData3.value = [
          { value: gt30Value1, name: '>30分钟占比' },
          { value: gt30Value2, name: '非>30分钟占比' },
        ]
      }

      if(data.arriNum){
        const arriTotalNum:number = data.arriNum.lt15 + data.arriNum.lt30 + data.arriNum.gt30;
        if(data.arriNum.avgTime){
          arriNum.value = data.arriNum.avgTime
        }

        const lt15Value1: any = (data.arriNum.lt15 / arriTotalNum).toFixed(2);
        const lt15Value2 = 1 - lt15Value1;
        pieData4.value = [
          { value: lt15Value1, name: '<15分钟占比' },
          { value: lt15Value2, name: '非<15分钟占比' },
        ]

        const lt30Value1: any = (data.arriNum.lt30 / arriTotalNum).toFixed(2);
        const lt30Value2 = 1 - lt30Value1;
        pieData5.value = [
          { value: lt30Value1, name: '15-30分钟占比' },
          { value: lt30Value2, name: '非15-30分钟占比' },
        ]

        const gt30Value1: any = (data.arriNum.gt30 / arriTotalNum).toFixed(2);
        const gt30Value2 = 1 - gt30Value1;
        pieData6.value = [
          { value: gt30Value1, name: '>30分钟占比' },
          { value: gt30Value2, name: '非>30分钟占比' },
        ]
      }
      
      if(data.compNum !== ''){
        const compTotalNum:number = data.compNum.lt30 + data.compNum.lt120 + data.compNum.gt120;
        if(data.compNum.avgTime){
          compNum.value = data.compNum.avgTime
        }
        
        const lt30Value1: any = (data.compNum.lt30 / compTotalNum).toFixed(2);
        const lt30Value2 = 1 - lt30Value1;
        pieData7.value = [
          { value: lt30Value1, name: '<30分钟占比' },
          { value: lt30Value2, name: '非<30分钟占比' },
        ]

        const lt120Value1: any = (data.compNum.lt120 / compTotalNum).toFixed(2);
        const lt120Value2 = 1 - lt120Value1;
        pieData8.value = [
          { value: lt120Value1, name: '30-120分钟占比' },
          { value: lt120Value2, name: '非30-120分钟占比' },
        ]

        const gt120Value1: any = (data.compNum.gt120 / compTotalNum).toFixed(2);
        const gt120Value2 = 1 - gt120Value1;
        pieData9.value = [
          { value: gt120Value1, name: '>120分钟占比' },
          { value: gt120Value2, name: '非>120分钟占比' },
        ]
      }
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
    
  }

  init()

  const typeChange = (contentType: string) => {
    const nowdate = new Date();
    if(contentType === 'day'){
      searchParams.value.startTime = moment(nowdate).subtract(0, 'day').format('YYYY-MM-DD');
      searchData(searchParams.value);
      tip ="menu.rescue.statistics.today.avg.time1";
      tip1 ="menu.rescue.statistics.today.avg.time2";
      tip2 ="menu.rescue.statistics.today.avg.time3";
    } else if (contentType === 'week') {
      searchParams.value.startTime = getFirstDayOfWeek(nowdate);
      searchData(searchParams.value);
      tip ="menu.rescue.statistics.week.avg.time1";
      tip1 ="menu.rescue.statistics.week.avg.time2";
      tip2 ="menu.rescue.statistics.week.avg.time3";
    } else if (contentType === 'month') {
      searchParams.value.startTime = getFirstDayOfMonth(nowdate);
      searchData(searchParams.value);
      tip ="menu.rescue.statistics.month.avg.time1";
      tip1 ="menu.rescue.statistics.month.avg.time2";
      tip2 ="menu.rescue.statistics.month.avg.time3";
    } else if (contentType === 'year') {
      searchParams.value.startTime = getFirstDayOfYear(nowdate);
      searchData(searchParams.value);
      tip ="menu.rescue.statistics.year.avg.time1";
      tip1 ="menu.rescue.statistics.year.avg.time2";
      tip2 ="menu.rescue.statistics.year.avg.time3";
    }
  };

  const parentSearch = (formParams) => {
    formParams.endTime =  searchParams.value.endTime
    formParams.startTime = searchParams.value.startTime
    searchData(formParams);
  }
  
  const { isDark } = useThemes();

  defineExpose({ parentSearch })
</script>
<style>
  .content-wrap {
    width: 100%;
    padding: 16px;
    white-space: nowrap;
  }
  :deep(.content) {
    float: left;
    width: 108px;
    height: 102px;
  }
</style>
