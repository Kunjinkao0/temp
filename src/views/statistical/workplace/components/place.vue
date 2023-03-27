<template>
    <a-card
        class="general-card"
        :header-style="{ paddingBottom: '0' }"
        :body-style="{ padding: 'unset', height: '328px' }"
    >
        <template #title>
            <span class="cu-font16 cu-fontWeight600">{{
                $t('workplace.place')
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
    import { ref } from 'vue'
    import useChartOption from '@/hooks/chart-option';
    import { getEleTypeStat } from '@/api/statistical'

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
        return {
            radar: {
                indicator: charsDataSet.value,
                radius:'45%',
                center: ['50%', '40%'],
                textStyle: {
                    fontSize: 10,
                },
                subtext: "bb",
                textAlign: "center",
                nameGap: 5,
            },
            series: [
                {
                    name: 'Budget vs spending',
                    areaStyle: { color: 'rgba(22, 93, 255, 0.2)' },
                    type: 'radar',
                    data: [
                        {
                            value: charsData.value,
                            name: 'Allocated Budget'
                        }
                    ]
                }
            ]
        };
    });
</script>
