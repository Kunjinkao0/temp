<template>
    <div class="container">
        <!-- 轮播图片 -->
        <a-carousel :style="{ width: '100%', height: '100vh' }" :auto-play="true" animation-name="fade"
            indicator-type="never" show-arrow="never">
            <a-carousel-item v-for="image in images" :key="image">
                <img :src="image" :style="{ width: '100%', height: '100vh' }" />
            </a-carousel-item>
        </a-carousel>
        <div class="content-box">
            <div class="cu-fx" style="height: 100%">
                <div class="in-marl128 cu-color-FFFFFF">
                    <div class="cu-font72">Hi，您好！</div>
                    <div class="cu-font44">欢迎来到电梯安全数字化监管平台</div>
                    <div class="cu-font24 cu-mart24">Welcome to the elevator safety digital supervision platform</div>
                </div>
                <div class="in-marl88 in-marr129">
                    <a-card class="cu-fx">
                        <LoginForm />
                    </a-card>
                </div>
            </div>
            <div class="footer">
                <Footer/>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import backgroundImg1 from '@/assets/images/login/background-1.jpg';
import backgroundImg2 from '@/assets/images/login/background-2.jpg';
import backgroundImg3 from '@/assets/images/login/background-3.jpg';
import backgroundImg4 from '@/assets/images/login/background-4.jpg';
import Footer from '@/components/footer/index.vue';
import LoginForm from './components/login-form.vue';

// 背景轮播
const images = [
  backgroundImg1,
  backgroundImg2,
  backgroundImg3,
  backgroundImg4,
];
</script>

<style lang="less" scoped>
// 轮播图样式
.container {
    width: 100%;
    height: 100vh;
}

// 内容样式
.content-box {
    width: 100%;
    height: 100vh;
    z-index: 9;
    position: absolute;
    top: 0;
    left: 0;
}

.footer {
    position: absolute;
    width: 100%;
    bottom: 0;
}

.in-marl88 {
    margin-left: 88px;
}

.in-marl128 {
    margin-left: 128px;
}

.in-marr129 {
    margin-right: 129px;
}

:deep(.arco-card-body) {
    padding: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>

<style lang="less" scoped>
// responsive
@media (max-width: @screen-lg) {
    .container {
        .banner {
            width: 25%;
        }
    }
}
</style>
