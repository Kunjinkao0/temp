import axios from 'axios';

// 请求参数table结构
export interface QueryRecordParams {
  id: string;
  elevatorName: string;
  maintainUnit: string;
  useUnit: string;
  mainType: string;
  use: string;
  ownerIds: string;
  workType:number;
  state:string;
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

// 查询维保工单列表
export function getEleWorkList(params) {
  return axios.post('/supervise/getEleWorkList.do', params , {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}

// 查询故障列表
export function getDevFaultList(params) {
  return axios.post('/supervise/getDevFaultList.do', params , {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}
