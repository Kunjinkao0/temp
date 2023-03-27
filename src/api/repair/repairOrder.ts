import axios from 'axios';
import qs from 'query-string';

// 请求参数table结构
export interface QueryRecordParams {
  id: string;
  elevatorName: string;
  maintainUnit: string;
  useUnit: string;
  planRepairTime: string;
  state: string;
  ownerIds: string;
  workType:number;
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

// 查询维修工单列表
export function getEleWorkList(params) {
  return axios.post('/supervise/getEleWorkList.do', params , {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}
