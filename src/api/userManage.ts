import axios from 'axios';
import type { DescData } from '@arco-design/web-vue/es/descriptions/interface';

export interface UserRecord {
    id: string;
    name: string;
    code: string;
    locked: '0' | '1';
    accountStatus: '0' | '1';
}

export interface UserParams extends Partial<UserRecord> {
    current: number;
    pageSize: number;
}

export interface UserListRes {
    records: UserRecord[];
    total: number;
}

export function queryUserList(params: UserParams) {
    return axios.post<UserListRes>('/api/admin/list', params, {
        baseURL: import.meta.env.VITE_API_BASE_URL,
    });
}

export function synchronization() {
    return axios.post('/api/admin/synchronization', {
        baseURL: import.meta.env.VITE_API_BASE_URL,
    });
}

export interface ServiceRecord {
    id: number;
    title: string;
    description: string;
    name?: string;
    actionType?: string;
    icon?: string;
    data?: DescData[];
    enable?: boolean;
    expires?: boolean;
}
