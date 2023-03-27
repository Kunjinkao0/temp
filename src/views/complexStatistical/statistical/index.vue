<template>
  <div class="root">
    <div class="inner_root">
      <!-- 第一行内容 -->
      <!-- 主布局 -->
      <div class="main">
        <div class="main_1">
          <!-- 根据树菜单选中生成的面包屑 -->
          <a-card class="card-list" :body-style="{padding:'12px 20px'}">
            <div class="cu-fx-start-center cu-hei24">
              <a-trigger trigger="click" update-at-scroll>
                <img :src="treeOpen"
                     class="cu-pointer cu-marr16 cu-font18 cu-color-86909c tree-icon"/>
                <template #content>
                  <div class="org_tree_div">
                    <Tree v-if="treeLoad" :originTreeData=originTreeData :defaultSelectedKeys="defaultSelectedKeys"
                          @onSelect="onSelect" @onSelectParent="onSelectParent" @onSelectChild="onSelectChild"
                          @collapseTree="collapseTree"/>
                  </div>
                </template>
              </a-trigger>
              <div v-for="(item, index) in selectedTreeParent" :key="item.key">
                <img class="tree-title-img" :src="tree01Pic" v-if="item.key.split(',')[1] === '1'"/>
                <img class="tree-title-img" :src="tree02Pic" v-else/>
                {{ item.title }}
                <span v-if="index < selectedTreeParent.length - 1" class="cu-marlr4">
                    <icon-right/>
                </span>
              </div>
            </div>
          </a-card>
        </div>

        <div style="display: flex; flex-direction: row; min-height: 22vh; margin-top: 5px;">
          <!-- 不文明乘梯统计 -->
          <div class="main_2_left">
            <div style="display: flex; flex-direction: row; padding-bottom: 10px">
              <text>不文明乘梯统计</text>
              <div style="flex: 1"/>
              <a-radio-group
                  v-model:model-value="radioType1"
                  type="button"
                  size="mini"
                  @change="radioButton1Change"
              >
                <a-radio value="year">
                  年
                </a-radio>
                <a-radio value="month">
                  月
                </a-radio>
                <a-radio value="day">
                  日
                </a-radio>
              </a-radio-group>
            </div>

            <div style="display: flex; flex-direction: row; flex: 1; margin-top: 5px">
              <div class="main_2_left_1">
                <div style="flex: 1; display: flex; flex-direction: column">
                  <text style="color: #ffffff; font-size: small">电动车入梯次数</text>
                  <text style="margin-top: 15px; color: #ffffff"><text style="font-size: x-large; font-weight: bold; padding-right: 2px">{{bikeInElevatorCount}}</text>次</text>
                  <div style="display: flex; flex-direction: row; margin-top: 10px; width:fit-content; background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(2px); border-radius: 2px; padding: 5px">
                    <text style="font-size: smaller">较去年</text>
                    <img style="width: 15px; height: 15px" :src="upImage"/>
                    <text style="font-size: smaller; color: red">上升{{bikeInElevatorIncreaseCount}}</text>
                  </div>
                </div>
                <div>
                  <img class="main_2_left_image_size" :src="main2Left1Image"/>
                </div>
              </div>
              <div class="main_2_left_2">
                <div style="flex: 1; display: flex; flex-direction: column">
                  <text style="color: #ffffff; font-size: small">长时间挡门次数</text>
                  <text style="margin-top: 15px; color: #ffffff"><text style="font-size: x-large; font-weight: bold; padding-right: 2px">{{longTimeBlockDoorCount}}</text>次</text>
                  <div style="display: flex; flex-direction: row; margin-top: 10px; width:fit-content; background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(2px); border-radius: 2px; padding: 5px">
                    <text style="font-size: smaller">较去年</text>
                    <img style="width: 15px; height: 15px" :src="upImage"/>
                    <text style="font-size: smaller; color: red">上升{{longTimeBlockDoorIncreaseCount}}</text>
                  </div>
                </div>
                <div>
                  <img class="main_2_left_image_size" :src="main2Left2Image"/>
                </div>
              </div>
              <div class="main_2_left_3">
                <div style="flex: 1; display: flex; flex-direction: column">
                  <text style="color: #ffffff; font-size: small">蹲跳打闹次数</text>
                  <text style="margin-top: 15px; color: #ffffff"><text style="font-size: x-large; font-weight: bold; padding-right: 2px">34</text>次</text>
                  <div style="display: flex; flex-direction: row; margin-top: 10px; width:fit-content; background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(2px); border-radius: 2px; padding: 5px">
                    <text style="font-size: smaller">较去年</text>
                    <img style="width: 15px; height: 15px" :src="upImage"/>
                    <text style="font-size: smaller; color: red">上升69</text>
                  </div>
                </div>
                <div>
                  <img class="main_2_left_image_size" :src="main2Left3Image"/>
                </div>
              </div>
            </div>
          </div>
          <!-- 不文明乘梯趋势 -->
          <div
              style="display: flex; flex-direction: column; flex: 1; background-color: #ffffff; margin-left: 5px">
            <NotWenmingInElevatorTrend :xData="uncivilTrendXData" :yData="uncivilTrendYData"/>
          </div>
        </div>

        <!-- 不文明乘梯项目排行 -->
        <div style="display: flex; flex-direction: column; flex: 15; background-color: #ffffff; margin-top: 5px">
          <div style="display: flex; flex-direction: row; margin: 20px 20px 0 20px">
            <text style=" font-size: medium; font-weight: bold">不文明乘梯项目排行</text>
            <div style="flex: 1"/>
            <a-radio-group
                v-model:model-value="radioType2"
                type="button"
                size="mini"
                @change="radioButton2Change"
            >
              <a-radio value="year">
                年
              </a-radio>
              <a-radio value="month">
                月
              </a-radio>
              <a-radio value="day">
                日
              </a-radio>
            </a-radio-group>
          </div>
          <div style="flex: 1; display: flex; flex-direction: row">
            <div style="flex: 1;">
              <BikeInElevatorRank ref="bikeInElevatorRef" :time-type="timeType" :owner-ids="ownerIds"/>
            </div>
            <div style="flex: 1;">
              <LongTimeDoorStopRank ref="longTimeDoorStopRef" :time-type="timeType" :owner-ids="ownerIds"/>
            </div>
            <div style="flex: 1;">
              <PlayInElevatorRank ref="playInElevatorRef" :time-type="timeType" :owner-ids="ownerIds"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {getOrgOwnerTree} from "@/utils/auth";
import {useI18n} from "vue-i18n";
import moment from 'moment';
import main2Left1Image from '@/assets/images/statistical/complex_statistical_1.png'
import main2Left2Image from '@/assets/images/statistical/complex_statistical_2.png'
import main2Left3Image from '@/assets/images/statistical/complex_statistical_3.png'
import upImage from '@/assets/images/statistical/up_icon.png'
import tree01Pic from '@/assets/images/tree/icon_tree_01.png';
import tree02Pic from '@/assets/images/tree/icon_tree_02.png';
import treeOpen from '@/assets/images/tree/tree-open.png';
import {QueryTreeParams} from '@/api/tree';
import {getNotPoliteTakeElevatorStatistic, getUnCivilTakeElevatorTrend} from '@/api/politeTakeElevator/politeTakeElevator'
import Tree from '@/components/tree/index.vue';
import { getFirstDayOfWeek,getFirstDayOfMonth,getFirstDayOfYear } from '@/utils/dateuUils'
import {onMounted, ref} from 'vue';
import Banner from './components/banner.vue';
import BikeInElevatorRank from './components/bike-in-elevator-rank.vue';
import LongTimeDoorStopRank from './components/long-time-door-stop-rank.vue';
import PlayInElevatorRank from './components/play-in-elevator-rank.vue';
import NotWenmingInElevatorTrend from './components/not-wenming-in-elevator-trend.vue';

// 国际化
const {t} = useI18n();

const radioType1 = ref('year');
const radioType2 = ref('year');
let startTime = ref('');
let endTime = ref('');
const uncivilTimeType = ref(1);
const bikeInElevatorCount = ref(0)
const bikeInElevatorIncreaseCount = ref(0)
const longTimeBlockDoorCount = ref(0)
const longTimeBlockDoorIncreaseCount = ref(0)
const uncivilTrendXData = ref([])
const uncivilTrendYData = ref([])
const timeType = ref(1)
const ownerIds = ref('0')
const bikeInElevatorRef = ref()
const longTimeDoorStopRef = ref()
const playInElevatorRef = ref()

onMounted(() => {
  const params: QueryTreeParams = {
    fromPage: "web"
  }
  // ajax获取树数据
  getOriginTreeData(params);
});

/**
 * 树部分
 */
const treeShow = ref(false);
// 页面初始化设置树默认选中树的key
const defaultSelectedKeys = ref(['0,1']);
// 选中树后生成的面包屑，页面初始化默认选中组织项目树
const selectedTreeParent = ref([{
  title: '组织项目树',
  key: '0,1'
}]);
// 选中树后树的key，string类型，默认选中组织项目树
const orgId = ref('0');
// 树的结构
let originTreeData = ref([]);
// 动态加载树结构，ajax请求会数据后，渲染树。不加v-if的话，树不会展开
let treeLoad = ref(false);

const handleCancel = () => {
  treeShow.value = false;
}

// 获取树数据方法
const getOriginTreeData = async (params: QueryTreeParams) => {
  // 构建树结构
  originTreeData.value = await getOrgOwnerTree();
  treeLoad.value = true;
  onSelectParent();
  search(); // 加载table数据
}

// 获取树组件选中的key值
const onSelect = (select: string) => {
  console.log("输出当前选中的对象");
  console.log(select);
}

// 获取树组件选中的父节点的key值数组
const onSelectParent = (arr = []) => {
  if (arr.length > 0 || (arr.length === 1 && arr[0].key !== '0,1')) {
    orgId.value = arr.join(',')
    selectedTreeParent.value = arr;
  } else {
    orgId.value = ''
  }
  ownerIds.value = orgId.value;
}

// 获取树组件选中的子节点的key值数组
const onSelectChild = (arr = []) => {
  // 获取选中树的key值
  let treeSelectedKey = ""
  for (let item of arr) {
    treeSelectedKey += `${item.realKey},`;
  }

  if (treeSelectedKey && treeSelectedKey !== '0,') {
    orgId.value = treeSelectedKey.substring(0, treeSelectedKey.length - 1)
  } else {
    orgId.value = ''
  }

  treeShow.value = false
  ownerIds.value = orgId.value;
  search();
}

// 获取树组件折叠树的方法
const collapseTree = () => {
  treeShow.value = false;
}

// 展开树
const expandTree = () => {
  treeShow.value = true;
}

// 搜索方法
const search = () => {
  getUnCivilInElevatorStatistic();
  getUnCivilTakeElevatorTrendInfo();
  getBottomLayoutData();
  // fetchData({
  //   ...checkedStateString.value,
  //   'ownerIds': orgId.value,
  //   'page': 1,
  //   'size': pagination.pageSize,
  //   ...formModel.value,
  // } as any);
};

const radioButton1Change = (contentType: string) => {
  const nowdate = new Date();
  endTime.value = moment(nowdate).subtract(0, 'day').format('YYYY-MM-DD');
  if (contentType === 'day') {
    uncivilTimeType.value = 3;
    startTime.value = moment(nowdate).subtract(0, 'day').format('YYYY-MM-DD');
    getUnCivilInElevatorStatistic();
  } else if (contentType === 'month') {
    uncivilTimeType.value = 2;
    startTime.value = getFirstDayOfMonth(nowdate);
    getUnCivilInElevatorStatistic();
  } else if (contentType === 'year') {
    uncivilTimeType.value = 1;
    startTime.value = getFirstDayOfYear(nowdate);
    getUnCivilInElevatorStatistic();
  }
};

const radioButton2Change = (contentType: string) => {
  // const nowdate = new Date();
  // endTime.value = moment(nowdate).subtract(0, 'day').format('YYYY-MM-DD');
  if (contentType === 'day') {
    timeType.value = 3;
    // startTime.value = moment(nowdate).subtract(0, 'day').format('YYYY-MM-DD');
    // search();
  } else if (contentType === 'month') {
    timeType.value = 2;
    // startTime.value = getFirstDayOfMonth(nowdate);
    // search();
  } else if (contentType === 'year') {
    timeType.value = 1;
    // startTime.value = getFirstDayOfYear(nowdate);
    // search();
  }
  console.log(timeType.value)
  getBottomLayoutData();
};

const getUnCivilInElevatorStatistic = async () => {
  setTimeout(() => {
    getBikeInElevatorInfo();
    getLongTimeBlockDoorInfo();
  }, 200);
}

const getBikeInElevatorInfo = async () => {
  const params = {
    type: uncivilTimeType.value,
    startTime: startTime.value,
    endTime: endTime.value,
    codes: 'E30',
    ownerIds: orgId.value
  };
  // 构建树结构
  const result = await getNotPoliteTakeElevatorStatistic(params);
  console.log(result);
  if(result.code === 200){
    if(result.data.curr !== undefined){
      bikeInElevatorCount.value = result.data.curr[0].num;
    }else{
      bikeInElevatorCount.value = 0;
    }
    if(result.data.last !== undefined){
      bikeInElevatorIncreaseCount.value = result.data.curr[0].num - result.data.last[0].num;
    }else{
      bikeInElevatorIncreaseCount.value = 0;
    }
  }
}

const getLongTimeBlockDoorInfo = async () => {
  const params = {
    type: uncivilTimeType.value,
    startTime: startTime.value,
    endTime: endTime.value,
    codes: 'E52',
    ownerIds: orgId.value
  };
  console.log(params)
  // 构建树结构
  const result = await getNotPoliteTakeElevatorStatistic(params);
  if(result.code === 200){
    if(result.data.curr !== undefined){
      longTimeBlockDoorCount.value = result.data.curr[0].num;
    }else{
      longTimeBlockDoorCount.value = 0;
    }
    if(result.data.last !== undefined){
      longTimeBlockDoorIncreaseCount.value = result.data.curr[0].num - result.data.last[0].num;
    }else{
      longTimeBlockDoorIncreaseCount.value = 0;
    }
  }
}

const getUnCivilTakeElevatorTrendInfo = async () => {
  const params = {
    codes: 'E30,E52',
    ownerIds: orgId.value
  };
  // 构建树结构
  const result = await getUnCivilTakeElevatorTrend(params);
  if(result.code === 200){
    uncivilTrendXData.value = [];
    uncivilTrendYData.value = [];
    if(result.data !== undefined && result.data.length > 0){
      for(let item of result.data){
        uncivilTrendXData.value.push(item.n);
        uncivilTrendYData.value.push(item.v);
      }
    }
  }
}

const getBottomLayoutData = () => {
  setTimeout(() => {
    bikeInElevatorRef.value.fetchData();
    longTimeDoorStopRef.value.fetchData();
    playInElevatorRef.value.fetchData();
  }, 200);
}

</script>

<script lang="ts">
export default {
  name: 'Statistical',
};
</script>


<style lang="less" scoped>
.root {
  width: 100%;
  height: 100vh;
  padding: 0 30px 30px 30px;
  background-image: url('@/assets/images/statistical/statistical_bg.png')
}

.inner_root {
  display: flex;
  flex-direction: column;
  height: 100%
}

.main {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #EEF1FB;
  padding: 5px;
}

.main_1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff
}

.main_1_image {
  width: 25px;
  height: 25px;
  margin-left: 10px;
  margin-right: 10px;
}

.main_2_left {
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
}

.main_2_left_1 {
  flex: 1;
  background: url("@/assets/images/statistical/wav_icon.png") no-repeat, linear-gradient(270deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, #7BC0FC 0%, #6AA1FF 99.76%);
  border-radius: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px 0 10px;
  background-size:100% 30%;
  background-position: bottom;
}
.main_2_left_2 {
  flex: 1;
  background: url("@/assets/images/statistical/wav_icon.png") no-repeat, linear-gradient(270deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, #4CD263 0%, #5EDFD6 100%);
  border-radius: 2px;
  margin-left: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px 0 10px;
  background-size:100% 30%;
  background-position: bottom;
}
.main_2_left_3 {
  flex: 1;
  background: url("@/assets/images/statistical/wav_icon.png") no-repeat, linear-gradient(270deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, #6AA1FF 0%, #A871E3 100%);
  border-radius: 2px;
  margin-left: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px 0 10px;
  background-size:100% 30%;
  background-position: bottom;
}
.main_2_left_image_size{
  width: 60px;
  height: 60px;
}
.org_tree_div {
  z-index: 98;
  background: #FFFFFF;
  width: 400px;
  padding: 20px;
  margin-left: 35px;
  margin-top: 5px;
  box-shadow: 0px 8px 16px rgba(12, 0, 51, 0.1);
  border-radius: 4px;
}
</style>
