<template>
    <a-spin :loading="loading" style="width: 100%;height: 100%;">
      <a-card
        class="general-card"
        :header-style="{ paddingBottom: 0 }"
        :body-style="{
          paddingTop: '20px',
          height:'600px',
        }"
      >
        <template #title>
          <span class="cu-fontWeight700 cu-font16"> {{$t('menu.maintenance.statistics.overtime.time')}}</span>
        </template>
        <template #extra>
            <span
                class="cu-font14 cu-fontWeight400 cu-color-1D2129"
                style="padding-right: 25px"
            >
                {{ $t('menu.maintenance.statistics.gong')}}  <span class="cu-font16 cu-fontWeight600 cu-color-165DFF"> {{ totalNum }} </span> {{ $t('menu.maintenance.statistics.buele') }}
            </span>
        </template>

        <Chart :option="chartOption"  v-if="ishavaData"/>
        <div class="no-data" v-if="!ishavaData">
                <a-image :src="nodataPic" :preview="false"></a-image>
            </div>
      </a-card>
    </a-spin>
  </template>
  
  <script lang="ts" setup>
    import nodataPic from '@/assets/images/no-data.png';
    import { ref } from 'vue';
    import { getMainOverTimeStat } from '@/api/maintenance/maintenanceStatistics';
    import useLoading from '@/hooks/loading';
    import useChartOption from '@/hooks/chart-option';
    import { AnyObject } from '@/types/global';
    import { graphic } from 'echarts';

    // 父组件参数
    const props = defineProps(['parentParams'])
    // 是否查询到数据
    const ishavaData = ref(false)
    const totalNum = ref(0)
    const echarsDate = ref([])
    const echarsTitle = ref([])
    function graphicFactory(side: AnyObject) {
      return {
        type: 'text',
        bottom: '8',
        ...side,
        style: {
          text: '',
          textAlign: 'center',
          fill: '#4E5969',
          fontSize: 12,
        },
      };
    }
    const { loading, setLoading } = useLoading(true);

    const fetchData = async () => {
      setLoading(true);
      echarsTitle.value = []
      echarsDate.value = []
      try {
        const params = ref({})
        if(props.parentParams !== undefined){
          params.value = props.parentParams
        }
        
        const { data: chartData } = await getMainOverTimeStat(params.value);
        if(chartData){
          echarsTitle.value.push('小于一个月')
          echarsDate.value.push(chartData.lt1 * 1)

          echarsTitle.value.push('1-3个月')
          echarsDate.value.push(chartData.gt1 * 1)

          echarsTitle.value.push('3-6个月')
          echarsDate.value.push(chartData.gt3 * 1)

          echarsTitle.value.push('半年-1年')
          echarsDate.value.push(chartData.gt6 * 1)

          echarsTitle.value.push('一年以上')
          echarsDate.value.push(chartData.gt12 * 1)

          totalNum.value = chartData.lt1 * 1 + chartData.gt1 * 1 + chartData.gt3 * 1 + chartData.gt6 * 1 + chartData.gt12 * 1
          ishavaData.value = true
        }else {
          ishavaData.value = false
        }
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    const { chartOption } = useChartOption(() => {
      return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
            type: 'category',
            data: echarsTitle.value,
            axisTick: {
                alignWithLabel: true
            }
            }
        ],
        yAxis: [
            {
            type: 'value'
            }
        ],
        series: [
            {
            name: '电梯部数',
            type: 'bar',
            barWidth: '28%',
            data: echarsDate.value,
            itemStyle: {
              color: new graphic.LinearGradient(0, 0, 0, 1,
                        [
                            {offset: 0, color: '#165DFF'},
                            {offset: 1, color: '#3491FA'}
                        ]
                    )
            }
            }
        ],
        };
    });

    defineExpose({ fetchData })
  </script>
  
  <style scoped lang="less">
  </style>
