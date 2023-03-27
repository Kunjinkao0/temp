<template>
    <div
      style="position: relative; overflow: hidden;width: 100%;"
      :style="{ height: height + 'px' }"
    >
      <div class="sxd-square">
        <div
          class="sxd-box"
          :style="{ width: height + 'px' }"
        >
          <div class="sxd-rebox" v-bind="$attrs">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </template>
   
  <script lang="ts">
  // 提供一个纯css的横向滚动框，必须指定高度且只支持数字
  import { defineComponent } from 'vue';
   
  export default defineComponent({
    inheritAttrs: false,
  });
  </script>
   
  <script lang="ts" setup>
  defineProps<{ height: number,width: number }>();
  </script>
   
  <style lang="less" scoped>
  .sxd-square {
    width: 100%;
    height: 0;
    padding-top: 100%;
    position: relative;
  }
  .sxd-box {
    transform: rotateZ(-90deg) rotateY(180deg);
    transform-origin: left top;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .scrollbar();
    .sxd-rebox {
      transform: rotate(90deg) rotateX(180deg);
      transform-origin: left top;
    }
  }

  .scrollbar {
  &::-webkit-scrollbar {
    width           : 0px;
    height          : 0px;
    background-color: #FFFFFF;
  }
 
  /*定义滚动条轨道 内阴影+圆角*/
  &::-webkit-scrollbar-track {
    box-shadow        : inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius     : 10px;
    background-color  : #f5f5f5;
  }
 
  /*定义滑块 内阴影+圆角*/
  &::-webkit-scrollbar-thumb {
    border-radius     : 10px;
    box-shadow        : inset 0 0 6px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-color  : #c8c8c8;
  }
}
  </style>