import axios from 'axios';

// 请求参数table结构
export interface QueryRecordParams {
    propertyName: string;
    person: string;
    ownerIds: string;
}

// 请求参数分页结构
export interface QueryParams extends Partial<QueryRecordParams> {
    page: number;
    size: number;
    orgId: string;
}

// 响应结构
export interface ListResopnse {
    rows: QueryRecordParams[];
    total: number;
}

// 查询电梯档案列表
export function queryCompanyList(params: QueryParams) {
    return axios.post<ListResopnse>('/supervise/getElePropertyList.do', params, {
        baseURL: import.meta.env.VITE_DEV_API,
    });
}

// 查询单位工作人员
export function getWorkerManageList(params) {
    return axios.post('/supervise/getWorkerManageList.do', params, {
        baseURL: import.meta.env.VITE_DEV_API,
    });
}
