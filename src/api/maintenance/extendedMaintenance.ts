import axios from 'axios';
import qs from 'query-string';
import { CommonRes } from '@/types/global';

// 请求参数table结构
export interface QueryRecordParams {
  id: string;
  elevatorName: string;
  useUnit: string;
  maintenanceUnit: string;
  plannedMaintenanceTime: string;
  extendedMaintenance: string;
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

// 查询超期维保列表
export function getMainOverTimeList(params) {
  return axios.post('/supervise/getMainOverTimeList.do', params , {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}
