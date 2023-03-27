import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message, Modal } from '@arco-design/web-vue';
import { useUserStore } from '@/store';
import { getToken, getTixinToken } from '@/utils/auth';

export interface HttpResponse<T = unknown> {
    status: number;
    msg: string;
    code: number;
    data: T;
}

if (import.meta.env.VITE_API_BASE_URL) {
    axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // let each request carry token
        // this example using the JWT token
        // Authorization is a custom headers key
        // please modify it according to the actual situation
        let token;
        if (config.baseURL === import.meta.env.VITE_API_BASE_URL) {
            token = getToken();
        } else {
            token = getTixinToken();
        }
        if (token) {
            if (!config.headers) {
                config.headers = {};
            }
            config.headers.accessToken = `${token}`;
        }
        return config;
    },
    (error) => {
        // do something
        return Promise.reject(error);
    }
);
// add response interceptors
axios.interceptors.response.use(
    (response: AxiosResponse<HttpResponse>) => {
        const res: any = response.data;
        // if the custom code is not 200, it is judged as an error.
        if (response.config.url === '/supervise/getEleFaultVideo.do' && res.code !== 200){
            // 获取故障视频报错不管,不需要提示
            return res
        }
        
        if (res.code !== 200) {
            Message.error({
                content: res.data || res.msg || 'Error',
                duration: 5 * 1000,
            });
            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (
                [50008, 50012, 50014,601].includes(res.code) &&
                response.config.url !== '/api/admin/info'
            ) {
                let strContent = "账号已过期,请重新登录";
                if(res.code === 601){
                    strContent = "账号已过期,请重新登录";
                }
                Modal.error({
                    title: '提示',
                    content: strContent,
                    okText: '重新登录',
                    async onOk() {
                        const userStore = useUserStore();
                        if(res.code !== 601){
                            await userStore.logout();
                            window.location.reload();
                        }else{
                            await userStore.logoutCallBack();
                            window.location.reload();
                        }
                    },
                });
            }
            return Promise.reject(new Error(res.msg || 'Error'));
        }
        return res;
    },
    (error) => {
        Message.error({
            content: error.msg || 'Request Error',
            duration: 5 * 1000,
        });
        return Promise.reject(error);
    }
);
