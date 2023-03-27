import axios from 'axios';

// 请求参数search
export interface QueryRecordParams {
    id: string;
    maintainName: string;
    person: string;
    level: string;
}

// 请求参数分页结构
export interface QueryParams extends Partial<QueryRecordParams> {
    page: number;
    size: number;
}

// 响应结构
export interface ListResopnse {
    rows: QueryRecordParams[];
    total: number;
}

// 查询维保电梯档案列表
export function queryMaintainList(params: QueryParams) {
    return axios.post<ListResopnse>('/supervise/getEleMaintainList.do', params, {
        baseURL: import.meta.env.VITE_DEV_API,
    });
}
