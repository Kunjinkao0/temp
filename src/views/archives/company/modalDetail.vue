<template>
    <div class="container cu-flex-y">
        <Breadcrumb :items="['menu.rescue', 'menu.archives.company', 'menu.archives.view']" />
        <div class="header-image">
            <div class="cu-fx-n-center cu-flex1" style="margin-top: 32px;">
                <img :src="icon1" alt="">
                <div class="cu-marl8 cu-font16 cu-fontWeight600">{{ data.propertyName }}</div>
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
                  <a-card class="cu-mart16" style="margin-bottom:20px;">
                    <!-- 单位职员 -->
                    <div>
                      <div class="cu-link-vertical"></div>
                      <span class="cu-font14 cu-fontWeight600 cu-marl4">{{ $t('menu.archives.basic.person')
                        }}</span>
                    </div>
                    <a-collapse :default-active-key="['1']" :bordered="true" style="margin-top: 16px;">
                      <a-collapse-item :header="$t('menu.archives.person')" key="1" style="margin-left: 15px;">
                        <a-list>
                          <div v-for="item in principal" :key="item.person">
                            <a-list-item v-if="item.person!=='' && item.telephone !== ''">
                              <a-space :size="30">
                                <a-space>
                                  <img :src="ipcamera" v-if="item.person!==''"/>
                                  <div class="cu-marlr4">{{item.person}}</div>
                                </a-space>
                                <a-space>
                                  <img :src="telphone" v-if="item.person!==''"/>
                                  <div class="cu-marlr4">{{item.telephone}}</div>
                                </a-space>
                              </a-space>
                            </a-list-item>
                          </div>

                        </a-list>
                      </a-collapse-item>
                      <a-collapse-item header="电梯安全管理员" key="1" style="margin-left: 15px;">
                        <a-list>
                          <div v-for="item in securityAdmin" :key="item.person">
                            <a-list-item v-if="item.person!=='' && item.telephone !== ''">
                              <a-space :size="30">
                                <a-space>
                                  <img :src="ipcamera" v-if="item.person!==''"/>
                                  <div class="cu-marlr4">{{item.person}}</div>
                                </a-space>
                                <a-space>
                                  <img :src="telphone" v-if="item.person!==''"/>
                                  <div class="cu-marlr4">{{item.telephone}}</div>
                                </a-space>
                              </a-space>
                            </a-list-item>
                          </div>
                        </a-list>
                      </a-collapse-item>
                    </a-collapse>
                  </a-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import telphone from '@/assets/images/archives/telphone.png';
import ipcamera from '@/assets/images/archives/ipcamera.png';
import icon1 from '@/assets/images/rescue/icon-1.png';
import { ref, reactive, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getWorkerManageList } from '@/api/archives/company';

// 国际化
const { t } = useI18n();

const data = reactive({
    propertyName: "",
    address: "",
    orgCode: ""
});

// 基本资料数据
const basicData = reactive([]);

// 负责人
const principal = ref([]);

// 安全管理员
const securityAdmin = ref([]);

onMounted(() => {
    principal.value = [];
	securityAdmin.value = [];
	
	const companyDetail = localStorage.getItem('companyDetail');
    if (companyDetail) {
        const companyLocal = JSON.parse(companyDetail);
        Object.assign(data, companyLocal);

        basicData.length = 0;
        basicData.push(...[{
            title: t('menu.archives.companyAddress'), // 单位地址
            content: data.address,
        }, {
            title: t('menu.archives.organizationCode'), // 组织机构代码
            content: data.orgCode,
        }]);

        // // 负责人
        // principal.value.push({
        //     person: companyLocal.person,
        //     telephone: companyLocal.telephone
        // })

        // // 安全管理员
        // securityAdmin.value.push({
        //     person: companyLocal.eleSecurityAdmin,
        //     telephone: companyLocal.adminPhone
        // })

        initWorkerManageList(companyLocal.id);
    }
})

const initWorkerManageList = async (unitId : string) => {
    const { data:unitData } = await getWorkerManageList({unitId,unitType:2,childType:2})
    if(unitData.rows.length>0){
        unitData.rows.forEach(item => {
            if(item.userType === 1){
                principal.value.push({
                    person: item.name,
                    telephone: item.phone
                })
            }else if(item.userType === 2){
                securityAdmin.value.push({
                    person: item.name,
                    telephone: item.phone
                })
            }
        })
    }
}

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
</script>

<script lang="ts">
  export default {
    name: 'CompanyDetail',
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
    border-bottom: none;
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
