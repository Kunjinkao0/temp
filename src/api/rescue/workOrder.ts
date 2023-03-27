import axios from 'axios';
import qs from 'query-string';

// 请求参数table结构
export interface QueryRecordParams {
  id: string;
  elevatorName: string;
  maintainUnit: string;
  useUnit: string;
  alarmTime: string;
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

// 查询救援工单列表
export function getEleWorkList(params) {
  return axios.post('/supervise/getEleWorkList.do', params , {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}

export function getEleWorkDetail(params) {
  return axios.post('/supervise/getEleWorkDetail.do', params , {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}

export function getEleArchivesDetail(params) {
  return axios.post('/supervise/getEleArchivesDetail.do', params , {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}

export function getEleFaultVideo(params) {
  return axios.post('/supervise/getEleFaultVideo.do', params , {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}

// 获取拨叫历史
export function getEleWorkCallHistory(params) {
  return axios.post('/supervise/getEleWorkCallHistory.do', params , {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}