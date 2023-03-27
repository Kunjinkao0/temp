<template>
  <div class="item-container">
    <a-space :size="16" direction="vertical" fill>
      <a-descriptions
        v-for="(item, idx) in UserInfoLabelList"
        :key="idx"
        :label-style="{
          textAlign: 'right',
          width: '200px',
          paddingRight: '10px',
          color: 'rgb(var(--gray-8))',
        }"
        :value-style="{ width: '400px' }"
        :title="item.title"
        :data="item.data"
        :column="1"
      >
        <template #value="{ value }">
          <a-skeleton v-if="loading" :animation="true">
            <a-skeleton-line :widths="['200px']" :rows="1" />
          </a-skeleton>
          <span v-else>{{ value }}</span>
        </template>
      </a-descriptions>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
  import { UserRecord } from '@/api/userManage';
  import { computed, PropType } from 'vue';
  import { useI18n } from 'vue-i18n';

  type UserInfoLabel = {
    title: string;
    data: {
      label: string;
      value: string;
    }[];
  }[];

  const props = defineProps({
    type: {
      type: String,
      default: '',
    },
    renderData: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  });
  const { t } = useI18n();
  const UserInfoLabelList = computed<UserInfoLabel>(() => {
    const { renderData } = props;
    const result = [];
    result.push({
      // title: t('userManage.model.groupName'),
      data:[
        {
          label: t('userManage.model.name'),
          value: renderData?.record?.name
        },{
          label: t('userManage.model.code'),
          value: renderData?.record?.code
        },{
          label: t('userManage.model.phone'),
          value: renderData?.record?.phone
        },{
          label: t('userManage.model.locked'),
          value: renderData?.record?.locked
        },{
          label: t('userManage.model.accountStatus'),
          value: renderData?.record?.accountStatus
        },
    ]})
    return result;
  });
</script>

<style scoped lang="less">
  .item-container {
    padding-top: 20px;
    :deep(.arco-descriptions-item-label) {
      font-weight: normal;
    }
  }
</style>
