import axios from 'axios';

// 请求参数table结构
export interface QueryRecordParams {
  id: string;
  registCode: string;
  elevatorCode: string;
  qrCode: string;
  elevatorName: string;
  ownerIds: string;
  createTime:string;
  note: string;
  status: string;
  dealDateTime:string;
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

// 查询公众反馈列表
export function getEleAdvocateList(params) {
  return axios.post('/supervise/getEleAdvocateList.do', params , {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}


