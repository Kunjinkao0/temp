import axios from 'axios';
import {VNode} from "vue";
import {TreeNodeData} from "@arco-design/web-vue";

export interface MenuRecord {
    id: string;
    parentId: string;
    name: string;
    code: string;
    accessPath: string;
    modulePath: string;
    icon: string;
    hideInMenu: string;
    ignoreCache: string;
}
export interface MenuParams extends Partial<MenuRecord> {
    current: number;
    pageSize: number;
}

export interface RoleListRes {
    records: MenuRecord[];
    total: number;
}

export function queryMenuTableList(params: MenuRecord) {
    return axios.post<MenuRecord[]>('/api/resource/getMenuTableList', params, {
        baseURL: import.meta.env.VITE_API_BASE_URL,
    });
}

export function queryMenuSelect(params: MenuRecord) {
    return axios.post<TreeNodeData[]>('/api/resource/getMenuSelect', params, {
        baseURL: import.meta.env.VITE_API_BASE_URL,
    });
}

export function update(params: MenuRecord) {
    return axios.post('/api/resource/update', params, {
        baseURL: import.meta.env.VITE_API_BASE_URL,
    });
}

export function insert(params: MenuRecord) {
    return axios.post('/api/resource/add', params, {
        baseURL: import.meta.env.VITE_API_BASE_URL,
    });
}

export function deleteById(id: string) {
    return axios.get(`/api/resource/deleteById?id=${id}`, {
        baseURL: import.meta.env.VITE_API_BASE_URL,
    });
}

export function deleteByIds(ids: string) {
    return axios.get(`/api/resource/deleteByIds?id=${ids}`, {
        baseURL: import.meta.env.VITE_API_BASE_URL,
    });
}

export function getMenuTree() {
    return axios.post(
        `/api/resource/getMenuTree`,
        {},
        { baseURL: import.meta.env.VITE_API_BASE_URL }
    );
}

export function getFormMenuTree() {
    return axios.post(
        `/api/resource/getFormMenuTree`,
        {},
        { baseURL: import.meta.env.VITE_API_BASE_URL }
    );
}

export function getBtnRoles() {
    return axios.post(
        `/api/resource/getBtnRoles`,
        {},
        { baseURL: import.meta.env.VITE_API_BASE_URL }
    );
}

export function deleteMenuById(id: string) {
    return axios.get(`/api/resource/deleteMenuById?id=${id}`, {
        baseURL: import.meta.env.VITE_API_BASE_URL,
    });
}
