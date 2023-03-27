import axios from 'axios';

export interface RoleRecord {
    id: string;
    code: string;
    name: string;
    sort: string;
    locked: '0' | '1';
    description: string;
}

export interface RoleParams extends Partial<RoleRecord> {
    current: number;
    pageSize: number;
}

export interface RoleListRes {
    records: RoleRecord[];
    total: number;
}

export function queryRoleList(params: RoleParams) {
    return axios.post<RoleListRes>('/api/role/list', params, {
        baseURL: import.meta.env.VITE_API_BASE_URL,
    });
}

export function queryUserByRoleId(params: RoleParams) {
    return axios.get<RoleListRes>(
        `/api/role/getUserByRoleId?id=${params.id}&name=${params.name}&code=${params.code}&current=${params.current}&pageSize=${params.pageSize}`,
        { baseURL: import.meta.env.VITE_API_BASE_URL }
    );
}

export function queryUserNotInRole(params: RoleParams) {
    return axios.get<RoleListRes>(
        `/api/role/getUserNotInRole?id=${params.id}&name=${params.name}&code=${params.code}&current=${params.current}&pageSize=${params.pageSize}`,
        { baseURL: import.meta.env.VITE_API_BASE_URL }
    );
}

export function update(params: RoleRecord) {
    return axios.post('/api/role/update', params, {
        baseURL: import.meta.env.VITE_API_BASE_URL,
    });
}

export function insert(params: RoleRecord) {
    return axios.post('/api/role/add', params, {
        baseURL: import.meta.env.VITE_API_BASE_URL,
    });
}

export function deleteById(id: string) {
    return axios.get(`/api/role/deleteById?id=${id}`, {
        baseURL: import.meta.env.VITE_API_BASE_URL,
    });
}

export function deleteByIds(ids: string) {
    return axios.get(`/api/role/deleteByIds?ids=${ids}`, {
        baseURL: import.meta.env.VITE_API_BASE_URL,
    });
}

export function addRoleAndUser(ids: any, roleId: string) {
    return axios.get(
        `/api/role/addRoleAndUser?userIds=${ids}&roleId=${roleId}`,
        { baseURL: import.meta.env.VITE_API_BASE_URL }
    );
}

export function deleteRoleAndUserById(id: string) {
    return axios.get(`/api/role/deleteRoleAndUserById?id=${id}`, {
        baseURL: import.meta.env.VITE_API_BASE_URL,
    });
}

export function getMeunByRoleId(roleId: string) {
    return axios.get(`/api/role/getMeunByRoleId?roleId=${roleId}`, {
        baseURL: import.meta.env.VITE_API_BASE_URL,
    });
}

export function addRoleAndMenu(menuIds: any, roleId: string) {
    return axios.get(
        `/api/role/addRoleAndMenu?menuIds=${menuIds}&roleId=${roleId}`,
        { baseURL: import.meta.env.VITE_API_BASE_URL }
    );
}
