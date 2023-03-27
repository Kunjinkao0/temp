<template>
    <div class="login-form-wrapper">
        <div class="login-form-title">{{ $t('login.form.title') }}</div>
        <div class="login-form-error-msg">{{ errorMessage }}</div>
        <a-form ref="loginForm" :model="userInfo" class="login-form" layout="vertical" @submit="handleSubmit"
            size="large">
            <a-form-item field="userName" :rules="[{ required: true, message: $t('login.form.userName.errMsg') }]"
                :validate-trigger="['change', 'blur']" hide-label>
                <a-input v-model="userInfo.userName" :placeholder="$t('login.form.userName.placeholder')" allow-clear>
                    <template #prefix>
                        <icon-user />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item field="password" :rules="[{ required: true, message: $t('login.form.password.errMsg') }]"
                :validate-trigger="['change', 'blur']" hide-label>
                <a-input-password v-model="userInfo.password" :placeholder="$t('login.form.password.placeholder')"
                    allow-clear>
                    <template #prefix>
                        <icon-lock />
                    </template>
                </a-input-password>
            </a-form-item>
            <!-- 滑块验证 -->
            <SilderValidate @update:value="statusChange" />
            <a-space :size="16" direction="vertical" class="cu-mart48">
                <div class="login-form-password-actions">
                    <a-checkbox checked="rememberPassword" :model-value="loginConfig.rememberPassword"
                        @change="(setRememberPassword as any)">
                        {{ $t('login.form.rememberPassword') }}
                    </a-checkbox>
                </div>
              <a-button type="primary" html-type="submit" long :loading="loading">
                {{ $t('login.form.login') }}
              </a-button>
            </a-space>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, createApp } from 'vue';
// import SlideVerify from 'vue-monoplasty-slide-verify';
import { useRouter } from 'vue-router';
import { Message } from '@arco-design/web-vue';
import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
import Crypoto from '@/utils/cryptoJS'
import { useI18n } from 'vue-i18n';
import { useStorage } from '@vueuse/core';
import { useUserStore } from '@/store';
import useLoading from '@/hooks/loading';
import { LoginData } from '@/api/user';
import { IconUser, IconLock } from '@arco-design/web-vue/es/icon';
import SilderValidate from './slider-validate.vue';

const cry: any = new Crypoto()
const router = useRouter();
const { t } = useI18n();
const errorMessage = ref('');
const { loading, setLoading } = useLoading();
const userStore = useUserStore();

const loginConfig = useStorage('login-config', {
    rememberPassword: true,
    userName: 'superadmin', // 演示默认值
    password: '123456', // demo default value
});

const getCacheValueByKey = (key: string) => {
  let value = localStorage.getItem(key);
  if(value){
    return value;
  }
  return "";
};

const getCacheValueByKeyPwd = (key: string) => {
  let value = localStorage.getItem(key);
  if (value){
    return cry.decrypt(value);
  }
  return "";
};

const userInfo = reactive({
      userName: getCacheValueByKey("userId"),
      password: getCacheValueByKeyPwd("password"),
});

const loginValidate = ref(false);

const handleSubmit = async ({
    errors,
    values,
}: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
}) => {
    if (loading.value) return;
    if (!errors) {
        // 判断滑块验证是否通过
        if (!loginValidate.value) {
            Message.error(t('login.form.login.validate'));
            return;
        }

        setLoading(true);
        try {
            const userinfo: any = await userStore.login(values as LoginData);
            // const { redirect, ...othersQuery } = router.currentRoute.value.query;

            router.push({
                name: 'home'
            });

            if(loginConfig.value.rememberPassword === true) {
                localStorage.setItem("userId", userInfo.userName);
                localStorage.setItem("password", cry.encrypt(userInfo.password));
            }else{
                localStorage.setItem("userId", "");
                localStorage.setItem("password", "");
            }

            // Message.success(t('login.form.login.success'));
            // const { rememberPassword } = loginConfig.value;
            // const { userName, password } = values;
            // // 实际生产环境需要进行加密存储。
            // // The actual production environment requires encrypted storage.
            // loginConfig.value.userName = rememberPassword ? userName : '';
            // loginConfig.value.password = rememberPassword ? password : '';
        } catch (err) {
            // errorMessage.value = err.message;
            // you can report use errorHandler or other
        } finally {
            setLoading(false);
        }
    }
};

// 滑块验证
const statusChange = (validate: boolean) => {
    loginValidate.value = validate;
}

const setRememberPassword = (value: boolean) => {
    loginConfig.value.rememberPassword = value;
};

</script>

<style lang="less" scoped>
.login-form {
    &-wrapper {
        padding: 50px 60px;
        height: 100%;
    }

    &-title {
        color: var(--color-text-1);
        font-weight: 500;
        font-size: 24px;
        line-height: 32px;
    }

    &-sub-title {
        color: var(--color-text-3);
        font-size: 16px;
        line-height: 24px;
    }

    &-error-msg {
        height: 32px;
        color: rgb(var(--red-6));
        line-height: 32px;
    }

    &-password-actions {
        display: flex;
        justify-content: space-between;
    }

    &-register-btn {
        color: var(--color-text-3) !important;
    }
}

:deep(.arco-input-wrapper) {
    height: 46px;
}

:deep(.arco-btn-primary) {
    height: 48px;
}
</style>
