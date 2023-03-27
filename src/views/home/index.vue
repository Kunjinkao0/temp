<template>
    <div class="container">
        <!-- 轮播图片 -->
        <a-carousel :style="{ width: '100%', height: '100vh' }" :auto-play="true" animation-name="fade"
            indicator-type="never" show-arrow="never">
            <a-carousel-item v-for="image in images" :key="image">
                <img :src="image" :style="{ width: '100%', height: '100vh' }" />
            </a-carousel-item>
        </a-carousel>
        <div class="logout">
            <a-button type="outline" shape="round" class="cu-pointer" @click="logoutClick">
                <template #icon>
                    <img :src="logoutPic" style="width: 24px; vertical-align: middle;" />
                </template>
                退出登录
            </a-button>
        </div>
        <div class="content-box">
            <div>
                <div class="in-marb96 cu-color-FFFFFF">
                    <div class="cu-font36 cu-marb8">早上好！{{ name }}</div>
                    <div class="cu-font48">欢迎来到电梯安全数字化监管平台</div>
                </div>
                <div class="cu-fx">
                    <img :src="smartSupervisionPic" class="cu-marlr48 img cu-pointer" @click="goto(4)" />
                    <img :src="civilElevatorPic" class="cu-marlr48 img cu-pointer" @click="goto(0)" />
                    <img :src="platformSmall1Pic" class="img cu-pointer" @click="goto(1)" />
                    <img :src="platformSmall2Pic" class="cu-marlr48 img cu-pointer"
                        @click="goto(2)" />
                    <img :src="platformSmall3Pic" class="img cu-pointer" @click="goto(3)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import smartSupervisionPic from '@/assets/images/smartSupervision/smart_supervision_icon.png'
import civilElevatorPic from '@/assets/images/statistical/civil_elevator_icon.png'
import platformSmall3Pic from '@/assets/images/login/platform-small-3.png'
import platformSmall2Pic from '@/assets/images/login/platform-small-2.png'
import platformSmall1Pic from '@/assets/images/login/platform-small-1.png'
import logoutPic from '@/assets/images/login/logout.png'
import backgroundImg1 from '@/assets/images/login/background-1.jpg';
import backgroundImg2 from '@/assets/images/login/background-2.jpg';
import backgroundImg3 from '@/assets/images/login/background-3.jpg';
import backgroundImg4 from '@/assets/images/login/background-4.jpg';
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore, useUserStore } from '@/store';
import useUser from '@/hooks/user';
import { getToken, getTixinToken } from '@/utils/auth';
import { gotoTiXin,gotoScreen } from '@/api/user';

const { logout } = useUser();
const userStore = useUserStore();
const name = ref('');
const router = useRouter();
let token;
// 背景轮播
const images = [
  backgroundImg1,
  backgroundImg2,
  backgroundImg3,
  backgroundImg4,
];

onMounted(() => {
    name.value = userStore.name;
})

// 退出登录
const logoutClick = () => {
    logout();
}

// 跳转页面
const goto = (type: number) => {
    if(type === 0){
      router.push({
        name: 'ComplexStatistic'
      });
    }else if(type === 1){
		token = getTixinToken();
		gotoScreen({accessToken:token})
       
    }else if (type === 2) { // 跳转到电梯安全监管系统
        router.push({
            name: 'Workplace'
        });
    } else if(type === 3){
		  token = getTixinToken();
		  gotoTiXin({accessToken:token})
	 }else if(type === 4){
      router.push({
        name: 'IotDetection'
      });
    }
}

</script>

<style scoped lang='less'>
.container {
    width: 100%;
    height: 100vh;
}

.content-box {
    width: 100%;
    height: 100vh;
    z-index: 9;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.logout {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    margin-right: 24px;
    margin-top: 24px;
}

:deep(.arco-btn-outline) {
    color: #FFFFFF;
    border: 1px solid #FFFFFF;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(4px);
}

:deep(.arco-btn-outline:hover) {
    color: #FFFFFF;
    border: 1px solid #FFFFFF;
    background: rgba(22, 93, 255, 0.6);;
    backdrop-filter: blur(4px);
}

.in-marb96 {
    margin-bottom: 96px;
}

.img {
    width: 300px;
}

.img:hover {
    transform: scale(1.2);
}
</style>
