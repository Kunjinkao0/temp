import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';
import { AngleAxisOption } from 'echarts/types/dist/shared';

export interface LoginData {
    userName: string;
    password: string;
}

// export interface LoginRes {
//   token: string;
// }
export interface LoginRes {
    code: number;
    message: string;
    data: any;
}

export function login(data: LoginData) {
    return axios.post<LoginRes>('/api/admin/login/username', data, {
        baseURL: import.meta.env.VITE_API_BASE_URL,
    });
}

export function logout() {
    return axios.post<LoginRes>('/api/admin/logoutByTk', {},
        { baseURL: import.meta.env.VITE_API_BASE_URL }
    );
}

export function getUserInfo() {
    return axios.get<UserState>('/api/admin/info', {
        baseURL: import.meta.env.VITE_API_BASE_URL,
    });
}

export function getMenuList() {
    return axios.post<RouteRecordNormalized[]>(
        '/api/user/menu',
        {},
        { baseURL: import.meta.env.VITE_API_BASE_URL }
    );
}

export function getMenuTree() {
    return axios.post<RouteRecordNormalized[]>(
        '/api/resource/getMenuTree',
        {},
        { baseURL: import.meta.env.VITE_API_BASE_URL }
    );
}

// 跳转tixin平台
export function gotoTiXin(params) {
	
	window.open(`${import.meta.env.VITE_TIXIN_LOGIN_API}/dtLogin.do?accessToken=${params.accessToken}`)
	
	
}

// 跳转tixin大屏
export function gotoScreen(params) {
	
	window.open(`${import.meta.env.VITE_TIXIN_LOGIN_API}/monitorScreenGetInfo.do?accessToken=${params.accessToken}`)
	
	
}

