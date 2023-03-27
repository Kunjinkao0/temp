<template>
<!--    <a-card-->
<!--        class="general-card"-->
<!--        :header-style="{ paddingBottom: '0' }"-->
<!--        :body-style="{ padding: 'unset', height: '19vh' }"-->
<!--    >-->
<!--        <template #title>-->
<!--            <span class="cu-font16 cu-fontWeight500">不文明乘梯趋势</span>-->
<!--        </template>-->

<!--        <Chart :option="chartOption" v-if="ishavaData" />-->

<!--        <div class="no-data" v-if="!ishavaData">-->
<!--          <a-image :src="nodataPic" :preview="false"></a-image>-->
<!--        </div>-->
<!--    </a-card>-->
  <div style="display: flex; flex-direction: column; height: 100%">
    <div style="padding: 20px 0 0 20px">不文明乘梯趋势</div>
    <Chart :option="chartOption" v-if="ishavaData" />
    <div class="no-data" v-if="!ishavaData">
      <a-image :src="nodataPic" :preview="false"></a-image>
    </div>
  </div>
</template>

<script lang="ts" setup>
    import nodataPic from '@/assets/images/no-data.png';
    import { ref } from 'vue'
    import useChartOption from '@/hooks/chart-option';
    import { getEleTypeStat } from '@/api/statistical'
    import { defineProps, toRefs } from 'vue';

    const props = defineProps(['xData', 'yData']);

    const ishavaData = ref(false)
    const maxNum = ref(0)
    const charsDataSet = ref([])
    const charsData = ref([])

    const init = () => {
        loadCharsData()
    }

    const loadCharsData = async () => {
        const { data } = await getEleTypeStat();
        if(data.length > 0){
            data.forEach((val,index)=>{
                // 因为后台接口有排序 所以第一个就是最大的，先这么写
                if(index === 0){
                    maxNum.value = val.v
                }
                charsDataSet.value.push({name:`${val.v}\n${val.n}`, max:maxNum.value})
                charsData.value.push(val.v)
            })
            ishavaData.value = true
        }else {
            ishavaData.value = false
        }
    }

    init()

    const { chartOption } = useChartOption(() => {
        return {grid: {
            // 当图表长度或者宽度被压缩了，设置grid即可
            left: "5%",
            right: "5%",
            bottom: "5%",
            top: "10%",
            containLabel: true,
          },
          xAxis: {
            data: props.xData
          },
          yAxis: {},
            series: [
                {
                    type: 'line',
                    data: props.yData,
                    itemStyle: {
                    normal: {
                      areaStyle: {type: 'default',color:'#d5f0fd'},
                      lineStyle:{color:'#2db7f5'}
                    },
                  },
                  smooth: true
                },
            ]
        };
    });
</script>
