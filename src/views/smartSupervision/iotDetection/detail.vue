<template>
    <div class="container">
      <div class="inner_root">
        <div style="height: 50px; background-color: white; padding-left: 10px">
          <Breadcrumb :items="['smartSupervision.iotDetection.title', 'menu.archives.view']" />
        </div>
        <div style="margin: 5px">
        <div class="header-image">
          <div class="cu-fx" style="height: 100%">
            <div class="cu-fx-n-center cu-flex1_5">
              <img :src="icon1" alt="" />
              <div class="cu-marl8 cu-font16 cu-fontWeight600">{{ address }}</div>
            </div>
            <div class=" cu-flex cu-marr16">
              <div class="cu-fx-n-center cu-flex1 cu-marr16">
                <img :src="icon2" alt="" />
                <div class="cu-font16 cu-marl4">电梯状态：</div>
                <div class="cu-font16 cu-fontWeight600">{{ elevatorState }}</div>
              </div>
              <a-popover position="top">
                <div class="cu-fx-n-center">
                  <img :src="icon4" alt="" />
                  <div class="cu-font16 cu-marl4">安全指数：</div>
                  <a-badge v-if="safeLevel === '好'" :text="safeLevel" class="good" :offset="[20, -5]">
                    <div class="cu-font16 cu-fontWeight600">{{ safeIndex }}</div>
                  </a-badge>
                  <a-badge v-else-if="safeLevel === '较好'" :text="safeLevel" class="preferably" :offset="[20, -5]">
                    <div class="cu-font16 cu-fontWeight600">{{ safeIndex }}</div>
                  </a-badge>
                  <a-badge v-else-if="safeLevel === '一般'" :text="safeLevel" class="commonly" :offset="[20, -5]">
                    <div class="cu-font16 cu-fontWeight600">{{ safeIndex }}</div>
                  </a-badge>
                  <a-badge v-else-if="safeLevel === '不好'" :text="safeLevel" class="bad" :offset="[20, -5]">
                    <div class="cu-font16 cu-fontWeight600">{{ safeIndex }}</div>
                  </a-badge>
                  <a-badge v-else-if="safeLevel === '差'" :text="safeLevel" class="difference" :offset="[20, -5]">
                    <div class="cu-font16 cu-fontWeight600">{{ safeIndex }}</div>
                  </a-badge>
                </div>
                <template #content>
                  <p>安全指数(值) =（故障系数+异常系数+时长系数）* 梯龄系数</p>
                </template>
              </a-popover>
              <!-- <div class="cu-fx-n-center cu-flex1">
                  <div class="cu-font14 cu-marl4 ele-baogao" @click="openBaogaoModel">电梯安全评价报告</div>
              </div> -->
            </div>
          </div>
        </div>
        </div>
        <div style="flex: 1; margin: 0 5px">
          <!-- 物联数据 -->
          <IotData ref="iotDataRef" :id="id" />
        </div>
        <a-modal width="auto" v-model:visible="visible" :footer="false" :simple="true" draggable>
          <ElevatorReport />
        </a-modal>
      </div>
    </div>
</template>

<script setup lang='ts'>
import icon4 from '@/assets/images/archives/icon-4.png'
import icon2 from '@/assets/images/archives/icon-2.png'
import icon1 from '@/assets/images/archives/icon-1.png'
import { ref, reactive, onMounted, onActivated } from 'vue'
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n';
import {Message, Steps} from '@arco-design/web-vue';
import { getSafetyIndexByArchives } from '@/api/archives/elevator';
import IotData from './components/IotData.vue';


// 路由接收参数
const router = useRouter()
const idParam: any = router.currentRoute.value.query.id;
const id = ref(idParam);
const devCode = ref(""); // 设备编号
const address = ref(''); // 电梯地址
const elevatorState = ref(''); // 电梯状态
const safeIndex = ref(''); // 安全指数
const safeLevel = ref(''); // 指数等级
// 国际化
const { t } = useI18n();

onMounted(() => {
    if (id.value) {
        // TODO:: 不存在devCode如何处理
        // Message.error("缺少参数，返回上一页");
        const elevatorDetail = localStorage.getItem(`elevatorDetail_${idParam}`);
        const elevatorLocal = JSON.parse(elevatorDetail);
		
        devCode.value = elevatorLocal.devCode;
        address.value = elevatorLocal.address;
		if(elevatorLocal.useState===1){
			elevatorState.value = "待用";
		}else if(elevatorLocal.useState===2){
			elevatorState.value = "在用";
		}else if(elevatorLocal.useState===3){
			elevatorState.value = "停用";
		}else if(elevatorLocal.useState===4){
			elevatorState.value = "正在大修";
		}else if(elevatorLocal.useState===5){
			elevatorState.value = "正在改造";
		}else if(elevatorLocal.useState===6){
			elevatorState.value = "终止保养";
		}
        

        if (devCode.value) {
            getSafetyIndexInfo();
        } else {
            Message.error("未关联设备");
        }
    }
})

// 获取安全指数
const getSafetyIndexInfo = async () => {
    const params = {
        'devCode': devCode.value
    }

    const { data } = await getSafetyIndexByArchives(params);

    const faultNum = data.faultNum;
    const errorNum = data.errorNum;
    const maintainTime = data.maintainTime;
    const age = data.age;

    // 故障系数
    let faultFactor = parseFloat((1 * parseInt(faultNum, 10)).toFixed(2));

    // 异常系数
    let errorFactor = parseFloat((0.001 * parseInt(errorNum, 10)).toFixed(2));

    // 梯龄系数
    let ageFactor = 1;
    if (parseInt(age, 10) > 15) {
        ageFactor = parseFloat((1 + (parseInt(age, 10) - 15) * 0.1).toFixed(2));
    }

    // 时长系数
    let mainFactor = parseFloat((1 / 90 * parseFloat(maintainTime)).toFixed(2));

    // 计算安全指数 安全指数(值)=（故障系数+异常系数+时长系数）*梯龄系数
    let safetyIndex = faultFactor + errorFactor + mainFactor * ageFactor;
    safeIndex.value = safetyIndex.toFixed(2);
    getSafetyResult();
}

// 计算指数等级
const getSafetyResult = () => {
    const level = parseFloat(safeIndex.value);
    if (level <= 1) {
        safeLevel.value = "好";
    } else if (level > 1 && level <= 2.5) {
        safeLevel.value = "较好";
    } else if (level > 2.5 && level <= 4) {
        safeLevel.value = "一般";
    } else if (level > 4 && level <= 5.5) {
        safeLevel.value = "不好";
    } else if (level > 5.5) {
        safeLevel.value = "差";
    }
}

const tabActived = ref(0); // 被选中的tab
// tab数据
const tabList = reactive([
    {
        index: 0,
        name: '电梯资料',
        isChecked: true
    },
    {
        index: 1,
        name: '物联数据',
        isChecked: false
    },
    {
        index: 2,
        name: '救援工单',
        isChecked: false
    },
    {
        index: 3,
        name: '维保工单',
        isChecked: false
    },
    {
        index: 4,
        name: '维修工单',
        isChecked: false
    }
])

const tabClick = (params: any) => {
    for (let item of tabList) {
        if (params.index === item.index) {
            tabActived.value = params.index;
            Object.assign(item, { index: item.index, name: item.name, isChecked: true });
        } else {
            Object.assign(item, { index: item.index, name: item.name, isChecked: false });
        }
    }
}

const visible = ref(false)

const openBaogaoModel = () => {
    visible.value = true
}

const handleOk = () => {
    visible.value = false;
};
const handleCancel = () => {
    visible.value = false;
}

</script>

<script lang="ts">
  export default {
    name: 'ElevatorDetail',
  };
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  padding: 0 30px 30px 30px;
  background-image: url('@/assets/images/statistical/statistical_bg.png')
}

.inner_root {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #EEF1FB;
}

.header-image {
  background-color: white;
    height: 50px;
    background-size: 100% 100%;
    padding: 0 20px
}

:deep(.good .arco-badge-text) {
    background-color: #00b42a;
    box-shadow: 0 0 0 1px var(--color-bg-2);
}

:deep(.preferably .arco-badge-text) {
    background-color: #9fdb1d;
    box-shadow: 0 0 0 1px var(--color-bg-2);
}

:deep(.commonly .arco-badge-text) {
    background-color: #fadc19;
    box-shadow: 0 0 0 1px var(--color-bg-2);
}

:deep(.bad .arco-badge-text) {
    background-color: #ff7d00;
    box-shadow: 0 0 0 1px var(--color-bg-2);
}

:deep(.difference .arco-badge-text) {
    background-color: #f53f3f;
    box-shadow: 0 0 0 1px var(--color-bg-2);
}

:deep(.arco-btn-outline) {
    border: 1px solid #d8dadd;
}

:deep(.arco-divider-horizontal) {
    margin: 0;
}

.active_header {
    color: #fff;
    background-color: rgb(var(--primary-6));
    border: 1px solid transparent;
    text-align: center;
    border-radius: 100px;
    height: 32px;
    line-height: 32px;
}

.not_active_header {
    text-align: center;
    height: 32px;
    line-height: 32px;
}

.ele-baogao{
    border: 1px solid rgb(var(--gray-6));
    border-radius: 50px;
    width: 180px;
    text-align: center;
    height: 30px;
    line-height: 25px;
    color: #165DFF;
    cursor: pointer;
}
</style>
