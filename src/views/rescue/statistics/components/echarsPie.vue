<template>
    <Chart width="48px" height="48px" :option="chartOption" />
</template>

<script lang="ts" setup>
  import useChartOption from '@/hooks/chart-option';

  const props = defineProps(['title','typeName','color','pieData'])

  const { chartOption } = useChartOption(() => {
      return {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {d}%"
          },
          graphic:{
            type:"text",
            left:"center",
            top:"center",
            style: {
              text:props.typeName,
              textAlign:"center",
              fill:"#010101",
              fontSize: 9
            }
          },
          color: props.color,
          series: [
            {
              name: props.title,
              type: 'pie',
              radius: ['100%', '80%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              labelLine: {
                show: false
              },
              data: props.pieData
            }
          ]
      };
    });
</script>