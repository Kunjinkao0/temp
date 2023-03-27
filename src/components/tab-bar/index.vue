<template>
  <div class="tab-bar-container">
    <!-- <a-affix ref="affixRef" :offset-top="offsetTop"> -->
      <div class="tab-bar-box">
        <ScrolXDiv :height="48" :width="leftWidth" style="display: flex; flex-direction: row;">
          <div class="tab-bar-scroll">
            <div class="tags-wrap">
              <tab-item
                v-for="(tag, index) in tagList"
                :key="tag.fullPath"
                :index="index"
                :item-data="tag"
              />
            </div>
          </div>
        </ScrolXDiv>
        <a-dropdown trigger="hover" position="bl">
          <a-button class="tag-bar-operation" style="background: #FFFFFF;">···</a-button>
          <template #content>
            <a-doption v-for="(tag, index) in tagList" :key="tag.fullPath" :index="index" @click="gotoTabBar(tag)">
              {{tag.title}}
            </a-doption>
          </template>
        </a-dropdown>
      </div>
    <!-- </a-affix> -->
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, watch, onUnmounted, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import type { TagProps } from '@/store/modules/tab-bar/types';
  import type { RouteLocationNormalized } from 'vue-router';
  import {
    listenerRouteChange,
    removeRouteListener,
  } from '@/utils/route-listener';
  import { useAppStore, useTabBarStore } from '@/store';
  import tabItem from './tab-item.vue';
  import ScrolXDiv from '../scroll/scrolXDiv.vue';

  const appStore = useAppStore();
  const tabBarStore = useTabBarStore();
  const router = useRouter();

  const affixRef = ref();
  // 当前分辨率width
  const clientWidth = ref(1920)
  const leftWidth= ref(1900)

  onMounted(() => {
      clientWidth.value = document.body.clientWidth
      leftWidth.value = clientWidth.value-appStore.menuWidth-60
  })
  
  const tagList = computed(() => {
    return tabBarStore.getTabList;
  });
  const offsetTop = computed(() => {
    return appStore.navbar ? 0 : 0;
  });

  watch(
    () => appStore.navbar,
    () => {
      affixRef.value.updatePosition();
    }
  );
  listenerRouteChange((route: RouteLocationNormalized) => {
    if (
      !route.meta.noAffix &&
      !tagList.value.some((tag) => tag.fullPath === route.fullPath)
    ) {
      tabBarStore.updateTabList(route);
    }
  }, true);

  const gotoTabBar = (tag: TagProps) => {
    router.push({ ...tag });
  };

  onUnmounted(() => {
    removeRouteListener();
  });
</script>

<style scoped lang="less">
  .tab-bar-container {
    position: relative;
    background-color: var(--color-bg-2);
    .tab-bar-box {
      display: flex;
      // padding: 0 0 0 20px;
      background-color: var(--color-bg-2);
      // border-bottom: 1px solid var(--color-border);
      .tab-bar-scroll {
        height: 44px;
        flex: 1;
        white-space: nowrap;
        .tags-wrap {
          padding: 4px 0;
          height: 44px;
          white-space: nowrap;
          // overflow-x: auto;
          :deep(.arco-tag) {
            display: inline-flex;
            align-items: center;
            margin-right: 10px;
            cursor: pointer;
            &:first-child {
              .arco-tag-close-btn {
                display: none;
              }
            }
          }
        }
      }
    }

    .tag-bar-operation {
      width: 40px;
      height: 44px;
      text-align: left;
      line-height: 44px;
      background: #FFFFFF;
    }
  }
</style>
