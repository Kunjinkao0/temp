import axios from 'axios';

// 请求树参数
export interface QueryTreeParams {
    pId?: string;
    fromPage: string;
    name?: string;
}

// 请求树响应
export interface QueryTreeResopnse {
    id: string;
    pId: string;
    name: string;
    type: string;
    realId: string;
    realpId: string
}

export function queryTreeList(params: QueryTreeParams) {
    return axios.post<Array<QueryTreeResopnse>>('/supervise/getOrgOwnerIndexList.do', params, {
        baseURL: import.meta.env.VITE_DEV_API,
    });
}
