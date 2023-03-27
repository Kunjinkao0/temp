<template>
  <div class="container cu-flex-y">
      <Breadcrumb :items="['menu.rescue', 'menu.archives.maintain', 'menu.archives.view']" />
      <div class="header-image">
        <div class="cu-fx-n-center cu-flex1" style="margin-top: 32px;">
          <img :src="icon1Pic" alt="">
          <div class="cu-marl8 cu-font16 cu-fontWeight600">{{elevatorName}}</div>
        </div>
      </div>
      <div style="background-color: white;" class="cu-padlr24">
        <a-card class="cu-mart16" style="margin-bottom:20px;">
          <div>
            <div class="cu-link-vertical"></div>
            <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.maintenance.extendedMaintenance.extendedMaintenanceData')
              }}</span>
          </div>
          <div class="cu-flex">
            <div class="cu-flex1">
              <a-table :columns="columns" :data="basicData1" :pagination="false" :show-header="false"
                       :bordered="{ cell: true }" :hoverable="false" class="cu-mart16">
                  <template #content="{ record }">
                    <!-- 维保人员、维保负责人 -->
                    <div v-if="record.title === $t('menu.maintenance.extendedMaintenance')" class="cu-fx-n-center">
                      <img :src="icon5Pic" />
                      <div class="cu-marlr4">{{ record.content }} 天</div>
                    </div>
                    <div v-else>
                      {{ record.content }}
                    </div>
                  </template>
              </a-table>
            </div>
            <div class="cu-flex1">
                <a-table :columns="columns" :data="basicData2" :pagination="false" :show-header="false"
                         :bordered="{ cell: true }" :hoverable="false" class="cu-mart16">
                  <template #content="{ record }">
                    <!-- 维保人员、维保负责人 -->
                    <div v-if="record.title === $t('menu.maintenance.extendedMaintenance.maintenancePersonnel')
                          || record.title === $t('menu.maintenance.extendedMaintenance.elevatorSafetyAdministrator')" class="cu-fx-n-center">
                      <img :src="ipcameraPic" />
                      <div class="cu-marlr4">{{ record.content }}</div>
                      <img :src="telphonePic" />
                      <div class="cu-marl4">{{ record.phone }}</div>
                    </div>
                    <div v-else>
                      {{ record.content }}
                    </div>
                  </template>
                </a-table>
            </div>
          </div>
        </a-card>
      </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import icon1Pic from '@/assets/images/rescue/icon-1.png';
import icon5Pic from '@/assets/images/archives/icon-5.png';
import ipcameraPic from '@/assets/images/archives/ipcamera.png';
import telphonePic from '@/assets/images/archives/telphone.png';
import router from "@/router/index";
import { useI18n } from 'vue-i18n';

// 路由接收参数
const idParam: any = router.currentRoute.value.params.id;

// 国际化
const { t } = useI18n();

const columns: any = [
  {
    dataIndex: 'title',
    width: 100,
    align: 'right',
    cellStyle: {
      background: '#F7F8FA',
      color: '#86909C'
    }
  },
  {
    dataIndex: 'content',
    width: 100,
    slotName: 'content'
  }
];
const columnsImg: any = [
  {
    dataIndex: 'img',
    width: 100,
    slotName: 'img'
  },
  {
    dataIndex: 'title',
    width: 100,
    align: 'right',
    cellStyle: {
      background: '#F7F8FA',
      color: '#86909C'
    }
  },
  {
    dataIndex: 'content',
    width: 100,
    slotName: 'content'
  }
];

// 超期维保资料模拟数据1
const basicData1 = ref([]);

let elevatorName= ref('');

// 超期维保资料模拟数据2
const basicData2 = ref([]);

const data = ref({});

onMounted(() => {
    const companyDetail = localStorage.getItem('extendedMaintenanceDetail');
    if (companyDetail) {
        const companyLocal = JSON.parse(companyDetail);
        Object.assign(data, companyLocal);
		elevatorName.value =companyLocal.elevatorName;
        basicData1.value = [
          {
            title: t('menu.maintenance.extendedMaintenance.elevatorAddress'), // 电梯地址
            content: companyLocal.address,
          }, {
            title: t('menu.maintenance.extendedMaintenance.lastMaintenanceTime'), // 上次维保时间
            content: companyLocal.completeTime,
          }, {
            title: t('menu.maintenance.extendedMaintenance.planMaintenanceTime'), // 计划维保时间
            content: companyLocal.planDate,
          }, {
            title: t('menu.maintenance.extendedMaintenance'), // 超期维保
            content: companyLocal.overTime,
          }
        ]

        basicData2.value = [
          {
            title: t('menu.maintenance.extendedMaintenance.maintenanceUnit'), // 维保单位
            content: companyLocal.maintainName,
          }, {
            title: t('menu.maintenance.extendedMaintenance.maintenancePersonnel'), // 维保人员
            content: companyLocal.mainPerson,
            phone: companyLocal.mainPhone,
          }, {
            title: t('menu.maintenance.extendedMaintenance.useUnit'), // 使用单位
            content: companyLocal.propertyName,
          }, {
            title: t('menu.maintenance.extendedMaintenance.elevatorSafetyAdministrator'), // 电梯安全管理员
            content: companyLocal.propAdminPerson,
            phone: companyLocal.propAdminPhone,
          }
        ]
    }
})
</script>

<script lang="ts">
  export default {
    name: 'ExtendedMaintenanceDetail',
  };
</script>

<style scoped lang='less'>
.container {
  padding: 0 20px 20px 20px;
  height: 100%;
}

:deep(.arco-collapse-item-content) {
  background-color: white;
  padding-left: 0px;
}

:deep(.arco-collapse-item-header) {
  border-bottom:none;
}

:deep(.arco-list-bordered) {
  border: 0px;
}

:deep(.arco-list-item) {
  padding: 5px 20px !important;
}

.header-image {
  background: #FFFFFF url(@/assets/images/rescue/header.png) no-repeat;
  height: 84px;
  background-size: 100% 100%;
  padding: 0 20px
}

.done-image {
  position: absolute;
  right: 8px;
  bottom: 8px;
  z-index: 9;
  width: 100px;
  height: 84px
}

:deep(.arco-divider-horizontal) {
  margin: 0;
}

:deep(.arco-list) {
  border-radius: 0;
}

:deep(.anchorBL) {
  display: none;
}

// tab 平均分样式及去掉灰色阴影
:deep(.arco-tabs-nav-tab) {
  display: flex;
  flex: 1;
}

:deep(.arco-tabs-nav-tab-list) {
  display: flex;
  flex: 1;
}

:deep(.arco-tabs-tab) {
  display: flex;
  flex: 1;
}

:deep(.arco-tabs-nav-type-line .arco-tabs-tab-title) {
  flex: 1;
  text-align: center;
}

:deep(.arco-tabs-nav-type-line .arco-tabs-tab:hover .arco-tabs-tab-title::before) {
  background-color: white;
}

:deep(.arco-tabs-content) {
  text-align: center;
}

// tab 平均分样式及去掉灰色阴影样式结束

:deep(.arco-rate) {
  font-size: 14px
}

.video-common {
  padding: 4px 16px;
  height: 48px;
  border-radius: 4px;
}

.floor-box {
  background: linear-gradient(180deg, #F2F9FE 0%, #E6F4FE 100%);
  .video-common();
}

.stop-box {
  background: linear-gradient(180deg, #F5FEF2 0%, #E6FEEE 100%);
  .video-common();
}

.speed-box {
  background: linear-gradient(180deg, #F7F7FF 0%, #ECECFF 100%);
;
  .video-common();
}
</style>
