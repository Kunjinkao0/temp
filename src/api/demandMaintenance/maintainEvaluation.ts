import axios from 'axios';

// 请求参数table结构
export interface QueryRecordParams {
  id: string;
  companyName: string;
  person: string;
  contactInformation: string;
  unitRanking: string;
  maintainEleNumbers: string;
  onTimeMaintainRate: string;
  norMalizedMaintainRate: string;
  complaintRate: string;
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

export function getMainCreditEval(params) {
  return axios.post('/supervise/getMainCreditEval.do',  params , {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}





