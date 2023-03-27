<template>
    <div class="container">
        <Breadcrumb :items="['menu.rescue', 'menu.rescue.statistics']" />
        <a-card class="general-card" :title="$t('menu.rescue.statistics.form.title')">
            <template #title>
            <span class="cu-fontWeight700 cu-font16"> {{$t('menu.rescue.statistics.form.title')}}</span>
            </template>
            <a-row>
                <a-col :flex="5">
                <a-form
                    :model="formModel"
                    :label-col-props="{ span: 6 }"
                    :wrapper-col-props="{ span: 18 }"
                    label-align="left"
                >
                    <a-row :gutter="16">
                        <a-col :span="8">
                            <a-form-item
                            field="ownerId"
                            :label="$t('menu.rescue.statistics.form.owner')"
                            >
                                <a-tree-select :placeholder="$t('menu.repair.statistics.form.owner.placeholder')" :data="ownerOption"
                                        v-model="formModel.ownerId" class="input-search" :showSearch="true" @change="changeTreeNode" @clear="clear"
                                        :treeProps="{virtualListProps: {height: 200},defaultExpandedKeys:['0,1'],blockNode:true}" :defaultValue="formModel.ownerId"
                                        :filter-tree-node="filterTreeNode" allowClear allow-search></a-tree-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-form-item
                            field="mainUnitId"
                            :label="$t('menu.rescue.statistics.form.mainUnit')"
                            >
                                <a-select v-model="formModel.maintainIds" :placeholder="$t('menu.rescue.statistics.form.mainUnit.placeholder')"
                                          class="input-search"  :trigger-props="{ autoFitPopupMinWidth: true }" allow-clear allow-search>
                                    <a-option v-for="item of mainUnitOption" :value="item.id" :label="item.maintainName" :key="item.id"/>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-form-item
                            field="useUnitId"
                            :label="$t('menu.rescue.statistics.form.useUnit')"
                            >
                                <a-select v-model="formModel.propertyIds" :placeholder="$t('menu.rescue.statistics.form.useUnit.placeholder')"
                                          :trigger-props="{ autoFitPopupMinWidth: true }" class="input-search" allow-clear allow-search>
                                    <a-option v-for="item of useUnitOption" :value="item.id" :label="item.propertyName" :key="item.id"/>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
                </a-col>
                <a-divider style="height: 32px" direction="vertical" />
                <a-col :flex="1">
                    <div class="cu-fx">
                        <!-- 重置按钮 -->
                        <a-button class="cu-marl16" :long="true" style="margin:0 16px" @click="reset">
                            <template #icon>
                                <icon-refresh />
                            </template>
                            {{ $t('searchTable.form.reset') }}
                        </a-button>
                        <!-- 查询按钮 -->
                        <a-button type="primary" :long="true" @click="search">
                            <template #icon>
                                <icon-search />
                            </template>
                            {{ $t('searchTable.form.search') }}
                        </a-button>
                    </div>
                </a-col>
            </a-row>
        </a-card>
        <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
            <a-grid-item
            :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 16, xxl: 16 }"
            >
                <a-grid :cols="24" :col-gap="16" :row-gap="16">
                <a-grid-item
                :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }"
                >
                <WorkStatistics ref="workStatisticsRef" :parent-params="formModel"/>
                </a-grid-item>
                <a-grid-item
                :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }"
                >
                    <RescueNumStatitstics ref="rescueNumStatitsticsRef" :parent-params="formModel"/>
                </a-grid-item>
                <a-grid-item
                :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }"
                >
                    <TrappedPeopleCause ref="trappedPeopleCauseRef" :parent-params="formModel"/>
                </a-grid-item>
                </a-grid>
            </a-grid-item>

            <a-grid-item
            :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 8, xxl: 8 }"
            >
                <a-grid :cols="24" :col-gap="16" :row-gap="16">
                    <a-grid-item
                    :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }"
                    >
                        <RescueTime ref="rescueTimeRef" :parent-params="formModel"/>
                    </a-grid-item>
                    <a-grid-item
                    :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }"
                    >
                        <RescueTimeOrder ref="rescueTimeOrderRef" :parent-params="formModel"/>
                    </a-grid-item>
                </a-grid>

            </a-grid-item>

        </a-grid>

        <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
            <a-grid-item
            :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }"
            >
                <WarningElevator ref="warningElevatorRef" :parent-params="formModel"/>
            </a-grid-item>
        </a-grid>
    </div>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    import { getEleMaintainIndexList,getElePropertyIndexList } from '@/api/rescue/rescueStatistics'
    import { getOrgOwnerList, getOrgOwnerTree } from '@/utils/auth';
    import { getTreeKey } from '@/utils/common';
    import WorkStatistics from './components/work-statistics.vue'
    import WarningElevator from './components/warning-elevator.vue'
    import RescueNumStatitstics from './components/rescue-num-statitstics.vue'
    import RescueTimeOrder from './components/rescue-time-order.vue'
    import TrappedPeopleCause from './components/trapped-people-cause.vue';
    import RescueTime from './components/rescue-time.vue';

    const workStatisticsRef = ref();
    const rescueNumStatitsticsRef = ref();
    const rescueTimeRef = ref();
    const trappedPeopleCauseRef = ref();
    const rescueTimeOrderRef = ref();
    const warningElevatorRef = ref();

    const orgListData = ref([])

    const generateFormModel = () => {
        return {
            ownerId: '',
            maintainIds: '',
            propertyIds: '',
            ownerIds: '',
            orgIds: '',
            ownerIds1: '',
            type:'1',
        };
    };

    const childOrgIds = ref([])
    const childOwnerIds = ref([])

    // 项目下拉
    const ownerOption = ref([]);

    // 维保单位下拉
    const mainUnitOption = ref([]);

    // 物业单位下拉
    const useUnitOption = ref([]);

    const init = () => {
        // ajax获取树数据
        ownerIndexList();

        eleMaintainIndexList()
        elePropertyIndexList()
    }

    const ownerIndexList = async () => {
        orgListData.value = await getOrgOwnerList();
        ownerOption.value = await getOrgOwnerTree();
    }

    const eleMaintainIndexList = async () => {
        const { data } = await getEleMaintainIndexList()
        mainUnitOption.value = data
    }

    const elePropertyIndexList = async () => {
        const { data } = await getElePropertyIndexList()
        useUnitOption.value = data
    }

    init()

    const formModel = ref(generateFormModel())

    const changeTreeNode = (val) => {
        childOrgIds.value = []
        childOwnerIds.value = []

        childOwnerIds.value = getTreeKey(ownerOption.value,val)

        if(childOwnerIds.value.length===0){
            childOwnerIds.value.push(val.split(',')[0])
        }

        formModel.value.orgIds = childOrgIds.value.join(',')
        formModel.value.ownerIds = childOwnerIds.value.join(',')
        
        getOrgWithOwner(val)
    }

    const getOrgWithOwner = (val) => {
        let childOwnerIds1 = []

        const childList = orgListData.value.filter(item=> {
            if(item.pId === val){
              return item.id
            }
            return ""
        })

        childList.forEach(item => {
            if(item.type === '1'){
                childOrgIds.value.push(item.realId)
            } else {
                childOwnerIds1.push(item.realId)
            }
        })

        if(childOwnerIds1.length > 0){
            formModel.value.type = '2'
        }

        if(childOrgIds.value.length > 0){
            formModel.value.type = '1'
        }

        if(childOwnerIds1.length <= 0 && childOrgIds.value.length<=0){
            if(val !== ''){
                if(val.split(',')[1] === 1){
                    childOrgIds.value.push(val.split(',')[0])
                    formModel.value.type = val.split(',')[1]
                }else {
                    childOwnerIds1.push(val.split(',')[0])
                    formModel.value.type = val.split(',')[1]
                }
            }
        }

        formModel.value.orgIds = childOrgIds.value.join(',') 
        formModel.value.ownerIds1 = childOwnerIds1.join(',')
    }

    const search = () => {
        workStatisticsRef.value.eleWorkStat({});
        rescueNumStatitsticsRef.value.parentSearch(formModel.value);
        rescueTimeRef.value.parentSearch({});
        trappedPeopleCauseRef.value.parentSearch({});
        rescueTimeOrderRef.value.parentSearch();
        warningElevatorRef.value.parentSearch();
    }

    const reset = () => {
        formModel.value = generateFormModel();
    }

    const clear = () => {
        formModel.value.orgIds = ''
        formModel.value.ownerIds = ''
    }

    const filterTreeNode = (searchValue, nodeData) => {
        return nodeData.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
      }

</script>

<script lang="ts">
  export default {
    name: 'RescueStatistics',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
</style>
