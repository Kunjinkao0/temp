import axios from 'axios';

// 请求参数table结构
export interface QueryRecordParams {
  id: string;
  ownerName: string;
  maintainName: string;
  eleNum: string;
  advNum: string;
  ownerIds: string;
  advRate:string;
  startTime: string;
  endTime: string;
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

// 查询公众反馈率排名
export function getEleAdvocateRanking(params) {
  return axios.post('/supervise/getEleAdvocateRanking.do', params , {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}

// 查询公众反馈率排名
export function getEleAdvocateStat(params) {
  return axios.post('/supervise/getEleAdvocateStat.do', params , {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}


