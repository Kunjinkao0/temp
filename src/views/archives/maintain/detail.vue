<template>
  <div class="container cu-flex-y">
      <Breadcrumb :items="['menu.rescue', 'menu.archives.maintain', 'menu.archives.view']" />
      <div class="header-image">
        <div class="cu-fx-n-center cu-flex1" style="margin-top: 32px;">
          <img :src="icon1" alt="">
          <div class="cu-marl8 cu-font16 cu-fontWeight600">{{ data.maintainName }}</div>
        </div>
      </div>
      <div style="background-color: white;" class="cu-padlr24">
        <div class="cu-flex">
          <div class="cu-flex1">
            <a-card class="cu-mart16" style="margin-bottom:20px;">
              <!-- 基本资料 -->
              <div>
                <div class="cu-link-vertical"></div>
                <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.archives.basic.infomation')
                  }}</span>
              </div>
              <a-table :columns="columns" :data="basicData" :pagination="false" :show-header="false"
                       :bordered="{ cell: true }" :hoverable="false" class="cu-mart16" />
            </a-card>
          </div>
          <div class="cu-flex1 cu-marl16" :justify="true">
            <a-card class="cu-mart16" style="margin-bottom:20px;">
              <!-- 单位职员 -->
              <div>
                <div class="cu-link-vertical"></div>
                <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('单位职员')
                  }}</span>
              </div>
              <a-collapse :default-active-key="['1']" :bordered="true" style="margin-top: 16px;">
                <a-collapse-item header="负责人" key="1" style="margin-left: 15px;">
                  <a-list>
                    <div v-for="item in principal" :key="item.person">
                      <a-list-item :key="item.person">
                        <a-space :size="30">
                          <a-space>
                            <img :src="ipcamera" v-if="item.person!==''"/>
                            <div class="cu-marlr4">{{item.person}}</div>
                          </a-space>
                          <a-space>
                            <img :src="telphone" v-if="item.person!==''"/>
                            <div class="cu-marlr4">{{item.telephone}}</div>
                          </a-space>
                          <a-space>
                            <img :src="certificate" v-if="item.certificatePhotoIds!==''"/>
                            <div class="cu-marlr4" v-if="item.certificatePhotoIds!==''"  @click="imageClick(item.certificatePhotoIds)" style="color: #165DFF;font-weight: 400; size: 14px;">查看证书</div>
                          </a-space>
                        </a-space>
                      </a-list-item>
                    </div>                  
                  </a-list>
                </a-collapse-item>
                <a-collapse-item header="维保员" key="1" style="margin-left: 15px;">
                  <a-list>
                    <a-list-item v-for="item in employee" :key="item.person">
                      <a-space :size="30">
                        <a-space>
                          <img :src="ipcamera" v-if="item.person!==''"/>
                          <div class="cu-marlr4">{{item.person}}</div>
                        </a-space>
                        <a-space>
                          <img :src="telphone" v-if="item.person!==''"/>
                          <div class="cu-marlr4">{{item.telephone}}</div>
                        </a-space>
                        <a-space>
                          <img :src="certificate" v-if="item.certificatePhotoIds!==''"/>
                          <div class="cu-marlr4" v-if="item.certificatePhotoIds!==''"  @click="imageClick(item.certificatePhotoIds)" style="color: #165DFF;font-weight: 400; size: 14px;">查看证书</div>
                        </a-space>
                      </a-space>
                    </a-list-item>
                  </a-list>
                </a-collapse-item>
              </a-collapse>
            </a-card>
          </div>
          <!-- 图片预览 -->
          <a-image-preview-group  v-model:visible="imageVisible" :srcList="imageUrl" infinite></a-image-preview-group>
        </div>
      </div>
  </div>
</template>

<script setup lang='ts'>
import telphone from '@/assets/images/archives/telphone.png';
import ipcamera from '@/assets/images/archives/ipcamera.png';
import icon1 from '@/assets/images/rescue/icon-1.png';
import certificate from '@/assets/images/archives/certificate.png';
import { ref, reactive, onMounted } from 'vue';
import router from "@/router/index";
import { useI18n } from 'vue-i18n';
import { getWorkerManageList } from '@/api/archives/company';
import usePub from '@/assets/pubUse';

const usePub2 = usePub;

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

const data = reactive({
  address: "",
  level: "",
  expiry_date: "",
  certificate: "",
  orgCode: "",
  legalPerson: "",
  licenseInfo:"",
  maintainName:"",
});

// 基本资料数据
const basicData = reactive([]);

// 负责人
const principal = ref([]);

// 安全管理员
const employee = ref([]);

// 单位名称
const mainName = ref('')

onMounted(()=> {
  principal.value = []
  employee.value = []

  const maintainDetail:any = localStorage.getItem('maintainDetail');
  if (maintainDetail) {
      const maintainLocal = JSON.parse(maintainDetail);
      Object.assign(data, maintainLocal);

      basicData.length = 0;
      basicData.push(...[
      {
        title: t('menu.archives.maintain.companyAddress'), // 单位地址
        content: data.address,
      }, {
        title: t('menu.archives.maintain.level'), // 资质等级
        content: data.level,
      }, {
        title: t('menu.archives.maintain.validity'), // 资质有效期
        content: data.expiry_date,
      }, {
        title: t('menu.archives.maintain.number'), // 资质证书编号
        content: data.certificate,
      }, {
        title: t('menu.archives.maintain.orgCode'), // 组织机构代码
        content: data.orgCode,
      }, {
        title: t('menu.archives.maintain.representative'), // 法人代表
        content: data.legalPerson,
      }, {
        title: t('menu.archives.maintain.licence'), // 许可证
        content: data.licenseInfo,
      }]);

      // 负责人
      // principal.value.push({
      //     person: maintainLocal.person,
      //     telephone: maintainLocal.telephone,
      //     certificatePhotoIds:''
      // })
      initWorkerManageList(maintainLocal.id);
  }
})

const initWorkerManageList = async (unitId : string) => {
    const { data:unitData } = await getWorkerManageList({unitId,unitType:1})
    if(unitData.rows.length>0){
        unitData.rows.forEach(item => {
            if(item.userType === 1){
                principal.value.push({
                    person: item.name,
                    telephone: item.phone,
                    certificatePhotoIds:item.certificatePhotoIds
                })
            }else if(item.userType === 2){
              employee.value.push({
                    person: item.name,
                    telephone: item.phone,
                    certificatePhotoIds:item.certificatePhotoIds
                })
            }
        })
    }
}


// 图片预览
const imageUrl = ref([]);
const imageVisible = ref(false)
const imageClick = (photoObj) => {
  imageUrl.value = []
  if(photoObj && photoObj !== ''){
    let photos: any = [];
    if(typeof photoObj === 'string'){
      photos = JSON.parse(photoObj) 
    }else{
      photos = photoObj;
    }
    photos.forEach(item => {
      imageUrl.value.push(`${import.meta.env.VITE_TIXIN_LOGIN_API}${item.path}`)
    })
  }
  imageVisible.value = true;
};
</script>

<script lang="ts">
  export default {
    name: 'MaintainDetail',
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
