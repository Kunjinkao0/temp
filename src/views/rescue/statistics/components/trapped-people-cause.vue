<template>
    <a-spin :loading="loading" style="width: 100%">
      <a-card
        class="general-card"
        :header-style="{ paddingBottom: 0 }"
        :body-style="{
          paddingTop: '20px',
          height:'300px'
        }"
      >
      <template #title>
          <span class="cu-fontWeight700 cu-font16"> {{$t('menu.rescue.statistics.trappedPeople.title')}} </span>
        </template>
      <template #extra>
        <span class="cu-font14 cu-fontWeight400 cu-color-1D2129" style="padding-right:25px;">
             {{$t('menu.rescue.statistics.gong')}}<span class="cu-font16 cu-fontWeight600 cu-color-165DFF">{{totalNum}}</span>{{$t('menu.rescue.statistics.kunren')}}
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
        <Chart height="280px" :option="chartOption" v-if="ishavaData"/>
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
    import { getTrappedReasonAnal } from '@/api/rescue/rescueStatistics';
    import moment from 'moment';
    import { getFirstDayOfWeek,getFirstDayOfMonth,getFirstDayOfYear } from '@/utils/dateuUils'
    import { graphic } from 'echarts';
    import useLoading from '@/hooks/loading';
    import useChartOption from '@/hooks/chart-option';
    import { ToolTipFormatterParams } from '@/types/echarts';
    import { AnyObject } from '@/types/global';
    // 父组件参数
    const props = defineProps(['parentParams'])
    // 是否查询到数据
    const ishavaData = ref(false)

    const searchParams:any = ref({})

    const totalNum = ref(0)

    const radioType = ref('day');

    function graphicFactory(side: AnyObject) {
        return {
            type: 'text',
            bottom: '8',
            ...side,
            style: {
                text: '',
                textAlign: 'center',
                fill: '#4E5969',
                fontSize: 12
            }
        };
    }
    const { loading, setLoading } = useLoading(true);
    const xAxis = ref<string[]>([]);
    const chartsData = ref<number[]>([]);
    // const nowdate = new Date();

    const init = async () => {
        const nowdate = new Date();
		searchParams.value.endTime = moment(nowdate).subtract(0, 'day').format('YYYY-MM-DD');
        searchParams.value.startTime = searchParams.value.endTime;
        searchData(searchParams.value);
    };

    const searchData = async (params) => {
        setLoading(true);
        totalNum.value = 0
        xAxis.value = [];
        chartsData.value = [];
        try {
            let objParams = {}
            Object.assign(objParams,props.parentParams,params)

            const { data } = await getTrappedReasonAnal(objParams);
            if (data.length > 0) {
                data.forEach((item) => {
                    totalNum.value += item.v
                    xAxis.value.push(item.n);
                    chartsData.value.push(item.v);
                });
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

    const graphicElements = ref([
        graphicFactory({ left: '2.6%' }),
        graphicFactory({ right: 0 })
    ]);

    const { chartOption } = useChartOption(() => {
        return {
            grid: {
                left: '5%',
                right: '3%',
                top: '10',
                bottom: '50'
            },
            xAxis: {
                type: 'category',
                offset: 2,
                data: xAxis.value,
                boundaryGap: false,
                axisLabel: {
                    interval: 0,
                    color: '#4E5969'/* ,
                    formatter(value: number, idx: number) {
                        if (idx === 0) return '';
                        if (idx === xAxis.value.length - 1) return '';
                        return `${value}`;
                    } */
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    interval: (idx: number) => {
                        if (idx === 0) return false;
                        if (idx === xAxis.value.length - 1) return false;
                        return true;
                    },
                    lineStyle: {
                        color: '#E5E8EF'
                    }
                },
                axisPointer: {
                    show: true,
                    lineStyle: {
                        color: '#23ADFF',
                        width: 2
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    show: false
                },
                axisLabel: {
                    formatter(value: any, idx: number) {
                        if (idx === 0) return value;
                        return `${value}`;
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color: '#E5E8EF'
                    }
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter(params) {
                    const [firstElement] = params as ToolTipFormatterParams[];
                    return `<div>
            <p class="tooltip-title">${firstElement.axisValueLabel}</p>
            <div class="content-panel"><span>困人次数</span><span class="tooltip-value">${Number(
                firstElement.value
            ).toLocaleString()}</span></div>
          </div>`;
                },
                className: 'echarts-tooltip-diy'
            },
            graphic: {
                elements: graphicElements.value
            },
            series: [
                {
                    data: chartsData.value,
                    type: 'line',
                    radius: ['90%', '70%'],
                    center: ['50%', '30%'],
                    smooth: true,
                    symbolSize: 12,
                    emphasis: {
                        focus: 'series',
                        itemStyle: {
                            borderWidth: 2
                        }
                    },
                    lineStyle: {
                        width: 3,
                        color: new graphic.LinearGradient(0, 0, 1, 0, [
                            {
                                offset: 0,
                                color: 'rgba(30, 231, 255, 1)'
                            },
                            {
                                offset: 0.5,
                                color: 'rgba(36, 154, 255, 1)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(111, 66, 251, 1)'
                            }
                        ])
                    },
                    showSymbol: false,
                    areaStyle: {
                        opacity: 0.8,
                        color: new graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgba(17, 126, 255, 0.16)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(17, 128, 255, 0)'
                            }
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
