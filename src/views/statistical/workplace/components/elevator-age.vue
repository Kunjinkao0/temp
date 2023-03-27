<template>
    <a-card
        class="general-card"
        :header-style="{ paddingBottom: '0' }"
        :body-style="{ padding: '20px', height: '328px' }"
    >
        <template #title>
            <span class="cu-font16 cu-fontWeight600">{{
                $t('workplace.elevator.age')
            }}</span>
        </template>

        <Chart :option="chartOption" v-if="ishavaData"/>

        <div class="no-data" v-if="!ishavaData">
          <a-image :src="nodataPic" :preview="false"></a-image>
        </div>
    </a-card>
</template>

<script lang="ts" setup>
    import nodataPic from '@/assets/images/no-data.png';
    import { ref } from 'vue';
    import useChartOption from '@/hooks/chart-option';
    import { getEleAgeStat } from '@/api/statistical';

    const ishavaData = ref(false)
    const pieData = ref([]);

    const init = async () => {
        const { data } = await getEleAgeStat();
        if (data.lt6 !== null && data.gt6 !== null && data.gt15 !== null) {
            pieData.value = [
                { name: '6年以下', value: data.lt6 },
                { name: '6-15年',value: data.gt6 },
                { name: '15年以上', value: data.gt15 }
            ];
            ishavaData.value = true
        }else {
            ishavaData.value = false
        }
    };

    init();

    const { chartOption } = useChartOption(() => {
        return {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                bottom: '5%',
                left: 'center',
                width: '100%',
                icon: 'circle',
                padding: 16,
                itemHeight: 10,
                itemWidth: 10,
                align:'left',
                backgroundColor:'#E8F3FF',
                formatter: (name) => {
                    let peidata = pieData.value;
                    let total = 0;
                    let target;
                    peidata.forEach((item) => {
                        total = item.value;
                        if (item.name === name) {
                            target = item.value;
                        }
                    });
                    let arr = [ `{a|${target}部}\n`,`{b|${name}}`];
                    return arr.join('');
                },
                textStyle: {
                    padding:[0,0,0,0],
                    rich: {
                        a: {
                            fontSize: 12,
                            width:30,
                            fontWeight: 600
                        },
                        b: {
                            fontSize: 10,
                            width:30,
                            padding:[20,0,30,0],
                        }
                    }
                }
            },
            color: [
                '#2FC25B',
                '#399EFB',
                '#F53F3F',
            ],
            series: [
                {
                    type: 'pie',
                    radius: ['70%', '50%'],
                    center: ['50%', '35%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
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
                    data: pieData.value
                }
            ]
        };
    });
</script>
