<template>
    <Chart width="352px" height="300px" :option="chartOption" />
</template>

<script lang="ts" setup>
import useChartOption from '@/hooks/chart-option';

const props = defineProps(['xEchartData', 'yEchartData'])

const { chartOption } = useChartOption(() => {
    return { // 波形数据
        xAxis: {
            type: 'category',
            data: props.xEchartData
        },
        yAxis: {
            type: 'value',
            splitLine: { // 背景网格虚线
                show: true,
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        dataZoom: [ // 滚动条
            {
                type: 'inside',
                start: 0,
                end: 100
            },
            {
                start: 0,
                end: 100
            }
        ],
        series: [
            {
                data: props.yEchartData,
                type: 'line',
                // 节点样式
                symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAE/SURBVHgBdZJPTgIxFMZ/bXFQApHoCoHEuAAlunLlzgu49QiexhN4BLdyAC9gQiLxDwuDfyIbdSE6EJhSOzAMnQl+SdvX1/d9fa+vgjQujaocsa76ZFUW/2nAgH0xckNEbLWNV1ZsKyikdcaGj16bN06FXpAsoSqpCUGWfyAU/nOLTkiUoaNqqCYImkMCTqZrBKPJbdQpTQUqr2ZN/tCIFQ3nBo5jAcMF0o4IL7e05PjLqcGqJwizAs7cG8sHFGUmh+fkXWMZ1CytOWTgM3JU31mO3tz4HaLlZgl/waFpRycRPqFp55v5dmsFf/rkO/emFrj9mdiXg5KtryMk13Fa8NndE91MuFnVdL8Vdev0otOr6GZHh1Fez9KP/Q3b4ATRgVXuh8J30XcS6YD6gykMJ+RDe+ihiwGDx13Rd2P+AHXFYlxBmNkhAAAAAElFTkSuQmCC',
                symbolSize: 10,
                itemStyle: {
                    color: '#1ED6FF'
                },
            }
        ]
    };
});
</script>