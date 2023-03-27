<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.demand.maintenance',
        'menu.settingType.title',
        'menu.settingType.set.title'
      ]"
    />
    <a-grid :cols="24" :col-gap="16" :row-gap="16">
      <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }">
        
            <a-card
            :bordered="false"
            :title="$t('menu.settingType.set.askFor.title')"
            :header-style="{ border: '0' }"
            :body-style="{ padding: '0 16px' }"
            >
            <div class="card-body-div-style">
                <a-form
                :model="formModel"
                :label-col-props="{ span: 18 }"
                :wrapper-col-props="{ span: 18 }"
                style="width: 40%"
                label-align="right"
                :on-load="true"
                >
                <a-row :gutter="18">
                    <a-col :span="18" style="flex: 1">
                    <!-- 类型名称 -->
                    <a-form-item
                        field="name"
                        :label="$t('menu.settingType.set.typeName')"
                        label-col-flex="200px"
                    >
                        <a-input
                        v-model="formModel.name"
                        :placeholder="
                            $t('menu.settingType.set.typeName.placeholder')
                        "
                        allow-clear
                        />
                    </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="18">
                    <a-col :span="18" style="flex: 1">
                    <!-- 类型说明 -->
                    <a-form-item
                        field="description"
                        :label="$t('menu.settingType.set.typeNote')"
                        label-col-flex="200px"
                    >
                        <a-input
                        v-model="formModel.description"
                        :placeholder="
                            $t('menu.settingType.set.typeNote.placeholder')
                        "
                        allow-clear
                        />
                    </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="18">
                    <a-col :span="18" style="flex: 1">
                    <!-- 电梯加装物联网设备 -->
                    <a-form-item
                        field="iotDeviceStatus"
                        :label="$t('menu.settingType.set.addEquipment')"
                        label-col-flex="200px"
                    >
                        <a-radio-group v-model="formModel.iotDeviceStatus">
                        <a-radio :value=1>是</a-radio>
                        <a-radio :value=2>否</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="18">
                    <a-col :span="18" style="flex: 1">
                    <!-- 最后一次电梯年检 -->
                    <a-form-item
                        field="yearInspectionStatus"
                        :label="$t('menu.settingType.set.lastYearCheck')"
                        label-col-flex="200px"
                    >
                        <a-radio-group v-model:model-value="formModel.yearInspectionStatus">
                        <a-radio :value=1>合格</a-radio>
                        <a-radio :value=2>不合格</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="18">
                    <a-col :span="18" style="flex: 1">
                    <!-- 电梯使用年限 -->
                    <a-form-item
                        field="useServiceLife"
                        :label="$t('menu.settingType.set.eleUseAge')"
                        label-col-flex="200px"
                    >
                        <a-input-number
                            v-model="formModel.useServiceLife"
                            :placeholder="
                                $t('menu.settingType.set.eleUseAge.placeholder')
                            "
                            :parser="parserToInteger"
                        />
                    </a-form-item>
                    </a-col>
                </a-row>
                </a-form>
            </div>
            </a-card>
            <a-card
            :bordered="false"
            :title="$t('menu.settingType.set.mainUnit.title')"
            :header-style="{ border: '0' }"
            :body-style="{ padding: '0 16px' }"
            >
            <div class="card-body-div-style">
                <a-form
                :model="formModel"
                :label-col-props="{ span: 18 }"
                :wrapper-col-props="{ span: 18 }"
                style="width: 40%"
                label-align="right"
                >
                <a-row :gutter="18">
                    <a-col :span="18" style="flex: 1">
                    <!-- 注册登记地址 -->
                    <a-form-item
                        field="maintainAddress"
                        :label="$t('menu.settingType.set.registerAddr')"
                        label-col-flex="200px"
                    >
                        <a-input
                        v-model="formModel.maintainAddress"
                        :placeholder="
                            $t('menu.settingType.set.registerAddr.placeholder')
                        "
                        allow-clear
                        />
                    </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="18">
                    <a-col :span="18" style="flex: 1">
                    <!-- 未发生事故安全责任年限 -->
                    <a-form-item
                        field="safetyAccidentYears"
                        :label="$t('menu.settingType.set.accidentAge')"
                        label-col-flex="200px"
                    >
                        <a-input-number
                            v-model="formModel.safetyAccidentYears"
                            :step="1"
                            :placeholder="
                                $t('menu.settingType.set.accidentAge.placeholder')
                            "
                            :parser="parserToInteger"
                        />
                    </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="18">
                    <a-col :span="18" style="flex: 1">
                    <!-- 独立承担法律责任 -->
                    <a-form-item
                        field="legalResponsibilityStatus"
                        :label="$t('menu.settingType.set.legalDuty')"
                        label-col-flex="200px"
                    >
                        <a-radio-group v-model:model-value="formModel.legalResponsibilityStatus">
                        <a-radio :value=1>是</a-radio>
                        <a-radio :value=2>否</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="18">
                    <a-col :span="18" style="flex: 1">
                    <!-- 维保许可证 -->
                    <a-form-item
                        field="maintenancelicenseStatus"
                        :label="$t('menu.settingType.set.maintenanceLicense')"
                        label-col-flex="200px"
                    >
                        <a-radio-group v-model:model-value="formModel.maintenancelicenseStatus">
                        <a-radio :value=1>是</a-radio>
                        <a-radio :value=2>否</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="18">
                    <a-col :span="18" style="flex: 1">
                    <!-- 电梯使用年限 -->
                    <a-form-item
                        field="isEleUseAge"
                        :label="$t('menu.settingType.set.isEleUseAge')"
                        label-col-flex="200px"
                    >
                        <a-radio-group v-model:model-value="formModel.isEleUseAge">
                        <a-radio :value=1>是</a-radio>
                        <a-radio :value=2>否</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="18">
                    <a-col :span="18" style="flex: 1">
                    <!-- 年检合格率 -->
                    <a-form-item
                        field="inspectionPassRate"
                        :label="
                        $t('menu.settingType.set.yearlyInspection.passRate')
                        "
                        label-col-flex="200px"
                    >
                        <a-input-number
                            v-model="formModel.inspectionPassRate"
                            :placeholder="
                                $t(
                                'menu.settingType.set.yearlyInspection.passRate.placeholder'
                                )
                            "
                            :parser="parserToInteger"
                        />
                    </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="18">
                    <a-col :span="18" style="flex: 1">
                    <!-- 年检合格年数 -->
                    <a-form-item
                        field="inspectionPassYears"
                        :label="
                        $t('menu.settingType.set.yearlyInspection.passYears')
                        "
                        label-col-flex="200px"
                    >
                        <a-input-number
                            v-model="formModel.inspectionPassYears"
                            :placeholder="
                                $t(
                                'menu.settingType.set.yearlyInspection.passYears.placeholder'
                                )
                            "
                            :parser="parserToInteger"
                        />
                    </a-form-item>
                    </a-col>
                </a-row>
                </a-form>
            </div>
            </a-card>
            <a-card
            :bordered="false"
            :title="$t('menu.settingType.set.mainNote.title')"
            :header-style="{ border: '0' }"
            :body-style="{ padding: '0 16px' }"
            >
            <div class="card-body-div-style">
                <a-form
                :model="formModel"
                :label-col-props="{ span: 18 }"
                :wrapper-col-props="{ span: 18 }"
                style="width: 40%"
                label-align="right"
                >
                <a-row :gutter="18">
                    <a-col :span="18" style="flex: 1">
                    <!-- 维保最长时间间隔 -->
                    <a-form-item
                        field="matainInterval"
                        :label="$t('menu.settingType.set.mainLongestInterval')"
                        label-col-flex="200px"
                    >
                        <a-input-number
                            v-model="formModel.matainInterval"
                            :placeholder="
                                $t(
                                'menu.settingType.set.mainLongestInterval.placeholder'
                                )
                            "
                            :parser="parserToInteger"
                        />
                    </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="18">
                    <a-col :span="18" style="flex: 1">
                    <!-- 上传现场照片/视频 -->
                    <a-form-item
                        field="needUploadMedia"
                        :label="$t('menu.settingType.set.uploadPhotoOrvideo')"
                        label-col-flex="200px"
                    >
                        <a-radio-group v-model:model-value="formModel.needUploadMedia">
                        <a-radio :value=1>是</a-radio>
                        <a-radio :value=2>否</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    </a-col>
                </a-row>
                </a-form>
            </div>
            </a-card>
            <a-card :bordered="false" :header-style="{ border: '0' }">
            <a-space size="medium">
                <a-button type="primary" @click="savaSettingType">{{
                $t('form.save')
                }}</a-button>
                <a-button @click="reset">{{ $t('form.reset') }}</a-button>
            </a-space>
            </a-card>
      </a-grid-item>
    </a-grid>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import {
    querySettingTypeDetail,
    addSettingType,
    updateSettingType
  } from '@/api/demandMaintenance/settingType';
  import { useRouter } from 'vue-router';
import Message from '@arco-design/web-vue/es/message';
import { parseInt } from 'lodash';

  const router = useRouter()
  // 路由接收参数
  const idParam: any = router.currentRoute.value.query.id;

  // 国际化
  const { t } = useI18n();
  const { loading, setLoading } = useLoading(true);

  const formModel = ref({
    id: '',
        name: '',
        description: '',
        iotDeviceStatus: 1,
        yearInspectionStatus: 1,
        useServiceLife: 0,
        maintainAddress: '',
        safetyAccidentYears: 0,
        legalResponsibilityStatus: 1,
        maintenancelicenseStatus: 1,
        isEleUseAge: 1,
        inspectionPassRate: 0,
        inspectionPassYears: 0,
        matainInterval: 0,
        needUploadMedia: 1
  });

  const savaSettingType = async () => {
    setLoading(true);
    try {
      await addSettingType(formModel.value);
      // 这得提示用接口返回的文字
      Message.success('保存成功')
    } catch (err) {
      // 这得提示用接口返回的文字
      Message.error('保存失败')
    } finally {
      setLoading(false);
      setTimeout(() => {
        router.go(-1)
      }, 500);
    }
  };

  const reset = () =>{
    formModel.value = generateFormModel()
  }

  const generateFormModel = () => {
    return {
        id: '',
        name: '',
        description: '',
        iotDeviceStatus: 1,
        yearInspectionStatus: 1,
        useServiceLife: 0,
        maintainAddress: '',
        safetyAccidentYears: 0,
        legalResponsibilityStatus: 1,
        maintenancelicenseStatus: 1,
        isEleUseAge: 1,
        inspectionPassRate: 0,
        inspectionPassYears: 0,
        matainInterval: 0,
        needUploadMedia: 1
    };
};

const parserToInteger = (value) => {
    return parseInt(value)
};
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }

  .card-body-div-style {
    border: 1px solid rgb(230, 228, 228);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--color-bg-2);
    :deep(.arco-form) {
      .arco-form-item {
        &:last-child {
          margin-top: 20px;
        }
      }
    }
  }
</style>
