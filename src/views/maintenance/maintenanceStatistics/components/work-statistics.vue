<template>
  <a-card
    class="general-card"
    :header-style="{ paddingBottom: '12px'}"
  >
    <template #title>
      <span class="cu-fontWeight700 cu-font16"> {{$t('menu.maintenance.statistics.work.title')}} </span>
    </template>
    <a-grid :cols="24" :col-gap="12" :row-gap="12">
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 }">
        <a-card :title="$t('menu.maintenance.statistics.work.today.title')" :bordered="false" 
            :style="{background: 'url(' + usePub2('cardbackgroud.png', 'maintenantics') + ') no-repeat,linear-gradient(90deg, #7BC0FC 0%, #6AA1FF 99.76%)',backgroundSize: '100%',borderRadius: '5px'}"
            :header-style="cardHeaderStyle"
            :body-style="bodyStyle"
            >
          <template #title>
            <span class="cu-fontWeight700 cu-font14 font-color-FFFFFF"> {{$t('menu.maintenance.statistics.work.today.title')}} </span>
          </template>
          <div class="content-wrap">
            <div class="content">
              <a-space direction="vertical" fill>
                <a-card  :body-style="cradBodyStyle" :style="cradStyle" :bordered="false">
                  <div class="cu-fy-between-center-lr">
                    <span class="cu-fy-between-center-lr">
                      <a-avatar class="avatar cu-bgcolor-7BC0FC-3491FA" :size="24"><a-image :src="planNumPic" :preview="false"></a-image></a-avatar>
                      <a-typography-text class="cu-font12 cu-marl8">{{$t('menu.maintenance.statistics.work.planNum')}}</a-typography-text>
                    </span>
                    <a-typography-text>
                      <a-statistic :value="planNum.dayNum" :value-from="0" :start="true" :value-style="{ fontSize:'14px' }" animation>
                        <template #suffix>
                          <span class="cu-font12 cu-fontWeight600">{{$t('menu.rescue.statistics.single')}}</span>
                        </template>
                      </a-statistic>
                    </a-typography-text>
                  </div>
                </a-card>
                <a-card  :body-style="cradBodyStyle" :style="cradStyle" :bordered="false">
                  <div class="cu-fy-between-center-lr">
                    <span class="cu-fy-between-center-lr">
                      <a-avatar class="avatar cu-bgcolor-7BC0FC-3491FA" :size="24"><a-image :src="orderNumPic" :preview="false"></a-image></a-avatar>
                      <a-typography-text class="cu-font12 cu-marl8">{{$t('menu.maintenance.statistics.work.orderNum')}}</a-typography-text>
                    </span>
                    <a-typography-text>
                      <a-statistic :value="revNum.dayNum" :value-from="0" :start="true" :value-style="{ fontSize:'14px' }" animation>
                        <template #suffix>
                          <span class="cu-font12 cu-fontWeight600">{{$t('menu.rescue.statistics.single')}}</span>
                        </template>
                      </a-statistic>
                    </a-typography-text>
                  </div>
                </a-card>
                <a-card  :body-style="cradBodyStyle" :style="cradStyle" :bordered="false">
                  <div class="cu-fy-between-center-lr">
                    <span class="cu-fy-between-center-lr">
                      <a-avatar class="avatar cu-bgcolor-7BC0FC-3491FA" :size="24"><a-image :src="finishNumPic" :preview="false"></a-image></a-avatar>
                      <a-typography-text class="cu-font12 cu-marl8">{{$t('menu.maintenance.statistics.work.finishNum')}}</a-typography-text>
                    </span>
                    <a-typography-text>
                      <a-statistic :value="compNum.dayNum" :value-from="0" :start="true" :value-style="{ fontSize:'14px' }" animation>
                        <template #suffix>
                          <span class="cu-font12 cu-fontWeight600">{{$t('menu.rescue.statistics.single')}}</span>
                        </template>
                      </a-statistic>
                    </a-typography-text>
                  </div>
                </a-card>
                <a-card  :body-style="cradBodyStyle" :style="cradStyle" :bordered="false">
                  <div class="cu-fy-between-center-lr">
                    <span class="cu-fy-between-center-lr">
                      <a-avatar class="avatar cu-bgcolor-7BC0FC-3491FA" :size="24"><a-image :src="evaluateNumPic" :preview="false"></a-image></a-avatar>
                      <a-typography-text class="cu-font12 cu-marl8">{{$t('menu.maintenance.statistics.work.evaluateNum')}}</a-typography-text>
                    </span>
                    <a-typography-text>
                      <a-statistic :value="evaNum.dayNum" :value-from="0" :start="true" :value-style="{ fontSize:'14px' }" animation>
                        <template #suffix>
                          <span class="cu-font12 cu-fontWeight600">{{$t('menu.rescue.statistics.single')}}</span>
                        </template>
                      </a-statistic>
                    </a-typography-text>
                  </div>
                </a-card>
              </a-space>
            </div>
          </div>
        </a-card>
        
      </a-grid-item>
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 }">
        <a-card :title="$t('menu.maintenance.statistics.work.month.title')" :bordered="false" 
        :style="{background: 'url(' + usePub2('cardbackgroud.png', 'maintenantics') + ') no-repeat,linear-gradient(90deg, #4CD263 0%, #5EDFD6 100%)',backgroundSize: '100%',borderRadius: '5px'}"
        :header-style="cardHeaderStyle"
        :body-style="bodyStyle">
          <template #title>
            <span class="cu-fontWeight700 cu-font14 font-color-FFFFFF"> {{$t('menu.maintenance.statistics.work.month.title')}} </span>
          </template>
          <div class="content-wrap">
            <div class="content">
              <a-space direction="vertical" fill>
              <a-card  :body-style="cradBodyStyle" :style="cradStyle" :bordered="false">
                <div class="cu-fy-between-center-lr">
                  <span class="cu-fy-between-center-lr">
                    <a-avatar class="avatar cu-bgcolor-4CD263-00B42A" :size="24"><a-image :src="planNumPic" :preview="false"></a-image></a-avatar>
                    <a-typography-text class="cu-font12 cu-marl8">{{$t('menu.maintenance.statistics.work.planNum')}}</a-typography-text>
                  </span>
                  <a-typography-text>
                      <a-statistic :value="planNum.monthNum" :value-from="0" :start="true" :value-style="{ fontSize:'14px' }" animation>
                        <template #suffix>
                          <span class="cu-font12 cu-fontWeight600">{{$t('menu.rescue.statistics.single')}}</span>
                        </template>
                      </a-statistic>
                    </a-typography-text>
                </div>
              </a-card>
              <a-card  :body-style="cradBodyStyle" :style="cradStyle" :bordered="false">
                <div class="cu-fy-between-center-lr">
                  <span class="cu-fy-between-center-lr">
                    <a-avatar class="avatar cu-bgcolor-4CD263-00B42A" :size="24"><a-image :src="orderNumPic" :preview="false"></a-image></a-avatar>
                    <a-typography-text class="cu-font12 cu-marl8">{{$t('menu.maintenance.statistics.work.orderNum')}}</a-typography-text>
                  </span>
                  <a-typography-text>
                      <a-statistic :value="revNum.monthNum" :value-from="0" :start="true" :value-style="{ fontSize:'14px' }" animation>
                        <template #suffix>
                          <span class="cu-font12 cu-fontWeight600">{{$t('menu.rescue.statistics.single')}}</span>
                        </template>
                      </a-statistic>
                    </a-typography-text>
                </div>
              </a-card>
              <a-card  :body-style="cradBodyStyle" :style="cradStyle" :bordered="false">
                <div class="cu-fy-between-center-lr">
                  <span class="cu-fy-between-center-lr">
                    <a-avatar class="avatar cu-bgcolor-4CD263-00B42A" :size="24"><a-image :src="finishNumPic" :preview="false"></a-image></a-avatar>
                    <a-typography-text class="cu-font12 cu-marl8">{{$t('menu.maintenance.statistics.work.finishNum')}}</a-typography-text>
                  </span>
                  <a-typography-text>
                      <a-statistic :value="compNum.monthNum" :value-from="0" :start="true" :value-style="{ fontSize:'14px' }" animation>
                        <template #suffix>
                          <span class="cu-font12 cu-fontWeight600">{{$t('menu.rescue.statistics.single')}}</span>
                        </template>
                      </a-statistic>
                    </a-typography-text>
                </div>
              </a-card>
              <a-card  :body-style="cradBodyStyle" :style="cradStyle" :bordered="false">
                <div class="cu-fy-between-center-lr">
                  <span class="cu-fy-between-center-lr">
                    <a-avatar class="avatar cu-bgcolor-4CD263-00B42A" :size="24"><a-image :src="evaluateNumPic" :preview="false"></a-image></a-avatar>
                    <a-typography-text class="cu-font12 cu-marl8">{{$t('menu.maintenance.statistics.work.evaluateNum')}}</a-typography-text>
                  </span>
                  <a-typography-text>
                      <a-statistic :value="evaNum.monthNum" :value-from="0" :start="true" :value-style="{ fontSize:'14px' }" animation>
                        <template #suffix>
                          <span class="cu-font12 cu-fontWeight600">{{$t('menu.rescue.statistics.single')}}</span>
                        </template>
                      </a-statistic>
                    </a-typography-text>
                </div>
              </a-card>
              </a-space>
            </div>
          </div>
        </a-card>
      </a-grid-item>
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 }">
        <a-card :title="$t('menu.maintenance.statistics.work.year.title')" :bordered="false" 
          :style="{background: 'url(' + usePub2('cardbackgroud.png', 'maintenantics') + ') no-repeat,linear-gradient(90deg, #6AA1FF 0%, #A871E3 100%)',backgroundSize: '100%',borderRadius: '5px'}"
          :header-style="cardHeaderStyle"
          :body-style="bodyStyle">
          <template #title>
            <span class="cu-fontWeight700 cu-font14 font-color-FFFFFF"> {{$t('menu.maintenance.statistics.work.year.title')}} </span>
          </template>
          <div class="content-wrap">
            <div class="content">
              <a-space direction="vertical" fill>
              <a-card  :body-style="cradBodyStyle" :style="cradStyle" :bordered="false">
                <div class="cu-fy-between-center-lr">
                  <span class="cu-fy-between-center-lr">
                    <a-avatar class="avatar cu-bgcolor-A871E3-722ED1" :size="24"><a-image :src="planNumPic" :preview="false"></a-image></a-avatar>
                    <a-typography-text class="cu-font12 cu-marl8">{{$t('menu.maintenance.statistics.work.planNum')}}</a-typography-text>
                  </span>
                  <a-typography-text>
                      <a-statistic :value="planNum.yearNum" :value-from="0" :start="true" :value-style="{ fontSize:'14px' }" animation>
                        <template #suffix>
                          <span class="cu-font12 cu-fontWeight600">{{$t('menu.rescue.statistics.single')}}</span>
                        </template>
                      </a-statistic>
                    </a-typography-text>
                </div>
              </a-card>
              <a-card  :body-style="cradBodyStyle" :style="cradStyle" :bordered="false">
                <div class="cu-fy-between-center-lr">
                  <span class="cu-fy-between-center-lr">
                    <a-avatar class="avatar cu-bgcolor-A871E3-722ED1" :size="24"><a-image :src="orderNumPic" :preview="false"></a-image></a-avatar>
                    <a-typography-text class="cu-font12 cu-marl8">{{$t('menu.maintenance.statistics.work.orderNum')}}</a-typography-text>
                  </span>
                  <a-typography-text>
                    <a-statistic :value="revNum.yearNum" :value-from="0" :start="true" :value-style="{ fontSize:'14px' }" animation>
                        <template #suffix>
                          <span class="cu-font12 cu-fontWeight600">{{$t('menu.rescue.statistics.single')}}</span>
                        </template>
                      </a-statistic>
                  </a-typography-text>
                </div>
              </a-card>
              <a-card  :body-style="cradBodyStyle" :style="cradStyle" :bordered="false">
                <div class="cu-fy-between-center-lr">
                  <span class="cu-fy-between-center-lr">
                    <a-avatar class="avatar cu-bgcolor-A871E3-722ED1" :size="24"><a-image :src="finishNumPic" :preview="false"></a-image></a-avatar>
                    <a-typography-text class="cu-font12 cu-marl8">{{$t('menu.maintenance.statistics.work.finishNum')}}</a-typography-text>
                  </span>
                  <a-typography-text>
                      <a-statistic :value="compNum.yearNum" :value-from="0" :start="true" :value-style="{ fontSize:'14px' }" animation>
                        <template #suffix>
                          <span class="cu-font12 cu-fontWeight600">{{$t('menu.rescue.statistics.single')}}</span>
                        </template>
                      </a-statistic>
                    </a-typography-text>
                </div>
              </a-card>
              <a-card  :body-style="cradBodyStyle" :style="cradStyle" :bordered="false">
                <div class="cu-fy-between-center-lr">
                  <span class="cu-fy-between-center-lr">
                    <a-avatar class="avatar cu-bgcolor-A871E3-722ED1" :size="24"><a-image :src="evaluateNumPic" :preview="false"></a-image></a-avatar>
                    <a-typography-text class="cu-font12 cu-marl8">{{$t('menu.maintenance.statistics.work.evaluateNum')}}</a-typography-text>
                  </span>
                  <a-typography-text>
                      <a-statistic :value="evaNum.yearNum" :value-from="0" :start="true" :value-style="{ fontSize:'14px' }" animation>
                        <template #suffix>
                          <span class="cu-font12 cu-fontWeight600">{{$t('menu.rescue.statistics.single')}}</span>
                        </template>
                      </a-statistic>
                    </a-typography-text>
                </div>
              </a-card>
              </a-space>
            </div>
          </div>
        </a-card>
      </a-grid-item>
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 }">
        <a-card :title="$t('menu.maintenance.statistics.work.overtime.title')" :bordered="false" 
          :style="{background: 'url(' + usePub2('cardbackgroud.png', 'maintenantics') + ') no-repeat,linear-gradient(90deg, #F98981 0%, #FAAC7B 100%)',backgroundSize: '100%',borderRadius: '5px'}"
          :header-style="cardHeaderStyle"
          :body-style="bodyStyle">
          <template #title>
            <span class="cu-fontWeight700 cu-font14 font-color-FFFFFF"> {{$t('menu.maintenance.statistics.work.overtime.title')}} </span>
          </template>
          <div class="content-wrap">
            <div class="content">
              <a-space direction="vertical" fill>
              <a-card  :body-style="cradBodyStyle" :style="cradStyle" :bordered="false">
                <div class="cu-fy-between-center-lr">
                  <span class="cu-fy-between-center-lr">
                    <a-avatar class="avatar cu-bgcolor-F98981-F53F3F" :size="24"><a-image :src="dayPic" :preview="false"></a-image></a-avatar>
                    <a-typography-text class="cu-font12 cu-marl8">{{$t('menu.maintenance.statistics.work.todayOvertime')}}</a-typography-text>
                  </span>
                  <a-typography-text>
                      <a-statistic :value="overNum.dayNum" :value-from="0" :start="true" :value-style="{ fontSize:'14px' }" animation>
                        <template #suffix>
                          <span class="cu-font12 cu-fontWeight600">{{$t('menu.rescue.statistics.single')}}</span>
                        </template>
                      </a-statistic>
                    </a-typography-text>
                </div>
              </a-card>
              <a-card  :body-style="cradBodyStyle" :style="cradStyle" :bordered="false">
                <div class="cu-fy-between-center-lr">
                  <span class="cu-fy-between-center-lr">
                    <a-avatar class="avatar cu-bgcolor-F98981-F53F3F" :size="24"><a-image :src="monthPic" :preview="false"></a-image></a-avatar>
                    <a-typography-text class="cu-font12 cu-marl8">{{$t('menu.maintenance.statistics.work.monthOvertime')}}</a-typography-text>
                  </span>
                  <a-typography-text>
                      <a-statistic :value="overNum.monthNum" :value-from="0" :start="true" :value-style="{ fontSize:'14px' }" animation>
                        <template #suffix>
                          <span class="cu-font12 cu-fontWeight600">{{$t('menu.rescue.statistics.single')}}</span>
                        </template>
                      </a-statistic>
                    </a-typography-text>
                </div>
              </a-card>
              <a-card  :body-style="cradBodyStyle" :style="cradStyle" :bordered="false">
                <div class="cu-fy-between-center-lr">
                  <span class="cu-fy-between-center-lr">
                    <a-avatar class="avatar cu-bgcolor-F98981-F53F3F" :size="24"><a-image :src="yearPic" :preview="false"></a-image></a-avatar>
                    <a-typography-text class="cu-font12 cu-marl8">{{$t('menu.maintenance.statistics.work.yearOvertime')}}</a-typography-text>
                  </span>
                  <a-typography-text>
                      <a-statistic :value="overNum.yearNum" :value-from="0" :start="true" :value-style="{ fontSize:'14px' }" animation>
                        <template #suffix>
                          <span class="cu-font12 cu-fontWeight600">{{$t('menu.rescue.statistics.single')}}</span>
                        </template>
                      </a-statistic>
                    </a-typography-text>
                </div>
              </a-card>
              <a-card  :body-style="cradBodyStyle" :style="cradStyle" :bordered="false">
                <div class="cu-fy-between-center-lr">
                  <span class="cu-fy-between-center-lr">
                    <a-avatar class="avatar cu-bgcolor-F98981-F53F3F" :size="24"><a-image :src="overtimeNumPic" :preview="false"></a-image></a-avatar>
                    <a-typography-text class="cu-font12 cu-marl8">{{$t('menu.maintenance.statistics.work.overtimeNum')}}</a-typography-text>
                  </span>
                  <a-typography-text>
                      <a-statistic :value="overNum.overNum" :value-from="0" :start="true" :value-style="{ fontSize:'14px' }" animation>
                        <template #suffix>
                          <span class="cu-font12 cu-fontWeight600">{{$t('menu.rescue.statistics.single')}}</span>
                        </template>
                      </a-statistic>
                    </a-typography-text>
                </div>
              </a-card>
              </a-space>
            </div>
          </div>
        </a-card>
      </a-grid-item>
    </a-grid>
  </a-card>
</template>

<script lang="ts" setup>
  import planNumPic from '@/assets/images/maintenantics/planNum.png';
  import orderNumPic from '@/assets/images/maintenantics/orderNum.png';
  import finishNumPic from '@/assets/images/maintenantics/finishNum.png';
  import evaluateNumPic from '@/assets/images/maintenantics/evaluateNum.png';
  import dayPic from '@/assets/images/maintenantics/day.png';
  import monthPic from '@/assets/images/maintenantics/month.png';
  import yearPic from '@/assets/images/maintenantics/year.png';
  import overtimeNumPic from '@/assets/images/maintenantics/overtimeNum.png';
  import { ref } from 'vue';
  import useThemes from '@/hooks/themes';
  import { getEleWorkStat } from '@/api/rescue/rescueStatistics'
  import usePub from '@/assets/pubUse';

  const usePub2 = usePub;

  const props = defineProps(['parentParams'])
  // 计划数量
  const planNum: any = ref({})
  // 已接单数量
  const revNum: any = ref({})
  // 已完成数量
  const compNum: any = ref({})
  // 已评价数量
  const evaNum: any = ref({})
  // 超期维保
  const overNum: any = ref({})

  const init = async () => {
    eleWorkStat({});
  }

  const eleWorkStat =  async (params) => {
    params.workType = 3
    const { data } = await getEleWorkStat(Object.assign(params,props.parentParams));
    planNum.value = data.planNum
    revNum.value = data.revNum
    compNum.value = data.compNum
    evaNum.value = data.evaNum
    overNum.value = data.overNum
  }

  init()

  const cradStyle = {borderRadius: '50px',background:'rgba(255, 255, 255, 0.5)'}
  const cradBodyStyle = {borderRadius: '50px',border: '1px solid #FFFFFF',padding:'8px 12px',background:'rgba(255, 255, 255, 0.5)'}
  const cardHeaderStyle = {borderBottom: '0',padding:'20px 0 0 20px',fontFamily: 'OPPOSans',fontStyle: 'normal',fontWeight: '700',fontSize: '14px',lineHeight: '22px'}
  const bodyStyle = {padding:0}
  const { isDark } = useThemes();

  defineExpose({ eleWorkStat })
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

  .avatar{
    margin-right: '8px';
  }
</style>
