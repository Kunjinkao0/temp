<template>
  <div class="container cu-flex-y">
    <div style="padding-left: 20px">
      <Breadcrumb :items="['exceptionWarning.exceptionWarning.title']" />
    </div>
    <a-grid :cols="24" :colGap="12" :rowGap="16" class="grid-demo-grid">
      <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }">
        <div class="right-aside">
          <!-- 根据树菜单选中生成的面包屑 -->
          <div class="gray-divider-line"/>
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
          <div class="gray-divider-line"/>
          <a-card class="cu-mart16 card-list" :body-style="{padding:'20px 20px 4px 20px'}">
            <!-- 搜索部分 -->
            <a-row>
              <a-col :flex="5">
                <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }"
                        label-align="left">
                  <a-row :gutter="16">
                    <a-col :span="8">
                      <!-- 故障编号 -->
                      <a-form-item field="faultCode" :label="$t('politeTakeElevator.faultCode')"
                                   label-col-flex="60px">
                        <a-input v-model="formModel.faultCode"
                                 :placeholder="$t('politeTakeElevator.faultCode.placeHolder')" class="input-search"
                                 allow-clear/>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <!-- 终端编号 -->
                      <a-form-item field="clientCode" :label="$t('politeTakeElevator.deviceCode')"
                                   label-col-flex="60px">
                        <a-input v-model="formModel.clientCode"
                                 :placeholder="$t('politeTakeElevator.deviceCode.placeHolder')" class="input-search"
                                 allow-clear/>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <!-- 注册代码 -->
                      <a-form-item field="registCode"
                                   :label="$t('politeTakeElevator.registCode')" label-col-flex="60px">
                        <a-input v-model="formModel.registCode"
                                 :placeholder="$t('politeTakeElevator.registCode.placeHolder')" class="input-search"
                                 allow-clear/>
                      </a-form-item>
                    </a-col>

                    <a-col :span="8" v-if="collapseFlag">
                      <!-- 故障名称 -->
                      <a-form-item field="faultName" :label="$t('politeTakeElevator.faultName')" label-col-flex="60px">
                        <a-input v-model="formModel.faultName"
                                 :placeholder="$t('politeTakeElevator.faultName.placeHolder')" class="input-search"
                                 allow-clear/>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8" v-if="collapseFlag">
                      <!-- 电梯编号 -->
                      <a-form-item field="elevatorCode" :label="$t('politeTakeElevator.elevatorCode')"
                                   label-col-flex="60px">
                        <a-input class="input-search" v-model="formModel.elevatorCode"
                                 :placeholder="$t('politeTakeElevator.elevatorCode.placeHolder')" allow-clear/>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8" v-if="collapseFlag">
                      <!-- 电梯名称 -->
                      <a-form-item field="elevatorName"
                                   :label="$t('politeTakeElevator.elevatorName')" label-col-flex="60px">
                        <a-input class="input-search" v-model="formModel.elevatorName"
                                 :placeholder="$t('politeTakeElevator.elevatorName.placeHolder')" allow-clear/>
                      </a-form-item>
                    </a-col>

                    <a-col :span="8" v-if="collapseFlag">
                      <!-- 故障来源 -->
                      <a-form-item field="resource" :label="$t('politeTakeElevator.faultResource')" label-col-flex="60px">
                        <a-select class="input-search" v-model="formModel.resource" :options="resourceOptions"
                                  :trigger-props="{ autoFitPopupMinWidth: true }"
                                  :placeholder="$t('politeTakeElevator.faultResource.placeHolder')" allow-clear/>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8" v-if="collapseFlag">
                      <!-- 物业单位 -->
                      <a-form-item field="propertyName" :label="$t('politeTakeElevator.proUnit')"
                                   label-col-flex="60px">
                        <a-input class="input-search" v-model="formModel.propertyName"
                                 :placeholder="$t('politeTakeElevator.proUnit.placeHolder')" allow-clear/>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8" v-if="collapseFlag">
                      <!-- 维保单位 -->
                      <a-form-item field="maintainName" :label="$t('politeTakeElevator.mainUnit')"
                                   label-col-flex="60px">
                        <a-input class="input-search" v-model="formModel.maintainName"
                                 :placeholder="$t('politeTakeElevator.mainUnit.placeHolder')" allow-clear/>
                      </a-form-item>
                    </a-col>

                    <a-col :span="12" v-if="collapseFlag">
                      <!-- 发生日期 -->
                      <a-form-item field="date" :label="$t('politeTakeElevator.occurDate')"
                                   label-col-flex="60px">
                        <a-range-picker class="input-search" v-model="formModel.date" style="width: 100%"/>
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-form>
              </a-col>
              <a-col :flex="1">
                <div class="cu-fx">
                  <!-- 展开收起 -->
                  <div class="in-collapse cu-font14 cu-pointer" @click="collapseClick()">{{
                      collapseTitle
                    }}
                    <span>
                                            <icon-up v-if="collapseFlag" class="in-collapse-icon"/>
                                        </span>
                    <span>
                                            <icon-down v-if="!collapseFlag" class="in-collapse-icon"/>
                                        </span>
                  </div>
                  <a-divider style="height: 32px" direction="vertical"/>
                  <!-- 重置按钮 -->
                  <a-button @click="reset">
                    <template #icon>
                      <icon-refresh/>
                    </template>
                    {{ $t('searchTable.form.reset') }}
                  </a-button>
                  <!-- 查询按钮 -->
                  <a-button type="primary" class="cu-marl16" @click="search">
                    <template #icon>
                      <icon-search/>
                    </template>
                    {{ $t('searchTable.form.search') }}
                  </a-button>
                </div>
              </a-col>
            </a-row>
          </a-card>
          <div class="gray-divider-line"/>
          <a-card :body-style="{padding:'20px'}" class="cu-mart16 card-list">
            <!-- table部分 -->
            <a-table :bordered="false" row-key="id" class="table-style" :loading="loading" :pagination="pagination"
                     :columns="cloneColumns" :stripe="true"
                     :data="renderData" @page-change="onPageChange" @page-size-change="onPageSizeChange">
              <template #index="{ rowIndex }">
                {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
              </template>
              <template #use="{ record }">
                {{ $t(`menu.archives.use.${record.use}`) }}
              </template>
              <template #faultPhoto="{ record }">
                <div v-if="record.photoUrl">
                  <a-space size="mini" @click="imageClick(record.photoUrl)">
                    <img :src="faultImageIcon" class="icon_size"/>
                    <span class="icon_right_text">图片</span>
                  </a-space>
                </div>
                <div v-else>
                  {{ $t('politeTakeElevator.none') }}
                </div>
              </template>
              <template #faultVideo="{ record }">
                <div v-if="record.videoUrl">
                  <a-space size="mini" @click="videoClick(record.videoUrl)">
                    <img :src="faultVideoIcon" class="icon_size"/>
                    <span class="icon_right_text">视频</span>
                  </a-space>
                </div>
                <div v-else>
                  {{ $t('politeTakeElevator.none') }}
                </div>
              </template>
              <template #faultWave="{ record }">
                <a-space size="mini" @click="waveClick(record)">
                  <img :src="faultWaveIcon" class="icon_size"/>
                  <span class="icon_right_text">波形</span>
                </a-space>
              </template>
              <template #faultState="{ record }">
                <a-space size="mini">
                  <div :class="record.state === 1?'fault_state_confirm':'fault_state_unconfirm'"/>
                  <span>{{getFaultState(record.state)}}</span>
                </a-space>
              </template>
              <template #operate="{ record }">
                <a-button class="table-operate-btn" type="text" @click="goto(record)">
                  {{ $t('menu.archives.view') }}
                </a-button>
              </template>
              <!-- table空数据样式插槽 -->
              <template #empty>
                <div class="table-nodata">
                  <a-image :src="nodataPic" :preview="false"></a-image>
                </div>
              </template>
            </a-table>
          </a-card>
        </div>
      </a-grid-item>
    </a-grid>
    <!-- 图片预览 -->
    <a-image-preview :src="imageUrl" v-model:visible="imageVisible" />
    <!-- 视频预览 -->
    <a-modal v-model:visible="videoVisible" modal-class="iotVideoModel" :footer="false" title-align="start">
      <template #title>
        <div>
          <div class="cu-link-vertical"></div>
          <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.archives.video')
            }}</span>
        </div>
      </template>
      <div class="cu-marb16">
        <video ref="videoRef" controls style="width: 100%">
          <source type="video/mp4">
        </video>
      </div>
    </a-modal>
    <!-- 波形预览 -->
    <a-modal v-model:visible="waveVisible" modal-class="iotWaveModel" :footer="false" title-align="start">
      <template #title>
        <div>
          <div class="cu-link-vertical"></div>
          <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.archives.wave')
            }}</span>
        </div>
      </template>
      <div class="cu-marb16" v-if="waveVisible">
        <a-tabs class="waveTab" default-active-key="1" @tab-click="waveTabClick">
          <!-- x波形 -->
          <a-tab-pane key="1" :title="$t('menu.archives.x.wave')">
          </a-tab-pane>
          <!-- y波形 -->
          <a-tab-pane key="2" :title="$t('menu.archives.y.wave')">
          </a-tab-pane>
          <!-- z波形 -->
          <a-tab-pane key="3" :title="$t('menu.archives.z.wave')">
          </a-tab-pane>
        </a-tabs>
        <Chart height="300px" :option="chartOption" />
      </div>
    </a-modal>
    <a-modal width="720px" class="maintenantice-ststistics" v-model:visible="detailVisible" :simple="true"
             :body-style="{border:'1px solid var(--color-neutral-3)'}">
      <template #title>
        <span style="font-size: medium; font-weight: bold; margin-top: 15px">查看</span>
      </template>
      <template #footer>
        <a-button @click="handleCancel1">关闭</a-button>
      </template>

      <div>
        <FeedBackInfo ref="feedBackInfo" :loading="loading"/>
      </div>
    </a-modal>
  </div>

</template>

<script lang="ts" setup>
import {ref, computed, onMounted, reactive, watch, toRaw} from 'vue';
import tree01Pic from '@/assets/images/tree/icon_tree_01.png';
import tree02Pic from '@/assets/images/tree/icon_tree_02.png';
import nodataPic from '@/assets/images/no-data.png';
import treeOpen from '@/assets/images/tree/tree-open.png';
import faultImageIcon from '@/assets/images/statistical/fault_image_icon.png'
import faultVideoIcon from '@/assets/images/statistical/fault_video_icon.png'
import faultWaveIcon from '@/assets/images/statistical/fault_wave_icon.png'
import {QueryTreeParams} from '@/api/tree';
import {getOrgOwnerTree} from '@/utils/auth';
import Tree from '@/components/tree/index.vue';
import {useI18n} from 'vue-i18n';
import {queryElevatorList, getEleTypeIndexList, getEleFaultWaveByArchives} from '@/api/archives/elevator';
import {Elevator, ElevatorListPage} from '@/api/archives/types/elevatorType';

import {Pagination} from '@/types/global';
import type {TableColumnData} from '@arco-design/web-vue/es/table/interface';
import type {SelectOptionData} from '@arco-design/web-vue/es/select/interface';
import useLoading from '@/hooks/loading';
import cloneDeep from 'lodash/cloneDeep';
import {useRouter} from "vue-router";
import {getFaultList} from "@/api/politeTakeElevator/politeTakeElevator";
import {getFaultState, getFaultResourceV2} from '@/utils/common';
import {Message} from "@arco-design/web-vue";
import FeedBackInfo from './detail.vue'

// 国际化
const {t} = useI18n();
const detailVisible = ref(false);
const feedBackInfo = ref();

const imageUrl = ref();
const imageVisible = ref(false)
// 视频预览
const videoVisible = ref(false);
const videoRef = ref();
const waveVisible = ref(false);
let chartOption: any = reactive({});

onMounted(() => {
  const params: QueryTreeParams = {
    fromPage: "web"
  }
  // ajax获取树数据
  getOriginTreeData(params);

  eleTypeIndexList();
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
const orgId = ref('');
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
  originTreeData.value = await getOrgOwnerTree()
  treeLoad.value = true;
  search(); // 加载table数据
}

let collapseTitle = ref('展开');
let collapseFlag = ref(false);
const collapseClick = () => {
  collapseFlag.value = !collapseFlag.value;
  collapseTitle.value = "收起";
}

// 获取树组件选中的key值
const onSelect = (select: string) => {
  console.log("输出当前选中的对象");
  console.log(select);
}

// 获取树组件选中的父节点的key值数组
const onSelectParent = (arr = []) => {
  selectedTreeParent.value = arr;
}

// 获取树组件选中的子节点的key值数组
const onSelectChild = (arr = []) => {
  // 获取选中树的key值
  let treeSelectedKey = ""
  for (let item of arr) {
    treeSelectedKey += `${item.realKey},`;
  }
  if (treeSelectedKey) {
    if (treeSelectedKey === '0,') {
      orgId.value = "";
    } else {
      orgId.value = treeSelectedKey.substring(0, treeSelectedKey.length - 1)
    }
  }
  treeShow.value = false
  search();
}

// 获取树组件折叠树的方法
const collapseTree = () => {
  treeShow.value = false;
}

// 展开树
const expandTree = () => {
  if (treeShow.value) {
    treeShow.value = false;
  } else {
    treeShow.value = true;
  }
}

/**
 * 搜索框部分
 */
// 使用场所下拉框
const useTypeOptions = ref([]);
const eleTypeIndexList = async () => {
  const {data} = await getEleTypeIndexList()
  useTypeOptions.value = data
}

// 故障来源下拉框
const resourceOptions = computed<SelectOptionData[]>(() => [
  {
    label: '黑匣子TIM',
    value: '6',
  },
  {
    label: '梯载屏',
    value: '7',
  },
  {
    label: '摄像头',
    value: '8',
  }
]);

// 超期未检下拉框
const checkStateOptions = computed<SelectOptionData[]>(() => [
  {
    label: t('menu.archives.no'), // 否
    value: '1',
  },
  {
    label: t('menu.archives.yes'), // 是
    value: '2',
  },
]);

// 超期未保下拉框
const mainStateOptions = computed<SelectOptionData[]>(() => [
  {
    label: t('menu.archives.no'), // 否
    value: '1',
  },
  {
    label: t('menu.archives.yes'), // 是
    value: '2',
  },
]);

// 搜索框结构定义
const generateFormModel = () => {
  return {
    faultCode: '',
    clientCode: '',
    registCode: '',
    faultName: '',
    elevatorCode: '',
    elevatorName: '',
    resource: '',
    propertyName: '',
    maintainName: '',
    startTime: '',
    endTime: '',
    date: [],
  };
};
const formModel = ref(generateFormModel());

// 搜索方法
const search = () => {
  if (formModel.value.date) {
    formModel.value.startTime = formModel.value.date[0];
    formModel.value.endTime = formModel.value.date[1];
  }
  pagination.current = 1;
  fetchData({
    'page': 1,
    'size': pagination.pageSize,
    'ownerIds': orgId.value,
    ...formModel.value,
  });
};

// 重置方法
const reset = () => {
  formModel.value = generateFormModel();
};

/**
 * table部分
 */
const {loading, setLoading} = useLoading(true);
// 定义表格结构
const renderData = ref<Elevator[]>([]);
type Column = TableColumnData & { checked?: true };
const cloneColumns = ref<Column[]>([]);
const showColumns = ref<Column[]>([]);

// 定义分页
const pagination: Pagination = reactive({
  current: 1,
  pageSize: 10,
  showTotal: true,
  showPageSize: true,
  autoAdjust: true
});

// 定义表格列
const columns = computed<TableColumnData[]>(() => [
  {
    title: t('politeTakeElevator.number'),
    dataIndex: 'index',
    slotName: 'index',
    align: "center",
    headerCellClass: 'table-header-cell',
    width: 80
  },
  {
    title: t('politeTakeElevator.faultCode'),
    dataIndex: 'faultCode',
    align: "left",
    ellipsis: true,
    tooltip: true,
    headerCellClass: 'table-header-cell',
    width: 80
  },
  {
    title: t('politeTakeElevator.deviceCode'),
    dataIndex: 'clientCode',
    align: "left",
    ellipsis: true,
    tooltip: true,
    headerCellClass: 'table-header-cell',
    width: 80
  },
  {
    title: t('politeTakeElevator.registCode'),
    dataIndex: 'registCode',
    align: "left",
    ellipsis: true,
    tooltip: true,
    headerCellClass: 'table-header-cell',
    width: 80
  },
  {
    title: t('politeTakeElevator.faultName'),
    dataIndex: 'faultName',
    align: "left",
    ellipsis: true,
    tooltip: true,
    headerCellClass: 'table-header-cell',
    width: 80
  },
  {
    title: t('politeTakeElevator.elevatorCode'),
    dataIndex: 'elevatorCode',
    align: "left",
    ellipsis: true,
    tooltip: true,
    headerCellClass: 'table-header-cell',
    width: 80
  },
  {
    title: t('politeTakeElevator.elevatorName'),
    dataIndex: 'elevatorName',
    align: "left",
    ellipsis: true,
    tooltip: true,
    headerCellClass: 'table-header-cell',
    width: 80
  },
  {
    title: t('politeTakeElevator.faultResource'),
    dataIndex: 'resource',
    align: "left",
    ellipsis: true,
    tooltip: true,
    headerCellClass: 'table-header-cell',
    width: 80,
    render: (data) => {
      return getFaultResourceV2(data.record.resource);
    }
  },
  {
    title: t('politeTakeElevator.proUnit'),
    dataIndex: 'propertyName',
    align: "left",
    ellipsis: true,
    tooltip: true,
    headerCellClass: 'table-header-cell',
    width: 80
  },
  {
    title: t('politeTakeElevator.mainUnit'),
    dataIndex: 'maintainName',
    align: "left",
    ellipsis: true,
    tooltip: true,
    headerCellClass: 'table-header-cell',
    width: 80
  },
  {
    title: t('politeTakeElevator.occurTime'),
    dataIndex: 'createTime',
    align: "left",
    ellipsis: true,
    tooltip: true,
    headerCellClass: 'table-header-cell',
    width: 80
  },
  {
    title: t('politeTakeElevator.recoveryTime'),
    dataIndex: 'recoverTime',
    align: "left",
    ellipsis: true,
    tooltip: true,
    headerCellClass: 'table-header-cell',
    width: 80
  },
  {
    title: t('politeTakeElevator.floor'),
    dataIndex: 'elevatorFloor',
    align: "left",
    ellipsis: true,
    tooltip: true,
    headerCellClass: 'table-header-cell',
    width: 80,
    render: (data) => {
      let result = '';
      if(data.record.elevatorFloor !== '' && data.record.elevatorFloor !== undefined){
        result = `${data.record.elevatorFloor}层`;
      }else{
        result = '';
      }
      return result;
    }
  },
  {
    title: t('politeTakeElevator.faultImage'),
    dataIndex: 'hasPhoto',
    slotName: 'faultPhoto',
    align: "left",
    ellipsis: true,
    tooltip: true,
    headerCellClass: 'table-header-cell',
    width: 80
  },
  {
    title: t('politeTakeElevator.faultVideo'),
    dataIndex: 'hasVideo',
    slotName: 'faultVideo',
    align: "left",
    ellipsis: true,
    tooltip: true,
    headerCellClass: 'table-header-cell',
    width: 80
  },
  {
    title: t('politeTakeElevator.faultWave'),
    dataIndex: 'hasWave',
    slotName: 'faultWave',
    align: "left",
    ellipsis: true,
    tooltip: true,
    headerCellClass: 'table-header-cell',
    width: 80
  },
  {
    title: t('politeTakeElevator.faultStatus'),
    dataIndex: 'state',
    slotName: 'faultState',
    align: "left",
    ellipsis: true,
    tooltip: true,
    headerCellClass: 'table-header-cell',
    width: 80
  },
  {
    title: t('politeTakeElevator.operate'),
    dataIndex: 'operate',
    slotName: 'operate',
    align: "center",
    fixed: 'right',
    headerCellClass: 'table-header-cell',
    width: 80
  }
]);

const scroll = {
  x: 2000,
}

// 查询表格数据
const fetchData = async (params: ElevatorListPage = {page: 1, size: 10}) => {
  setLoading(true);
  try {
    console.log(params);
    const {data} = await getFaultList(params);
    console.log(data);
    renderData.value = data.rows;
    pagination.current = params.page;
    pagination.total = data.total;
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false);
  }
};

// page改变
const onPageChange = (current: number) => {
  if (formModel.value.date) {
    formModel.value.startTime = formModel.value.date[0];
    formModel.value.endTime = formModel.value.date[1];
  }
  fetchData({
    ...formModel.value,
    'page': current,
    'size': pagination.pageSize,
    'ownerIds': orgId.value
  });
};
// pageSize改变
const onPageSizeChange = (pageSize: number) => {
  if (formModel.value.date) {
    formModel.value.startTime = formModel.value.date[0];
    formModel.value.endTime = formModel.value.date[1];
  }
  pagination.pageSize = pageSize;
  fetchData({
    ...formModel.value,
    'page': pagination.current,
    'size': pagination.pageSize,
    'ownerIds': orgId.value
  });
};


watch(
    () => columns.value,
    (val) => {
      cloneColumns.value = cloneDeep(val);
      cloneColumns.value.forEach((item, index) => {
        item.checked = true;
      });
      showColumns.value = cloneDeep(cloneColumns.value);
    },
    {deep: true, immediate: true}
);

// 供子组件调用，重新加载数据
const reload = () => {
  search();
}

/**
 * 页面新增、修改部分
 */
// const operateModalRef = ref();
// const openEditModal = (record: any, type: string) => {
//     operateModalRef.value.openModal(record, type);
// }

/**
 * 跳转到详情页
 */
const router = useRouter()
const goto = (record: any) => {
  feedBackInfo.value.init(record.id,record.eleId);
  detailVisible.value = true;
}

const handleOk = () => {
  detailVisible.value = false;
};

const handleCancel1 = () => {
  detailVisible.value = false;
}

let waveData = reactive({ // 波形数据
  xAxis: {
    type: 'category',
    data: []
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
      data: [],
      type: 'line',
      // 节点样式
      symbol: 'image://data:image/png;base64,iVBORw0KGgodoorBackWidthANSUhEUgdoorBackWidthA0doorBackWidthANCAYdoorBackWidthBy6+R8doorBackWidthACXBIWXMdoorBackWidthsTdoorBackWidthLEwEAmpwYdoorBackWidthAAXNSR0IArs4c6QdoorBackWidthARnQU1BAACxjwv8YQUdoorBackWidthE/SURBVHgBdZJPTgIxFMZ/bXFQApHoCoHEuAAlunLlzgu49QiexhN4BLdyAC9gQiLxDwuDfyIbdSE6EJhSOzAMnQl+SdvX1/d9fa+vgjQujaocsa76ZFUW/2nAgH0xckNEbLWNV1ZsKyikdcaGj16bN06FXpAsoSqpCUGWfyAU/nOLTkiUoaNqqCYImkMCTqZrBKPJbdQpTQUqr2ZN/tCIFQ3nBo5jAcMF0o4IL7e05PjLqcGqJwizAs7cG8sHFGUmh+fkXWMZ1CytOWTgM3JU31mO3tz4HaLlZgl/waFpRycRPqFp55v5dmsFf/rkO/emFrj9mdiXg5KtryMk13Fa8NndE91MuFnVdL8Vdev0otOr6GZHh1Fez9KP/Q3b4ATRgVXuh8J30XcS6YD6gykMJ+RDe+ihiwGDx13Rd2P+AHXFYlxBmNkhdoorBackWidthAAElFTkSuQmCC',
      symbolSize: 10,
      itemStyle: {
        color: '#1ED6FF'
      },
    }
  ]
});

let xResult = ref("");
let yResult = ref("");
let zResult = ref("");

// 构建波形数据
const loadWave = (data) => {
  waveData.xAxis.data.length = 0;
  waveData.series[0].data.length = 0;

  let listName = [];
  let listValue = [];
  let i = 0;
  if (data.length > 0) {
    let wave = data.split(",");
    for (let item of wave) {
      i += 1;
      listName.push(i);
      listValue.push(item);
    }
  }

  waveData.xAxis.data.push(...listName);
  waveData.series[0].data.push(...listValue);
  Object.assign(chartOption, waveData);
}

// 切换x y z波形
const waveTabClick = (type: any) => {
  // 动态echarts
  if (type === "1") { // x波形
    loadWave(xResult.value);
  } else if (type === "2") { // y波形
    loadWave(yResult.value);
  } else { // z波形
    loadWave(zResult.value);
  }
}

const imageClick = (url: string) => {
  if (url) {
    imageUrl.value = url;
    imageVisible.value = true;
  } else {
    Message.error("暂无图片");
  }
};

const videoClick = (url: string) => {
  if (url) {
    videoVisible.value = true;
    videoRef.value.src = url;
  } else {
    Message.error("暂无视频");
  }
}

// 波形弹窗显示
const waveClick = async (params) => {
  waveVisible.value = true;

  const waveParams = {
    "devCode": params.clientCode,
    "createTime": params.createTime,
    "faultCode": params.faultCode
  }
  const { data } = await getEleFaultWaveByArchives(waveParams);

  // 构建x、y、z波形图数据
  let rows = data.data;
  for (let row of rows) {
    for (let d in row) {
      if (Object.prototype.hasOwnProperty.call(row, d)) {
        if (d.indexOf("X_") > -1) {
          xResult.value += `${row[d]},`;
        }
        if (d.indexOf("Y_") > -1) {
          yResult.value += `${row[d]},`;
        }
        if (d.indexOf("Z_") > -1) {
          zResult.value += `${row[d]},`;
        }
      }
    }
  }

  // 默认显示x波形
  loadWave(xResult.value);
}
</script>

<script lang="ts">
export default {
  name: 'Elevator',
};
</script>

<style scoped lang="less">
.root {
  width: 100%;
  height: 100%;
}

.inner_root {
  display: flex;
  flex-direction: column;
  height: 100%
}

.container {
  height: 100%;
  background-color: white;
}

.left-aside {
  overflow: auto;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 24px;
  background-color: var(--color-bg-2);
  border-radius: 4px;
  overflow: auto;
}

.right-aside {
  flex: 1;
  border-radius: 4px;
  overflow: auto;
}

:deep(.panel-border) {
  margin-bottom: 0;
  border-bottom: 1px solid rgb(var(--gray-2));
}

.in-collapse {
  width: 44px;
  color: #165DFF;
  margin-left: 16px;
}

.in-collapse-icon {
  color: #165DFF;
  width: 10px
}

.gray-divider-line{
  width: 100%;
  height: 1px;
  background-color: #F2F3F5
}

.org_tree_div {
  z-index: 98;
  background: #FFFFFF;
  width: 400px;
  padding: 20px;
  margin-left: 30px;
  margin-top: 5px;
  box-shadow: 0px 8px 16px rgba(12, 0, 51, 0.1);
  border-radius: 4px;
}

.icon_size{
  width: 13px;
  height: 13px;
}

.icon_right_text{
  color: #165DFF;
  margin-left: 5px;
}

.fault_state_confirm{
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: #07C160;
}

.fault_state_unconfirm{
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: rgba(12, 0, 51, 0.1);
}
</style>
