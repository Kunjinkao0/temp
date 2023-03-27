<template>
  <div class="first_line">
    <img class="home_image_size" :src="homeImage" @click="gotoHomePage()"/>
    <div class="title">文明乘梯</div>
    <div :class="selectedIndex === 0 ? 'first_line_tab_selected' : 'first_line_tab'" @click="gotoComplexStatistical()">
      <img class="first_line_image_size" :src="statisticImage"/>
      <text class="complex_statistic_text">综合统计</text>
    </div>
    <div :class="selectedIndex === 1 ? 'first_line_tab2_selected' : 'first_line_tab2'" @click="gotoPoliteTakeElevator()">
      <img class="first_line_image_size" :src="wenmingImage"/>
      <text class="complex_statistic_text">文明乘梯</text>
    </div>
    <div style="flex: 1"/>
    <div class="first_line_account">
      <img class="account_image" :src="accountImage"/>
      <text class="complex_statistic_text">管理员</text>
      <img class="account_arrow_image" :src="accountArrowImage"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
    import { computed } from 'vue';
    import { useUserStore } from '@/store';
    import homeImage from '@/assets/images/statistical/statistical_home_icon.png'
    import statisticImage from '@/assets/images/statistical/complex_statistic_icon.png'
    import wenmingImage from '@/assets/images/statistical/wenming_ride.png'
    import accountImage from '@/assets/images/statistical/account.png'
    import accountArrowImage from '@/assets/images/statistical/account_arrow.png'
    import router from "@/router";
    import {ref} from 'vue'

    const selectedIndex = ref(0)

    const userStore = useUserStore();
    const userInfo = computed(() => {
        return {
            nickName: userStore.name
        };
    });

    const gotoComplexStatistical = () => {
      selectedIndex.value = 0;
      router.replace({
        path: '/complexStatistical'
      });
    }

    const gotoPoliteTakeElevator = () => {
      selectedIndex.value = 1;
      router.replace({
        path: '/politeTakeElevator'
      });
    }

    const gotoHomePage = () => {
      router.push({
        name: 'home'
      });
    }
</script>

<style scoped lang="less">
.first_line {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
}

.home_image_size{
  width: 30px;
  height: 30px;
}

.first_line_image_size {
  width: 20px;
  height: 20px;
}
.complex_statistic_text {
  font-size: small;
  color: #FFFFFF;
  background-color: transparent;
  margin-left: 5px;
}

.first_line_tab {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 10px;
}
.first_line_tab:active {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}
.first_line_tab:hover {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}
.first_line_tab_selected {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.first_line_tab2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 10px;
}
.first_line_tab2:active {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}
.first_line_tab2:hover {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}
.first_line_tab2_selected {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.title {
  font-size: x-large;
  color: #FFFFFF;
  background-color: transparent;
  margin-left: 10px;
  margin-right: 15px;
}

.first_line_account {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.account_image {
  width: 20px;
  height: 20px;
}


.account_arrow_image {
  width: 15px;
  height: 15px;
}
</style>
