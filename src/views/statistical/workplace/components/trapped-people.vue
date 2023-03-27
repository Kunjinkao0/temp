<template>
    <a-spin :loading="loading" style="width: 100%">
        <a-card
            class="general-card"
            :header-style="{ paddingBottom: 0 }"
            :body-style="{
                paddingTop: '60px',
                height: '380px'
            }"
        >
            <template #title>
                <span class="cu-fontWeight700 cu-font16">
                    {{ $t('menu.rescue.statistics.trappedPeople.title') }}
                </span>
            </template>
            <template #extra>
                <a-radio-group
                    v-model:model-value="radioType"
                    type="button"
                    size="mini"
                    @change="typeChange"
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
            <Chart v-if="ishavaData" height="280px" :option="chartOption" />
            <div class="no-data" v-if="!ishavaData">
                <a-image :src="nodataPic" :preview="false"></a-image>
            </div>
        </a-card>
    </a-spin>
</template>

<script lang="ts" setup>
    import nodataPic from '@/assets/images/no-data.png';
    import { ref } from 'vue';
    import { getTrappedReasonAnal } from '@/api/statistical';
    import moment from 'moment';
    import { getFirstDayOfWeek,getFirstDayOfMonth,getFirstDayOfYear } from '@/utils/dateuUils'
    import { graphic } from 'echarts';
    import useLoading from '@/hooks/loading';
    import useChartOption from '@/hooks/chart-option';
    import { ToolTipFormatterParams } from '@/types/echarts';
    import { AnyObject } from '@/types/global';

    const radioType = ref('day');
    const ishavaData = ref(false)

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
        const params: any = {};
		const nowdate = new Date();
        params.endTime = moment(nowdate).subtract(0, 'day').format('YYYY-MM-DD');
        params.startTime = params.endTime;
        searchData(params);
    };

    const searchData = async (params) => {
        setLoading(true);
        try {
            const { data } = await getTrappedReasonAnal(params);
            if (data !== null && data.length >0) {
                ishavaData.value = true
                data.forEach((item) => {
                    xAxis.value.push(item.n);
                    chartsData.value.push(item.v);
                });
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
        xAxis.value = [];
        chartsData.value = [];
        const params: any = {};
		const nowdate = new Date();
		
		params.endTime = moment(nowdate).subtract(0, 'day').format('YYYY-MM-DD');
        if (contentType === 'day') {
            params.startTime = moment(nowdate).subtract(0, 'day').format('YYYY-MM-DD');
            searchData(params);
        } else if (contentType === 'week') {
            params.startTime = getFirstDayOfWeek(nowdate);
            searchData(params);
        } else if (contentType === 'month') {
            params.startTime = getFirstDayOfMonth(nowdate);
            searchData(params);
        } else if (contentType === 'year') {
            params.startTime = getFirstDayOfYear(nowdate);
            searchData(params);
        }
    };

    const graphicElements = ref([
        graphicFactory({ left: '2.6%' }),
        graphicFactory({ right: 0 })
    ]);

    const { chartOption } = useChartOption(() => {
        return {
            grid: {
                left: '3%',
                right: '3%',
                top: '10',
                bottom: '10',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                offset: 2,
                data: xAxis.value,
                boundaryGap: false,
                axisLabel: {
                    color: '#4E5969',
                    interval: 0/* ,
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
                emphasis: {
                    focus: 'series',
                    itemStyle: {
                        borderWidth: 2,
                    },
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
                minInterval: 1,
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
                    radius: ['100%', '100%'],
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
</script>

<style scoped lang="less"></style>
