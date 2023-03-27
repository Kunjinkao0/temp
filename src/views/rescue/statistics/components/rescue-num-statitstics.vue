<template>
    <a-spin :loading="loading" style="width: 100%; height: 100%">
        <a-card
            class="general-card"
            :header-style="{ paddingBottom: 0 }"
            :body-style="{
                height: '309px'
            }"
        >
            <template #title>
                <span class="cu-fontWeight700 cu-font16">
                    {{ $t('menu.rescue.statistics.rescueNum.title') }}
                </span>
            </template>
            <template #extra>
                <span
                    class="cu-font14 cu-fontWeight400 cu-color-1D2129"
                    style="padding-right: 25px"
                >
                    {{ $t('menu.rescue.statistics.gong')
                    }}<span
                        class="cu-font16 cu-fontWeight600 cu-color-165DFF">{{ totalNum }}</span>{{ $t('menu.rescue.statistics.jiuyuan') }}
                </span>
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
            <Chart :option="chartOption"  v-if="ishavaData"/>
            <div class="no-data" v-if="!ishavaData">
                <a-image :src="nodataPic" :preview="false"></a-image>
                <span class="cu-font14 cu-color-86909c cu-mart12">{{$t('no-data')}}</span>
            </div>
        </a-card>
    </a-spin>
</template>

<script lang="ts" setup>
    import nodataPic from '@/assets/images/no-data.png';
    import { ref } from 'vue';
    import useLoading from '@/hooks/loading';
    import moment from 'moment';
    import { getFirstDayOfWeek,getFirstDayOfMonth,getFirstDayOfYear } from '@/utils/dateuUils'
    import { getRescueTimesStat } from '@/api/rescue/rescueStatistics';
    import useChartOption from '@/hooks/chart-option';
    import { graphic } from 'echarts';

    // 父组件参数
    const props = defineProps(['parentParams'])
    // 是否查询到数据
    const ishavaData = ref(false)
    const { loading, setLoading } = useLoading();
    const totalNum = ref(0);
    const radioType = ref('day');
    const echarsDate = ref([]);
    const echarsTitle = ref([]);
    const searchParams:any = ref({})

    const init = async () => {
        const nowdate = new Date();
        searchParams.value.endTime = moment(nowdate).subtract(0, 'day').format('YYYY-MM-DD');
        searchParams.value.startTime = moment(nowdate).subtract(0, 'day').format('YYYY-MM-DD');
        searchData(searchParams.value);
    };

    const searchData = async (params:any) => {
        setLoading(true);
        echarsDate.value = []
        echarsTitle.value = []
        totalNum.value = 0
        try {
            let objParams: any = {}
            Object.assign(objParams,props.parentParams,params)

            if(objParams.ownerId === '0,1' || objParams.ownerId === ''){
                objParams.orgIds = '-1'
            }

            if(objParams.ownerIds1 === ''){
                objParams.ownerIds = ''
            }else{
                objParams.ownerIds = objParams.ownerIds1
            }

            objParams.page = 1
            objParams.size = 10

            const { data } = await getRescueTimesStat(objParams);
            if(data.length > 0){
              let charsData = []
              if(data.length>10){
                charsData = data.slice(0,10)
              }else{
                charsData = data
              }
              charsData.forEach(item => {
                totalNum.value += item.num
                echarsTitle.value.push(item.name)
                echarsDate.value.push(item.num)
              });
              ishavaData.value = true
            }else{
              ishavaData.value = false
            }
        } catch (err) {
            // you can report use errorHandler or other
        } finally {
            setLoading(false);
        }
    };

    init();

    const typeChange = (contentType: string) => {
        const nowdate = new Date();
        if (contentType === 'day') {
            searchParams.value.startTime = moment(nowdate).subtract(0, 'day').format('YYYY-MM-DD');
            searchData(searchParams.value);
        } else if (contentType === 'week') {
            searchParams.value.startTime = getFirstDayOfWeek(nowdate);
            searchData(searchParams.value);
        } else if (contentType === 'month') {
            searchParams.value.startTime = getFirstDayOfMonth(nowdate);
            searchData(searchParams.value);
        } else if (contentType === 'year') {
            searchParams.value.startTime = getFirstDayOfYear(nowdate);
            searchData(searchParams.value);
        }
    };

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
                    name: '救援次数',
                    type: 'bar',
                    barWidth: '28%',
                    data: echarsDate.value,
                    itemStyle: {
                      color: new graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#722ED1' },
                                { offset: 1, color: '#3491FA' },
                            ])
                    }
                }
            ]
        };
    });

    const parentSearch = (formParams) => {
        formParams.endTime =  searchParams.value.endTime
        formParams.startTime = searchParams.value.startTime
        searchData(formParams);
    }
    
    defineExpose({ parentSearch })
</script>

<style scoped lang="less"></style>
